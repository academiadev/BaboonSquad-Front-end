<template>
  <div id="app">
    <line-chart :data="data" :max="max" legend="bottom" :curve="false" prefix="R$" :library="{animation: {duration: 1000}}">
    </line-chart>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      data: this.$store.getters.refundsExpenseGraph,
      max: 50,
      count: 0
    };
  },
  created() {
    this.$store.dispatch("getRefundExpense");
  }
};
</script>