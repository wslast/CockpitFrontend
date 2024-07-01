<template>
    <div>
        <chart :chartData="chartData" ref="chart"></chart>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
            lxList: [
                "2019年",
                "2020年",
                "2021年",
                "2022年",
                "2023年",
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
                "2019年",
                "2020年",
                "2021年",
                "2022年",
                "2023年",
            ];
            let yData = [],
                yData2 = [],
                yData3 = [],
                yData4 = []

            let data1 = this.dataList[0].map((item, index) => {
                yData.push(item.stftb)
                yData2.push(item.stfhb)
                return item.srs;
            });
            let data2 = this.dataList[1].map((item, index) => {
                yData3.push(item.etftb)
                yData4.push(item.etfhb)
                return item.ers;
            });
            let data3 = data1.map((item, index) => {
                return item + data2[index];
            });

            this.chartData = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.7)', // 提示框背景颜色
                    borderColor: '#34A8FB', // 提示框边框颜色
                    borderWidth: 1, // 提示框边框宽度
                    axisPointer: {
                        type: 'none' // 设置 axisPointer 类型为 none，取消小圆点显示
                    },
                    formatter: (params) => {
                        const [
                            {name: seriesName},
                            {value: srs},
                            {value: ers},
                            {},
                            {},
                            {value: stftb},
                            {value: stfhb},
                            {value: etftb},
                            {value: etfhb}
                        ] = params;
                        console.log(params, 'params888')
                        return `
            <div style="display: flex; justify-content: space-between; width: 170px; height: 80px">
            <div style="display: flex; flex-direction: column; justify-content: space-between">
                <div style="font-size: 14px; font-weight: bold; color: #01D8FF; font-family: MicrosoftYaHei, MicrosoftYaHei,serif;">
                    ${seriesName}
                </div>
                <div style="font-size: 12px; color: #01D8FF; font-family: MicrosoftYaHei, MicrosoftYaHei,serif; padding-top: 5px">
                   <div style="text-align: right;color: #FFFFFF">笔</div>
                    <div><span style="font-size: 12px; font-weight: normal; color: #FFFFFF">首套房：</span> ${srs}</div>
                    <div><span style="font-size: 12px; font-weight: normal; color: #FFFFFF">二套房：</span> ${ers}</div>
                </div>
            </div>
            <div>

                <div style="min-width: 85px;font-size: 12px; color: #FFFFFF; font-family: MicrosoftYaHei, MicrosoftYaHei,serif; display: flex; justify-content: space-between;padding-top: 25px">
                    <div style="flex: 1">
                        <div style="padding-bottom: 5px">同比</div>
                        <div style="color: #01D8FF; margin-top: -5px">${stftb}</div>
                        <div style="color: #01D8FF;">${etftb}</div>
                    </div>
                    <div style="flex: 1">
                        <div style="padding-bottom: 5px">环比</div>
                        <div style="color: #01D8FF; margin-top: -5px">${stfhb}</div>
                        <div style="color: #01D8FF;">${etfhb}</div>
                    </div>
                </div>
            </div>
        </div>
        `;
                    },
                },
                textStyle: {
                    color: "#ffffff"
                },
                color: ["#0D96EC ", "#0D96EC", "#0D96EC", "#0D96EC"],
                grid: {
                    containLabel: true,
                    left: "5%",
                    top: "20%",
                    bottom: "2%",
                    right: "5%"
                },
                legend: {
                    selectedMode: false,
                    top: "5%",
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
                yAxis: {
                    type: "value",
                    interval: 1000,
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
                            color: 'rgba(178,231,255,0.2)',
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: "#ffffff"
                    }
                },
                series: [
                    {
                        data: data1,
                        stack: "zs",
                        type: "bar",
                        name: "首套房",
                        barMaxWidth: "auto",
                        barWidth: this.getFontSize(40),
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
                                        color: "#31EA98"
                                    },
                                    {
                                        offset: 1,
                                        color: "#31EA98"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        data: data2,
                        stack: "zs",
                        type: "bar",
                        name: "二套房",
                        barMaxWidth: "auto",
                        barWidth: this.getFontSize(40),
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
                                        color: "#1374E5"
                                    },
                                    {
                                        offset: 1,
                                        color: "#09ACF2"
                                    }
                                ]
                            }
                        }
                    },

                    {
                        data: data3,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [0, "-50%"],
                        symbolSize: [this.getFontSize(40), this.getFontSize(12)],
                        zlevel: 2
                    },
                    {
                        data: data1,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [0, "-50%"],
                        symbolSize: [this.getFontSize(40), this.getFontSize(12)],
                        zlevel: 2,
                    },
                    {
                        data: data1,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [0, "-50%"],
                        symbolSize: [this.getFontSize(40), this.getFontSize(12)],
                        zlevel: 2
                    },
                    {
                        name: '',
                        type: 'line', // 选择一个图表类型
                        symbol: 'none', // 隐藏图形符号
                        showSymbol: false, // 确保图形符号不显示
                        itemStyle: {
                            normal: {
                                color: 'transparent', // 设置图形颜色为透明
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'transparent', // 设置线条颜色为透明
                                width: 0, // 设置线条宽度为 0
                            }
                        },
                        data: yData,
                    },
                    {
                        name: '',
                        type: 'line', // 选择一个图表类型
                        symbol: 'none', // 隐藏图形符号
                        showSymbol: false, // 确保图形符号不显示
                        itemStyle: {
                            normal: {
                                color: 'transparent', // 设置图形颜色为透明
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'transparent', // 设置线条颜色为透明
                                width: 0, // 设置线条宽度为 0
                            }
                        },
                        data: yData2,
                    },
                    {
                        name: '',
                        type: 'line', // 选择一个图表类型
                        symbol: 'none', // 隐藏图形符号
                        showSymbol: false, // 确保图形符号不显示
                        itemStyle: {
                            normal: {
                                color: 'transparent', // 设置图形颜色为透明
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'transparent', // 设置线条颜色为透明
                                width: 0, // 设置线条宽度为 0
                            }
                        },
                        data: yData3,
                    },
                    {
                        name: '',
                        type: 'line', // 选择一个图表类型
                        symbol: 'none', // 隐藏图形符号
                        showSymbol: false, // 确保图形符号不显示
                        itemStyle: {
                            normal: {
                                color: 'transparent', // 设置图形颜色为透明
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'transparent', // 设置线条颜色为透明
                                width: 0, // 设置线条宽度为 0
                            }
                        },
                        data: yData4,
                    },
                ]
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost("/api/dyncscript/scriptRule/query", {scriptId: "dk_dkcsfx"})
                    .then(res => {
                        let list = res.retBody.retList;
                        this.dataList = [[], []];
                        list.forEach((item, index) => {
                            if (item.xb == "1") {
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
