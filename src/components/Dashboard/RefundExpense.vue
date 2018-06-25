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
        <md-table-row v-if="refunds.length == 0" slot="md-table-row" md-selectable="multiple" md-auto-select>
         <md-table-cell class="empty-line" >Nenhum gasto encontrado</md-table-cell>
       </md-table-row> 
        <app-reembolso v-for="refund in refunds" :key="refund.id" :refund="refund"></app-reembolso>
      </md-table>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import Reembolso from "./RefundExpenseItem.vue";
import RefundExpenseGraph from "./refundExpenseGraph.vue";

export default {
  name: "TableCard",
  data() {
    return {
      title: "Dashboard Gastos",
      refunds: this.refunds || []
    };
  },
  methods: {
    getSpentForUser() {
      axios
        .get("/reembolso/spent/" + this.company)
        .then(res => this.refundsAdapter(res.data))
        .catch(error => console.error(error));
    },
    getValues(grouping) {
      return Object.values(grouping);
    },
    refundsAdapter(refunds) {
      this.refunds = this.getValues(refunds.reduce(this.groupByEmail, {}));
    },
    groupByEmail(groups, refund) {
      refund.value = parseFloat(refund.value);
      if (!groups[refund.email]) {
        groups[refund.email] = refund;
        return groups;
      }
      groups[refund.email].value += refund.value;
      return groups;
    }
  },
  components: {
    appReembolso: Reembolso,
    refundExpenseGraph: RefundExpenseGraph
  },
  created() {
    this.$store.commit("changeTitle", this.title);
    this.getSpentForUser();
  },
  computed: {
    company() {
      return this.$store.getters.company;
    }
  }
};
</script>


<style lang="scss" scoped>
.empty-line {
  text-align: center;
}
</style>