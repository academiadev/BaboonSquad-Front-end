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
              <span class="md-error" v-else-if="!$v.form.name.minlength">O nome do reembolso deve possuir mais de 3 letras</span>
            </md-field>
          

          
          <md-field  :class="getValidationClass('type')">
            <label for="type">Categoria</label>
            <md-select v-model="form.type"  name="type" id="type">
              <md-option value="">Escolha</md-option>
              <md-option value="0">Outros</md-option>
              <md-option value="1">Hospedagem</md-option>
              <md-option value="2">Transposte</md-option>
              <md-option value="3">Alimentação</md-option>
            </md-select>
            <span class="md-error">O reembolso deve possuir uma categoria</span>
          </md-field>
          

        
          <md-datepicker :class="getValidationClass('date')" v-model="selectedDate" md-immediately />
        
        
          <md-field :class="getValidationClass('value')">
            <label for="value">Valor</label>
            <md-input type="number" id="value" name="value" v-model="form.value" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.value.required">The age is required</span>
          </md-field>
        
        
          <md-field :class="getValidationClass('file')" id="file">
            <label>Anexo</label>
            <md-file/>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" :disabled="sending">EDITAR</md-button>
          <md-button type="reset" class="md-primary" :disabled="sending">FECHAR</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>

</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  export default {
    props: ['cadastro-reembolsos'],
    name: 'DadosReembolso',
    mixins: [validationMixin],
    data: () => ({
      form: {
        name: null,
        type: null,
        date: null,
        value: null,
        file: null,
      },
      selectedDate: new Date('2018/03/26'),
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
        },
        file: {
          required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.name = null
        this.form.type = null
        this.form.date = null
        this.form.value = null
        this.form.file = null
      },
      saveRefund () {
        this.sending = true
        const formData = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          confirmPassword: this.form.confirmPassword,
          company: this.form.company
        }
        console.log(formData)
      },
      validateRefund () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .md-title{
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

</style>
