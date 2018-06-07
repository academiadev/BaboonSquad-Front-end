<template>
  <div>
    <div class="container">
      <div>
        <md-button class="md-raised md-primary">Aprovar</md-button>
        <md-button class="md-raised md-accent">Recusar</md-button>
      </div>
      <div>
        <md-table md-card class="md-alignment-center reembolso-tabela">
          <md-table-row>
            <md-table-head>Reembolso</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Valor</md-table-head>
            <md-table-head>Categoria</md-table-head>
            <md-table-head>Usuário</md-table-head>
          </md-table-row>
          <reembolso v-for="reembolso in reembolsos" :reembolso="reembolso" :key="reembolso.id"></reembolso>
        </md-table>
      </div>
    </div>
    <md-button class="md-fab md-primary botao-reembolso" @click="showDialog = true">
      <md-icon >add</md-icon>      
    </md-button>
    <div class="modal">  
    </div>
   <template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <cadastro-reembolsos></cadastro-reembolsos>
    </md-dialog>
  </div>
</template>
    
  </div>
</template>

<script>
  import Reembolso from './Reembolso.vue';
  import DadosReembolso from './DadosReembolso.vue';
  export default {
    data() {
      return {
      showDialog: false,
      reembolsos: [
            { id:1, email: "gg", nome: "Testanildo", status:1, valor: 55, categoria: 1, user: "rr"},
            { id:2, email: "yyy", nome: "Testando", status:0, valor: 87, categoria: 3, user: "rr"},
                ]
            }
           
    },
    components: {
      'reembolso': Reembolso,
      'cadastro-reembolsos': DadosReembolso
    },
    methods: {
      modal(){
        alert("abriu modal");
      }    
    },
    name: 'DialogPrompt',
   
  }
</script>
<style>

.reembolso-tabela{
  width: 610px;
    border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  box-shadow: 0 2px 5px 0 var(--black-26);
  margin-top: 2%;
}

.container{
  width: 610px;
  margin: 0 auto;
  margin-top: 5%;

}

.botao-reembolso{
  position: fixed;
  right: 0;
  margin-right:35px;
  top: 87%;
}
</style>
