<!--
 * @Author: 王硕
 * @LastEditors: Please set LastEditors
 * @Description: 疑点数疑点率趋势
-->
<template>
    <div>
        <chart ref="chart" :chartData="chartData"></chart>
    </div>
</template>

<script>
export default {
    name: 'ydsydlqs',
    components: {},

    data() {
        return {
            chartData: {},
            dataList: []
        };
    },
    async mounted() {
        await this.getData();
        this.$nextTick(() => {
            this.initChart();
        });
    },
    methods: {
        initChart() {
            this.chartData = {
                title: {
                    text: '疑点数疑点率趋势',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(22),
                    },
                    left: '48px',
                    top: '0%',
                },
                legend: {
                    top: '5px',
                    right: '5%',
                    data: ['疑点率', '疑点数'],
                    textStyle: {
                        color: '#fff',
                    },
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    formatter: function (params) {
                        let res = params[0].axisValue + '<br/>';
                        res +=
                            params[0].seriesName +
                            '：' +
                            params[0].value +
                            '%<br/>';
                        res +=
                            params[1].seriesName +
                            '：' +
                            params[1].value +
                            '个<br/>';
                        return res;
                    },
                },
                grid: {
                    left: '107px',
                    top: '95px',
                    right: '110px',
                    bottom: '64px',
                },
                xAxis: [{
                    type: 'category',
                    data: this.dataList.map((item) => item.ny),
                    axisPointer: {
                        type: 'shadow',
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(178, 231, 255, .3)',
                        },
                    },
                    axisLabel: {
                        color: '#fff',
                        margin: 20,
                    },
                },],
                yAxis: [{
                    type: 'value',
                    name: '个',
                    nameTextStyle: {
                        color: '#FFF',
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(178, 231, 255, .3)',
                        },
                    },
                    axisLabel: {
                        formatter: '{value}',
                        color: '#fff',
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(178, 231, 255, .3)',
                        },
                    },
                },
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value} %',
                            color: '#fff',
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(178, 231, 255, .3)',
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(178, 231, 255, .3)',
                            },
                        },
                    },
                ],
                series: [{
                    name: '疑点率',
                    type: 'line',
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: true, //平滑曲线显示
                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 6, //标记的大小
                    itemStyle: {
                        normal: {
                            color: 'rgba(239, 54, 40, 1)',
                            borderColor: 'rgba(239, 54, 40, 1)', //圆点透明 边框
                            borderWidth: 6,
                        },
                    },
                    lineStyle: {
                        color: 'rgba(239, 54, 40, 1)',
                    },
                    data: this.dataList.map((item) => item.ydl),
                },
                    {
                        //柱底圆片
                        name: '疑点数',
                        yAxisIndex: 0,
                        type: 'pictorialBar',
                        symbolSize: [20, 10], //调整截面形状
                        symbolOffset: [0, 5],
                        z: 12,
                        tooltip: {
                            show: true,
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#f19515', // 0% 处的颜色
                                    },
                                        {
                                            offset: 1,
                                            color: '#f19515', // 100% 处的颜色
                                        },
                                    ],
                                    global: false, // 缺省为 false
                                },
                            },
                        },
                        data: this.dataList.map((item) => item.yds),
                    },
                    {
                        name: '疑点数',
                        type: 'bar',
                        barWidth: 20,
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#f4a73d', // 0% 处的颜色
                                    },
                                        {
                                            offset: 1,
                                            color: '#df8f21', // 100% 处的颜色
                                        },
                                    ],
                                    global: false, // 缺省为 false
                                },
                            },
                        },
                        data: this.dataList.map((item) => item.yds),
                    },
                    {
                        name: '疑点数',
                        type: 'pictorialBar',
                        yAxisIndex: 0,
                        symbolSize: [20, 10], //调整截面形状
                        symbolOffset: [0, -5],
                        z: 12,
                        label: {
                            show: false,
                        },
                        tooltip: {
                            show: false,
                        },
                        symbolPosition: 'end',
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#f9cf94', // 0% 处的颜色
                                    },
                                        {
                                            offset: 1,
                                            color: '#f9cf94', // 100% 处的颜色
                                        },
                                    ],
                                    global: false, // 缺省为 false
                                },
                            },
                        },
                        data: this.dataList.map((item) => item.yds),
                    },
                ],
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost("/api/dyncscript/scriptRule/query", {
                        scriptId: "fk_sp_ydsydlfbqs"
                    })
                    .then(res => {
                        this.dataList = res.retBody.retList;
                        resolve()
                    });
            })
        },
    },
};
</script>
