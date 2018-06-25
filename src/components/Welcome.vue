<template>
  <div>
    <md-empty-state
      md-icon="local_atm"
      md-label="Gerencie seus reembolsos de uma forma simples"
      md-description="Cadastre sua empresa e organize seus reembolsos.">
      <div v-if="!auth"> 
        <router-link :to="{ name: 'Cadastro', params: {} }"><md-button class="md-primary md-raised">Cadastra-se</md-button></router-link>
        <router-link :to="{ name: 'Login', params: {} }"><md-button class="md-primary md-raised">Login</md-button></router-link>
      </div>
      <div v-else>
        <h2>Bem vindo, {{ user }}! </h2>
      </div>
    </md-empty-state>
  </div>
</template>

<script>
  export default {
    data: () => ({
      title: 'ReembolsoAzul',
      user: null,
    }),
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    },
    created () {
      this.$store.commit('changeTitle', this.title)
      this.user = this.$store.getters.user   
    }  
  }
  

</script>
