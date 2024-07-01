<template>
    <div class="df bg" style="position: relative;">
        <div class="icon"></div>
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
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                if (val && Object.keys(val).length > 0 && this.chart) {
                    this.chart.dispose();
                    this.chart = null;

                    this.chart = echarts.init(this.$el);
                    // if(val.is3d) {
                    //   this.chart = echartsGL.init(this.$el);
                    // }else {
                    //   this.chart = echarts.init(this.$el);
                    // }
                    this.chart.setOption(val);
                }
            },
        },
    },
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
            let option = {
                tooltip: {
                    show: true,
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        let showData =
                            params.marker +
                            params.name +
                            params.seriesName +
                            ' : ' +
                            params.data;
                        let unit = params.seriesName.includes('金额')
                            ? '万元'
                            : '万人';
                        return showData + unit;
                    },
                },
                title: {
                    text: '实缴账户管理部分析',
                    textStyle: {
                        color: '#ffffff',
                        fontWeight: 'bolder',
                        fontSize: this.getFontSize(22),
                    },
                    left: '4%',
                    top: '0%',
                },
                legend: {
                    show: true,
                    top: '0%',
                    right: '8%',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(14),
                    },
                    itemWidth: this.getFontSize(25),
                    itemHeight: this.getFontSize(14),
                    data: ['实缴人数(万人)', '实缴金额(万元)'],
                },
                grid: [
                    // 左边柱子
                    {
                        show: false,
                        left: '8%',
                        top: '7%',
                        bottom: '8%',
                        containLabel: true,
                        width: '38%',
                    },
                    // 中间
                    {
                        show: false,
                        left: '51%',
                        top: '7%',
                        bottom: '11.8%',
                        width: '10%',
                    },
                    // 右边柱子
                    {
                        show: false,
                        right: '8%',
                        top: '7%',
                        bottom: '8%',
                        containLabel: true,
                        width: '38%',
                    },
                ],
                xAxis: [
                    {
                        name: '',
                        nameLocation: 'start',
                        type: 'value',
                        inverse: true,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                            length: this.getFontSize(15),
                            lineStyle: {
                                color: '#3C67AF',
                            },
                        },
                        axisLabel: {
                            show: true,
                            color: '#ffffff',
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#3C67AF',
                            },
                        },
                    },
                    {
                        gridIndex: 1,
                        show: false,
                    },
                    {
                        name: '',
                        nameLocation: 'start',
                        nameTextStyle: {
                            color: '#9ca0bd',
                            fontSize: this.getFontSize(12),
                            padding: [
                                this.getFontSize(30),
                                this.getFontSize(-55),
                                0,
                                0,
                            ],
                        },
                        gridIndex: 2,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                            length: this.getFontSize(15),
                            lineStyle: {
                                color: '#3C67AF',
                            },
                        },
                        axisLabel: {
                            show: true,
                            color: '#ffffff',
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#3C67AF',
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'category',
                        inverse: true,
                        position: 'right',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        data: this.dataList.map((item, index) => {
                            return item.qx;
                        }),
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        inverse: true,
                        position: 'center',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            align: 'center',
                            color: '#ffffff',
                            fontSize: this.getFontSize(14),
                            backgroundColor: '#0A379C',
                            borderRadius: this.getFontSize(5),
                            padding: [0, 10, 0, 10],
                        },
                        data: this.dataList.map((item, index) => {
                            return item.qx;
                        }),
                    },
                    {
                        gridIndex: 2,
                        type: 'category',
                        inverse: true,
                        position: 'left',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        data: this.dataList.map((item, index) => {
                            return item.qx;
                        }),
                    },
                ],
                series: [
                    {
                        name: '实缴人数(万人)',
                        type: 'bar',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        barWidth: this.getFontSize(15),
                        // showBackground: true,
                        itemStyle: {
                            barBorderRadius: this.getFontSize(5),
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: '#4BFAAC',
                                    },
                                    {
                                        offset: 1,
                                        color: '#0EF08C',
                                    },
                                ],
                            ),
                        },
                        label: {
                            show: true,
                            position: 'left',
                            color: '#ffffff',
                        },
                        data: this.dataList.map((item, index) => {
                            return item.sjrs;
                        }),
                    },
                    {
                        name: '实缴金额(万元)',
                        type: 'bar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        barWidth: this.getFontSize(15),
                        // showBackground: true,
                        itemStyle: {
                            barBorderRadius: this.getFontSize(5),
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: '#006AFF',
                                    },
                                    {
                                        offset: 1,
                                        color: '#00BCF6 ',
                                    },
                                ],
                            ),
                        },
                        label: {
                            show: true,
                            position: 'right',
                            color: '#ffffff',
                        },
                        data: this.dataList.map((item, index) => {
                            return item.sjje;
                        }),
                    },
                ],
            };
            this.chartData = option;
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_sjzhglfx',
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
<style scoped lang="scss">
.bg {
    background-image: url('../../../../assets/images/dp/jc-old/center_table_bg.png');
    background-repeat: no-repeat;
    background-size: 100% calc(100% - 20.006px);
    background-position: top 20.006px center;
}
.icon {
    background-image: url('../../../../assets/images/dp/dk/little_title.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 279.994px;
    height: 32.006px;
    position: absolute;
}
</style>
