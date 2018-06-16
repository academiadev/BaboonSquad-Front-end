<template>
  <div id='App'>
    <appnavbar v-show="this.$store.getters.isAuthenticated"></appnavbar>
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
