import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Login from '@/components/Auth/Login.vue'
import Cadastro from '@/components/Auth/Cadastro.vue'
import Perfil from '@/components/User/Perfil.vue'
import Gastos from '@/components/Dashboard/Gastos.vue'
import Reembolsos from '@/components/Dashboard/Reembolsos.vue'
import DadosReembolso from '@/components/Dashboard/DadosReembolso.vue'
import RedefinirSenha from '@/components/password/RedefinirSenha.vue'
import NovaSenha from '@/components/password/NovaSenha.vue'
import MessageRedefine from '@/components/password/MessageRedefine.vue'


import store from '../store'

Vue.use(Router)

const routers = new Router({
  mode: 'history',
  routers
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
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
      component: Gastos,
      beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
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
      path: '/password/redefinirsenha',
      name: 'RedefinirSenha',
      component: RedefinirSenha
    },
    {
      path: '/password/novasenha',
      name: 'NovaSenha',
      component: NovaSenha
    },
    {
      path: '/password/message',
      name: 'MessageRedefine',
      component: MessageRedefine
    }
  ]
})
