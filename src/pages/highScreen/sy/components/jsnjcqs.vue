<template>
    <div class="df">
        <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
    </div>
</template>
<script>
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
                yData = [];
            this.dataList.forEach((item, index) => {
                xData.push(item.year);
                yData.push(item.jcje);
            });
            let option = {
                grid: {
                    left: '12%',
                    right: '10%',
                    top: '24%',
                    bottom: '20%',
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(124,220,255,0.5)',
                            width: this.getFontSize(2),
                        },
                    },
                    axisLabel: {
                        show: true,
                        rotate: 30,
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                        formatter: (params) => {
                            return params.slice(0, 4);
                        },
                    },
                    axisTick: { show: false },
                },
                yAxis: {
                    axisLabel: {
                        show: true,
                        fontSize: this.getFontSize(12),
                    },
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        return (
                            params[0].name +
                            '<br/>' +
                            params[0].marker +
                            ' 缴存金额: ' +
                            params[0].data +
                            '万元'
                        );
                    },
                },
                yAxis: {
                    type: 'value',
                    name: '万元',
                    nameTextStyle: {
                        color: '#ffffff',
                        padding: [
                            this.getFontSize(40),
                            this.getFontSize(44),
                            0,
                            0,
                        ],
                        fontSize: this.getFontSize(12),
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
                },
                series: [
                    {
                        data: yData,
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: this.getFontSize(8),
                        itemStyle: {
                            color: '#0EFDA5',
                        },
                        lineStyle: {
                            color: '#0EFDA5',
                            width: this.getFontSize(2),
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#0EFDA5', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.5,
                                        color: 'rgba(14,253,165,0.2)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'transparent', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
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
                        scriptId: 'sy_jsnjcqs',
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
