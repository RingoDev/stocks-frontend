<template>
<p>Logging you out</p>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({path: '/login'})
        }).catch(error => {
      // eslint-disable-next-line
      console.log(error);
    })
  },
}
</script>

<style scoped>

</style>