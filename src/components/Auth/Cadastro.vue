<template>
  <div>
    <md-empty-state></md-empty-state>
    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-40 md-small-size-100">
        
        <md-card-header class="md-layout md-alignment-center">
          <div class="md-title">Cadastro Reembolso ContaAzul</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Nome</label>
                <md-input name="name" id="name" v-model="form.name" @blur="$v.form.name.$touch()" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">É necessário informar um nome</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
                      @blur="$v.form.email.$touch()" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">É necesário preencher o email</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Email inválido</span>
          </md-field>

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

            <md-radio v-model="radio" :value=2 class="md-primary">Inserir código existente </md-radio>
            <md-radio v-model="radio" :value=1  class="md-primary">Criar nova empresa  <small>(Admin)</small></md-radio>
            
            <div class="md-layout-item md-small-size-100"  v-if="radio===1">
              <md-field :class="getValidationClass('company')">
                <label for="company" v-if="radio===2">Inserir código da empresa</label>
                <label for="company">Inserir nome da empresa</label>
                <md-input name="company-name" id="company-name" v-model="form.company.name" @blur="$v.form.company.$touch()" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.company.required">É necesário preencher uma empresa</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100" v-if="radio===2">
              <md-field :class="getValidationClass('company')">
                <label for="company" >Inserir código da empresa</label>
                <md-input name="company-code" id="company-code" v-model="form.company.code" @blur="$v.form.company.$touch()" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.company.required">É necesário preencher uma empresa</span>
              </md-field>
            </div>
          <div>    
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-dense md-raised md-primary" :disabled="sending">Cadastrar</md-button>
        </md-card-actions>


      <md-snackbar :md-active.sync="userSaved">Cadastro foi efetuado com sucesso!</md-snackbar>
      <md-snackbar :md-active.sync="errorSaved">{{ error }}</md-snackbar>
      
      </md-card>
    </form>
    <md-empty-state></md-empty-state>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'Cadastro',
    mixins: [validationMixin],
    data: () => ({
      form: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        company: {
          name: null,
          code: null
        }
      },
      radio: 1,
      userSaved: false,
      sending: false,
      lastUser: null,
      errorSaved: false
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
        },
        password: {
          required,
          minLength: minLength(3),
          mustHaveNumber: value =>  { var regExpNumber = RegExp("^(?=.*[0-9])");
                                      return regExpNumber.test(value)},
          mustHaveUpperCase: value => {var regExpUpper = RegExp("^(?=.*[A-Z])");
                                        return regExpUpper.test(value)},
          mustHaveSpecialCaractes: value => {var regExpSpecial = RegExp("^(?=.*[!@#$%^&*])")
                                              return regExpSpecial.test(value)}
        },
        confirmPassword: {
          required,
          sameAs: sameAs('password')
        },
        company:{
          required
        }
      }
    },
    computed: {
      error () {
        return this.$store.getters.erro != null ? this.$store.getters.erro.message : null ;
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
        this.form.password = null
        this.form.confirmPassword = null
        this.form.empresa = null
      },
      OnSubmit () {
        this.sending = true
        const formData = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          company: this.form.company,
          typePermission: this.radio
      }
         this.$store.dispatch('save', formData)
         .then(res => { 
            this.userSaved = true
          })
          .catch(error => {
            this.$store.dispatch('setError', error.response.data)
            this.setError();
            this.sending = false;
          })

      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.OnSubmit()
        } else {
            this.sending = false
        }
      },
      setError(){
        this.errorSaved = true
      }
    },
  }
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-radio {
  display: flex;
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
	padding-bottom: 50px;
}

</style>
