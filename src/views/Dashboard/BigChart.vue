<template>
  <card type="default" header-classes="bg-transparent">
    <b-row align-v="center" slot="header">
      <b-col>
        <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
        <h5 class="h3 text-white mb-0">Sales value</h5>
      </b-col>
      <b-col>
        <b-nav class="nav-pills justify-content-end">
          <b-nav-item
              class="mr-2 mr-md-0"
              :active="bigLineChart.activeIndex === 0"
              link-classes="py-2 px-3"
              @click.prevent="initBigChart(0)">
            <span class="d-none d-md-block">Month</span>
            <span class="d-md-none">M</span>
          </b-nav-item>
          <b-nav-item
              link-classes="py-2 px-3"
              :active="bigLineChart.activeIndex === 1"
              @click.prevent="initBigChart(1)"
          >
            <span class="d-none d-md-block">Week</span>
            <span class="d-md-none">W</span>
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
    <line-chart
        v-if="loaded"
        :height="350"
        ref="bigChart"
        :chart-data="bigLineChart.chartData"
        :extra-options="bigLineChart.extraOptions"
    >
    </line-chart>
  </card>
</template>

<script>
import * as chartConfigs from "@/components/Charts/config";
import LineChart from '@/components/Charts/LineChart';

export default {
  name: "big-chart",
  props:['loaded'],
  watch:{
    loaded: function(newVal){
      if(newVal) this.initBigChart(0);
    },
    getChartData (newPos, oldPos){
      if(this.loaded) this.initBigChart(this.bigLineChart.activeIndex);
    }
  },
  components: {
    LineChart,
  },
  data() {
    return {
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: 'Performance',
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
    };
  },
  methods: {
    initBigChart(index) {
      this.bigLineChart.chartData = {
        datasets: [
          {
            label: 'Performance',
            data: this.getChartData[index].data
          }
        ],
        labels: this.getChartData[index].labels
      };

      this.bigLineChart.activeIndex = index;

      const options = chartConfigs.blueChartOptions
      options.scales.yAxes[0].ticks.min = this.getChartData[index].min;
      options.scales.yAxes[0].ticks.max = this.getChartData[index].max;
      this.bigLineChart.extraOptions = options;
    },
  },

  computed: {
    getChartData() {
      const pos = this.$store.getters.getLocalPositions;
      const dates = this.$store.getters.getValidDates;

      console.log('Positions')
      console.log(pos)

      const data = []
      for (let i = 0;i<dates.length;i++){
        data[dates.length-(1+i)]= 0;
        for (let j = 0;j<pos.length;j++){
          if(pos[j].checked) data[dates.length-(1+i)] += pos[j].history.values[i];
        }
      }


      const labels = []
      for(let i = 0;i<data.length;i++){
        labels[i] = dates[i]["shortWeekday"];
        data[i] = Math.round(data[i]*100)/100;
      }

      const result = [];

      result[0] = {
        data: data,
        labels: labels,
        min:Math.min(...data)-5,
        max:Math.max(...data)+5,
      }

      const weekData = data.slice(data.length - 5, data.length)
      const weekLabels = labels.slice(data.length - 5, data.length )

      result[1] = {
        data: weekData,
        labels: weekLabels,
        min: Math.min(...weekData)-5,
        max: Math.max(...weekData)+5,
      }

      // eslint-disable-next-line
      console.log(result);
      return result;
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>