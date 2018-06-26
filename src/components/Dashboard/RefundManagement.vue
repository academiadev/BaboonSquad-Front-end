<template>
  <div>
    <div class="container md-alignment-top-center">
      <div v-if="auth" >
        <div class="actions" v-if="isAdmin">
          <md-button :disabled="(!hasSelected || hasAproved)" @click="changeStatus('approved')" class="md-raised md-primary">Aprovar</md-button>
          <md-button :disabled="(hasAproved)" @click="changeStatus('rejected')" class="md-raised md-accent">Recusar</md-button>
        </div>
        <div class="actions" v-else>
          <md-button @click="editRefund" :disabled="(hasAproved)" class="md-raised md-primary">Editar</md-button>
          <md-button @click="deleteRefunds" :disabled="!(hasSelected)" class="md-raised md-accent">Excluir</md-button>
        </div>  
      </div>
      <div>
        <md-table md-card class="md-alignment-center reembolso-tabela" ref="form" v-model="searched" @md-selected="onSelect" :md-selected-value.sync="selected">
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">Reembolsos</h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Procure pelo nome do reembolso..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="Nenhum reembolso cadastrado"
            :md-description="textEmptyState">
            <md-button v-if="!isAdmin" class="md-primary md-raised" @click="showEdit = true">Novo Reembolso</md-button>
          </md-table-empty-state>
  
          <md-table-row slot="md-table-row" id="option" slot-scope="{item}" md-selectable="multiple" md-auto-select>
          <md-table-cell md-label="Nome"  md-sort-by="name">{{item.name}}</md-table-cell>
          <md-table-cell md-label="Status" md-sort-by="status"><refund-status :status="item.status"></refund-status></md-table-cell>
          <md-table-cell md-label="Valor" md-sort-by="value">R${{item.value}}</md-table-cell>
          <md-table-cell md-label="Categoria" md-sort-by="category"><refund-category :category="item.category"></refund-category></md-table-cell>
          <md-table-cell md-label="Usuário" md-sort-by="name" v-if="isAdmin">{{item.userName}}</md-table-cell></md-table-row>
        </md-table>
      </div>
    </div>
    <md-button v-if="!isAdmin" class="md-fab md-primary botao-reembolso" @click="insertRefund">
      <md-icon>add</md-icon>      
    </md-button>

    <md-dialog :md-active.sync="showEdit">
      <refund-edit :refund="refundEdit" @CloseRefundItem="getRefunds"></refund-edit>
    </md-dialog>

  </div>
</template>

<script>
function orderNumbers(a, b) {
  return a - b;
}

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  return !term
    ? items
    : items.filter(item => toLower(item.name).includes(toLower(term)));
};

import axios from "@/axios-auth";
import Status from "./RefundStatus.vue";
import Category from "./RefundCategory.vue";
import RefundManagementItemEdit from "./RefundManagementItemEdit.vue";

export default {
  data() {
    return {
      name: "Reembolso ContaAzul",
      showEdit: false,
      usersId: null,
      search: null,
      searched: [],
      selected: [],
      refunds: [],
      refundEdit: null
    };
  },
  methods: {
    onSelect(items) {
      this.refundEdit = items[0];
      this.selected = items;
    },
    deleteRefunds() {
      const formData = this.listRefundsId;

      axios
        .delete("reembolso/delete", { data: formData })
        .then(res => this.getRefunds())
        .catch(error => console.error(error));
    },
    insertRefund() {
      this.refundEdit = null;
      this.showEdit = true;
    },
    editRefund() {
      this.showEdit = true;
    },
    changeStatus(refundStatus) {
      const formData = this.listRefundsId;
      axios
        .put("reembolso/changeStatus/" + refundStatus, formData)
        .then(res => {
          this.$router.push("/reembolsos");
          this.getRefundsByUser();
        })
        .catch(error => console.error(error));
    },
    searchOnTable() {
      if (this.search && this.search.trim()) {
        this.searched = searchByName(this.refunds, this.search);
      } else {
        this.search = null;
        this.searched = this.refunds;
      }
    },
    getRefundsByUser() {
      axios
        .get("/reembolso/usuario/" + this.usersId + "/visible")
        .then(res =>
          this.attrResData(
            res.data.filter(refundData => refundData.showForUser)
          )
        )
        .catch(error => console.error(error));
    },
    getRefundsByCompany() {
      axios
        .get("/reembolso/empresa/" + this.company)
        .then(res => this.attrResData(res.data))
        .catch(error => console.error(error));
    },
    clearOptions() {
      const clearRecursiveComponent = item => {
        if (item.$el.id == "option") item.isSelected = false;

        for (var child of item.$children) clearRecursiveComponent(child);
      };

      clearRecursiveComponent(this.$refs["form"]);
    },
    resetSomeData() {
      this.showEdit = false;
      this.search = null;
      this.selected = [];
      this.refundEdit = null;
      this.clearOptions();
    },
    attrResData(data) {
      this.refunds = data;
      this.searched = this.refunds;
      this.resetSomeData();
    },
    getRefunds() {
      if (this.isAdmin) {
        this.getRefundsByCompany();
      } else {
        this.getRefundsByUser();
      }

      this.showEdit = false;
    }
  },
  computed: {
    listRefundsId() {
      return this.selected.map(refund => {
        return { id: refund.id };
      });
    },
    hasSelected() {
      return this.selected[0] != null;
    },
    hasAproved() {
      if (!this.hasSelected) return true;

      return this.selected.some(refundSelected => refundSelected.status == 0);
    },
    textEmptyState() {
      if (this.search == null) {
        if (this.isAdmin) return "Nenhuma solicitação de reeembolso";
        return "Cadastre um novo reembolso no botão abaixo.";
      }
      return (
        "Não encontramos nenhum reembolso que contenha no nome " +
        this.search +
        ". Tente procurar por um nome diferente ou então crie um novo reembolso."
      );
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    company() {
      return this.$store.getters.company;
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    userId() {
      return this.$store.getters.userId;
    },
    category() {
      return this.$store.getters.refundCategory;
    }
  },
  components: {
    "refund-category": Category,
    "refund-status": Status,
    "refund-edit": RefundManagementItemEdit
  },
  created() {
    this.$store.commit("changeTitle", this.name);
    this.usersId = this.$store.getters.userId;
    this.getRefunds();
  }
};
</script>

<style>
.md-select-menu {
  z-index: 100;
}

.reembolso-tabela {
  width: 610px;
  border-radius: 3px;
  background-color: #ffffff;
  margin-top: 2%;
}

.container {
  width: 610px;
  margin: 0 auto;
  margin-top: 5%;
}

div.actions {
  float: left;
}

.botao-reembolso {
  position: fixed;
  right: 0;
  margin-right: 35px;
  top: 87%;
}
</style>