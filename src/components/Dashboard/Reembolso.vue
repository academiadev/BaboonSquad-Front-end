<template>
  <div>
      <md-table-row slot="md-table-row" slot-scope="{ reembolso }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Email" md-sort-by="email">{{ reembolso.email }}</md-table-cell>
        <md-table-cell md-label="Reembolso" md-sort-by="Reembolso">{{ reembolso.nome }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status">{{ reembolso.status }}</md-table-cell>
        <md-table-cell md-label="Valor" md-sort-by="valor">{{ reembolso.valor }}</md-table-cell>
        <md-table-cell md-label="Categoria" md-sort-by="categoria">{{ reembolso.categoria }}</md-table-cell>
        <md-table-cell md-label="User" md-sort-by="user">{{ reembolso.user }}</md-table-cell>
      </md-table-row>
  </div>
</template>

<script>
  export default {
    props: ['reembolso']
  }
</script>

<style lang="scss" scoped>

</style>
