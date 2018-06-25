<template>
  <div>
    <md-empty-state
      class="md-accent"
      md-icon="warning"
      md-label="Página não encontrada"
      md-description="Lamentamos, mas não foi possível encontrar a página solicitada.">
      <div v-if="!auth"> 
        <router-link :to="{ name: 'Cadastro', params: {} }">
          <md-button class="md-primary md-raised">Cadastra-se</md-button>
        </router-link>
        <router-link :to="{ name: 'Login', params: {} }">
          <md-button class="md-primary md-raised">Login</md-button>
        </router-link>
      </div>
      <div v-else>
          <h2> O que você estava procurando? </h2>
        <router-link :to="{ name: 'Reembolsos', params: {} }">
          <md-button class="md-primary">Histórico de Solicitações</md-button>
        </router-link>
        <router-link :to="{ name: 'Gastos', params: {} }">
          <md-button class="md-primary">Dashborads de Gastos</md-button>
        </router-link>
        <br>
        <router-link :to="{ name: 'Perfil', params: {} }">
          <md-button class="md-primary">Perfil</md-button>
        </router-link>        
      </div>
    </md-empty-state>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "ReembolsoAzul",
    user: null
  }),
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.$store.commit("changeTitle", this.title);
    this.user = this.$store.getters.user;
  }
};
</script>
