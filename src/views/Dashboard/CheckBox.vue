<template>
  <div>
    <b-form-checkbox
        id="checkbox-1"
        v-model="checked"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
    >
      I accept the terms and use
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "check-box",
  props:["checked"],
  watch:{
    checked: function(newVal){
      this.checked = newVal
    }
  },

}
</script>

<style scoped>

</style>