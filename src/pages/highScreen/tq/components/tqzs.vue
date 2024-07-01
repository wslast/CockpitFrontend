<template>
    <div>
        <chart :chartData="chartData" ref="chart" @mousemove="mousemove"></chart>
<!--        <button @click="switchTooltip">dd</button>-->
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
            // 轮播次序
            currentIndex : -1,
            color: [
                '#3FD2FC',
                '#6BE991',
                '#91AA54',
                '#7e21cc',
                '#ef3628',
                '#daa651',
            ],
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
        this.$nextTick(this.initChart);
        this.$nextTick(() => {
            const chart = this.$refs.chart.chart;
            console.log(chart)
            console.log(chart.on)

            // 鼠标悬浮，停止轮播
            chart.on('mousemove', () => {
                debugger
                closeSwitchTooltip();
            });

            // 鼠标离开，继续轮播
            chart.on('mousedown', () => {
                debugger
                startTooltipLoop(myChart);
            });
        });
    },
    beforeDestroy() {
    },
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
                    symbol: "circle",
                    symbolSize: this.getFontSize(10),
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0.25,
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
                        width: 3
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'top',
                            color: this.color[index],
                            fontSize: 12,
                        },
                        scale: true, // 设置高亮时放大图形
                        scaleSize: 10,
                    },
                });
            });
            console.log(series);
            this.chartData = {
                color: this.color,
                title: {
                    text: '提取走势分析图',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(22),

                    },
                    left: '46px',
                    top: '0%',
                },
                legend: {
                    top: 6,
                    // left: 240,
                    right: 48,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                    },
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    backgroundColor: 'rgba(0,0,0,0.5)', // 提示框背景颜色
                    borderColor: '#34A8FB', // 提示框边框颜色
                    borderWidth: 1, // 提示框边框宽度
                    textStyle: {
                        color: '#ffffff',
                    },
                    formatter: (params) => {
                        let str = `<div style="font-size: 18px">${params[0].axisValue}</div>`;
                        // 赋值每行数据
                        str += params.map(param => `
                                    ${param.marker}${param.seriesName} : ${param.data}亿元
                                `).join('<br/>');
                        return str
                    },
                },
                grid: {
                    left: 107,
                    top: 95,
                    right: 110,
                    bottom: 64,
                },
                xAxis: {
                    type: 'category',
                    data: monthList,
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        color: '#ffffff',
                        margin: this.getFontSize(20),
                    },
                    axisTick: {
                        show: true,
                        length: this.getFontSize(10),
                        lineStyle: {
                            color: 'rgba(178,231,255,0.5)',
                        },
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
                    name: '亿元',
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
                series,
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'tq_tqzsfxt',
                    })
                    .then((res) => {
                        let list = res.retBody.retList.type;
                        // 将万转换为亿，并保留两位小数
                        list = list.map(item => ({
                            ...item,
                            je: (item.je / 10000).toFixed(2)
                        }))
                        let dataMap = new Map();

                        list.forEach(item => {
                            if (!dataMap.has(item.year)) {
                                dataMap.set(item.year, {showData: [], data: []});
                            }
                            let yearData = dataMap.get(item.year);
                            yearData.showData.push(item.je);
                            yearData.data.push(item);
                        });

                        this.dataList = Array.from(dataMap.entries())
                            .map(([year, {showData, data}]) => ({
                                year,
                                showData,
                                data
                            }));
                        resolve();
                    });
            });
        },
        highlightLine() {
            // 取消之前高亮的数据点
            this.$refs.chart.chart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0 // 如果有多个系列，需要指定正确的seriesIndex
            });

            // 高亮当前数据点
            this.$refs.chart.chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0, // 假设只有一个系列
                dataIndex: 2 // 指定要高亮的数据点的索引
            });

            // 更新索引并循环
            // currentIndex = (currentIndex + 1) % dataCount;
        },
        /**
         * 切换tooltip
         */
        switchTooltip() {
            let {currentIndex} = this
            const chart = this.$refs.chart.chart;
            // 取消之前高亮的图形
            chart.dispatchAction({
                type: 'downplay',
                seriesIndex: 1,
                dataIndex: currentIndex,
            });

            // TODO 12为列数暂时固定后期增加切换功能后调试
            currentIndex = (currentIndex + 1) % 12;
            // 高亮当前图形
            chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 1,
                dataIndex: currentIndex,
            });
            // 显示tooltip
            chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 1,
                dataIndex: currentIndex,
            });
        },
        mousemove(e){
            console.log(e)
        }
    },
};
</script>
<style scoped lang="scss">

.btnbox {
    width: 260.994px;
    height: 32.006px;
    position: absolute;
    right: 2%;
    top: -1%;
    //background: yellow;
    display: flex;
    align-items: end;
    padding-top: 10px;

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
        width: 68px;
        color: #FFFFFF;
    }

    .near12d {
        width: 68px;
        border-radius: 10px 0 0 10px;
        background-image: url("../../../../assets/images/dp/tq/4zi_defult.svg");
    }

    .bgselectAll {
        background-image: url("../../../../assets/images/dp/tq/2zi_selected.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 46px;
        height: 20px;
        border-radius: 10px 0 0 10px;
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
        border-radius: 10px 0 0 10px;
        text-align: center;
        font-size: 12px;
        color: #A0E1FF;
    }

}
</style>
