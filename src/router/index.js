import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Login from '@/components/Auth/Login.vue'
import Cadastro from '@/components/Auth/Cadastro.vue'
import Perfil from '@/components/User/Perfil.vue'
import RefundExpenses from '@/components/Dashboard/RefundExpense.vue'
import RefundManagement from '@/components/Dashboard/RefundManagement.vue'
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
      component: Login,
      beforeEnter (to, from, next) {
        if (!store.state.idToken) {
          next()
        } else {
          next('/reembolsos')
        }
      }
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro,
      beforeEnter (to, from, next) {
        if (!store.state.idToken) {
          next()
        } else {
          next('/reembolsos')
        }
      }
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil,
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/gastos',
      name: 'Gastos',
      component: RefundExpenses,
      beforeEnter(to, from, next) {
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
      component: RefundManagement,
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
      
    },
    {
      path: '/password/redefinirsenha',
      name: 'RedefinirSenha',
      component: RedefinirSenha,
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/password/novasenha',
      name: 'NovaSenha',
      component: NovaSenha,
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/password/message',
      name: 'MessageRedefine',
      component: MessageRedefine,
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})
