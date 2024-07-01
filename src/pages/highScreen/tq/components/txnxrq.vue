<template>
    <div>
        <chart class="w0 fg1" :chartData="chartData" ref="chart"></chart>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
            lxList: [
                "1~3月",
                "4~6月",
                "7~9",
                "10~12月",
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
    beforeDestroy() {
    },
    methods: {
        initChart() {
            this.lxList = [
                "1~3月",
                "4~6月",
                "7~9",
                "10~12月",

            ];
            let data1 = this.dataList[0].map(({rs}) => rs);
            let data2 = this.dataList[1].map(({rs}) => rs);
            let data3 = data1.map((item, index) => item + data2[index]);
            let ye1 = this.dataList[0].map(({ye}) => ye);
            let ye2 = this.dataList[1].map(({ye}) => ye);
            let lineData = ye1.map((value, index) => value + (ye2[index] || 0));

            this.chartData = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    },
                    backgroundColor: 'rgba(0,0,0,0.5)', // 提示框背景颜色
                    borderColor: '#34A8FB', // 提示框边框颜色
                    borderWidth: 1, // 提示框边框宽度
                    textStyle: {
                        color: '#ffffff',
                    },
                    formatter: function (params) {
                        const types = params[0].axisValue;
                        const details = params.slice(0, 2).map(param => `${param.marker}${param.seriesName}: ${param.value}人`).join('</br>');
                        const zhye = `</br>${params[5].marker}${params[5].seriesName}: ${params[5].value}亿元`
                        return `近${types}</br>${details}${zhye}`;
                    }
                },
                textStyle: {
                    color: "#ffffff"
                },
                color: ["#23CCB7", "#23CCB7", "#15E5BD", "#15E5BD"],
                grid: {
                    top: 48,
                    left: 16,
                    bottom: 16,
                    right: 16,
                    containLabel: true,
                },
                legend: {
                    selectedMode: false,
                    top: 6,
                    left: "center",
                    textStyle: {
                        color: "#ffffff",
                        fontSize: this.getFontSize(12)
                    },
                    icon: "rect",
                    itemHeight: this.getFontSize(12),
                    itemWidth: this.getFontSize(12)
                },
                xAxis: {
                    type: "category",
                    data: this.lxList,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            // color: "#7CDCFF"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: 20, //刻度标签与轴线之间的距离。
                        textStyle: {
                            fontFamily: "Microsoft YaHei",
                            color: "#ffffff"
                        }
                    }
                },
                yAxis: [
                    {
                        type: "value",
                        interval: 500,
                        name: "人",
                        nameTextStyle: {
                            padding: [0, 40, 0, 0]
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#B5B5B5"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: '	rgba(178,231,255,0.2)',
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: "#ffffff"
                        }
                    },
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
                ],
                series: [
                    {
                        data: data1,
                        yAxisIndex: 0,
                        stack: "zs",
                        type: "bar",
                        name: "男",
                        barMaxWidth: "auto",
                        barWidth: this.getFontSize(60),
                        itemStyle: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                type: "linear",
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#0093D7"
                                    },
                                    {
                                        offset: 1,
                                        color: "#76CCF3"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        data: data2,
                        yAxisIndex: 0,
                        stack: "zs",
                        type: "bar",
                        name: "女",
                        barMaxWidth: "auto",
                        barWidth: this.getFontSize(60),
                        itemStyle: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                type: "linear",
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#23CCB7"
                                    },
                                    {
                                        offset: 1,
                                        color: "#15E5BD "
                                    }
                                ]
                            }
                        }
                    },
                    {
                        data: data1,
                        yAxisIndex: 0,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [0, "-50%"],
                        symbolSize: [this.getFontSize(60), this.getFontSize(12)],
                        zlevel: 2,
                    },
                    {
                        data: data1,
                        yAxisIndex: 0,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [0, "-50%"],
                        symbolSize: [this.getFontSize(60), this.getFontSize(12)],
                        zlevel: 2
                    },
                    {
                        data: data3,
                        yAxisIndex: 0,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [0, "-50%"],
                        symbolSize: [this.getFontSize(60), this.getFontSize(12)],
                        zlevel: 2
                    },

                    {
                        name: '账户余额',
                        yAxisIndex: 1,
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 7,
                        color: '#EFCF40',
                        data: lineData,
                        zlevel: 4,
                        lineStyle: {
                            width: this.getFontSize(3),
                        },
                    },
                ]
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost("/api/dyncscript/scriptRule/query", {scriptId: "tq_ljtxnxrq"})
                    .then(res => {
                        let list = res.retBody.retList;
                        this.dataList = [[], []];
                        list.forEach((item) => {
                            if (item.xb === "1") {
                                this.dataList[0].push(item);
                            } else {
                                this.dataList[1].push(item);
                            }
                        });
                        resolve();
                    });
            });
        }
    }
};
</script>
<style scoped lang="scss"></style>
