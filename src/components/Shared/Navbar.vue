<template>
  <div>
  <md-toolbar class="md-primary">
    <md-button class="md-icon-button" @click="showNavigation = true">
      <md-icon>menu</md-icon>
    </md-button>
    <span class="md-title">ReembolsoAzul</span>
  </md-toolbar>

  <md-drawer :md-active.sync="showNavigation">
    <md-toolbar md-elevation="0">
        <span class="md-title whitetitle">Reembolso ContaAzul</span>
    </md-toolbar>

    <md-list @click="showNavigation=false">
      <md-list-item to='/reembolsos'><md-icon>home</md-icon>Histórico e Solicitações</md-list-item>

      <md-list-item to='/gastos'> <md-icon>dashboard</md-icon>Dashboard de Gatos
      </md-list-item>

      <md-list-item to='/perfil'>
          <md-icon>perm_identity</md-icon>Perfil
      </md-list-item>

      <md-list-item to='/'>
          <md-icon>input</md-icon>Sair
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
    })
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

  .whitetitle {
    color: #fff;
  }
</style>
