<template>
    <div class="zftqnl">
        <div class="zftqnl-title">
            <div class="zftqnl-title-year">年龄段</div>
            <div class="zftqnl-title-num">笔数</div>
            <div class="zftqnl-title-m">金额(亿元)</div>
        </div>
        <div class="zftqnl-main">
            <div class="zftqnl-main-label">
                <div class="zftqnl-main-labels" v-for="l in [...yAxisData].reverse()" :key="l">
                    {{ l }}
                </div>
            </div>
            <chart :chartData="chartData" ref="chart"/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
            yAxisData: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        initChart() {
            const {yAxisData} = this;
            const label = {
                show: true,
                color: "#03153B",
                fontSize: 14,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                position: 'insideLeft'
            }
            this.chartData = {
                tooltip: {
                    trigger: 'item',
                },
                xAxis: [0,1].map(gridIndex => ({
                    gridIndex,
                    type: 'value',
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                })),
                yAxis: [0,1].map(gridIndex => ({
                    gridIndex,
                    type: 'category',
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    data:yAxisData,
                })),
                grid: [
                    { top: 0, right: 162, bottom: 0,left: 0,  containLabel: true },
                    { top: 0, right: 0,bottom: 0,  left: 162, containLabel: true },
                ],
                series: [
                    {
                        type: 'bar',
                        name: '提取笔数',
                        seriesLayoutBy: 'row',
                        data: this.dataList.map(({lx:name,bs:value}) => ({name, value})),
                        label,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 1, y: 0, x2: 0, y2: 0,
                                colorStops: [
                                    {offset: 0, color: '#84F5DE',},
                                    {offset: 0.5, color: '#56E8F2',},
                                    {offset: 1, color: '#4CC5F8',},
                                ],
                                global: false, // 缺省为 false
                            },
                            barWidth: this.getFontSize(24),
                            barBorderRadius: this.getFontSize(12),
                        },
                        showBackground: true,
                        backgroundStyle: {
                            borderRadius: this.getFontSize(12),
                        },
                        barWidth: 24,
                    },
                    {
                        type: 'bar',
                        name: '提取金额',
                        seriesLayoutBy: 'row',
                        barWidth: 24,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: this.dataList.map(({lx:name,je:value}) => ({name, value})),
                        label,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 1, y: 0, x2: 0, y2: 0,
                                colorStops: [
                                    {offset: 0, color: '#777110',},
                                    {offset: 0.5, color: '#BFB625',},
                                    {offset: 1, color: '#F8EA4C',},
                                ],
                                global: false,
                            },
                            barBorderRadius: this.getFontSize(12),
                            barWidth: this.getFontSize(24),
                        },
                        showBackground: true,
                        backgroundStyle: {
                            borderRadius: this.getFontSize(12),
                        },
                    },
                ],
            };
        },
        async getData() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'tq_zftqnlfx',
                })
                .then((res) => {
                    this.dataList = res.retBody.retList;
                    this.yAxisData = this.dataList.map(({lx}) => (lx))
                    this.$nextTick(this.initChart);
                });
        },
    },
};
</script>

<style lang="scss">
.zftqnl {
    $mainGap: 20px;
    display: flex;
    flex-direction: column;
    padding: 56px 20px 16px 20px;

    &-title {
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        border-radius: 18px;
        background-color: rgba(40, 69, 251, 0.34);
        color: #d6fff3;
        text-align: center;

        &-year {
            width: 100px;
        }

        &-num {
            width: calc( #{$mainGap} + 162px );
            padding-left: $mainGap;
            text-align: left;
        }
    }

    &-main {
        flex-shrink: 1;
        flex-grow: 1;
        display: flex;
        gap: $mainGap;
        height: 100%;
        padding-top: 20px;

        &-label {
            flex-shrink: 0;
            flex-grow: 0;
            display: flex;
            gap: 17px;
            flex-direction: column;
            align-items: center;
            width: 100px;
            height: 100%;
            padding-top: 8px;

            &s {
                width: 100px;
                height: 24px;
                background: rgba(46, 54, 159, 0.51);
                border: 0.052vw solid #bfbfbf;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 400;
                color: #ffffff;
                line-height: 24px;
                text-align: center;
            }
        }
    }
}
</style>
