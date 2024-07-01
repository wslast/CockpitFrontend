<template>
    <div class="h100percent df">
        <chart :chartData="chartData" class="w0 fg1" ref="chart"></chart>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataList: [],
            chartData: {},
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
            let yData = [],
                xData = [],
                xData2 = [];
            this.dataList.forEach((item, index) => {
                yData.push(item.lx);
                xData.push(item.yqbs);
                xData2.push(item.yqje);
            });
            let option = {
                legend: {
                    left: 'center',
                    top: '2%',
                    itemWidth: this.getFontSize(20.7),
                    itemHeight: this.getFontSize(2.7),
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        let unit =
                            params[0].seriesName == '逾期笔数' ? '笔' : '万元';
                        return (
                            params[0].axisValue +
                            '<br/>' +
                            params[0].marker +
                            params[0].seriesName +
                            ' : ' +
                            params[0].data +
                            unit
                        );
                    },
                },
                grid: [
                    {
                        top: '15%',
                        right: '50%',
                        left: '25%',
                        bottom: '0%',
                        // show: true,
                    },
                    {
                        top: '15%',
                        left: '50%',
                        right: '15%',
                        bottom: '0%',
                        // show: true,
                    },
                ],
                xAxis: [
                    {
                        type: 'value',
                        gridIndex: 0,
                        inverse: true,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        // name: " 单位:(笔数)",
                        // nameGap: 5,
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        type: 'value',
                        gridIndex: 1,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        // name: " 单位:(百万元)",
                        // nameGap: 0,
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: 'category',
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            color: '#ffffff',
                            padding: [0, this.getFontSize(28), 0, 0],
                        },
                        data: yData,
                    },
                    {
                        gridIndex: 1,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        type: 'category',
                        data: yData,
                        // position: 'right'
                    },
                ],

                series: [
                    {
                        type: 'bar',
                        name: '逾期笔数',
                        barWidth: '50%',
                        seriesLayoutBy: 'row',
                        data: xData,
                        label: {
                            show: true,
                            position: 'outside',
                            color: '#00EAFF',
                        },
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#4BFAAC', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#0EF08C', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                            borderRadius: this.getFontSize(6),
                        },
                    },
                    {
                        type: 'bar',
                        name: '逾期金额(万元)',
                        barWidth: '50%',
                        seriesLayoutBy: 'row',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: xData2,
                        label: {
                            show: true,
                            color: '#00EAFF',
                            position: 'outside',
                        },
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#00BCF6', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#006AFF', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                            borderRadius: this.getFontSize(6),
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
                        scriptId: 'dk_dkyqqk',
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
