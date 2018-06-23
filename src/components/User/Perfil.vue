<template>
  <div>
    <md-empty-state></md-empty-state>
    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-40 md-small-size-100">

        <md-card-content>
          <md-field :class="getValidationClass('name')">
              <label for="first-name">Nome</label>
              <md-input name="name" id="name" autocomplete="name" v-model="form.name" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.name.required">É necessário informar o nome</span>
              <span class="md-error" v-else-if="!$v.form.name.minlength">O nome deve possuir mais de {{ $v.form.name.$params.minLength.min}} letras </span>
          </md-field>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">É necesário preencher o email</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Email inválido</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions class="md-alignment-left">
          <md-button to="./redefinirsenha" class="md-dense md-raised md-primary" :disabled="sending">Redefinir senha</md-button>
        </md-card-actions>

        <md-card-actions>
          <md-button type="submit">Atualizar</md-button>
        </md-card-actions >

      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
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
    mixins: [validationMixin],
    data: () => ({
      title: "Perfil",
      form: {
        name: null,
        email: null,
      },
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
      clearForm () {
        this.$v.$reset()
        this.form.name = null
        this.form.email = null
      },
      OnSubmit () {
        window.setTimeout(() => {
          this.sending = false
          this.clearForm()
        }, 1500)
        this.sending = true
        const formData = {
          name: this.form.name,
          newEmail: this.form.email,
          email: this.$store.getters.email
        }
         this.$store.dispatch('alter', formData).then(res => { 
            this.userSaved = true
          })
         .catch(erro => 
            console.log(erro),
            this.sending = false
          )
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.OnSubmit()
        }
      }
    },
    created () {
      this.$store.commit('changeTitle', this.title)
      this.form.name = this.$store.getters.user 
      this.form.email = this.$store.getters.email  
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
  	padding-top: 3px;
  	padding-bottom: 3px;
  }

  .md-button.md-dense {
  	width: 50%;
  }

</style>
