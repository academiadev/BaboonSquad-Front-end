<template>

      <md-table-row slot="md-table-row" :slot-scope="refund" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Email" md-sort-by="email">{{ refund.email }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="Nome">{{ refund.userName }}</md-table-cell>
        <md-table-cell md-label="Valor" md-sort-by="valor">{{ refund.value }}</md-table-cell>
       </md-table-row> 
</template>

<script>
  import Status from './RefundStatus.vue';

  export default {
    props: ['refund'],
    components: {
      'status-reembolso': Status
    }
  }
</script>

<style lang="scss" scoped>

</style>
