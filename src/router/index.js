import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Cadastro from '@/components/Cadastro.vue'
import Perfil from '@/components/Perfil.vue'
import Gastos from '@/components/Dashboard/Gastos.vue'
import Reembolsos from '@/components/Dashboard/Reembolsos.vue'
import DadosReembolso from '@/components/Dashboard/DadosReembolso.vue'
import RedefinirSenha from '@/components/RedefinirSenha.vue'
import NovaSenha from '@/components/NovaSenha.vue'

Vue.use(Router)

const routers = new Router({
  mode: 'history',
  routers
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/gastos',
      name: 'Gastos',
      component: Gastos
    },
    {
      path: '/reembolsos',
      name: 'Reembolsos',
      component: Reembolsos
    },
    {
      path: '/reembolsos/dados',
      name: 'DadosReembolso',
      component: DadosReembolso
    },
    {
      path: '/redefinirsenha',
      name: 'RedefinirSenha',
      component: RedefinirSenha
    },
    {
      path: '/novasenha',
      name: 'NovaSenha',
      component: NovaSenha
    }
  ]
})
