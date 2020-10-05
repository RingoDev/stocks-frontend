import { Line, mixins } from 'vue-chartjs';
import globalOptionsMixin from "@/components/Charts/globalOptionsMixin";
export default {
  name: 'line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp, globalOptionsMixin],
  props: ['extraOptions','chartData'],
  data() {
    return {
      ctx: null
    };
  },
  watch:{
    extraOptions: function(newVal){
      this.renderChart(this.chartData,newVal)
    },
    chartData:function (newVal){
      this.renderChart(newVal, this.extraOptions);
    }
  },
  mounted(){
    this.renderChart(this.chartData,this.extraOptions);
  },
};
