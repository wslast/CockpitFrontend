<template>
    <div class="zjld-zjllzst">
        <chart class="w0 fg1" :chartData="chartData" ref="chart"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
const color =  [
    "rgba(250,227, 84,1)",
    "rgba(250,227, 84,0.5)",
    'rgba(49,107,227,1)',
    'rgba(49,107,227,0.5)',
    '#cd3f3f',
]
export default {
    data() {
        return {
            chartData: {},
            dataList: [
                {
                    name: '实际收款',
                    data: [55, 75, 59, 90, 110, 75],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0.5,
                                    color: color[0],
                                },
                                {
                                    offset: 1,
                                    color: 'transparent', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 4,
                            }
                        }
                    }
                },
                {
                    name: '预计收款',
                    data: [65, 85, 69, 98, 115, 89, 110, 95, 92, 93, 89, 94],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0.2,
                                    color: color[1],
                                },
                                {
                                    offset: 1,
                                    color: 'transparent', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3,
                                type: 'dotted'  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                            }
                        }
                    }
                },
                {
                    name: '实际支出',
                    data: [-55, -75, -59, -90, -110, -75],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0.5,
                                    color: color[2],
                                },
                                {
                                    offset: 1,
                                    color: 'transparent', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 4,
                            }
                        }
                    }
                },
                {
                    name: '预计支出',
                    data: [-65, -85, -69, -98, -115, -89, -110, -95, -92, -93, -89, -94],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0.5,
                                    color: color[3],
                                },
                                {
                                    offset: 1,
                                    color: 'transparent', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3,
                                type: 'dotted'  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                            }
                        }
                    }
                },
                {
                    name: '净流量',
                    data: [10, 6, 2, -1, 5, 10],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 4,
                            }
                        }
                    }
                },
            ],
            color,
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    async mounted() {
        // await this.getData();
        this.$nextTick(this.initChart);
    },
    beforeDestroy() {
    },
    methods: {
        initChart() {
            let monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',];
            let series = this.dataList.map(({name, data, areaStyle, itemStyle}, index) => ({
                name,
                type: "line",
                symbol: "circle",
                symbolSize: this.getFontSize(10),
                data,
                smooth: true,
                areaStyle,
                lineStyle: {},
                itemStyle,
                animationEasing: "cubicInOut",
                animationDuration: 2000,
            }));
            this.chartData = {
                color,
                legend: {
                    top: '0',
                    right: '48px',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                    },
                    icon: 'rect',
                    itemHeight: this.getFontSize(4),
                },
                title: {
                    text: '资金流量走势图',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(22),
                    },
                    left: '46px',
                    top: '0%',
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        return params.map(param =>
                            `${param.marker}${param.seriesName}年${param.axisValue} : ${param.data}万元`
                        ).join('<br/>');
                    },
                },
                grid: {
                    left: '108px',
                    top: '96px',
                    right: '110px',
                    bottom: '64px',
                },
                xAxis: {
                    type: 'category',
                    data: monthList,
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        color: '#ffffff',
                        fontSize: this.getFontSize(16),
                        margin: this.getFontSize(20),
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)',
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.05)',
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    name: '万元',
                    nameTextStyle: {
                        color: '#ffffff',
                        padding: [0, this.getFontSize(40), 0, 0],
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        color: '#ffffff',
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ffffff',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(178,231,255,0.5)',
                        },
                    },
                },
                series: series,
            };
        }
    },
};
</script>
<style scoped lang="scss">
</style>
