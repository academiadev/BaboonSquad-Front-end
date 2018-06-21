<template>
 <div>
    <md-empty-state></md-empty-state>
    <md-card  class="md-layout-item md-size-35 md-small-size-100">
      <md-card-header>
        <div class="md-title">E-mail de redefinição de senha enviado!</div>
      </md-card-header>
      <md-card-content>
          <p class="mensagem-email">Um link para redefinir sua senha foi enviado para o e-mail: {{ $route.params.email }} </p>
      </md-card-content>
      <md-card-actions>
        <md-button to="../">Inicio</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
 

  export default {
  
  }
</script>

<style lang="scss" scoped>

  //Global
  .md-card-header {
  	background: #2687e9;
  	color: #fff;
  }

  .md-card {
    margin: 0 auto;
  }

  .md-card-content{
  	padding-left: 20px;
  	padding-right: 20px;
    padding-top: 20px;
  }

  .mensagem-email{
    font-size: 22px;
  }

</style>
