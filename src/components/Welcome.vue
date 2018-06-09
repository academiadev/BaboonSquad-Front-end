<template>
  <div>
    <md-empty-state
      md-icon="local_atm"
      md-label="Gerencie seus reembolsos de uma forma simples"
      md-description="Cadastre sua empresa e organize seus reembolsos.">
<router-link :to="{ name: 'Cadastro', params: {} }"><md-button class="md-primary md-raised">Cadastra-se</md-button></router-link>

      <router-link :to="{ name: 'Login', params: {} }"><md-button class="md-primary md-raised">Login</md-button></router-link>
    </md-empty-state>
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
