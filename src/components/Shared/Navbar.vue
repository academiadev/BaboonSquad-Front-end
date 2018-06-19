<template>
  <div>
  <md-toolbar class="md-primary">
    <md-button class="md-icon-button" @click="showNavigation = true">
      <md-icon>menu</md-icon>
    </md-button>
    <md-button class="md-title" to='/'>{{ title }}</md-button>

    <md-button v-show="isAdmin" class="md-raised">
      <md-icon id="icon-company">filter_none</md-icon>
      {{ company }}
    </md-button>
  </md-toolbar>

  <md-drawer :md-active.sync="showNavigation">
    <md-toolbar md-elevation="0">
      <div  class="md-list-item-text">
        <span id="ca-title"  class="md-title"> Reembolso ContaAzul </span>
        <span id="user-title"  class="md-title">{{ user }}</span>
        <span id="email-title" class="md-title">{{ email }}</span>
      </div>
    </md-toolbar>

    <md-list @click="showNavigation=false">
      <md-list-item to='/reembolsos'>
        <md-icon>home</md-icon>
        <span class="md-list-item-text">Histórico de Solicitações</span>
      </md-list-item>

      <md-list-item to='/gastos'> 
        <md-icon>dashboard</md-icon>
        <span class="md-list-item-text">Dashboard de Gatos</span>
      </md-list-item>

      <md-list-item to='/perfil'>
          <md-icon>person</md-icon>
          <span class="md-list-item-text">Perfil</span>
      </md-list-item>

      <md-list-item @click="onLogout">
          <md-icon>input</md-icon>
          <span class="md-list-item-text">Sair</span>
      </md-list-item>
    </md-list>
  </md-drawer>
</div>
</template>

<script>
  export default {
    name: 'Navbar',
    data: () => ({
      showNavigation: false
    }),
    computed: {
      title() {
        return this.$store.getters.title 
      },
      user () {
        return this.$store.getters.user 
      },
      isAdmin () {
        return this.$store.getters.isAdmin 
      },
      company () {
        return this.$store.getters.company 
      },
      email () {
        return this.$store.getters.email 
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-container {
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

  .md-content {
    padding: 16px;
  }

  .md-toolbar {
    background: #2687e9;
  }

  #ca-title, #user-title, #email-title {
    color: #fff;
  }

  #icon-company {
    color: #000;
  }
</style>
