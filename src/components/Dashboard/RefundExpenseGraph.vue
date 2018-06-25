<template>
  <div id="app">
    <line-chart :data="refunds" :max="max" legend="bottom" :curve="false" prefix="R$" :library="{animation: {duration: 1000}}">
    </line-chart>
  </div>
</template>
  
<script>
import axios from '@/axios-auth';

export default {
  data() {            
    return {
      refunds: [{
    "name": "Transporte",
    "data": {
        "2017-01-02": "344",
        "2017-05-24": "183",
        "2017-05-26": "173",
        "2017-06-22": "346",
        "2017-07-28": "215"
    }
}, {
    "name": "Alimentação",
    "data": {
        "2017-01-01": "289",
        "2017-01-31": "287",
        "2017-02-01": "238",
        "2017-05-05": "170"
    }
}, {
    "name": "Hospedagem",
    "data": {
        "2017-01-04": "69",
        "2017-05-07": "41",
        "2017-06-22": "259",
        "2017-06-27": "216"
    }
}, {
    "name": "Outros",
    "data": {}
}],
      max: 500,
      count: 0
    };
  },
  created (){
      this.fetchData();
  },
  methods: {
    fetchData(){
      var config = {
        headers: { 'Authorization': 'Bearer ' + this.$store.getters.idToken }
      };
      axios.get('/reembolso/listaReembolsosCategoria/', config)
        .then(res => {
            this.refunds = [{
    "name": "Transporte",
    "data": {
        "01-01-2017": "344.15",
        "24-05-2017": "183.62",
        "26-05-2017": "173.59",
        "22-06-2017": "346.60",
        "28-07-2017": "215.67",
        "18-09-2017": "114.78",
        "02-11-2017": "404.53",
        "09-11-2017": "11.83",
        "01-12-2017": "206.29",
        "23-12-2017": "88.69"
    }
}, {
    "name": "Alimentação",
    "data": {
        "01-01-2017": "289.01",
        "31-01-2017": "287.72",
        "01-02-2017": "238.73",
        "05-05-2017": "170.62",
        "25-08-2017": "140.66",
        "13-09-2017": "264.38",
        "27-09-2017": "446.92",
        "04-10-2017": "481.11",
        "29-10-2017": "175.99"
    }
}, {
    "name": "Hospedagem",
    "data": {
        "01-01-2017": "69.48",
        "05-07-2017": "41.26",
        "22-08-2017": "259.37",
        "22-09-2017": "216.00",
        "12-10-2017": "474.64",
        "14-10-2017": "391.43",
        "22-10-2017": "426.45",
        "19-12-2017": "104.75",
        "24-12-2017": "426.51"
    }
}, {
    "name": "Outros",
    "data": {}
}];
            console.log(this.refunds);
        })
        .catch(error => console.error(error))
    },
    refundAdapter(refunds) {
      const data = [];

      for(let category in refunds){
        let values = {};
        
          for (let refund of refunds[category])
            values[refund.date] = refund.value;

        let graphs = {};
        graphs.name = category;
        graphs.data = values;

        data.push(graphs);
      }
      return data;
    }
  }
};
</script>