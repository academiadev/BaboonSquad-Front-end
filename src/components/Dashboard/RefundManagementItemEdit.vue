<template>

    <form novalidate class="md-layout" @submit.prevent="validateRefund">
      <md-card>
        <md-card-header>
          <div class="md-title">Dados do Reembolso</div>
        </md-card-header>

        <md-card-content>
          <div>
              Confira os dados do reembolso solicitado e os arquivos anexados
          </div>
            <md-field :class="getValidationClass('name')">
              <label for="name">Nome do reembolso</label>
              <md-input name="name" id="name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.name.required">É necesario nomear o reembolso</span>
              <span class="md-error" v-else-if="!$v.form.name.minlength">O nome do reembolso deve possuir mais de {{ $v.form.name.$params.minLength.min }} letras</span>
            </md-field>
          
          <md-field  :class="getValidationClass('type')">
            <label for="type">Categoria</label>
            <md-select v-model="form.type"  name="type" id="type">
              <md-option value=null>Escolha</md-option>
              <md-option value=0>Outros</md-option>
              <md-option value=1>Hospedagem</md-option>
              <md-option value=2>Transposte</md-option>
              <md-option value=3>Alimentação</md-option>
            </md-select>
            <span class="md-error">O reembolso deve possuir uma categoria</span>
          </md-field>
          
          <md-datepicker :class="getValidationClass('date')" id="date" v-model="form.date" md-immediately/>
        
          <md-field :class="getValidationClass('value')">
            <label for="value">Valor</label>
            <md-input type="money" id="value" name="value" v-money="money" v-model="form.value" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.value.required">Informe o valor do reembolso</span>
            <span class="md-error" v-else-if="!$v.form.value.numeric">Informe um valor válido para o reembolso</span>
            <span class="md-error" v-else-if="!$v.form.value.minValue">Informe um valor maior que zero para o reembolso</span>
          </md-field>
        
          <md-field>
            <md-file placeholder="Selecione uma imagem" @change="onFileUpload($event)" accept="image/*" />
          </md-field>
          <md-card-media class="img-refund">
            <div v-if="form.fileName">
              <img :src="form.fileName" alt="Reemblso" />
              <img :src="'./remove-10x10.png'" alt="Remover" />
            </div>
          </md-card-media>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="reset" @click="Close"  :disabled="sending">FECHAR</md-button>
          <md-button type="submit" class="md-primary" :disabled="sending">EDITAR</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>

</template>

<script>
function formatDate(date) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var formatDate = new Date(date);
  return [
    pad(formatDate.getDate()),
    pad(formatDate.getMonth() + 1),
    formatDate.getFullYear()
  ].join("/");
}
function formatValue(value) {
  return value
    .replace(/\./g, "")
    .replace("R$ ", "")
    .replace("-", "")
    .replace(",", ".");
}

import { validationMixin } from "vuelidate";
import axios from "@/axios-auth";
import {
  required,
  numeric,
  minLength,
  minValue
} from "vuelidate/lib/validators";

export default {
  props: ["refund"],
  name: "DadosReembolso",
  mixins: [validationMixin],
  data: () => ({
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      suffix: "",
      precision: 2,
      masked: true
    },
    form: {
      id: null,
      status: null,
      name: null,
      type: null,
      date: new Date(),
      value: 0,
      user: null,
      company: null,
      fileName: null
    },
    selecedDate: new Date("01/01/2010"),
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      type: {
        required
      },
      date: {
        required
      },
      value: {
        required
      }
    }
  },
  computed: {
    company() {
      return this.$store.getters.company;
    },
    email() {
      return this.$store.getters.email;
    }
  },
  methods: {
    onFileUpload(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;

      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.form.fileName = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(){
        this.form.fileName = null;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.id = null;
      this.form.name = null;
      this.form.type = null;
      this.form.date = null;
      this.form.value = 0;
      this.form.fileName = null;
    },
    saveRefund() {
      this.sending = true;
      if (this.form.id) {
        this.putRefund();
      } else {
        this.postRefund();
      }
    },
    postRefund() {
      const formData = {
        name: this.form.name,
        category: Number(this.form.type),
        status: 2,
        date: formatDate(this.form.date),
        value: formatValue(this.form.value),
        userName: this.email,
        company: this.company,
        fileName: this.form.fileName
      };
      console.log(formData);
      axios
        .post("reembolso/", formData)
        .then(res => {
          console.log(res);
          this.$router.push("/reembolsos");
        })
        .catch(error => console.log(error));
    },
    putRefund() {
      const formData = {
        id: this.form.id,
        name: this.form.name,
        category: this.form.type,
        status: this.form.status,
        date: formatDate(this.form.date),
        value: formatValue(this.form.value),
        userName: this.email,
        company: this.company,
        fileName: this.form.fileName
      };
      console.log(formData);
      axios
        .put("reembolso/:this.form.id", { formData })
        .then(res => {
          console.log(res);
          this.$router.push("/reembolsos");
        })
        .catch(error => console.log(error));
    },
    OnSubmit() {
      console.log(JSON.parse(JSON.stringify(this.form)));
      this.saveRefund();
    },
    Close() {
      this.$emit("CloseRefundEdit");
    },
    validateRefund() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveRefund();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.md-title {
  padding-left: 30px;
}

.md-card-content {
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 0px;
  padding-top: 10px;
}

.md-card-header {
  background: #2687e9;
  color: #fff;
}

.md-card-actions {
  padding-left: 50px;
  padding-right: 50px;
}
.img-refund{
  margin-left: 50px;
  width: 100px;
  right: 50px;
}

</style>
