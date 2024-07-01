<template>
    <div>
        <chart ref="chart" :chartData="chartData"/>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            chartData: {},
            dataList: {},
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        await this.getData();
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {},
    methods: {
        initChart() {
            let sum = Number(this.dataList.ts)  + Number(this.dataList.wts) + 700;
            let pieData = [
                {
                    value: this.dataList.ts+600,
                    name: '转账',
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#084CD5', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#084CD5', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    label: {
                        show: true,
                        overflow:'break',
                        position: 'outside',
                        color: '#FFF',
                        formatter: (param) => {
                            return param.name +
                                '{dataStyle|' +'  '+
                                param.percent * 2 +
                                '%}';
                        },
                        rich: {
                            dataStyle: {
                                color: '#00DFFE',
                                fontSize: this.getFontSize(14),
                            },
                        },
                    },

                    // labelLine:{
                    //     length:30,
                    //     length2:30,
                    // }

                },
                {
                    value: 50,
                    name: '现金',
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#E78C0E', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#E78C0E', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#FFF',
                        formatter: (param) => {
                            return param.name +
                                '{dataStyle|' +'  '+
                                param.percent * 2 +
                                '%}';
                        },
                        rich: {
                            dataStyle: {
                                color: '#E78C0E',
                                fontSize: this.getFontSize(14),
                            },
                        },

                    },
                    // labelLine:{
                    //     length:30,
                    //     length2:50,
                    // }
                },
                {
                    value: 50,
                    name: '主动增缴',
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#9BBB59', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#9BBB59', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#FFF',
                        formatter: (param) => {
                            return param.name + '  ' +
                                '{dataStyle|' + '  ' +
                                param.percent * 2 +
                                '%}';
                        },
                        rich: {
                            dataStyle: {
                                color: '#9BBB59',
                                fontSize: this.getFontSize(14),
                            },
                        },
                    },
                    // labelLine:{
                    //     length:30,
                    //     length2:30,
                    // }
                },
                {
                    value: this.dataList.wts,
                    name: '托收',
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#00FFFC', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#00FFFC', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#FFF',
                        formatter: (param) => {
                            let str =
                                param.name +
                                '{dataStyle|' +'  '+
                                param.percent * 2 +
                                '%}';
                            return str;
                        },
                        rich: {
                            dataStyle: {
                                color: '#00FFFC',
                                fontSize: this.getFontSize(14),
                            },
                        },
                    },
                    // labelLine:{
                    //     length:30,
                    //     length2:30,
                    // }
                },
                {
                    value: sum,
                    name: '',
                    selected: false,
                    silent: true,
                    label: {
                        show: false,
                    },
                    tooltip: {
                        show: false,
                    },
                    itemStyle: {
                        color: 'transparent',
                    },
                },
            ];
            let pieData2 = [
                {
                    value: this.dataList.ts,
                    itemStyle: {
                        color: '#00FFFC',
                        borderWidth: this.getFontSize(4),
                        borderColor: '#080b46',
                    },
                },
                {
                    value: this.dataList.wts,
                    itemStyle: {
                        color: '#ffffff',
                        borderWidth: this.getFontSize(4),
                        borderColor: '#080b46',
                    },
                },
                {
                    // value:sum * 1.5,
                    value: sum ,
                    name: '',
                    itemStyle: {
                        color: 'transparent',
                    },
                },
            ];
            this.chartData = {
                title: {
                    text: sum,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(40),
                    },
                    left: 'center',
                    top: '55%',
                },
                tooltip: {
                    show: true,
                    formatter: (params) => {
                        return (
                            params.marker +
                            params.name +
                            ' : ' +
                            params.value +
                            '个'
                        );
                    },
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['88%', '100%'],
                        center: ['50%', '70%'],
                        startAngle: 180,
                        data: pieData,
                        labelLine: {
                            length: this.getFontSize(20),
                            length2: this.getFontSize(45),
                        },
                        labelLayout: {
                            hideOverlap: false,
                            moveOverlap: 'shiftY',
                            width: 180,
                            align: 'center',
                            dy: -18,
                            dx: -20,
                            verticalAlign: 'top'
                        },

                        label: {
                            fontSize: this.getFontSize(14),
                        },
                    },
                    {
                        type: 'pie',
                        radius: ['75%', '82%'],
                        center: ['50%', '70%'],
                        startAngle: 160,
                        silent: true,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: JSON.parse(JSON.stringify(pieData2)),
                    },
                    {
                        type: 'pie',
                        radius: ['65%', '70%'],
                        center: ['50%', '70%'],
                        startAngle: 160,
                        silent: true,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: pieData2.map((item, index) => {
                            if (index == 0) {
                                item.itemStyle.color = 'rgba(0,255,252,0.5)';
                            } else if (index == 1) {
                                item.itemStyle.color = 'rgba(255,255,255,0.5)';
                            }
                            return item;
                        }),
                    },
                ],
                graphic: {
                    elements: [
                        {
                            type: 'line', // 添加线段
                            shape: {
                                x1: 60, // 线段起点 x 坐标
                                y1: 240, // 线段起点 y 坐标，根据你的图表大小调整
                                x2: 370, // 线段终点 x 坐标
                                y2: 240  // 线段终点 y 坐标
                            },
                            style: {
                                stroke: '#00FFFC', // 线段颜色
                                lineWidth: 1 // 线段宽度
                            }
                        }
                        // ... 可以添加更多辅助图形
                    ]
                }
            };
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_tsqkfx',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList[0];
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss"></style>
