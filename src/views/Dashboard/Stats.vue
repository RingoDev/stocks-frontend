<template>
  <b-row>
    <b-col xl="3" md="6">
      <stats-card title="Total Value"
                  type="gradient-red"
                  :sub-title="getTotal"
                  icon="ni ni-money-coins"
                  class="mb-4">

        <template slot="footer">
          <span :class="getSuccess(this.getPercentSinceBuyIn)">{{this.getPercentSinceBuyIn}}%</span>
          <span class="text-nowrap">From Buy Value</span>
        </template>
      </stats-card>
    </b-col>
    <b-col xl="3" md="6">
      <stats-card title="Since Last Month"
                  type="gradient-orange"
                  :sub-title="this.getMonthTotal"
                  icon="ni ni-chart-pie-35"
                  class="mb-4">

        <template slot="footer">
          <span :class="getSuccess(this.getPercentForMonth)">{{ this.getPercentForMonth }}%</span>
          <span class="text-nowrap"></span>

        </template>
      </stats-card>
    </b-col>
    <b-col xl="3" md="6">
      <stats-card title="Since Last Week"
                  type="gradient-green"
                  :sub-title="this.getWeekTotal"
                  icon="ni ni-money-coins"
                  class="mb-4">

        <template slot="footer">
          <span :class="getSuccess(this.getPercentForWeek)">{{this.getPercentForWeek}}%</span>
          <span class="text-nowrap">Since last week</span>
        </template>
      </stats-card>

    </b-col>
<!--    <b-col xl="3" md="6">-->
<!--      <stats-card title="Performance"-->
<!--                  type="gradient-info"-->
<!--                  sub-title="49,65%"-->
<!--                  icon="ni ni-chart-bar-32"-->
<!--                  class="mb-4">-->

<!--        <template slot="footer">-->
<!--          <span class="text-success mr-2">54.8%</span>-->
<!--          <span class="text-nowrap">Since last month</span>-->
<!--        </template>-->
<!--      </stats-card>-->
<!--    </b-col>-->
  </b-row>
</template>

<script>
export default {
  name: "stats",
  methods:{
    getSuccess(value) {
      let str = ''
      if (value >= 0) str = "success"
      else str = "danger"
      return "text-" + str + " mr-2"

    }

  },
  computed: {
    getPercentSinceBuyIn(){
      const pos = this.$store.getters.getLocalPositions;

      let sum = 0;
      let oldSum = 0;
      for (let i = 0; i < pos.length; i++) {
        if (pos[i].checked) {
          sum += pos[i].history.values[0];
          oldSum += pos[i].buyValue;
        }
      }
      if(sum === 0 || oldSum === 0) return 0.00
      return Math.round(((sum - oldSum) / oldSum) * 10000) / 100
    },
    getMonthTotal(){
      const pos = this.$store.getters.getLocalPositions;

      let sum = 0;
      let oldSum = 0;
      for (let i = 0; i < pos.length; i++) {
        if (pos[i].checked) {
          sum += pos[i].history.values[0];
          oldSum += pos[i].history.values[pos[i].history.values.length - 1];
        }
      }

      return (Math.round((sum - oldSum) * 100) / 100).toString() + ' $'

    },
    getTotal() {
      const pos = this.$store.getters.getLocalPositions;

      let sum = 0;
      for (let i = 0; i < pos.length; i++) {
        if (pos[i].checked) sum += pos[i].currentValue;
      }

      sum = sum.toString() + " $"
      return sum
    },
    getWeekTotal(){
      const pos = this.$store.getters.getLocalPositions
      let sum = 0;
      let oldSum = 0;
      for (let i = 0; i < pos.length; i++) {
        if (pos[i].checked) {
          sum += pos[i].history.values[0];
          oldSum += pos[i].history.values[5];
        }
      }
      return (Math.round((sum - oldSum) * 100) / 100).toString() + ' $'
    },
    getPercentForMonth() {
      const pos = this.$store.getters.getLocalPositions
      let sum = 0;
      let oldSum = 0;
      for (let i = 0; i < pos.length; i++) {
        if (pos[i].checked) {
          sum += pos[i].history.values[0];
          oldSum += pos[i].history.values[pos[i].history.values.length - 1];
        }
      }
      if(sum === 0 || oldSum === 0) return 0.00
      return Math.round(((sum - oldSum) / oldSum) * 10000) / 100
    },
    getPercentForWeek(){
      const pos = this.$store.getters.getLocalPositions
      let sum = 0;
      let oldSum = 0;
      for (let i = 0; i < pos.length; i++) {
        if (pos[i].checked) {
          sum += pos[i].history.values[0];
          oldSum += pos[i].history.values[5];
        }
      }
      if(sum === 0 || oldSum === 0) return 0.00
      return Math.round(((sum - oldSum) / oldSum) * 10000) / 100
    },
  },

}
</script>

<style scoped>

</style>