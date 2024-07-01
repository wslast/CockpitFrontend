<template>
    <div>
        <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return { chartData: {}, dataList: [], nodeDataList: [] };
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
            this.chartData = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    left: '5%',
                    top: '3%',
                    icon: 'rect',
                    itemHeight: 4.5,
                    itemWidth: 25,
                    itemGap: 8,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 10
                    }
                },
                grid: {
                    left: '20px',
                    right: '20px',
                    bottom: '0',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['2022年\n9月', '10月', '11月', '12月', '2023年\n1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 30, // 旋转45度
                            fontSize: 12,
                            color: '#ffffff', // 设置 X 轴文字颜色
                            margin: 15, // 设置 X 轴文字与轴线的距离
                        },
                        axisLine: {
                            show: true, // 确保轴线显示
                            lineStyle: {
                                color: '#407095', // 设置轴线颜色
                                width: 2, // 可选，设置轴线宽度
                                type: 'solid'
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 100,
                        interval: 25,
                        axisLabel: {
                            fontSize: 12,
                            color: '#ffffff',
                            formatter: function (value) {
                                return value + '%';
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#27325A', // 分割线颜色
                                width: 1,         // 分割线宽度，可按需调整
                                type: 'solid'     // 分割线类型，这里是实线
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '中心版',
                        type: 'line',
                        stack: "total",
                        showSymbol: false,
                        areaStyle: {
                            color: '#845A3C'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: '#FFAA45'
                        },
                        data: [13, 12, 10, 14, 10, 18, 20, 10, 14, 10, 18, 20]
                    },
                    {
                        name: '智能工作台',
                        type: 'line',
                        stack: "total",
                        showSymbol: false,
                        areaStyle: {
                            color: '#7D334B'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: '#F25C5D'
                        },
                        data: [20, 12, 11, 14, 10, 13, 11, 10, 14, 10, 18, 20]
                    },
                    {
                        name: 'APP',
                        type: 'line',
                        stack: "total",
                        showSymbol: false,
                        itemStyle: {
                            color: '#00FFF0'
                        },
                        areaStyle: {
                            color: '#038598'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [10, 12, 20, 14, 9, 3, 4, 10, 14, 10, 18, 20]
                    },
                    {
                        name: '开发商网厅',
                        type: 'line',
                        stack: "total",
                        showSymbol: false,
                        itemStyle: {
                            color: '#04C8F9'
                        },
                        areaStyle: {
                            color: '#056A9F'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [15, 12, 14, 9, 13, 12, 8, 10, 14, 10, 18, 20]
                    },
                    {
                        name: '个人网厅',
                        type: 'line',
                        stack: "total",
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        itemStyle: {
                            color: '#907AFF'
                        },
                        areaStyle: {
                            color: '#4C43A3'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [12, 13, 9, 13, 12, 13, 13, 9, 13, 12, 13, 13]
                    },
                    {
                        name: '湘易办',
                        type: 'line',
                        stack: "total",
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        itemStyle: {
                            color: '#1379E6'
                        },
                        areaStyle: {
                            color: '#0D4397'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [30, 39, 36, 36, 46, 41, 44, 51, 31, 48, 15, 7]
                    }
                ]
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'dk_dkrfx',
                    })
                    .then((res) => {
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
</style>
