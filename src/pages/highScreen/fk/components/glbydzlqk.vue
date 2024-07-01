<!--
 * @Author: 王硕
 * @LastEditors: Please set LastEditors
 * @Description:  管理部疑点整改情况
-->
<template>
    <div>
        <chart ref="chart" :chartData="chartData"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    name: 'glbydzlqk',
    data() {
        return {
            chartData: {},
            dataList: []
        };
    },
    async mounted() {
        await this.getData();
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {
            let cldkbsData = this.dataList.map((item) => item.sl);
            let xData = this.dataList.map((item) => item.qx);
            this.chartData = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: function(params) {
                        return (
                            params[0].name +
                            '<br/>' +
                            params[0].marker +
                            '整改总量 : ' +
                            params[0].value
                        );
                    },
                },
                grid: {
                    left: '20px',
                    right: '20px',
                    top: '40px',
                    bottom: '0',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(178,231,255,0.500)',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        fontSize: this.getFontSize(12),
                        interval: 0,
                        color: '#ffffff',
                        rotate: 30,
                    },
                },
                yAxis: [
                    {
                        name: '个',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(-40), 0, 0],
                        },
                        show: true,
                        min: 0,
                        type: 'value',
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            fontSize: this.getFontSize(14),
                            interval: 0,
                            color: '#ffffff',
                        },
                    },
                ],
                series: [
                    {
                        data: cldkbsData,
                        stack: 'zs',
                        type: 'bar',
                        name: '数量',
                        barMaxWidth: 'auto',
                        barWidth: this.getFontSize(24),
                        itemStyle: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                type: 'linear',
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#04CAF9',
                                    },
                                    {
                                        offset: 1,
                                        color: '#156DE3',
                                    },
                                ],
                            },
                        },
                    },
                    {
                        data: cldkbsData,
                        type: 'pictorialBar',
                        barMaxWidth: '20',
                        symbolPosition: 'end',
                        symbol: 'diamond',
                        symbolOffset: [0, '-50%'],
                        symbolSize: [this.getFontSize(24), this.getFontSize(8)],
                        zlevel: 2,
                        itemStyle: {
                            color: '#156DE3',
                        },
                    },
                ],
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'fk_sp_glbydzgqk',
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
