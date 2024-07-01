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
            resData: [],
            lxList: [],
        };
    },
    async created() {
        await this.getData();
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {
            const barWidth= 20
            this.lxList = this.resData.hq.map(({lx}) => lx)

            const yData = [], yData2 = [], yData3 = [], yData4 = [];

            const data1 = this.resData.hq.map(item => {
                yData.push(item.stftb);
                yData2.push(item.stfhb);
                return item.srs;
            });

            const data2 = this.resData.dq.map(item => {
                yData3.push(item.etftb);
                yData4.push(item.etfhb);
                return item.ers;
            });

            const data3 = data1.map((item, index) => item + data2[index]);

            const tooltipFormatter = params => {
                const [
                    {name: seriesName},
                    {value: srs},
                    {value: ers},
                    ,
                    ,
                    {value: stftb},
                    {value: stfhb},
                    {value: etftb},
                    {value: etfhb}
                ] = params;

                return `
            <div style="display: flex; justify-content: space-between; width: 170px; height: 80px">
                <div style="display: flex; flex-direction: column; justify-content: space-between">
                    <div style="font-size: 14px; font-weight: bold; color: #01D8FF; font-family: MicrosoftYaHei;">
                        ${seriesName}
                    </div>
                    <div style="font-size: 12px; color: #01D8FF; font-family: MicrosoftYaHei; padding-top: 5px">
                        <div style="text-align: right;color: #FFFFFF">笔</div>
                        <div><span style="font-size: 12px; font-weight: normal; color: #FFFFFF">首套房：</span> ${srs}</div>
                        <div><span style="font-size: 12px; font-weight: normal; color: #FFFFFF">二套房：</span> ${ers}</div>
                    </div>
                </div>
                <div>
                    <div style="min-width: 85px;font-size: 12px; color: #FFFFFF; font-family: MicrosoftYaHei; display: flex; justify-content: space-between;padding-top: 25px">
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
            </div>`;
            };

            const commonLineSeries = data => ({
                type: 'line',
                symbol: 'none',
                showSymbol: false,
                itemStyle: {normal: {color: 'transparent'}},
                lineStyle: {normal: {color: 'transparent', width: 0}},
                data,
            });

            this.chartData = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderColor: '#34A8FB',
                    borderWidth: 1,
                    axisPointer: {type: 'none'},
                    formatter: tooltipFormatter,
                },
                textStyle: {color: "#ffffff"},
                color: ["#F4FF5B", "#F4FF5B", "#F4FF5B", "#F4FF5B"],
                grid: {containLabel: true, left: "5%", top: "20%", bottom: "2%", right: "5%"},
                legend: {
                    selectedMode: false,
                    top: "5%",
                    left: "center",
                    textStyle: {color: "#ffffff", fontSize: this.getFontSize(12)},
                    icon: "rect",
                    itemHeight: this.getFontSize(12),
                    itemWidth: this.getFontSize(12)
                },
                xAxis: {
                    type: "category",
                    data: this.lxList,
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        margin: 20,
                        textStyle: {fontFamily: "Microsoft YaHei", color: "#ffffff"}
                    }
                },
                yAxis: {
                    type: "value",
                    interval: 1000,
                    name: "元",
                    nameTextStyle: {padding: [0, 40, 0, 0]},
                    axisLine: {show: false, lineStyle: {color: "#B5B5B5"}},
                    splitLine: {lineStyle: {color: 'rgba(178,231,255,0.2)'}},
                    axisLabel: {show: true, color: "#ffffff"}
                },
                series: [
                    {
                        data: data1,
                        stack: "zs",
                        type: "bar",
                        name: "活期",
                        barMaxWidth: "auto",
                        barWidth,
                        itemStyle: {
                            color: {
                                x: 0, y: 0, x2: 0, y2: 1, type: "linear", global: false,
                                colorStops: [
                                    {offset: 0, color: "#31EA98"},
                                    {offset: 1, color: "#31EA98"}
                                ]
                            }
                        }
                    },
                    {
                        data: data2,
                        stack: "zs",
                        type: "bar",
                        name: "定期",
                        barMaxWidth: "auto",
                        barWidth,
                        itemStyle: {
                            color: {
                                x: 0, y: 0, x2: 0, y2: 1, type: "linear", global: false,
                                colorStops: [
                                    {offset: 0, color: "#FAE354"},
                                    {offset: 1, color: "#F4FF5B"}
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
                        symbolSize: [barWidth, this.getFontSize(12)],
                        zlevel: 2
                    },
                    ...[data1, data1, data1].map(data => ({
                        data,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [0, "-50%"],
                        symbolSize: [barWidth, this.getFontSize(12)],
                        zlevel: 2
                    })),
                    commonLineSeries(yData),
                    commonLineSeries(yData2),
                    commonLineSeries(yData3),
                    commonLineSeries(yData4),
                ]
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost("/api/dyncscript/scriptRule/query", {scriptId: "zjld_zfckzs"})
                    .then(res => {
                        this.resData = res.retBody.retList;
                        resolve();
                    });
            });
        }
    }
};
</script>
