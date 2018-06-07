<template>
  <div class="status-icon">
    <div v-if="status===0" >
      <md-icon class="green-icon">check_circle</md-icon>
    </div>
    <div v-else-if="status===1">
      <md-icon class="red-icon" >highlight_off</md-icon>
    </div>
    <div v-else >
      <md-icon class="yellow-icon">schedule</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status'],
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

 .status-icon{
   padding: 0;
   margin: 0;
 }
</style>
