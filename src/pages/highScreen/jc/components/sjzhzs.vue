<template>
    <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
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
        this.$nextTick(this.initChart);
    },
    beforeDestroy() {},
    methods: {
        /**
         * @description: 获取数据后
         * @return {*}
         */

        initChart() {
            let option = {
                color: ['#127DE7', '#FFE227'],
                legend: {
                    trigger: 'item',
                    top: '0%',
                    slient: true,
                    selectedMode: false,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(14),
                    },
                    lineStyle: {
                        width: this.getFontSize(4),
                    },
                    itemWidth: this.getFontSize(15),
                    itemHeight: this.getFontSize(10),
                    data: [
                        {
                            name: '缴存人数',
                            icon: 'rect',
                            itemStyle: {
                                color: '#127DE7',
                            },
                        },
                        {
                            name: '缴存金额',
                            itemStyle: {
                                color: '#FFE227',
                            },
                            lineStyle:{
                                width:3,
                            }
                        },
                    ],
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        return (
                            params[2].axisValue +
                            '<br/>' +
                            params[2].marker +
                            params[2].seriesName +
                            ':' +
                            params[2].data +
                            '万人' +
                            '<br/>' +
                            params[3].marker +
                            params[3].seriesName +
                            ':' +
                            params[3].data +
                            '万元'
                        );
                    },
                },
                grid: {
                    top: '30px',
                    right: '60px',
                    left: '40',
                    bottom: '36',
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.dataList.map((item, index) => {
                            return item.ny;
                        }),
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            onZero: false,
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
                            align: 'center',
                            rotate: 30,
                            fontSize: this.getFontSize(12),
                            padding: [
                                this.getFontSize(40),
                                0,
                                0,
                                this.getFontSize(-40),
                            ],
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
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                            inside: true,
                        },
                        axisLabel: {
                            color: '#ffffff',
                            fontSize: this.getFontSize(12),
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '	rgba(178,231,255,0.3)',
                            },
                        },
                        interval:5,
                        name: '万人',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(40), 0, 0],
                            fontSize: this.getFontSize(12),
                        },
                    },
                    {

                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                            inside: true,
                        },
                        splitLine: {
                            show: false,
                        },
                        interval:50,
                        axisLabel: {
                            color: '#ffffff',
                            fontSize: this.getFontSize(12),
                        },
                        name: '万元',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(-40), 0, 0],
                            fontSize: this.getFontSize(12),
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
                        symbolOffset: [0, this.getFontSize(-5)],
                        symbolPosition: 'end',
                        yAxisIndex: 0,
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
                        data: this.dataList.map((item) => {
                            return item.jcrs;
                        }),
                    },
                    //底部
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [
                            this.getFontSize(16),
                            this.getFontSize(10),
                        ],
                        symbolOffset: [0, this.getFontSize(-2)],
                        yAxisIndex: 0,
                        z: 5,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#127DE7',
                            },
                        },
                        data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
                    },
                    //柱
                    {
                        name: '缴存人数',
                        type: 'bar',
                        showBackground: false,
                        yAxisIndex: 0,
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
                                                color: '#1959DE',
                                            },
                                            {
                                                offset: 0.95,
                                                color: '#00DFFE',
                                            },
                                            {
                                                offset: 1,
                                                color: 'transparent',
                                            },
                                        ],
                                    );
                                    return colors;
                                },
                            },
                        },
                        barWidth: '16',
                        data: this.dataList.map((item) => {
                            return item.jcrs;
                        }),
                    },
                    //折线
                    {
                        name: '缴存金额',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            width: this.getFontSize(2),
                        },
                        symbol: 'circle',
                        symbolSize: this.getFontSize(8),
                        z: 6,
                        data: this.dataList.map((item) => {
                            return item.jcje;
                        }),
                        yAxisIndex: 1,
                        itemStyle: {
                            color: '#FFE227',
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
                        scriptId: 'jc_sjzhzsfx',
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
