<template>
  <div style="height:100%" class="df">
    <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
  </div>
</template>
<script>
const echarts = require("echarts");
export default {
  data() {
    return {
      chartData: {},
      dataList: []
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    await this.getData();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {},
  methods: {
    initChart() {
      let xData = [],
        yData = [];
      this.dataList.forEach((item, index) => {
        xData.push(item.ny);
        yData.push(item.je);
      });
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: params => {
            return (
              params[0].marker +
              params[0].name +
              " : " +
              params[0].data +
              "万元"
            );
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "24%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: "#7CDCFF "
              }
            },
            axisTick: {
              show: false,
              length: 0
            },
            axisLabel: {
              show: true,
              color: "#ffffff",
              rotate: 30,
              interval: 0,
              fontSize: this.getFontSize(12),
              formatter: params => {
                let showLabel = params.replace("年", "-");
                showLabel = showLabel.replace("月", "");
                if (showLabel.length == 6) {
                  showLabel = showLabel.slice(0, 5) + "0" + showLabel.slice(5);
                }
                return showLabel;
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "万元",
            nameTextStyle: {
              color: "#ffffff",
              padding: [0, this.getFontSize(20), 0, 0]
            },
            axisLabel: {
              show: true,
              color: "#ffffff",
              fontSize: this.getFontSize(12)
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(178,231,255,0.3)"
              }
            }
          }
        ],
        series: {
          type: "line",
          color: "#FFE227",
          data: yData,
          zlevel: 4,
          lineStyle: {
            width: this.getFontSize(3)
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#FFE227" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "transparent" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      };
      this.chartData = option;
    },
    async getData() {
      return new Promise((resolve, reject) => {
        this.$api
          .formPost("/api/dyncscript/scriptRule/query", { scriptId: "zjld_yskayzst" })
          .then(res => {
            this.dataList = res.retBody.retList;
            resolve();
          });
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
