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
      data: this.values,
      max: 50,
      count: 0
    };
  },
  created() {
    this.$store
      .dispatch("getRefundExpense")
      .then(res => {
        // console.log("1", res.refounds);

        // this.values = res.data.map(element => {
        //   this.state = {};
        //   this.state.data[res.date] = res.value;
        //   this.state.nome = res.category;

        //   return this.state;
        // });

        // console.log("2", this.values);
      })
      .catch(res => console.log(res));
  }
};
</script>