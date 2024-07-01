<template>
    <div class="bndtqje">
        <div class="bndtqje-chart">
            <chart ref="chart" :chartData="chartData"/>
        </div>
        <div class="bndtqje-label">
            <div class="bndtqje-labels" v-for="(item,index) in dataList" :key="item.name">
                <div class="bndtqje-labels-value">
                    <span class="bndtqje-labels-value-t" :style="{ color: color[index * 2] }">{{item.value}}</span>亿元
                </div>
                <div class="bndtqje-labels-name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
            color: [
                '#3FD2FC',
                '#50CFFB',
                '#6BE991',
                '#72EE99',
                '#91AA54',
                '#91AA54',
                '#7e21cc',
                '#681da6',
                '#ef3628',
                '#C02116',
                '#daa651',
                '#d79935',
            ],
        };
    },
    async mounted() {
        await this.getData();
        this.$nextTick(() => this.initChart());
    },
    methods: {
        initChart() {
            let firstWaveColor = JSON.parse(JSON.stringify(this.color));
            let secondWaveColor = firstWaveColor.map((item) => item.replace(/1.000/, '0.500'));
            let pieColor = firstWaveColor.filter((item, index) => index % 2 === 1);
            let series = [];
            let center = [
                [82, 100],
                [224, 100],
                [366, 100],
                [509, 100],
                [652, 100],
                [795, 100],
            ];
            const sum = this.dataList.reduce((sum, {value}) => sum + value, 0)
            this.dataList.map(({name,value,pct}, index) => {
                series.push(
                    {
                        type: 'liquidFill',
                        name,
                        radius: 100,
                        center: center[index],
                        data: [pct/100, pct/100],
                        color: [
                            {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: firstWaveColor[index * 2],
                                    },
                                    {
                                        offset: 1,
                                        color: firstWaveColor[index * 2 + 1],
                                    },
                                ],
                                global: false,
                            },
                            {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: secondWaveColor[index * 2],
                                    },
                                    {
                                        offset: 1,
                                        color: secondWaveColor[index * 2 + 1],
                                    },
                                ],
                                global: false,
                            },
                        ],
                        outline: {
                            show: false,
                        },
                        label: {
                            normal: {
                                formatter: pct + '%',
                                textStyle: {
                                    fontSize: this.getFontSize(22),
                                    color: '#ffffff',
                                    fontWeight:'bold',
                                    fontFamily:'Microsoft YaHei'
                                },
                            },
                        },
                        backgroundStyle: {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(0,24,55, 0)',
                                    },
                                    {
                                        offset: 0.8,
                                        color: 'rgba(255,255,255, 0.2)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255,255,255, 0.6)',
                                    },
                                ],
                                globalCoord: false,
                            },
                        },
                    },
                    {
                        type: 'pie',
                        silent: true,
                        radius: [52, 60],// 半径
                        center: center[index],
                        data: [
                            {
                                borderRadius:5,
                                value: value,
                                itemStyle: {
                                    color: pieColor[index],
                                    borderWidth: 3,
                                    borderColor: '#173372',
                                    borderRadius:10
                                },
                            },
                            {
                                value:sum,
                                itemStyle: {
                                    color: '#173372',
                                    borderWidth: 3,
                                    borderColor: '#173372',
                                    borderRadius:0,
                                },
                            },
                        ],
                        label: {show: false,},
                        labelLine: {show: false,},
                    },
                );
            });
            this.chartData = {
                series: series,
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'tq_bndtqjezb',
                    })
                    .then((res) => {
                        // todo 排序
                        this.dataList = res.retBody.retList;
                        resolve();
                    });
            });
        },
    },
};
</script>

<style lang="scss">
.bndtqje {
    display: flex;
    flex-direction: column;

    &-chart {
        flex-grow: 0;
        flex-shrink: 0;
        height: 165px;
    }

    &-label {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;

        &s {
            width: 130px;
            text-align: center;
            color: #FFFFFF;
            font-size: 16px;
            font-weight: 400;

            &-value {
                &-t {
                    padding-right: 2px;
                    font-family: 'pmzdfont', sans-serif;
                    font-size: 28px;
                    line-height: 46px;
                }
            }
        }
    }
}
</style>
