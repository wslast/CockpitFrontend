<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 存量疑点分布情况
-->
<template>
    <div class="clydfbqk">
        <chart :chartData="chartData"></chart>
        <chart :chartData="chartData2"></chart>
    </div>
</template>

<script>
import * as echarts from "echarts";
import utils from "../../utils";

export default {
  name: "clydfbqk",
  components: {},

  data() {
    return {
      chartData: {},
      chartData2: {},
      list: [],
      list2: []
    };
  },

  computed: {},

  mounted() {
    this.$nextTick(() => {
      this.getData();
      this.getData2();
    });
  },

  methods: {
    getData() {
      this.$api
        .formPost("/api/dyncscript/scriptRule/query", { scriptId: "fk_sp_clydfbqk" })
        .then(res => {
          this.list = res.retBody.retList;
          this.initChart();
        });
    },
    getData2() {
      this.$api
        .formPost("/api/dyncscript/scriptRule/query", { scriptId: "fk_sp_clydfbqk_glb" })
        .then(res => {
          this.list2 = res.retBody.retList;
          this.initChart2();
        });
    },
    initChart() {
      const data = this.list;
      const max = Math.max(...data.map(item => item.sl));
        this.chartData = {
          backgroundColor: "transparent",
          tooltip: {},

          radar: {
              radius: 68,
              nameGap: 20, // 图中工艺等字距离图的距离
              center: ["50%", "50%"], // 图的位置
              name: {
                  textStyle: {
                      color: "#fff",
                      fontSize: this.getFontSize(14)
                  },
                  formatter: function (name) {
                      return name;
                  }
              },
              indicator: data.map(item => {
                  return {
                      name: item.zblx,
                      max: max
                  };
              }),
              axisLine: {
                  lineStyle: {
                      color: "rgba(153, 409, 246, 0.2)"
                  },
                  show: true,
                  symbolOffset: [0, 15]
              },
              splitArea: {
                  show: false,
                  areaStyle: {
                      color: "rgba(255,0,0,0)" // 图表背景的颜色
                  }
              },
              splitLine: {
                  show: true,
                  lineStyle: {
                      width: 1,
                      color: "rgba(153, 209, 246, 0.2)" // 设置网格的颜色
                  }
              }
          },

          series: [
              {
                  name: "存量疑点分布情况",
                  type: "radar",
                  itemStyle: {
                      normal: {
                          areaStyle: {type: "default"}
                      }
                  },
                  data: [
                      {
                          value: data.map(item => item.sl),
                          areaStyle: {color: "#2FAEFF"},
                          symbolSize: 5,
                          itemStyle: {
                              normal: {
                                  borderWidth: 1,
                                  color: "#2FAEFF",
                                  borderColor: "#2FAEFF"
                              }
                          },
                          lineStyle: {
                              color: "#2FAEFF",
                              width: 1
                          }
                      }
                  ]
              }
          ]
      };
    },
    initChart2() {
      let data = this.list2;
      // console.log(data);
      let option = {
        backgroundColor: "",
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0
            }
          },
          formatter: function(params) {
            // console.log(params);
            return params[0].name + "<br/>" + params[0].value + "个";
          }
        },
        dataZoom: {
          type: "slider",
          right: 15,
          yAxisIndex: 0,
          startValue: 9,
          endValue: 17,
          width: 10,
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "24%",
          top: "0",
          right: "20%",
          bottom: "0"
          // containLabel: true,
        },
        yAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: data.map(item => item.glb),
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0c3b71"
              }
            },
            axisLabel: {
              show: true,
              color: function(params) {
                if (utils.areaList.indexOf(params) % 2 === 0) {
                  return "#4DEC8D";
                } else {
                  return "#04BBFF";
                }
              },
              fontSize: this.getFontSize(14)
            }
          }
        ],
        xAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        series: [
          {
            data: data.map(item => item.sl),
            type: "bar",
            barWidth: this.getFontSize(10),
            itemStyle: {
              color: function(params) {
                if (params.dataIndex % 2 === 0) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    1,
                    0, // 只要修改前四个参数就ok
                    [
                      {
                        offset: 0,
                        color: "rgba(77, 236, 141, 0)"
                      },
                      {
                        offset: 1,
                        color: "rgba(77, 236, 141, 1.3)"
                      }
                    ]
                  );
                } else {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    1,
                    0, // 只要修改前四个参数就ok
                    [
                      {
                        offset: 0,
                        color: "rgba(4, 187, 255, 0)"
                      },
                      {
                        offset: 1,
                        color: "rgba(4, 187, 255, 1.3)"
                      }
                    ]
                  );
                }
              }
            },
            z: 1
          },
          {
            // 分隔
            type: "pictorialBar",
            itemStyle: {
              color: "rgba(17, 18, 20, 0.9)"
            },
            symbolRepeat: "fixed",
            symbolMargin: 4,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [2, this.getFontSize(10)], // 分隔线[宽, 高]
            symbolPosition: "start",
            symbolOffset: [0, 0], // 偏移分隔线[左右, 上下]
            data: data.map(item => item.sl),
            // width: 25,
            z: 0,
            zlevel: 8
          }
        ]
      };
      this.chartData2 = option;
    }
  }
};
</script>
<style lang="scss" scoped>
.clydfbqk {
    display: flex;
    .chart {
        height: 100%;
        width: 100%;
    }
    .chart2 {
        flex-grow: 1;
        height: 100%;
    }
}
</style>
