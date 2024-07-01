<template>
    <div style="height:100%" class="df">
        <div style="width:0;" class="fg1 df fdc ">
<!--            <div class="button leftButton">单位</div>-->
            <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
        </div>
      <div  class="dwbox"></div>
        <div style="width:0;" class="fg1 df fdc ">
<!--            <div class="button leftButton">贷后</div>-->
            <chart
                ref="chart2"
                class="fg1 chart2"
                :chartData="chartData2"
            ></chart>
        </div>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            chartData: {},
            chartData2: {},
            dwDataList: [],
            dhDataList: [],
            max: 0,
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        await this.getDwData();
        await this.getDhData();
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {},
    methods: {
        initChart() {
            let demoColor = [
                '#F25C5D',
                '#EDAE5D',
                '#04C8F9',
                '#A800FF',
                '#00FFF0',
            ];
            let demoName = ['3个月内', '3~6月', '6~12月', '12~24月', '2年以上'];
            let demoColor2 = ['#393C6A', '#080B45'];

          const hours = [
            '2018','2019','2020','2021','2022'
          ];
// prettier-ignore
          const days = [
            '2年以上' ,'12~24月'  ,'6~12月','3~6月'  ,'3个月内'
          ];
// prettier-ignore
          const data = [ [0, 0, 5], [0, 1, 1], [0, 2, 4], [0, 3, 55], [0, 4, 66], [1, 2, 33], [1, 3, 55], [1, 0, 88]]
            .map(function (item) {
              return [item[1], item[0], item[2] || '-'];
            });
         let  option = {
            title:{
              text:'单位',
              textStyle:{
                color:'#A0E1FF',
                fontSize:'16px',
                fontFamily:'MicrosoftYaHei',
                fontWeight :'normal'
              },
              left:'55%',
              top:'-2%'
            },
            tooltip: {
              position: 'top'
            },
            grid: {
              height: '78%',
              top: '10%',
              left:"30%",
              right:"0%"
            },
            xAxis: {
              type: 'category',
              data: hours,
              axisLine:{
                show:false
              },
              axisTick: { show: false },
              axisLabel:{
                interval:0,
                  color: 'white', // 设置 x 轴字体颜色
                  fontSize: this.getFontSize(12),   // 设置 x 轴字体大小

              },
              splitArea: {
                show: false
              }
            },
            yAxis: {
              axisTick: { show: false },
              axisLine: {
                show: false, // 隐藏y轴线
              },
              axisLabel:{
                hideOverlap:false,
                  color: 'white',
                  fontSize: this.getFontSize(14),

              },
              type: 'category',
              data: days,
              splitArea: {
                show: true
              }
            },
            visualMap: {
              show:false,
              min:1,
              inRange: {
                color: ['#409eff', '#378ae0', 'blue'],
                colorLightness: [0.8, 0.2],
              },

              calculable: true,
              orient: 'horizontal',
            },

            series: [
              {
                name: '',
                type: 'heatmap',
                data: data,
                label: {
                  show: true,
                  color:'#fff'
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    color:'white'
                  }
                }
              }
            ]
          };
            let option2 = {
                color: demoColor.reverse(),
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                        return (
                            params.marker + params.name + ' : ' + params.value
                        );
                    },
                },
              title:{
                text:'贷后',
                textStyle:{
                  color:'#A0E1FF',
                  fontSize:'16px',
                  fontFamily:'MicrosoftYaHei',
                  fontWeight :'normal'
                },
                left:'38%',
                top:'-2%'
              },
                legend: {
                    top: 'bottom',
                    left: 'center',
                    itemWidth: this.getFontSize(12),
                    itemHeight: this.getFontSize(8),
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                    },
                },
                series: [
                    {
                        type: 'pie',
                        padAngle:4,
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            // borderColor: '#080a3c',
                            // borderWidth: this.getFontSize(4),
                        },
                        label: {
                            show: true,
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: this.getFontSize(40),
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: true,
                        },

                        data: this.dhDataList.map((item, index) => {
                            return { name: item.lb, value: item.sl,                    label: {
                                show: true,
                                position: 'outside',
                                color: '#FFF',
                                alignTo:'labelLine',
                                formatter: (param) => {
                                  console.log(param,'打印')
                                  let str =
                                    param.value +
                                    '\r\n' +
                                    '{dataStyle|' +
                                    param.percent +
                                    '%}';
                                  return str;
                                },
                                rich: {
                                    valueStyle:{
                                      color:'#fff',
                                        fontSize:this.getFontSize(14)
                                    },
                                  dataStyle: {
                                    color: '#aaa',
                                    fontSize: this.getFontSize(12),
                                  },
                                },
                              },labelLine:{
                              show:true,
                                showAbove:true,
                                length:5,
                                length2:15,
                                lineStyle:{
                                // color:'#fff',
                                width:1,
                                  type:'solid'
                                }
                              },
                                emphasis:{
                                disabled:true,
                                } };
                        }),
                    },
                ],
            };
            this.chartData = option;
            this.chartData2 = option2;
        },
        async getDwData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_tjfx_dw',
                    })
                    .then((res) => {
                        this.dwDataList = res.retBody.retList;
                        this.max = this.dwDataList.reduce((prev, cur) => {
                            if (!prev) {
                                return cur.sl;
                            } else {
                                return prev < cur.sl ? cur.sl : prev;
                            }
                        }, 0);
                        this.max = parseInt(this.max / 1000) * 1000 + 1000;
                        resolve();
                    });
            });
        },
        async getDhData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_tjfx_dh',
                    })
                    .then((res) => {
                        this.dhDataList = res.retBody.retList;
                      console.log(this.dhDataList,'dhdataList,数据打印')

                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
.button {
    color: #a0e1ff;
    width: 63.994px;
    text-align: center;
    font-weight: 400;
    height: 27.994px;
    line-height: 27.994px;
    border-radius: 13.997px;
    border: 1.997px solid #1666a0;
    font-size: 15.994px;
    box-shadow: inset 0px 0px 15.994px 0px rgba(255, 255, 255, 0.5);
    opacity: 0.7;
}
.leftButton {
    position: relative;
    top: 34.56px;
    left: 11.52px;
}

.dwbox {
margin-left: 10px;
  margin-right: 10px;
  background: radial-gradient(circle at 50% 50%,  #a0d8f1 20%, #a0d8f1 20%, #a0d8f1 25%, transparent 80%);
  width: 1px;
  height: 100%;
}
</style>
