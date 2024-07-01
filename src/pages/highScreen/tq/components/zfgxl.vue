<template>
    <div>]
<!--        <button @click="highlightPie">uuu</button>-->
        <chart class="w0 fg1" :chartData="chartData" ref="chart"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            dataList: [],
            chartData: {},
            color: [
                'rgba(90, 111, 192, 1)',
                'rgba(158, 202, 127,1)',
                'rgba(242, 202, 107, 1)',
                // '#00fff0',
                // '#ffaa45',
                // '#bfbfbf',
            ],
            count: 360,
        };
    },
    async created() {
        await this.getData();
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {

            let series1Data = this.dataList.map((item, index) => ({
                ...item,
                itemStyle: {
                    color: this.color[index],
                },
                label: {
                    show: true,
                    position: 'outside',
                    color: '#FFF',
                    formatter: (param) => {
                        return '{name|' +
                            param.name +
                            '}  ' +
                            '\n' +
                            '{percent|' +
                            param.percent +
                            '%}';
                    },
                    rich: {
                        name: {
                            fontSize: this.getFontSize(16),
                            lineHeight: this.getFontSize(18),
                        },
                        percent: {
                            color: this.color[index],
                            fontSize: this.getFontSize(24),
                            lineHeight: this.getFontSize(38),
                            fontWeight: 'bold',
                            fontStyle: 'italic'
                        },
                    },
                },
            }));

            this.chartData = {
                color: this.color,
                series: [
                    {
                        type: 'pie',
                        radius: ['54px', '80px'],
                        center: ['50%', '50%'],
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        padAngle: 0,
                        emphasis: {
                            disabled: true,
                        },
                        itemStyle: {
                            borderRadius: [0,13,0,13 ],
                            color: function (params) {
                                // 构建渐变色
                                let colorList = [
                                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(90, 111, 192,0)' // 颜色渐变
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(90, 111, 192, 1)' // 颜色渐变
                                        }
                                    ]),
                                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(158, 202, 127,1)' // 颜色渐变
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(158, 202, 127, 0)' // 颜色渐变
                                        }
                                    ]),
                                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(242, 202, 107, 1)' // 颜色渐变
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(242, 202, 107, 0)' // 颜色渐变
                                        }
                                    ])
                                ];
                                return colorList[params.dataIndex % colorList.length];
                            }
                        },
                        data: this.dataList,
                    },
                    {
                        type: 'pie',
                        radius: ['92px', '100px'],
                        center: ['50%', '50%'],
                        silent: true,
                        labelLine: {
                            length: 15,
                            length2: 0,
                            maxSurfaceAngle: 80
                        },
                        padAngle: 5,
                        label: {
                            alignTo: 'edge',
                            minMargin: 15,
                            edgeDistance: 10,
                            lineHeight: 15,
                            rich: {
                                time: {
                                    fontSize: 10,
                                    color: '#999'
                                }
                            }
                        },
                        // emphasis: {
                        //     disabled: true,
                        // },
                        // 设置高亮时显示标签
                        emphasis: {
                            label: {
                                show: true
                            },
                            scale: true, // 设置高亮时放大图形
                            scaleSize: 10,
                        },
                        itemStyle: {
                            borderRadius: 4,
                        },
                        data: series1Data,
                    },
                ],
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'tq_zfgxlfx',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList
                        resolve();
                    });
            });
        },
        highlightPie() { // 取消所有高亮并高亮当前图形
            for(let idx in this.chartData.series[1].data)
                // 遍历饼图数据，取消所有图形的高亮效果
                this.$refs.chart.chart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 1,
                    dataIndex: idx
                });
            // 高亮当前图形
            this.$refs.chart.chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 1,
                dataIndex: 0
            });
            console.log( this.$refs.chart.chart)
        }
    },
};
</script>
