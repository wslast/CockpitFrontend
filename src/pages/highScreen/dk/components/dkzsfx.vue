<template>
    <div class="chartbox">
        <chart :chartData="chartData" class="w0 fg1"></chart>
        <div class="btnbox">
            <div class="bgselect"   @click="handleRight='近12个月'"  :class="handleRight=='近12个月'?'near12s':'near12d'" >近12个月</div>
            <div class="bgselect"   @click="handleRight='近五年'" :class="handleRight=='近五年'?'near5s':'near5d'" >近五年</div>
        </div>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            handleRight:'近五年',
            chartData: {},
            dataList: [],
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
            let xData = [],
                yData2 = [],
                yData3 = [],
                yData4 = [],
                yData5 = [],
                yData6 = [],
                yData7 = [],
                yData8 = []
            this.dataList.forEach((item) => {
                xData.push(item.year)
            });
            this.dataList.forEach((item) => {
                yData2.push(item.ecdkbs);
            });
            this.dataList.forEach((item) => {
                yData3.push(item.fkje);
            });
            this.dataList.forEach((item) => {
                yData4.push(item.gdl);
            });
            this.dataList.forEach((item) => {
                yData5.push(item.tbt);
            });
            this.dataList.forEach((item) => {
                yData6.push(item.tbb);
            });

            this.dataList.forEach((item) => {
                yData7.push(item.hbt);
            });

            this.dataList.forEach((item) => {
                yData8.push(item.hbb);
            });

            this.chartData = {
                title: {
                    text: '放款走势分析',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 22,
                    },
                    top: '0.3%',
                    left: '5%',
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.7)', // 提示框背景颜色
                    borderColor: '#34A8FB', // 提示框边框颜色
                    borderWidth: 1, // 提示框边框宽度
                    axisPointer: {
                        type: 'shadow' // 设置 axisPointer 类型为 none，取消小圆点显示
                    },
                    formatter: (params) => {
                        const [
                            { name: seriesName },
                            { value: valuet },
                            { value: valueb },
                            { value: gdl },
                            { value: tbt },
                            { value: tbb },
                            { value: hbt },
                            { value: hbb }
                        ] = params;

                        return `
            <div style="display: flex; justify-content: space-between; width: 184px; height: 100px">
            <div style="display: flex; flex-direction: column; justify-content: space-between">
                <div style="font-size: 14px; font-weight: bold; color: #01D8FF; font-family: MicrosoftYaHei, MicrosoftYaHei,serif;">
                    ${seriesName}
                </div>
                <div style="font-size: 18px; font-weight: bold; color: #FFC35A; font-family: MicrosoftYaHei, MicrosoftYaHei,serif; padding-top: 5px">
                    <div>${valuet}<span style="font-size: 10px; font-weight: normal; color: #FFFFFF">&nbsp; 笔</span></div>
                    <div>${valueb}<span style="font-size: 10px; font-weight: normal; color: #FFFFFF">&nbsp; 亿元</span></div>
                </div>
            </div>
            <div>
                <div style="font-size: 14px; color: #FFFFFF; font-family: MicrosoftYaHei, MicrosoftYaHei,serif;">
                    个贷率：<span style="color:#01D8FF ">${gdl}</span>
                </div>
                <div style="font-size: 12px; color: #FFFFFF; font-family: MicrosoftYaHei, MicrosoftYaHei,serif; display: flex; padding-top: 15px">
                    <div style="flex: 1">
                        <div style="padding-bottom: 5px">同比</div>
                        <div style="color: #01D8FF; margin-top: -5px">${tbt}</div>
                        <div style="color: #01D8FF;">${tbb}</div>
                    </div>
                    <div style="flex: 1">
                        <div style="padding-bottom: 5px">环比</div>
                        <div style="color: #01D8FF; margin-top: -5px">${hbt}</div>
                        <div style="color: #01D8FF;">${hbb}</div>
                    </div>
                </div>
            </div>
        </div>
        `;
                    },
                },
                grid: {
                    left: '108px',
                    top: '96px',
                    right: '110px',
                    bottom: '64px',
                },
                legend: {
                    itemGap: 25,
                    show: true,
                    selectedMode: false,
                    top: '1%',
                    right: '30%',
                    itemWidth: this.getFontSize(22),
                    itemHeight: this.getFontSize(8),
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: this.getFontSize(14),
                    },
                },
                xAxis: [
                    {
                        data: xData,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: this.getFontSize(12),
                            },
                            margin: this.getFontSize(20), //刻度标签与轴线之间的距离。
                        },

                        axisLine: {
                            show: true, //不显示x轴
                            lineStyle: {
                                color: '#B2E7FF',
                            },
                        },
                        axisTick: {
                            show: false, //不显示刻度
                        },
                        boundaryGap: true,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: 'solid',
                                color: '	rgba(178,231,255,0.5)',
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        name: '笔',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(24), 0, 0],
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '	rgba(178,231,255,0.5)',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '	rgba(178,231,255,0.5)',
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: this.getFontSize(12),
                            },
                        },
                    },
                    {
                        name: '亿元',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, 0, 0, this.getFontSize(40)],
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '	rgba(178,231,255,0.5)',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '	rgba(178,231,255,0.5)',
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: this.getFontSize(12),
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: ['70%', this.getFontSize(30)], //调整截面形状
                        symbolOffset: [
                            this.getFontSize(0),
                            this.getFontSize(-15),
                        ],
                        yAxisIndex: 0,
                        z: 12,
                        symbolPosition: 'end',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: '#00BAEF',
                                        },
                                        {
                                            offset: 1,
                                            color: '#00BAEF',
                                        },
                                    ],
                                    false,
                                ),
                            },
                        },
                        data: yData2,
                    },
                    // 柱底圆片2
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: ['70%', this.getFontSize(35)], //调整截面形状
                        symbolOffset: [
                            this.getFontSize(0),
                            this.getFontSize(4),
                        ],
                        yAxisIndex: 0,
                        z: 12,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: '#127DE7',
                                        },
                                        {
                                            offset: 1,
                                            color: '#127DE7',
                                        },
                                    ],
                                    false,
                                ),
                            },
                        },
                        data: yData2,
                    },
                    //柱体2
                    {
                        name: '笔数',
                        barWidth: '50%',
                        yAxisIndex: 0,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                // 阴影设置
                                // shadowColor: 'rgba(50, 108, 193,0.2)',
                                // shadowBlur: 2,
                                // shadowOffsetY:-80,
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    type: 'linear',
                                    global: false,
                                    colorStops: [
                                        {
                                            //第一节下面
                                            offset: 1,
                                            color: '#00BAEF',
                                        },
                                        {
                                            offset: 0,
                                            color: '#127DE7',
                                        },
                                    ],
                                },

                                borderRadius: [
                                    0,
                                    0,
                                    this.getFontSize(10),
                                    this.getFontSize(10),
                                ],
                            },
                        },
                        data: yData2,
                    },
                    //折线
                    {
                        name: '金额',
                        type: 'line',
                        color: '#F19311',
                        symbolSize: this.getFontSize(12),
                        symbol: 'circle',
                        data: yData3,
                        z: 13,
                        lineStyle: {
                            color: '#F19311'
                        },
                        // areaStyle: {
                        //     color: {
                        //         x: 0,
                        //         y: 1,
                        //         x2: 0,
                        //         y2: 0,
                        //         type: 'linear',
                        //         global: false,
                        //         colorStops: [
                        //             {
                        //                 offset: 0,
                        //                 color: 'transparent',
                        //             },
                        //             {
                        //                 offset: 0.5,
                        //                 color: 'transparent',
                        //             },
                        //             {
                        //                 //第一节下面
                        //                 offset: 1,
                        //                 color: '#F19311 ',
                        //             },
                        //         ],
                        //     },
                        // },
                        smooth: true,
                        yAxisIndex: 1,
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
                        data: yData5,
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
                        data: yData6,
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
                        data: yData7,
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
                        data: yData8,
                    },
                ],
            };
            // console.log(this.chartData);
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'dk_dkzsfx',
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
<style lang="scss" scoped>
.chartbox {
    position: relative;


    .btnbox {
        height: 30px;
        //width: 100px;
        position: absolute;
        top: 15px;
        right: 6.8%;
        display: flex;
        justify-content: center;
        .bgselect {
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 12px;
            color: #A0E1FF;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
        }
        .bgse {
            background-image: url("../../../../assets/images/dp/tq/3zi_selected.svg");
            width: 56px;
            color: #FFFFFF;
        }

        .bgde {
            width: 56px;
            background-image: url("../../../../assets/images/dp/tq/3zi_defult.svg");

        }

        .near5s {
            background-image: url("../../../../assets/images/dp/tq/3zi_selected.svg");
            width: 56px;
            color: #FFFFFF;
        }

        .near5d {
            width: 56px;
            background-image: url("../../../../assets/images/dp/tq/3zi_defult.svg");
        }

        .near12s {
            background-image: url("../../../../assets/images/dp/tq/4zi_selected.svg");
            border-radius: 10px 0px 0px 10px;
            width: 66px;
            color: #FFFFFF;
        }

        .near12d {
            width: 66px;
            border-radius: 10px 0px 0px 10px;
            background-image: url("../../../../assets/images/dp/tq/4zi_defult.svg");
        }
        .bgselectAll {
            background-image: url("../../../../assets/images/dp/tq/2zi_selected.svg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 46px;
            height: 20px;
            border-radius: 10px 0px 0px 10px;
            text-align: center;
            font-size: 12px;
            color: #FFFFFF;
            line-height: 20px;

        }
        .bgdefaultAll {
            background-image: url("../../../../assets/images/dp/tq/2zi_defult.svg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 46px;
            height: 20px;
            line-height: 20px;
            border-radius: 10px 0px 0px 10px;
            text-align: center;
            font-size: 12px;
            color: #A0E1FF;
        }

    }

}

</style>
