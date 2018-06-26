<template>
  <div>
    <md-empty-state></md-empty-state>
    <form novalidate class="md-layout md-alignment-top-center " @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <md-card-header class="md-layout md-alignment-center">
          <div class="md-title">Redefinir senha</div>
        </md-card-header>

        <md-card-content>
          <p>Insira o email cadastrado para redefinir senha</p>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">É necesário preencher o email</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Email inválido</span>
          </md-field>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate"></md-progress-bar>

        <md-card-actions>
          <md-button type="submit" class="md-dense md-raised md-primary" >REDEFINIR SENHA</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'ProgressBarIndeterminate',
    name: 'RedefinirSenha',
    mixins: [validationMixin],
    data: () => ({
      form: {
        email: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        email: {
          required,
          email
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
      OnSubmit () {
        this.sending = true
        const formData = {
          email: this.form.email,
        }
        this.$store.dispatch('requestRedefinePassword', formData)
          .catch(erro => console.error(error) )
      },
      clearForm () {
        this.$v.$reset()
        this.form.email = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.OnSubmit()
        }else {
            this.sending = false
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

  //Global
  .md-card-header {
  	background: #2687e9;
  	color: #fff;
  }

  .md-button.md-dense {
  	width: 100%;
  }

  .md-card-content {
  	padding-left: 50px;
  	padding-right: 50px;
    padding-top: 15px;
  }

  .md-card-actions {
  	padding-left: 50px;
  	padding-right: 50px;
  }
  //!Global
  .md-card-actions {
    padding-bottom: 15px;
  }

</style>
