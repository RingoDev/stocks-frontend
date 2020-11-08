<template>
  <card type="default" header-classes="bg-transparent">
    <b-row align-v="center" slot="header">
      <b-col>
        <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
        <h5 class="h3 text-white mb-0">Stocks value</h5>
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

<script >
import * as chartConfigs from "@/components/Charts/config";
import LineChart from '@/components/Charts/LineChart';

export default {
  name: "big-chart",
  props: ['loaded'],
  watch: {
    loaded: function (newVal) {
      if (newVal) this.initBigChart(0);
    },
    getChartData() {
      if (this.loaded) this.initBigChart(this.bigLineChart.activeIndex);
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
        extraOptions: chartConfigs["blueChartOptions"],
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

      this.bigLineChart.extraOptions = this.getChartData[index].options;
    },
    /**
     * @param label {number}
     * @returns {string}
     */
    formatToolTipLabel(label){
      const date = new Date(label).toISOString()
      const result = date.split('T')
      return result[0]
    },
    /**
     * @param dates {[]}
     * @returns {[]}
     */
    getLabels(dates){
      const labels = []
      for (let i = 0; i < dates.length; i++) {
        labels[i] = dates[i].shortWeekday;
      }
      return labels
    },
    getData(dates,pos){
      const data = []
      for (let i = 0; i < dates.length; i++) {
        data[dates.length - (1 + i)] = 0;
        for (let j = 0; j < pos.length; j++) {
          if (pos[j].checked) data[dates.length - (1 + i)] += pos[j].history.values[i];
        }
      }
      return data;
    },
    roundDataPoints(data){
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.round(data[i] * 100) / 100;
      }
      return data;
    }
  },



  computed: {
    getChartData: function () {
      const pos = this.$store.getters.getLocalPositions;
      const dates = this.$store.getters.getValidDates.slice().reverse();

      console.log('Positions', pos)
      console.log('Dates', dates)

      const weekDates = dates.slice(dates.length - 5, dates.length)
      const dateList = [dates, weekDates]
      const result = [];


      for (let x = 0; x < 2; x++) {
        const data = this.roundDataPoints(this.getData(dateList[x], pos));
        const labels = this.getLabels(dateList[x]);

        result[x] = {
          data: data,
          labels: labels,
        }

        // define options

        const options = JSON.parse(JSON.stringify(chartConfigs["blueChartOptions"]))
        options.tooltips.callbacks.label = (tooltipItem) => {
          return tooltipItem.yLabel.toString() + ' $'
        }
        options.tooltips.callbacks.title = (tooltipItem) => {
          let str = dateList[x][tooltipItem[0].index].fullWeekday + ' '
          str += this.formatToolTipLabel(dateList[x][tooltipItem[0].index].date)
          return str
        }
        options.tooltips.custom = (tooltip) => {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
        }
        options.tooltips.callbacks.beforeLabel = () => {
          return ' '
        }
        options.scales.yAxes[0].ticks.min = Math.min(...data) - 5;
        options.scales.yAxes[0].ticks.max = Math.max(...data) + 5;
        result[x].options = options;

      }

      // eslint-disable-next-line
      console.log(result);
      return result;
    },
  },
  created() {
    if(this.loaded) this.initBigChart(0);
  }
}
</script>

<style scoped>

</style>