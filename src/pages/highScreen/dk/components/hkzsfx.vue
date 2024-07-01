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
                yData = [],
                yData2 = [];
            this.dataList.forEach((item, index) => {
                // xData.push(item.ny.slice(0, 5) + "\n" + item.ny.slice(5) + "    ");
                xData.push(item.ny);
                yData.push(item.hkbs);
                yData2.push(item.hkje);
            });
            let option = {
                color: ['#04BBFF ', '#EFCF40'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        return (
                            params[0].axisValue +
                            '<br/>' +
                            params[0].marker +
                            params[0].seriesName +
                            ' : ' +
                            params[0].data +
                            '笔' +
                            '<br/>' +
                            params[1].marker +
                            params[1].seriesName +
                            ' : ' +
                            params[1].data +
                            '万元'
                        );
                    },
                },
                legend: {
                    //位置需要与color对应，方可得到相应颜色
                    top: '15%',
                    // data: ["回款笔数", "回款金额"],
                    itemWidth: this.getFontSize(15),
                    itemHeight: this.getFontSize(8),
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(14),
                    },
                },
                grid: {
                    top: '80px',
                    left: '20px',
                    right: '20px',
                    bottom: '0',
                    containLabel: true
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
                            interval: 0,
                            margin: 20,
                            fontSize: this.getFontSize(12)
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '笔',
                        interval:100,
                        nameTextStyle: {
                            color: '#ffffff',
                            fontSize: this.getFontSize(12),
                            padding: [0, this.getFontSize(20), 0, 0],
                        },
                        axisLabel: {
                            show: true,
                            color: '#ffffff',
                            fontSize: this.getFontSize(12),
                            // formatter: function(v) {
                            //   return v > 0 ? v : -v;
                            // }
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
                        name: '万元',
                        interval:100,
                        nameTextStyle: {
                            color: '#ffffff',
                            fontSize: this.getFontSize(12),
                            padding: [0, 0, 0, this.getFontSize(40)],
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
                        name: '回款笔数',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: yData,
                        barWidth: '50%',
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#27E6AB', // 0% 处的颜色
                                    },
                                    {
                                      offset: 0.5,
                                      color: "#146175"
                                    },
                                    {
                                        offset: 1,
                                        color: '#031131', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                    },
                    {
                        name: '回款金额',
                        type: 'line',
                        color: 'yellow',
                        data: this.dataList.map((item) => {
                            return item.hkje;
                        }),
                        zlevel: 4,
                        yAxisIndex: 1,
                        lineStyle: {
                            width: this.getFontSize(3),
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
                        scriptId: 'dk_hkzsfx',
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
