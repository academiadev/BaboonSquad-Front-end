<template>
  <md-field :class="getValidationClass()">
    <label for="password">Senha</label>
    <md-input type="password" name="password" id="password" @blur="$v.password.$touch()" v-model="password" @keyup="addPass" />
    <span class="md-error" v-if="!this.$v.password.required">É necesário preencher uma senha</span>
    <span class="md-error" v-else-if="!this.$v.password.minLength">A senha deve ter no mínimo 8 caracteres</span>
    <span class="md-error" v-else-if="!this.$v.password.mustHaveNumber">A senha deve possuir no mínimo um número</span>
    <span class="md-error" v-else-if="!this.$v.password.mustHaveUpperCase">A senha deve possuir no mínimo uma letra maiúscula</span>
    <span class="md-error" v-else-if="!this.$v.password.mustHaveSpecialCaractes">A senha deve possuir no mínimo um carácter especial</span>
  </md-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    props: ['pass'],
    data () {
      return {
        password: this.pass
      }
    },
    validations: {
        password: {
          required,
          minLength: minLength(8),
          mustHaveNumber: value =>  { var regExpNumber = RegExp("^(?=.*[0-9])");
                                      return regExpNumber.test(value)},
          mustHaveUpperCase: value => {var regExpUpper = RegExp("^(?=.*[A-Z])");
                                        return regExpUpper.test(value)},
          mustHaveSpecialCaractes: value => {var regExpSpecial = RegExp("^(?=.*[!@#$%^&*])")
                                              return regExpSpecial.test(value)}
        }
  },
  methods: {
    getValidationClass () {

      if (this.$v.password) {
        return {
          'md-invalid': this.$v.password.$invalid && this.$v.password.$dirty
        }
      }
    },
    addPass: function(event) {
      let password = this.password + event.key;
      this.$emit('input', password);
      this.$emit('isValid', !this.$v.password.$invalid);
    }
  }
}
</script>

<style lang="scss" scoped>



</style>
