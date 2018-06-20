<template>
  <div class="status-icon"> 
    <div v-if="status===0" >
      <md-icon id="icon-ok">check_circle</md-icon>
    </div>
    <div v-else-if="status===1">
      <md-icon id="icon-cancel" >cancel</md-icon>
    </div>
    <div v-else >
      <md-icon id="icon-wait">watch_later</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status'],
}
</script >

<style lang="scss" scoped>

  #icon-ok {
   color: #1db817;
 }

  #icon-cancel {
   color: #bb242b;
 }

  #icon-wait{
   color: #eca409dc;
 }

</style>
