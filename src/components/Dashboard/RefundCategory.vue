<template>
  <div > 
    {{this.refundCategory[this.category] }}
  </div>
</template>

<script>
export default {
  props: ['category'],
  computed: {
    refundCategory( ) {
        return this.$store.getters.refundCategory;
        }        
    }
}
</script >