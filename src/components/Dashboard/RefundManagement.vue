<template>
  <div>
    <div class="container">
      <div v-show="auth">
        <md-button class="md-raised md-primary">Aprovar</md-button>
        <md-button class="md-raised md-accent">Recusar</md-button>
      </div>
      <div>
        <md-table md-card md-selected class="md-alignment-center reembolso-tabela">
          <md-table-row>
            <md-table-head>Reembolso</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Valor</md-table-head>
            <md-table-head>Categoria</md-table-head>
            <md-table-head>Usuário</md-table-head>
          </md-table-row>
            <refund-item
                v-model=refunds 
                v-for="refund in refunds" 
                :refund="refund" 
                :key="refund.id"    
               >
            </refund-item>
        </md-table>
      </div>
    </div>
    <md-button class="md-fab md-primary botao-reembolso" @click="showDialog = true">
      <md-icon >add</md-icon>      
    </md-button>

    <md-dialog :md-active.sync="showDialog">
      <refund-edit></refund-edit>
    </md-dialog>
    
  </div>
</template>

<script>
  import RefundManagementItem from './RefundManagementItem.vue';
  import RefundManagementItemEdit from './RefundManagementItemEdit.vue';
  export default {
    data() {
      return {
      showDialog: false,
      refunds: [
            { id:1, name: "Testanildo", status:1, value: 55, category: 1, user: "rr"},
            { id:2, name: "Testando", status:0, value: 87, category: 3, user: "rr"},
            { id:3, name: "Money", status: 2, value:66.6, category: 0, user: "pancho"}
                ]
            }
           
    },
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    },
    components: {
      'refund-item': RefundManagementItem,
      'refund-edit': RefundManagementItemEdit
    }
  }
</script>

<style>
.md-select-menu {
    z-index: 100;
  } 

.reembolso-tabela{
  width: 610px;
    border-radius: 3px;
  background-color: #ffffff;
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
