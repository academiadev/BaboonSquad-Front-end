<template>
  <div>
    <md-empty-state></md-empty-state>
    <form novalidate class="md-layout md-alignment-top-center " @submit.prevent="validatePasswords">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <md-card-header class="md-layout md-alignment-center">
          <div class="md-title">Cadastre uma nova senha</div>
        </md-card-header>
        <md-card-content v-if="!redefinePassword">
          <p class="already-accessed"> Esta url já foi acessado </p>
          <md-card-actions>
            <md-button to="../../login">Inicio</md-button>
          </md-card-actions>
        </md-card-content>   
        <md-card-content v-if="redefinePassword">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Senha</label>
              <md-input type="password" name="password" id="password" v-model="form.password" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.password.required">É necesário preencher uma senha</span>
              <span class="md-error" v-else-if="!$v.form.password.minLength">A senha deve ter no mínimo 8 caracteres</span>
              <span class="md-error" v-else-if="!$v.form.password.mustHaveNumber">A senha deve possuir no mínimo um número</span>
              <span class="md-error" v-else-if="!$v.form.password.mustHaveUpperCase">A senha deve possuir no mínimo uma letra maiúscula</span>
              <span class="md-error" v-else-if="!$v.form.password.mustHaveSpecialCaractes">A senha deve possuir no mínimo um carácter especial</span>
            </md-field>
          </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('confirmPassword')">
                <label for="password">Confirmar senha</label>
                <md-input type="password" name="confirmPassword" id="confirmPassword" v-model="form.confirmPassword"
                          @blur="$v.form.confirmPassword.$touch()" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.confirmPassword.required">É necesário confirmar a sua senha</span>
                <span class="md-error" v-else-if="!$v.form.confirmPassword.sameAs">As senha devem ser iguais</span>
              </md-field>
            </div>
        </md-card-content>
        
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions v-show="redefinePassword">
          <md-button type="submit"  class="md-dense md-raised md-primary" :disabled="sending">Confirmar nova senha</md-button>
        </md-card-actions>

      </md-card>

      <md-snackbar :md-active.sync="userSaved">Senha alterada com sucesso!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import Password from '../Shared/Password.vue'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'NovaSenha',
    mixins: [validationMixin],
    data: () => ({
      form: {
        password: null,
        confirmPassword: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        password: { 
          required,
          minLength: minLength(3)
        },
        confirmPassword: {
          required,
          sameAs: sameAs('password')
        }
      }
    },
    computed: {
      redefinePassword () {
        return this.$store.getters.redefinePassword || this.$store.getters.isAuthenticated
      },
      auth () {
        return this.$store.getters.isAuthenticated
      },
      emailUser () {
        return this.$store.getters.email
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
        this.form.password = null
        this.form.confirmPassword = null
      },
      validatePassword (value) {
        this.$v.password.$invalid = value
      },
      validatePasswords () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.OnSubmit()
        }
      },
      OnSubmit () {
        this.sending = true
        const data = {
          password: this.form.password,
          code: this.$route.params.id,
          emailUser: this.emailUser != null ? this.emailUser : null
      }
         this.$store.dispatch('redefinePassword', data).then(res => { console.log(res) } ).catch(erro => console.log(error) )

      },
    },
    components: {
      adevpassword: Password
    },
    created() {
        if(!this.auth)
         this.$store.dispatch('getUsedPassword', this.$route.params.id).then(res => { console.log(res) } ).catch(erro => console.log(error) )
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
  .already-accessed{
    font-size: 20px;
  }

</style>
