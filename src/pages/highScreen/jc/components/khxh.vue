<template>
    <chart ref="chart" :chartData="chartData"></chart>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
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
            let xData = this.dataList.map((item) => {
                return item.khny;
            });
            let yData1 = this.dataList.map((item) => {
                return item.khrs;
            });
            let yData2 = this.dataList.map((item) => {
                return item.xhrs * -1;
            });
            let yData3 = this.dataList.map((item) => {
                return item.jzrs;
            });


            let max1 = Math.max(1, ...yData1, ...yData2) || 1;
            let min1 = Math.min(0, ...yData1, ...yData2) || 0;
            let max2 = Math.max(1, ...yData3) || 1;
            let min2 = Math.min(0, ...yData3) || 0;
            let ratio = (max1 - min1) / (max2 - min2);
            let y1Max = 0,
                y2Max = 0,
                y1Min = 0,
                y2Min = 0;
            if (max1 < max2 * ratio) {
                y1Max = max2 * ratio;
                y2Max = max2;
            } else {
                y1Max = max1;
                y2Max = max1 / ratio;
            }
            if (min1 < min2 * ratio) {
                y1Min = min1;
                y2Min = min1 / ratio;
            } else {
                y1Min = min2 * ratio;
                y2Min = min2;
            }


            let option = {
                color: ['#04BBFF ', '#EFCF40', '#FF6845 '],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: function(params) {
                        // console.log(params);
                        let str = ''; //声明一个变量用来存储数据
                        const [a, b, c, d, e] = params;
                        var x1 = `${a.axisValue}`;
                        var a1 =
                            `${a.marker}` +
                            `${a.seriesName}: ${
                                a.value > 0 ? a.value + '人' : -a.value + '人'
                            }`;
                        var b1 =
                            `${b.marker}` +
                            `${b.seriesName}: ${
                                b.value > 0 ? b.value + '人' : -b.value + '人'
                            }`;
                        var e1 =
                            `${e.marker}` +
                            `${e.seriesName}: ${e.value + '人'}`;
                        str = x1 + '</br>' + a1 + '</br>' + b1 + '</br>' + e1;
                        return str;
                    },
                },
                legend: {
                    //位置需要与color对应，方可得到相应颜色
                    top: '0%',
                    data: ['开户人数', '销户人数 ', '净增加人数'],
                    itemWidth: this.getFontSize(18),
                    itemHeight: this.getFontSize(13),
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(14),
                    },
                    lineStyle: {
                        width: this.getFontSize(2),
                    },
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    top: '20%',
                    bottom: '0',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xData,
                        axisLine: {
                            show: true,
                            onZero: false,
                            lineStyle: {
                                color: '#7CDCFF ',
                            },
                        },
                        axisTick: {
                            show: false,
                            length: 0,
                        },
                        axisLabel: {
                            show: true,
                            color: '#ffffff',
                            rotate: 30,
                            fontSize: this.getFontSize(12),
                            interval: 0,
                            formatter: (params) => {
                                let showData = params;
                                showData = showData.replace('年', '-');
                                showData = showData.replace('月', '');
                                if (showData.slice(5).length == 1) {
                                    showData =
                                        showData.slice(0, 5) +
                                        '0' +
                                        showData.slice(5);
                                }
                                return showData;
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '人',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(30), 0, 0],
                            fontSize: this.getFontSize(12),
                        },
                        axisLabel: {
                            show: true,
                            color: '#ffffff',
                            fontSize: this.getFontSize(12),
                            formatter: function(v) {
                                return v > 0 ? v : -v;
                            },
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(178,231,255,0.3)',
                            },
                        },
                    },
                    {
                        type: 'value',
                        name: '人',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, 0, 0, this.getFontSize(30)],
                            fontSize: this.getFontSize(12),
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            color: '#ffffff',
                            fontSize: this.getFontSize(12),
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        name: '开户人数',
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0,
                        data: yData1,
                    },
                    {
                        name: '销户人数 ',
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0,
                        data: yData2,
                    },
                    {
                        name: '开户人数',
                        type: 'pictorialBar',
                        itemStyle: {
                            color: '#080A3D',
                        },
                        symbolSize: ['95%', this.getFontSize(2)],
                        yAxisIndex: 0,
                        data: yData1,
                        symbol: 'rect',
                        symbolRepeat: 'fixed',
                        symbolPosition: 'start',
                        symbolMargin: 2,
                        symbolClip: true,
                        zlevel: 2,
                        symbolOffset: [0, this.getFontSize(-6)],
                    },
                    {
                        name: '销户人数 ',
                        type: 'pictorialBar',
                        itemStyle: {
                            color: '#080A3D',
                        },
                        symbolSize: ['95%', this.getFontSize(2)],
                        yAxisIndex: 0,
                        data: yData2,
                        symbol: 'rect',
                        symbolRepeat: 'fixed',
                        symbolPosition: 'start',
                        symbolMargin: 2,
                        symbolClip: true,
                        zlevel: 2,
                        symbolOffset: [0, this.getFontSize(-6)],
                    },
                    {
                        name: '净增加人数',
                        type: 'line',
                        color: '#FF6845',
                        data: yData3,
                        zlevel: 4,
                      symbol:'circle',
                      symbolSize:'5',
                      yAxisIndex: 1,
                        lineStyle: {
                            width: this.getFontSize(4),
                        },
                    },
                ],
            };
            this.chartData = option;
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_khyxhfx',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss"></style>
