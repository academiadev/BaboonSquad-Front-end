<template>
  <div id="app">
    <line-chart :data="refunds" legend="top" :curve="true" prefix="R$">
    </line-chart>
  </div>
</template>
  
<script>
import axios from '@/axios-auth';

export default {
  data() {            
    return {
      refunds: this.refunds || [],
      count: 0
    };
  },
  created (){
      this.fetchData();
  },
  methods: {
    fetchData(){
      const userId = this.$store.getters.userId;
      axios.get('/reembolso/listaReembolsosCategoria/'+ parseInt(userId))
        .then(res => {
            this.refunds = this.refundAdapter(res.data);
        })
        .catch(error => console.error(error))
    },
    convertDate(dateStr) {
        dateStr.date = new Date(dateStr.date);
        return dateStr;
    },
    orderByDate(a, b){
      return a.date.getMonth() - b.date.getMonth();
    },
    groupByMonth(groups, refund) {
      const month = refund.date.getShortMonthName();
      
      if (!groups[month]) {
        groups[month] = 0;
      }

      groups[month] += parseFloat(refund.value);

      return groups;
    },
    getRefundData(refunds) {
      return refunds
        .map(this.convertDate)
        .sort(this.orderByDate)
        .reduce(this.groupByMonth, {});
    },
    refundAdapter(refunds) {
      return Object.keys(refunds).map(key => {
        return {
          name: key,
          data: this.getRefundData(refunds[key])
        };
      });
    }
  }
};
</script>