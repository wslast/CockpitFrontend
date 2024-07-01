<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 折线柱状图
-->
<template>
   <div :class="className" style="height:100%;width: 100%;"></div>
</template>

<script>
const echarts = require("echarts")
require('echarts/theme/macarons') // echarts theme
import resize from '@/mixins/resize.js'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartData: {
      type: Array,
      required: true
    },
    xData: {
      type: Array | Object, //横轴数据
      default: ""
    },
    yData: {
      type: Array | Object, //单轴或者双轴 最多两条
      default: ""
    },
    seriesData: {
      type: Array | Object,//单条或者多条数据
      default: ""
    }
  },
  name: "LBChart",
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
      this.calcOption();
      this.setOptions(this.options);
    },
    setOptions(options) {
      if(this.chart) {
        this.chart.setOption(options);
      }
    },
    calcOption() {
      let option = {
        color: this.defaultColor(1),
        xAxis: {
          data: [],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        tooltip: {
          trigger: 'axis',
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: []
        },
        series: []
      };
      //x轴
      if(this.isObject(this.xData)) {
        option.xAxis = this.xData;
        option.xAxis.data = this.chartData.map(item => { return item[this.xData.key]});
      }else {
        throw new Error("xData 数据格式错误")
      }
      //y轴
      if(this.isObject(this.yData)) {
        if(this.yData.name) {
          option.yAxis.name = this.yData.name;
        }
        option.yAxis = this.yData;
      }else if(this.isArray(this.yData)) {
        option.yAxis = this.yData;
      }else {
        throw new Error("yData 数据格式错误")
      }
      //数据
      if(this.isObject(this.seriesData)) {
        let serie = {
          name: this.seriesData.name,
          data: this.chartData.map(item => { return item[this.seriesData.key] }),
          smooth: true,
          type: 'line'
        }
        option.series.push(serie);
        option.legend.data.push(this.seriesData.name);
      }else if(this.isArray(this.seriesData)) {
        for (const iterator of this.seriesData) {
          let serie = {
            name: iterator.name,
            data: this.chartData.map(item => { return item[iterator.key] }),
            smooth: true,
            type: iterator.type ? iterator.type : 'line'
          }
          if(iterator.stack) {
            serie.stack = iterator.stack;
          }
          option.series.push(serie);
          option.legend.data.push(iterator.name);
        }
        if(this.isArray(this.yData) && this.yData.length > 1) {
          option.series[option.series.length - 1].yAxisIndex = 1;
        }
      }else {
        throw new Error("seriesData 数据格式错误")
      }
      this.options = option;
    }
  }
}
</script>
