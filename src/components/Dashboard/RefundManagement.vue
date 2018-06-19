<template>
  <div>
    <div class="container">
      <div v-if="auth">
        <div v-if="isAdmin">
          <md-button class="md-raised md-primary">Aprovar</md-button>
          <md-button class="md-raised md-accent">Recusar</md-button>
        </div>
        <div v-else>
          <md-button class="md-raised md-primary">Editar</md-button>
          <md-button class="md-raised md-accent">Excluir</md-button>
        </div>  
      </div>
      <div>
        <md-table 
            md-card md-selected md-fixed-header 
            class="md-alignment-center reembolso-tabela"
            v-model="searched"
            @md-selected="onSelect"
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
            md-label="Nenhum reembolso foi encontrado"
            :md-description="`Não encontramos nenhum reembolso que contenha no nome '${search}'. 
                              Tente procurar por um nome diferente ou então crie um novo reembolso.`">
            <md-button class="md-primary md-raised" @click="showDialog = true">Novo Reembolso</md-button>
          </md-table-empty-state>
          <md-table-row 
            slot="md-table-row"
            slot-scope="{ item }"
            md-selectable="multiple"
            md-auto-select
            >
            <md-table-cell
              md-label="Reembolso"
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
              >{{item.value}}
            </md-table-cell>
            <md-table-cell
              md-label="Categoria"
              md-sort-by="category"
              >
              <refund-category :category="item.category"></refund-category>
            </md-table-cell>
            <md-table-cell
              md-label="Usuário"
              md-sort-by="user"
              >{{item.user}}
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <md-button v-if="!isAdmin" class="md-fab md-primary botao-reembolso" @click="showDialog = true">
      <md-icon >add</md-icon>      
    </md-button>

    <md-dialog :md-active.sync="showDialog">
      <refund-edit :refund="selected[0]"></refund-edit>
    </md-dialog>
    
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }
  import Status from './RefundStatus.vue';
  import Category from './RefundCategory.vue';
  import RefundManagementItemEdit from './RefundManagementItemEdit.vue';
  export default {
    data() {
      return {
      name: "Reembolso ContaAzul",  
      showDialog: false,
      search: null,
      searched: [],
      selected: [],
      refunds: [
            { id:1, name: "Testanildo", status:1, value: 55, category: 1, date: "13/04/2018", user: "rr"},
            { id:2, name: "Testando", status:0, value: 87, category: 3, date: "20/07/2018", user: "rr"},
            { id:3, name: "Money", status: 2, value:66.6, category: 0, date: "26/03/2018", user: "pancho"}
                ]
            }
           
    },
    methods: {
      onSelect (items) {
        this.selected = items
      },
      searchOnTable () {
        if (this.search.trim()){
          this.searched = searchByName(this.refunds, this.search)  
        }else{
          this.searched = this.refunds
        }
      }
    },
    computed: {
      isAdmin () {
        return this.$store.getters.isAdmin 
      },
      auth () {
        return this.$store.getters.isAuthenticated
      },
      category( ) {
        return this.$store.getters.refundCategory
      }
    },
    components: {
      'refund-category': Category,
      'refund-status': Status,
      'refund-edit': RefundManagementItemEdit
    },
    created () {
      this.$store.commit('changeTitle', this.name)
      this.searched = this.refunds
    }
  }
</script>

<style>
.md-select-menu {
    z-index: 100;
  } 

.reembolso-tabela{
  width: 610px;
    border-radius: 3px;
  background-color: #ffffff;
  margin-top: 2%;
}

.container{
  width: 610px;
  margin: 0 auto;
  margin-top: 5%;

}

 .botao-reembolso{
   position: fixed;
   right: 0;
   margin-right:35px;
   top: 87%;
 }
</style>
