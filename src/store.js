import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'

import router from './router/index'
import { resolve } from 'path';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: "ReembolsoAzul",
    idToken: null,
    user: null,
    userId: null,
    email: null,
    company: null,
    isAdmin: false,
    refundCategory: ["Outros", "Hospedagem", "Transporte", "Alimentação"],
    erro: null,
    redefinePassword: false
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ state.idToken;

      var base64Url = state.idToken.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var payload = JSON.parse(window.atob(base64));
      console.log(payload)
      state.user = payload.user,
      state.userId = payload.userId,
      state.email = payload.sub,
      state.company = payload.company,
      state.isAdmin = payload.isAdmin
    },
    changeTitle(state, title) {
      state.title = title
    },
    clearAuthData(state) {
      state.idToken = null;
      state.user = null;
      state.userId = null;
      state.emai = null;
      state.company = null;
      state.isAdmin = false;
      axios.defaults.headers.common['Authorization'] = '';
    },
    clearErroData(state){
      state.erro = null;
    }
  },

  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    setError({commit}, error){
      this.state.erro = error
    },
    setRedefinePassword({commit}, redefinePassword){
      this.state.redefinePassword = redefinePassword,
      console.log(this.state.redefinePassword);

    },
    save({commit, dispatch}, form){
      commit('clearAuthData'),
      commit('clearErroData'),
      axios.post('pessoa/gravar',{
        name: form.name,
        email: form.email,
        password: form.password,
        typePermission: form.typePermission,
        company: form.company
      })
        .then(res => {
          console.log(res)
          dispatch('login', {email: form.email, password: form.password, returnSecureToken: true } )
          this.$route.replace("/reembolsos")
        })
        .catch(
          error => 
          dispatch('setError',error.response.data)
        )

    },
    alter({commit, dispatch}, form){
      commit('clearAuthData'),
      commit('clearErroData'),
      axios.post('pessoa/alterar',{
        name: form.name,
        newEmail: form.newEmail,
        email: form.email
      })
        .then(res => {
          console.log(res)
          const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000)
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('expirationDate', expirationDate)
          console.log(1)
          commit('authUser', {
            token: res.data.access_token,
            userId: res.data.localId
          })

          dispatch('setLogoutTimer', res.data.expiresIn)

          router.replace('../');
        })
        .catch(
          error =>{ 
          dispatch('setError',error)
        })
    },
    login({ commit, dispatch }, authData) {
      commit('clearErroData'),
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
            token: res.data.access_token,
            userId: res.data.localId
          })
          dispatch('setLogoutTimer', res.data.expiresIn),
          console.log(this.getters.isAuthenticated),
          window.location.replace('/')
        })
        .catch(
          error =>{ 
          console.log(error.response.data)
          if(error.response.data.status == 500){
            error.response.data.message = "Usuário ou Senha incorretas"
          }
          dispatch('setError',error.response.data)
        })
    },
    requestRedefinePassword({commit, dispatch}, form){
      axios.post('/password/request', {
        email: form.email,
      }).then(res =>{
        router.replace('/password/message/'+form.email)
      })
      .catch(error => console.log(error))
    },
    redefinePassword({commit, dispatch}, data){
      axios.post('/password/alter', {
        newPassword: data.password,
        code: data.code,
        emailUser: data.emailUser
      }).then(res =>{
        console.log(res)
        router.replace('../')

      })
      .catch(error => console.log(error))
    },
    getUsedPassword({commit, dispatch}, code){
      axios.get('/password/new/' + code).then(res =>{
        console.log(res),
        dispatch('setRedefinePassword', res.data)
      })
      .catch(error => console.log(error))
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
      router.push('/login')
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    userId(state) {
      return state.userId
    },
    email(state) {
      return state.email
    },
    token(state) {
      return state.idToken;
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
    erro(state){
      return state.erro
    },
    redefinePassword(state){
      return state.redefinePassword
    }
  }
})
