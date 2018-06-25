<template>
  <div>
    <div class="container">
      <div v-if="auth">
        <div v-if="isAdmin">
          <md-button :disabled="!(hasSelected)" @click="changeStatus('approved')" class="md-raised md-primary">Aprovar</md-button>
          <md-button :disabled="hasAproved" @click="changeStatus('reject')" class="md-raised md-accent">Recusar</md-button>
          <md-button @click="editRefund" :disabled="hasAproved" class="md-raised md-primary">Editar</md-button>
          <md-button @click="deleteRefunds" :disabled="!(hasSelected)" class="md-raised md-accent">Excluir</md-button>
        </div>  
      </div>
      <div>
        <md-table 
            md-card md-selected md-fixed-header 
            class="md-alignment-center reembolso-tabela"
            v-model="searched"
            @md-selected="onSelect"
            :md-selected-value.sync="selected"
            >
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
            <md-button class="md-primary md-raised" @click="showEdit = true">Novo Reembolso</md-button>
          </md-table-empty-state>
  
          <md-table-row 
            slot="md-table-row"
            slot-scope="{ item }"
            md-selectable="multiple"
            md-auto-select
            >
            <md-table-cell
              md-label="Nome"
              md-sort-by="name"> 
                {{item.name}} 
            </md-table-cell>
            <md-table-cell
                 md-label="Status"
                 md-sort-by="status"> 
              <refund-status :status="item.status"></refund-status>
            </md-table-cell>
            <md-table-cell
              md-label="Valor"
              md-sort-by="value"
              >R${{item.value}}
            </md-table-cell>
            <md-table-cell
              md-label="Categoria"
              md-sort-by="category"
              >
              <refund-category :category="item.category"></refund-category>
            </md-table-cell>
            <md-table-cell
              md-label="Usuário"
              md-sort-by="name"
              v-if="isAdmin" 
              >{{item.userName}}
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <md-button v-if="isAdmin" class="md-fab md-primary botao-reembolso" @click="insertRefund">
      <md-icon >add</md-icon>      
    </md-button>

    <md-dialog :md-active.sync="showEdit">
      <refund-edit :refund="refundEdit" @CloseRefundItem="getRefundsByUser"></refund-edit>
    </md-dialog>

  <div>
    {{ refundEdit}}
  </div>

  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }

  return items;
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
      showInsert: false,
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
        .then(res => {
          console.log(res);
          this.getRefundsByUser();
        })
        .catch(error => console.log(error));
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
          console.log(res);
          this.$router.push("/reembolsos");
          this.getRefundsByUser;
          s;
        })
        .catch(error => console.log(error));
    },
    searchOnTable() {
      if (this.search.trim()) {
        this.searched = searchByName(this.refunds, this.search);
      } else {
        this.search = null;
        this.searched = this.refunds;
      }
    },
    getRefundsByUser() {
      axios
        .get("/reembolso/usuario/" + this.usersId + "/visible")
        .then(res => {
          console.log(res.data);
          this.refunds = [];
          res.data.forEach(refundData => {
            if (refundData.showForUser == "true") {
              this.refunds.push(refundData);
            }
          });
          this.searched = this.refunds;
          this.showEdit = false;
        })
        .catch(error => console.log(error));
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
    this.getRefundsByUser();
    this.searched = this.refunds;
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

.botao-reembolso {
  position: fixed;
  right: 0;
  margin-right: 35px;
  top: 87%;
}
</style>