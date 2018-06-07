<template>
  <div>
    <div>
      <md-button class="md-raised md-primary">Aprovar</md-button>
      <md-button class="md-raised md-accent">Recusar</md-button>
    </div>
    <div>
    <md-table md-card class="md-alignment-center">
      <reembolso v-for="reembolso in reembolsos" :reembolso="reembolso" :key="reembolso.id"></reembolso>
    </md-table>
  </div>
  <md-button class="md-fab md-primary">
    <md-icon>add</md-icon>
  </md-button>
  </div>
</template>

<script>
  import Reembolso from './Reembolso.vue';
  export default {
    data() {
      return {
      reembolsos: [
            { id:1, email: "gg", nome: "Testanildo", status:1, valor: 55, categoria: 1, user: "rr"},
            { id:2, email: "yyy", nome: "Testando", tatus:0, valor: 87, categoria: 3, user: "rr"},
                ]
            }
    },
    components: {
      reembolso: Reembolso
    }
  }
</script>
