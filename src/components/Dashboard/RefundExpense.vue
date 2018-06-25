<template>
  <div>
    <div>
      <md-empty-state></md-empty-state>
      <md-table class="md-alignment-top-center" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Gastos por Categoria     {{company}}
</h1>
        </md-table-toolbar>
        <refund-expense-graph />
      </md-table>
    </div>
    <div>
      <md-empty-state>
    </md-empty-state>
    </div>
    <div>
      <md-table md-card>
        <md-table-toolbar>
          <h1 class="md-title">Gastos por usuários</h1>
        </md-table-toolbar>

        <!--<app-reembolso v-for="reembolso in reembolsos" :key="reembolso.id" :reembolso="reembolso"></app-reembolso>-->
      </md-table>
    </div>
  </div>
</template>

<script>
  import axios from "@/axios-auth";
  import Reembolso from './RefundExpenseItem.vue';
  import RefundExpenseGraph from './refundExpenseGraph.vue';

  export default {
    name: 'TableCard',
    data() {
      return {
        title: "Dashboard Gastos",
        refunds: this.refunds || [],
        /*reembolsos: [
          {
            id:1,
            email: 'sdubbin0@geocities.com',
            reembolso: 'Melão',
            status: 'A',
            Valor: '20',
            categoria: 'Alimentação',
            user: 'Shawna Dubbin'
          },
          {
            id:2,
            email: 'teste@gmail.com',
            reembolso: 'Abobora',
            status: 'A',
            Valor: '20',
            categoria: 'Alimentação',
            user: 'Shawna Dubbin'
          },
          {
            id:3,
            email: 'cmarietonh@theatlantic.com',
            reembolso: 'Banana',
            status: 'A',
            Valor: '20',
            categoria: 'Alimentação',
            user: 'Shawna Dubbin'
          },
          {
            id:4,
            email: 'sdubbin0@geocities.com',
            reembolso: 'Goiaba',
            status: 'A',
            Valor: '20',
            categoria: 'Alimentação',
            user: 'Clarinda Marieton'
          }
        ]*/
        
      }
      //this.getSpentForUser()
      
    },
    methods: {
      getSpentForUser(){
        axios.get('/reembolso/spent/'+this.company)
        .then( res => { console.log(res.data) })
        .catch(error => { console.error(error) })
      }
    },
    components: {
      appReembolso: Reembolso,
      refundExpenseGraph: RefundExpenseGraph
    },
    created () {
      this.$store.commit('changeTitle', this.title);
      this.getSpentForUser();
      //console.log(this.company);
    },
    computed: {
      company() {
        return this.$store.getters.company;
      }
    }
  }
</script>
