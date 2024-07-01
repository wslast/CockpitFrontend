<template>
    <div class="df">
        <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    name: 'sjzhzs',
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
            let xData = [],
                yData = [];
            // this.dataList = [
            //     {
            //         pct: 98.33,
            //         ny: '2022-05',
            //     },
            //     {
            //         pct: 98.69,
            //         ny: '2022-06',
            //     },
            //     {
            //         pct: 98.46,
            //         ny: '2022-07',
            //     },
            //     {
            //         pct: 98.24,
            //         ny: '2022-08',
            //     },
            //     {
            //         pct: 98.35,
            //         ny: '2022-09',
            //     },
            //     {
            //         pct: 98.13,
            //         ny: '2022-10',
            //     },
            //     {
            //         pct: 97.92,
            //         ny: '2022-11',
            //     },
            //     {
            //         pct: 98.05,
            //         ny: '2022-12',
            //     },
            //     {
            //         pct: 97.96,
            //         ny: '2023-01',
            //     },
            //     {
            //         pct: 98.08,
            //         ny: '2023-02',
            //     },
            //     {
            //         pct: 98.45,
            //         ny: '2023-03',
            //     },
            //     {
            //         pct: 98.27,
            //         ny: '2023-04',
            //     },
            // ];
            let min = 100;
            let max = 0;
            this.dataList.forEach((item, index) => {
                if (item.pct < min) {
                    min = item.pct;
                }
                if (item.pct > max) {
                    max = item.pct;
                }
                xData.push(item.ny);
                yData.push(item.pct);
            });
            min = parseInt(min);
            max = parseInt(max) + 1;
            let option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: (params) => {
                        return (
                            params[0].marker +
                            params[0].axisValue +
                            ' : ' +
                            params[0].data +
                            '%'
                        );
                    },
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                grid: {
                    left: '15%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xData,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#7CDCFF',
                                width: this.getFontSize(2),
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            color: '#ffffff',
                            interval: 0,
                            rotate: 30,
                            fontSize: this.getFontSize(12),
                            formatter: (params) => {
                                let showLabel = params.replace('年', '-');
                                showLabel = showLabel.replace('月', '');
                                if (showLabel.length == 6) {
                                    showLabel =
                                        showLabel.slice(0, 5) +
                                        '0' +
                                        showLabel.slice(5);
                                }
                                return showLabel;
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        min: min,
                        max: max,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                            inside: true,
                        },
                        axisLabel: {
                            color: '#ffffff',
                            formatter: (params) => {
                                return params + '%';
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '	rgba(178,231,255,0.3)',
                            },
                        },
                    },
                ],
                series: [
                    //头部
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [
                            this.getFontSize(16),
                            this.getFontSize(10),
                        ],
                        symbolOffset: [0, this.getFontSize(-2)],
                        silent: true,
                        z: 5,
                        label: {
                            normal: {
                                show: false,
                                position: 'top',
                                color: '#000',
                                fontWeight: 'bold',
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#0DC0FE',
                                barBorderRadius: [
                                    this.getFontSize(30),
                                    this.getFontSize(30),
                                    0,
                                    0,
                                ], //圆角大小
                            },
                        },
                        data: yData,
                    },
                    //底部
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolPosition: 'end',
                        symbolSize: [
                            this.getFontSize(16),
                            this.getFontSize(10),
                        ],
                        symbolOffset: [0, this.getFontSize(0)],
                        z: this.getFontSize(5),
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#127DE7',
                            },
                        },
                        data: yData,
                    },
                    //柱
                    {
                        name: '缴存人数',
                        type: 'bar',
                        showBackground: false,
                        backgroundStyle: {
                            color: 'rgba(216, 229, 247, 0.55)',
                            borderRadius: [
                                this.getFontSize(6),
                                this.getFontSize(6),
                                0,
                                0,
                            ],
                        },
                        itemStyle: {
                            normal: {
                                color: (params) => {
                                    let colors = new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: '#00DFFE',
                                            },
                                            {
                                                offset: 0.95,
                                                color: '#1959DE',
                                            },
                                            {
                                                offset: 1,
                                                color: 'transparent',
                                            },
                                        ],
                                    );
                                    return colors;
                                },
                                borderRadius: this.getFontSize(10),
                            },
                        },
                        barWidth: '16',
                        data: yData,
                    },
                    //折线
                    {
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            width: this.getFontSize(2),
                        },
                        symbol: 'circle',
                        symbolSize: this.getFontSize(8),
                        z: 6,
                        data: yData,
                        itemStyle: {
                            color: '#4BFAAC',
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
                        scriptId: 'zjld_jseyzcfzbl',
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
