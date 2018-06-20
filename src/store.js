import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: "ReembolsoAzul",
    idToken: null,
    user: null,
    email: null,
    company: null,
    isAdmin: false,
    refundCategory: ["Outros", "Hospedagem", "Transporte", "Alimentação"],
    refundsExpenseGraph: [],
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token

      var base64Url = state.idToken.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var payload = JSON.parse(window.atob(base64));

      state.user = payload.name,
        state.email = payload.email,
        state.company = payload.company,
        state.isAdmin = payload.isAdmin
    },
    changeTitle(state, title) {
      state.title = title
    },
    clearAuthData(state) {
      state.idToken = null;
      state.user = null;
      emai = null;
      company = null;
      isAdmin = false;
    },
    setRefunds(state, data) {
      state.refundsExpenseGraph = data;
    },
  },

  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    save({ commit, dispatch }, form) {
      axios.post('pessoa/gravar', {
        name: form.name,
        email: form.email,
        password: form.password,
        typePermission: form.typePermission,
        company: form.company
      })
        .then(res => {
          console.log(res)
        })

        .catch(error => console.log(error))
    },
    getRefundByUser() {
      axios.get('reembolso/')
    },
    login({ commit, dispatch }, authData) {
      axios.post('auth/login', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000)
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.idToken,
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/')

        })
        .catch(error => console.log(error))
    },
    redefinePassword({ commit, dispatch }, form) {
      axios.post('/password/request', {
        email: form.email,
      }).then(res => {
        console.log(res)

      })
        .catch(error => console.log(error))
      router.replace('/password/message')
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      commit('authUser', {
        token: token
      })
    },
    logout({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      router.replace('/login')
    },
    getRefundExpense({ commit, state }) {
      console.log('aa', 'Bearer ' + state.idToken);
      var config = {
        headers: { 'Authorization': 'Bearer ' + state.idToken }
      };
      axios.get('/reembolso/listaReembolsosCategoria/', config)
        .then(res => {
          console.log(res);
          //ver o que veio de retorno e passar pro setRefounds atualizar o grafico
          commit('setRefunds', res)
        })
        .catch(error => console.error(error))
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    email(state) {
      return state.email
    },
    company(state) {
      return state.company
    },
    isAdmin(state) {
      return state.isAdmin
    },
    title(state) {
      return state.title
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    refundCategory(state) {
      return state.refundCategory
    },
    refundsExpenseGraph(state) {
      return state.refundsExpenseGraph
    }
  }
})
