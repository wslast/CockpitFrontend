<template>
    <div>
        <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            chartData: {},
        };
    },
    async mounted() {
        await this.getData();
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {
            let xData = this.dataList.map(({year}) => year);
            let yData1 = this.dataList.map(({gftqbs}) => gftqbs);
            let yData2 = this.dataList.map(({gftqje}) => gftqje);
            this.chartData = {
                color: ['#04BBFF', '#EFCF40'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    backgroundColor: 'rgba(0,0,0,0.5)', // 提示框背景颜色
                    borderColor: '#34A8FB', // 提示框边框颜色
                    borderWidth: 1, // 提示框边框宽度
                    textStyle: {
                        color: '#ffffff',
                    },
                    formatter: (params) => {
                        return (
                            params[0].axisValue +
                            '<br/>' +
                            params[0].marker +
                            params[0].seriesName +
                            ' : ' +
                            params[0].data +
                            '亿元' +
                            '<br/>' +
                            params[2].marker +
                            params[2].seriesName +
                            ' : ' +
                            params[2].data +
                            '笔'
                        );
                    },
                },
                legend: {
                    top: 6,
                    data: ['购房提取金额', '购房提取笔数'],
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(14),
                    }
                },
                grid: {
                    top: 48,
                    left: 16,
                    bottom: 8,
                    right: 16,
                    containLabel: true,
                },
                xAxis: [
                    {
                        data: xData,
                        type: 'category',
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
                            interval: 0,
                            fontSize: this.getFontSize(12),
                            formatter: (params) => params.slice(0, 4),
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '亿元',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(30), 0, 0],
                            fontSize: this.getFontSize(12),
                        },
                        axisLabel: {
                            fontSize: this.getFontSize(12),
                            show: true,
                            color: '#ffffff',
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
                        name: '笔',
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
                        name: '购房提取金额',
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0,
                        data: yData2,
                    },
                    {
                        name: '购房提取金额',
                        type: 'pictorialBar',
                        itemStyle: {
                            color: '#080A3D',
                        },
                        symbolSize: ['100%', this.getFontSize(5)],
                        yAxisIndex: 0,
                        data: yData2,
                        symbol: 'rect',
                        symbolRepeat: 'fixed',
                        symbolPosition: 'start',
                        symbolMargin: this.getFontSize(10),
                        symbolClip: true,
                        zlevel: 2,
                        symbolOffset: [0, this.getFontSize(-12)],
                    },
                    {
                        name: '购房提取笔数',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 7,
                        color: '#EFCF40',
                        data: yData1,
                        zlevel: 4,
                        yAxisIndex: 1,
                        lineStyle: {
                            width: this.getFontSize(3),
                        },
                    },
                ],
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'tq_gftqfx',
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
