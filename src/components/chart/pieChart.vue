<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 饼状图
-->
<template>
   <div :class="className" style="height:100%;width: 100%;"></div>
</template>

<script>
const echarts = require("echarts")
require('echarts/theme/macarons') // echarts theme
import resize from '@/mixins/resize.js'
export default {
  name: "pieChart",
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartData: {
      type: Array,
      required: true
    },
    seriesData: {
      type: Object,//单条或者多条数据
      default: {}
    },
    radius: {
        type: Array | Boolean,
        default: false
    },
    custom: {
        type: Boolean,
        default: () => false
    }
  },
  data() {
    return {
      chart: null,
      options: null
    }
  },
  mixins: [resize],
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    })
  },
  methods: {
    initChart() {
      if(!this.chart) {
        this.chart = echarts.init(this.$el);
      }
      //组装option
      this.calcOption();
      //自定义数据
      if(!this.custom) {
        this.setOptions(this.options);
      }
    },
    setOptions(options) {
      if(this.chart) {
        this.chart.setOption(options);
      }
    },
    calcOption() {
      let option = {
        color: this.defaultColor(1),
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true
        },
        series: []
      };
      //数据
      if(this.isObject(this.seriesData)) {
        let serie = {
            name: this.seriesData.name,
            data: this.chartData.map(item => { return { name: item.year ,value: item[this.seriesData.key] } }),
            type: 'pie',
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 3
            },
        }
        if(this.radius) {
            serie.radius = this.isArray(this.radius) ? this.radius : ["40%","70%"];
        }
        option.series.push(serie);
      }else if(this.isArray(this.seriesData)) {
        for (const iterator of this.seriesData) {
          let serie = {
            data: this.chartData.map(item => { return { name: item.year ,value: item[iterator.key] } }),
            type: iterator.type ? iterator.type : 'pie'
          }
          option.series.push(serie);
          option.legend.data.push(iterator.name);
        }
      }else {
        throw new Error("seriesData 数据格式错误")
      }
      console.log(option);
      this.options = option;
    }
  }
}
</script>
