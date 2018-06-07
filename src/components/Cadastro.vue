<template>
  <div>
    <md-empty-state></md-empty-state>
    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-45 md-small-size-100">
        <md-card-header class="md-layout md-alignment-center">
          <div class="md-title">Cadastro Reembolso ContaAzul</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">First Name</label>
                <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>


          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input name="password" id="password" v-model="form.password" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
              <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
            </md-field>
          </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input name="password" id="password" v-model="form.password" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
              </md-field>
            </div>

            <md-radio v-model="radio" value="accent">Criar nova empresa  <small>(Admin)</small></md-radio>
            <md-radio v-model="radio" value="Primary" class="md-primary">Inserir código existente </md-radio>
            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="empresa">Inserir nome da empresa</label>
                <md-input name="empresa" id="empresa" v-model="form.empresa" :disabled="sending" />
              </md-field>
            </div>
          <div>

          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit"  class="md-dense md-raised md-primary" :disabled="sending">Cadastrar</md-button>
        </md-card-actions>


      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
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
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'Cadastro',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
        password: null,
        empresa: null
      },
      radio: 'accent',
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        gender: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(3)
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
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.email = null
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
