<template>
  <div id='App'>
    <appnavbar v-show="auth"></appnavbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Shared/Navbar.vue';
  export default {
    name: 'App',
    data: () => ({
      showNavigation: false
    }),
    components: {
      appnavbar: Navbar
    },
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    },
    created () {
      this.$store.dispatch('tryAutoLogin')
    }
  }
</script>

<style lang="scss" scoped>
  .page-container {
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

  .md-content {
    padding: 16px;
  }

</style>
