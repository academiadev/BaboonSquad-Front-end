<template>
  <md-table-cell v-if="status===0">
    <md-icon class="green-icon">check_circle</md-icon>
  </md-table-cell>
  <md-table-cell v-else-if="status===1">
    <md-icon class="red-icon" >highlight_off</md-icon>
  </md-table-cell>
  <md-table-cell v-else>
    <md-icon class="yellow-icon">schedule</md-icon>
  </md-table-cell>
</template>

<script>
export default {
  props: ['status']
}
</script >

<style scoped>
 .green-icon {
   color: #c3ff5b;
 }

 .red-icon {
   color: #ff757d;
 }

 .yellow-icon {
   color: #fecf33;
 }
</style>
