<template>
  <div>
    <md-empty-state></md-empty-state>
    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-35 md-small-size-100">
        <md-card-header class="md-layout md-alignment-center">
          <div class="md-title">Reembolso ContaAzul</div>
        </md-card-header>

        <md-card-content>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">É necesário preencher o email</span>
          </md-field>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input type="password" name="password" id="password" v-model="form.password" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.password.required">É necesário preencher uma senha</span>
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit"  class="md-dense md-raised md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
        <div class="md-layout md-alignment-top-center">
          <md-button to="../password/redefinirsenha">ESQUECI MINHA SENHA</md-button>
          <md-button to="./cadastro">QUERO ME CADASTRAR </md-button>
        </div>
        <div v-show="errorSaved">
         <md-snackbar :md-active.sync="errorSaved">{{ error }}</md-snackbar>
        </div>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    errorSaved: false
  }),
  validations: {
    form: {
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
  computed: {
    error() {
      return this.$store.getters.erro != null
        ? this.$store.getters.erro.message
        : null;
    }
  },
  methods: {
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
      this.form.password = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;
      this.$store
        .dispatch("login", {
          email: this.form.email,
          password: this.form.password
        })
        .catch(error => {
          console.log(error)
          if (error.response.data.status == 500) {
            error.response.data.message = "Usuário ou Senha incorretas";
          }
          this.$store.dispatch("setError", error.response.data);
          this.setError();
          this.sending = false;
        });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    setError() {
      this.errorSaved = true;
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

.md-layout {
  padding-left: 40px;
}
//!Global
</style>
