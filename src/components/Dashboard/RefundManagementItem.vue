<template>
      <md-table-row slot="md-table-row" :slot-scope="refund" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="refund" md-sort-by="refund">{{ refund.name }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status"><refund-status :status="refund.status"></refund-status></md-table-cell>
        <md-table-cell md-label="Valor" md-sort-by="valor">{{ refund.value }}</md-table-cell>
        <md-table-cell md-label="Categoria" md-sort-by="categoria">{{ refund.category }}</md-table-cell>
        <md-table-cell md-label="User" md-sort-by="user">{{ refund.user }}</md-table-cell> 
      </md-table-row> 
</template>

<script>
  import Status from './RefundStatus.vue';

  export default {
    props: ['refund'],
    components: {
      'refund-status': Status
    }
  }
</script>

<style lang="scss" scoped>

</style>
