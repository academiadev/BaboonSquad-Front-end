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
              <md-input name="name" id="name" v-model="form.name" :disabled="sending || isAdmin" />
              <span class="md-error" v-if="!$v.form.name.required">É necesario nomear o reembolso</span>
              <span class="md-error" v-else-if="!$v.form.name.minlength">O nome do reembolso deve possuir mais de {{ $v.form.name.$params.minLength.min }} letras</span>
            </md-field>
          
          <md-field  :class="getValidationClass('type')" >
            <label for="type">Categoria</label>
            <md-select v-model="form.type"  name="type" id="type" :disabled="sending || isAdmin">
              <md-option disabled value="">Escolha</md-option>
              <md-option value=0>Outros</md-option>
              <md-option value=1>Hospedagem</md-option>
              <md-option value=2>Transposte</md-option>
              <md-option value=3>Alimentação</md-option>
            </md-select>
            <span class="md-error">O reembolso deve possuir uma categoria</span>
          </md-field>
         
          <md-datepicker :class="getValidationClass('date')" id="date" v-model="form.date" :md-disabled-dates="sending || isAdmin"  md-immediately/>
          
          <md-field :class="getValidationClass('value')">
            <label for="value">Valor</label>
            <md-input type="money" id="value" name="value" v-money="money" v-model="form.value" :disabled="sending || isAdmin" />
            <span class="md-error" v-if="!$v.form.value.required">Informe o valor do reembolso</span>
            <span class="md-error" v-else-if="!$v.form.value.numeric">Informe um valor válido para o reembolso</span>
            <span class="md-error" v-else-if="!$v.form.value.minValue">Informe um valor maior que zero para o reembolso</span>
          </md-field>
        
          <md-field>
            <md-file placeholder="Selecione uma imagem" ref="mdfile" @change ="onFileUpload($event)" accept="image/*" :disabled="sending || isAdmin" />
          </md-field>
          <md-card-media v-if="fileImage">
              <img src="../../assets/remove-24x24.png" @click="removeImage" title="Remover" class="img-refund-remove" />
              <div class="images" v-viewer>
                <img :src="fileImage" title="Ampliar" class="img-refund"/>
              </div>
          </md-card-media>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="reset" @click="close"  :disabled="sending">FECHAR</md-button>
          <md-button v-if="!isAdmin" type="submit" class="md-primary" :disabled="sending">{{saveText}}</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="refundSaved"> 
        O reembolso {{ finalText }} foi salvo com sucesso!
      </md-snackbar>
      <md-snackbar :md-active.sync="hasError"> 
        Erro ao salvar o reembolso: {{ finalText }}!
      </md-snackbar>
    </form>

</template>

<script>
function formatDate(date) {
  function ledingZero(s) {
    return s < 10 ? "0" + s : s;
  }
  var formatDate = new Date(date);
  return [
    ledingZero(formatDate.getDate()),
    ledingZero(formatDate.getMonth() + 1),
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

import refundExpenseGraphVue from "./refundExpenseGraph.vue";

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
      name: null,
      type: null,
      date: new Date(),
      status: 2,
      value: 0,
      file: null,
      user: null,
      company: null
    },
    saveText: "Editar",
    finalText: null,
    refundSaved: false,
    sending: false,
    hasError: false,
    fileImage: null
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
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    email() {
      return this.$store.getters.email;
    }
  },
  methods: {
    show() {
      const vuer = this.$el.querySelector(".images").$vuer;
      vuer.show();
    },
    onFileUpload(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;

      this.saveImage(files[0]);
    },
    generateName(extension) {
      return Math.random()
        .toString(36)
        .replace(".", "-")
        .concat(".")
        .concat(extension);
    },
    getFileNameTransformed(name) {
      return this.generateName(name.split(".").pop());
    },
    setFormFile(name) {
      this.form.file = name;
      this.$refs["mdfile"].model = this.form.file;
    },
    getFileData(file) {
      const newFileName = this.getFileNameTransformed(file.name);
      this.setFormFile(newFileName);

      const data = new FormData();
      data.append("file", file, newFileName);

      return data;
    },
    saveImage(file) {
      const data = this.getFileData(file);
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      axios
        .post("reembolso/carregarImage", data, config)
        .then(res => this.createImage())
        .catch(error => console.error("post", error));
    },
    createImage() {
      if (!this.form || !this.form.file) return;

      axios
        .get("reembolso/getImage/" + this.form.file, {
          responseType: "arraybuffer"
        })
        .then(res => {
          this.fileImage = `data:image/jpg;base64,${this.convertBytesToBase64(
            res.data
          )}`;
          this.$refs["mdfile"].model = this.form.file;
        })
        .catch(error => console.error("get", error));
    },
    removeImage() {
      if (!this.form || !this.form.file) return;

      axios
        .delete("reembolso/deleteImage/" + this.form.file)
        .then(res => {
          this.$refs["mdfile"].clearField();
          this.fileImage = null;
          this.setFormFile("");
        })
        .catch(error => console.error("delete", error));
    },
    convertBytesToBase64(file) {
      return new Buffer(file, "binary").toString("base64");
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
      this.form = {};
    },
    saveRefund() {
      this.finalText = this.form.name;
      this.lastRefund = this.form.name;
      this.sending = true;
      if (this.form.id) {
        this.putRefund();
      } else {
        this.postRefund();
      }
    },
    postRefund() {
      const formData = this.getData();

      axios
        .post("reembolso/", formData)
        .then(res => {
          this.sending = false;
          this.saveRefund = true;
          this.close();
        })
        .catch(error => {
          console.error(error);
          this.sending = false;
          this.finalText = error;
          this.close();
        });
    },
    getData() {
      console.log(this.form.user)
      return {
        name: this.form.name,
        category: this.form.type,
        status: this.form.status,
        date: formatDate(this.form.date),
        value: formatValue(this.form.value),
        userName: this.$store.getters.email,
        file: this.form.file,
        showForUser: true,
        company: this.company
      };
    },
    putRefund() {
      let formData = this.getData();
      formData.id = this.form.id;

      axios
        .put("reembolso/edit/" + this.form.id, formData)
        .then(res => {
          this.sending = false;
          this.saveRefund = true;
          this.close();
        })
        .catch(error => {
          console.error(error);
          this.sending = false;
          this.finalText = error;
          this.close();
        });
    },
    afterSave() {
      this.refundSaved = true;
    },
    OnSubmit() {
      this.saveRefund();
      this.close();
    },
    close() {
      this.$emit("CloseRefundItem");
    },
    validateRefund() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveRefund();
      }
    }
  },
  created() {
    this.saveText = "Solicitar";
    if (this.refund != null) {
      this.form.id = this.refund.id;
      this.form.status = this.refund.status;
      this.form.name = this.refund.name;
      this.form.type = this.refund.category;
      this.form.date = this.refund.date;
      this.form.value = this.refund.value;
      this.form.user = this.refund.user;
      this.form.file = this.refund.file;
      this.saveText = "Editar";
      this.createImage();
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
img.img-refund {
  width: calc(100% - 24px);
  padding-left: 5px;
  cursor: pointer;
}
img.img-refund-remove {
  height: 24px;
  width: 24px;
  float: left;
  cursor: pointer;
}
</style>
