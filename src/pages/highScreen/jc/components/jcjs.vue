<template>
    <div>
        <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
    </div>
</template>
<script>


export default {
    data() {
        return {
            chartData: {},
            resData: {
                yearList: ['2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年'],
                pjs: [3830, 4327, 4491, 5300, 6192, 6555, 6887, 7233, 7649, 8011],
                zws:[1543, 3830, 3999, 4491, 5192, 5655, 5887, 6740, 6890, 7300],
                zs: [3630, 4027, 4091, 5000, 6092, 6055, 6087, 7033, 7049, 8011],
            },
            optionConfig: [
                {name: '平均数',color:'#0EFDA5',dataKey:'pjs'},
                {name: '中位数',color:'#007AE1',dataKey:'zws'},
                {name: '众数',color:'#E4A33D',dataKey:'zs'},
            ],
            optionConfigSeries: [
                {name: '平均数',color:'#0EFDA5',dataKey:'pjs'},
                {name: '中位数',color:'#5FF2E4',dataKey:'zws'},
                {name: '众数',color:'#E4A33D',dataKey:'zs'},
            ]

        };
    },
    computed: {},
    watch: {},
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
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
                grid: {
                    right: "16px",
                    top: '30px',
                    bottom: "15%"
                },
                legend: {
                    textStyle: { // 图例文字样式
                        color: '#ffffff',// 设置图例文字颜色为白色
                    },
                    itemWidth: this.getFontSize(19),
                    itemHeight: this.getFontSize(4),
                    data: this.optionConfig.map(({name,color}) => ({
                        name,
                        icon: 'rect',
                        itemStyle:{
                            color:color
                        }
                    }))
                },
                xAxis: {
                    type: "category",
                    data: this.resData.yearList,
                    axisLabel: {
                        show: true,
                        rotate: 30,
                        color: "#ffffff",
                        fontSize: this.getFontSize(12),
                        margin:10
                    },
                    axisTick: {show: false}
                },
                tooltip: {
                    show: true,
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    },
                    textStyle: {
                        fontSize: this.getFontSize(12)
                    },
                    formatter: params => {
                        return (
                            // todo
                            params[0].marker + params[0].name + " : " + params[0].data + "元"
                        );
                    }
                },
                yAxis: {
                    type: "value",
                    name: "元",
                    min: function (value) {
                        return value.min - 20;
                    },
                    max: function (value) {
                        return value.max + 20;
                    },
                    nameTextStyle: {
                        color: "#ffffff",
                        padding: [0, this.getFontSize(32), 0, 0],
                        fontSize: this.getFontSize(12)
                    },
                    axisLabel: {
                        color: "#ffffff",
                        fontSize: this.getFontSize(12)
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(178,231,255,0.3)"
                        }
                    }
                },
                series: this.optionConfigSeries.map(({name,dataKey,color}) => ({
                    name,
                    data: this.resData[dataKey],
                    type: "line",
                    symbol: "circle",
                    symbolSize: this.getFontSize(8),
                    itemStyle: {
                        color
                    },
                    lineStyle: {
                        color,
                        width: this.getFontSize(2)
                    },
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0.95,
                            y: 0.08,
                            x2: 1,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color // 0% 处的颜色
                                },
                                {
                                    offset: 0.1,
                                    color // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "transparent" // 100% 处的颜色
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    }
                }))
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost("/api/dyncscript/scriptRule/query", {scriptId: "jc_jcjsfx"})
                    .then(res => {
                        this.dataList = res.retBody.retList;
                        resolve();
                    });
            });
        }
    }
};
</script>
