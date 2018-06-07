<template>
  <div>
    <div>
      <md-empty-state></md-empty-state>
      <md-table class="md-alignment-top-center" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Gastos por Categoria</h1>
        </md-table-toolbar>

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

        <app-reembolso v-for="reembolso in reembolsos" :key="reembolso.id" :reembolso="reembolso"></app-reembolso>

      </md-table>
    </div>
  </div>
</template>

<script>
  import Reembolso from './Reembolso.vue';
  export default {
    name: 'TableCard',
    data() {
      return {
        reembolsos: [
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
        ]
      }
    },
    components: {
      appReembolso: Reembolso
    }
  }
</script>
