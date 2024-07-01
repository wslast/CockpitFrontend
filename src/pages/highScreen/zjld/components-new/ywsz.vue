<template>
    <div class="zjld-zjllzst">
        <chart class="w0 fg1" :chartData="chartData" ref="chart"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
const color =  [
    "#FAE354",
    '#31EA98',
    '#cd3f3f',
]
export default {
    data() {
        return {
            chartData: {},
            dataList: [
                {
                    name: '业务收入',
                    areaStyle: {
                        opacity: 0.9,
                        color: color[0]
                    },
                    data: [65, 85, 69, 98, 115, 89, 110, 95, 92, 93, 89, 94],
                },
                {
                    name: '实际支出',
                    areaStyle: {
                        opacity: 0.9,
                        color: color[1]
                    },
                    data: [-65, -85, -69, -98, -115, -89, -110, -95, -92, -93, -89, -94],
                },
                {
                    name: '增值收益',
                    data: [10, 6, 2, 1, 5, 10,10, 6, 2, 1, 5, 10],
                    symbol: "circle",
                    symbolSize: this.getFontSize(10),
                    showSymbol: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3,
                            }
                        }
                    },
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
            let series = this.dataList.map((item, index) => ({
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                emphasis: {
                    focus: 'series'
                },
                animationEasing: "cubicInOut",
                animationDuration: 1000,
                ...item
            }));
            this.chartData = {
                color,
                legend: {
                    top: '10px',
                    right: '100px',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                    },
                    icon: 'rect',
                    itemHeight: this.getFontSize(4),
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
                    left: '46px',
                    top: '46px',
                    right: '16px',
                    bottom: '46px',
                },
                xAxis: {
                    type: 'category',
                    data: monthList,
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        color: '#ffffff',
                        fontSize: this.getFontSize(14),
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
