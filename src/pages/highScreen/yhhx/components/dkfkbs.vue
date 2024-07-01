<template>
    <div class="dkfkbs">
        <div class="dkfkbs-row" v-for="item in resData" :key="item.name">
            <div class="dkfkbs-row-name">{{item.name}}</div>
            <div class="dkfkbs-row-value">
                {{item.value}}
                <span class="dkfkbs-row-value-unit">笔</span>
            </div>
        </div>
        <chart class="dkfkbs-chart" :chartData="chartData" ref="chart"></chart>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chartData:{},
            resData: [
                {name: '工商银行', value:12428},
                {name: '农业银行', value:11062},
                {name: '湖南银行', value:10987},
                {name: '招商银行', value:9628},
                {name: '长沙银行', value:9428},
            ]
        }
    },
    async created() {
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {
            this.resData = [...this.resData].sort((b, a) => a.value - b.value);
            const maxData = Math.max(...this.resData.map(({value}) => value))
            const maxSeriesData = this.resData.map(() => maxData);
            const seriesData = [...this.resData].sort((a, b) => a.value - b.value).map(({value}) => value)

            this.chartData ={
                yAxis: {
                    show: false,
                    type: 'category', // 这里是分类轴
                },
                xAxis: {
                    show: false,
                    type: 'value' // 这里是数值轴
                },
                grid: {
                    top: 40,
                    left: 160,
                    bottom: -6,
                    right: 86,
                },
                series: [
                    {
                        data: maxSeriesData,
                        type: 'bar',
                        barWidth: 24,
                        barGap: '-100%', // 设置同系列柱子之间的间隔
                        itemStyle: {
                            borderRadius: 12,
                            color: 'rgba(255,255,255, 0.1)',
                        }
                    },
                    {
                        data: seriesData,
                        type: 'bar',
                        barWidth: 24,
                        itemStyle: {
                            borderRadius: 12,
                            color: 'rgba(255,255,255,0)',
                            borderWidth: 3,
                            borderColor: '#01CAFE',
                            shadowColor: '#01CAFE',
                            shadowBlur: 4,
                            shadowOffsetX: 0,
                            shadowOffsetY: 2,
                        }
                    },
                    {
                        name: '',
                        type: 'line',
                        xAxisIndex: 0,
                        colorBy: 'data',
                        data: seriesData,
                        symbol: 'circle',
                        symbolSize: 14,
                        symbolOffset: [-4,0],
                        itemStyle : {
                            color: '#FFF',
                        },
                        lineStyle : {
                            width: 0
                        }
                    }
                ]
            };

        }
    }
}
</script>

<style lang="scss">
.dkfkbs {
    $baseUrl: '../../../../assets/images/dp/yhhx/';
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    padding-top: 43px;

    &-row {
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        width: 430px;
        height: 45px;
        line-height: 45px;
        padding-left: 50px;
        font-family: MicrosoftYaHei,serif;

        @for $i from 1 through 5 {
            &:nth-child(#{$i}) {
                background-image: url('#{$baseUrl}yhhx_dkfkbspm_#{$i}.svg');
            }
        }

        &-name {
            font-size: 16px;
            color: #FFFFFF;
        }

        &-value {
            font-size: 18px;
            font-weight: bold;
            padding-right: 12px;
            color: #01FEFF;

            &-unit {
                font-size: 12px;
                color: #FFFFFF;
                line-height: 12px;
                font-weight: normal;
            }
        }
    }

    &-chart {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
