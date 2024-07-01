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
        yData = [],
        yData2 = [];
      this.dataList.forEach((item, index) => {
        xData.push(item.ny);
        yData2.push(item.je);
        let data = {
          value: item.je,
          ...item,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: index % 2 == 0 ? "#04BBFF" : "#FFEA04 " // 0% 处的颜色
                },
                {
                  offset: 1,
                  color:
                    index % 2 == 0
                      ? "rgba(4,187,255,0.000)"
                      : "rgba(255,234,4,0.000)" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        };
        yData.push(data);
      });
      let option = {
        tooltip: {
          // show: false,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: params => {
            return (
              params[0].marker +
              params[0].data.ny +
              " : " +
              params[0].data.je +
              "万元"
            );
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "25%",
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
              fontSize: this.getFontSize(11),
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
              padding: [0, this.getFontSize(40), 0, 0]
            },
            axisLabel: {
              show: true,
              color: "#ffffff"
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "	rgba(178,231,255,0.3)"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: yData
          },
          {
            type: "pictorialBar",
            itemStyle: {
              color: "#080A3D"
            },
            symbolSize: ["95%", this.getFontSize(2)],
            data: yData2,
            symbol: "rect",
            symbolRepeat: "fixed",
            symbolPosition: "start",
            symbolMargin: this.getFontSize(6),
            symbolClip: true,
            zlevel: 2,
            symbolOffset: [0, this.getFontSize(-6)]
          }
        ]
      };
      this.chartData = option;
    },
    async getData() {
      return new Promise((resolve, reject) => {
        this.$api
          .formPost("/api/dyncscript/scriptRule/query", { scriptId: "zjld_dqwjsdfhs" })
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
