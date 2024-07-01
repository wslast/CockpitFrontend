<template>
    <chart :chartData="chartData" ref="chart"></chart>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
            color: [
                'rgba(95,242,228,1.000)',
                'rgba(0,122,225,1.000)',
                'rgba(228,163,61,1.000)',
                'rgba(58,175,121,1.000)',
                'rgba(222,45,104,1.000)',
            ],
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
            let monthList = [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
            ];
            let series = [];
            this.dataList.forEach((item, index) => {
                series.push({
                    name: item.year,
                    type: 'line',
                    data: item.showData,
                    smooth: true,
                  symbol: 'none',
                    areaStyle: {
                        shadowColor: this.color[index],
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: this.color[index], // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'transparent', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    lineStyle: {
                        color: this.color[index],
                        width:this.getFontSize(2.5)
                    },
                });
            });
            let option = {
                color: this.color,
                title: {
                    text: '实缴金额走势分析图',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(22),
                    },
                    left: '46px',
                    top: '0%',
                },

                legend: {
                    top: '1%',
                    left: '56%',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                    },
                    icon: 'rect',
                    itemHeight: this.getFontSize(4),
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        return (
                            params[0].marker +
                            params[0].seriesName +
                            '年' +
                            params[0].axisValue +
                            ' : ' +
                            params[0].data +
                            '万元' +
                            '<br/>' +
                            params[1].marker +
                            params[1].seriesName +
                            '年' +
                            params[1].axisValue +
                            ' : ' +
                            params[1].data +
                            '万元' +
                            '<br/>' +
                            params[2].marker +
                            params[2].seriesName +
                            '年' +
                            params[2].axisValue +
                            ' : ' +
                            params[2].data +
                            '万元' +
                            '<br/>' +
                            params[3].marker +
                            params[3].seriesName +
                            '年' +
                            params[3].axisValue +
                            ' : ' +
                            params[3].data +
                            '万元' +
                            '<br/>' +
                            params[4].marker +
                            params[4].seriesName +
                            '年' +
                            params[4].axisValue +
                            ' : ' +
                            params[4].data +
                            '万元'
                        );
                    },
                },
                grid: {
                    left: '12%',
                    top: '20%',
                    right: '12%',
                    bottom: '15%',
                },
                xAxis: {
                    type: 'category',
                    data: monthList,
                    boundaryGap: false,
                    nameGap:"15",
                    axisTick: {
                        show: true,
                        length: this.getFontSize(15),
                      inside:false,
                        lineStyle: {
                            color: 'rgba(178,231,255,0.5)',

                        },
                    },
                    axisLabel: {
                        show: true,
                        color: '#ffffff',
                        margin: this.getFontSize(38),
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ffffff',
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(178,231,255,0.5)',
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    name: '万元',
                    nameTextStyle: {
                        color: '#ffffff',
                        padding: [0, this.getFontSize(40), 0, 0],
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        color: '#ffffff',
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ffffff',
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                },
                series: series,
            };
            this.chartData = option;
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'tq_tqzsfxt',
                    })
                    .then((res) => {
                        let list = res.retBody.retList;
                        let year = '';
                        let showdata = [];
                        let pdata = [];
                        list.forEach((item, index) => {
                            if (year != item.year) {
                                if (showdata.length > 0) {
                                    let data = {
                                        year: year,
                                        showData: showdata,
                                        data: pdata,
                                    };
                                    this.dataList.push(data);
                                }
                                showdata = [];
                                pdata = [];
                                year = item.year;
                                showdata.push(item.je);
                                pdata.push(item);
                            } else {
                                showdata.push(item.je);
                                pdata.push(item);
                            }
                        });
                        if (showdata.length > 0) {
                            let data = {
                                year: year,
                                showData: showdata,
                                data: pdata,
                            };
                            this.dataList.push(data);
                        }
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
.bg {
    background-image: url('../../../../assets/images/dp/tq/center_table_bg.png');
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
