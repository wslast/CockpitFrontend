<template>
    <div ref="chart" style="height: 100%;width: 100%"></div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            chart: null,
            dataList: [],
        };
    },
    computed: {},
    watch: {
        dataList: {
            deep: true,
            handler: function(val) {
                // console.log(val);
                // 有数据且有chart
                if (val && Object.keys(val).length > 0) {
                    if (this.chart) {
                        this.chart.dispose();
                        this.chart = null;
                    }
                    this.$nextTick(() => {
                        this.initChart();
                    });
                }
            },
            immediate: true,
        },
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        await this.getData();
        this.$nextTick(() => {
            // this.initChart();
            window.addEventListener('resize', this.handler);
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        window.removeEventListener('resize', this.handler);
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        handler() {
            if (this.chart) {
                this.chart.resize();
            }
        },
        initChart() {
            this.chart = echarts.init(this.$refs.chart);
            // 绘制左侧面
            let CubeLeft = echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0,
                },
                buildPath: function(ctx, shape) {
                    // 会canvas的应该都能看得懂，shape是从custom传入的
                    const xAxisPoint = shape.xAxisPoint;
                    // console.log(shape)
                    const c0 = [shape.x +3, shape.y];
                    const c1 = [shape.x - 10, shape.y];
                    const c2 = [xAxisPoint[0] - 10, xAxisPoint[1]];
                    const c3 = [xAxisPoint[0] +3, xAxisPoint[1]];
                    ctx.moveTo(c0[0], c0[1])
                        .lineTo(c1[0], c1[1])
                        .lineTo(c2[0], c2[1])
                        .lineTo(c3[0], c3[1])
                        .closePath();
                },
            });
            // 绘制右侧面
            let CubeRight = echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0,
                },
                buildPath: function(ctx, shape) {
                    // console.log(shape)
                    const xAxisPoint = shape.xAxisPoint;
                    // console.log(xAxisPoint)
                    const c1 = [shape.x + 3, shape.y];
                    const c2 = [xAxisPoint[0] + 3, xAxisPoint[1]];
                    const c3 = [xAxisPoint[0] + 8, xAxisPoint[1] - 3];
                    const c4 = [shape.x + 8, shape.y - 3];
                    ctx.moveTo(c1[0], c1[1])
                        .lineTo(c2[0], c2[1])
                        .lineTo(c3[0], c3[1])
                        .lineTo(c4[0], c4[1])
                        .closePath();
                },
            });
            // 绘制顶面
            let CubeTop = echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0,
                },
                buildPath: function(ctx, shape) {
                    const c1 = [shape.x + 6, shape.y];
                    const c2 = [shape.x + 8, shape.y - 5]; //右点
                    const c3 = [shape.x -5, shape.y - 5];
                    const c4 = [shape.x - 10, shape.y];
                    ctx.moveTo(c1[0], c1[1])
                        .lineTo(c2[0], c2[1])
                        .lineTo(c3[0], c3[1])
                        .lineTo(c4[0], c4[1])
                        .closePath();
                },
            });
            // 注册三个面图形
            echarts.graphic.registerShape('CubeLeft', CubeLeft);
            echarts.graphic.registerShape('CubeRight', CubeRight);
            echarts.graphic.registerShape('CubeTop', CubeTop);
            let cldkbsData = this.dataList.map((item) => {
                return item.cldkbs;
            });
            let dkyeData = this.dataList.map((item) => {
                return item.dkye;
            });
            let xData = this.dataList.map((item) => {
                return item.ny;
            });
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        return (
                            params[0].name +
                            '<br/>' +
                            params[0].marker +
                            params[0].seriesName +
                            ' : ' +
                            params[0].data +
                            '笔' +
                            '<br/>' +
                            params[1].marker +
                            params[1].seriesName +
                            ' : ' +
                            params[1].data +
                            '万元'
                        );
                    },
                },
                legend: {
                    selectMode: false,
                    textStyle: {
                        color: '#ffffff',
                    },
                    top:'13%',
                    data: [
                        {
                            name: '存量贷款笔数',
                            itemStyle: {
                                color: '#0DC0FE',
                            },
                        },
                        {
                            name: '贷款余额',
                            itemStyle: {
                                color: '#FFE227',
                            },
                        },
                    ],
                },
                grid: {
                    top: '80px',
                    left: '20px',
                    right: '20px',
                    bottom: '0',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(178,231,255,0.500)',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        fontSize: this.getFontSize(12),
                        interval: 0,
                        color: '#ffffff',
                        rotate: 30,
                        margin:20
                    },
                },
                yAxis: [
                    {
                        name: '笔',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, 0, 0, this.getFontSize(-30)],
                        },
                        show: true,
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'white',
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(178,231,255,0.500)',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            fontSize: this.getFontSize(14),
                            interval: 0,
                        },
                    },
                    {
                        name: '万元',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(-40), 0, 0],
                        },
                        show: true,
                        type: 'value',
                        min: 'dataMin',
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            fontSize: this.getFontSize(14),
                            interval: 0,
                            color: '#ffffff',
                        },
                    },
                ],
                series: [
                    {
                        animation:true,
                        animationDuration:2000,
                        type: 'custom',
                        name: '存量贷款笔数',
                        renderItem: (params, api) => {
                            const barWidth = 20;

                            // 根据数据值确定条形的高度
                            const barHeight = api.value(params.dataIndex)

                            // console.log(params)
                            const location = api.coord([
                                api.value(0),
                                api.value(1),
                            ]);
                            return {
                                type: 'group',
                                children: [
                                    {
                                        type: 'CubeLeft',
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([
                                                api.value(0),
                                                0,
                                            ]),
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(
                                                0,
                                                0,
                                                0,
                                                1,
                                                [
                                                    {
                                                        offset: 0,
                                                        color: '#04CAF9',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#156DE3 ',
                                                    },
                                                ],
                                            ),
                                        },
                                    },
                                    {
                                        type: 'CubeRight',
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([
                                                api.value(0),
                                                0,
                                            ]),
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(
                                                0,
                                                0,
                                                0,
                                                1,
                                                [
                                                    {
                                                        offset: 0,
                                                        color: '#07B8F5 ',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#0857AE ',
                                                    },
                                                ],
                                            ),
                                        },
                                    },
                                    {
                                        type: 'CubeTop',
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([
                                                api.value(0),
                                                0,
                                            ]),
                                        },
                                        style: {
                                            fill: new echarts.graphic.LinearGradient(
                                                1,
                                                0,
                                                0,
                                                1,
                                                [
                                                    {
                                                        offset: 0,
                                                        color: '#0F77E7',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#04C9F9 ',
                                                    },
                                                ],
                                            ),
                                        },
                                    },
                                ],
                            };
                        },
                        data: cldkbsData,
                        yAxisIndex: 0,
                    },
                    {
                        type: 'line',
                        name: '贷款余额',
                        data: dkyeData,
                        z: 2,
                        symbol: 'circle',
                        symbolSize: this.getFontSize(8),
                        itemStyle: {
                            color: '#FFE227',
                        },
                        lineStyle: {
                            color: '#FFE227',
                            width: this.getFontSize(3),
                        },
                        yAxisIndex: 1,
                    },
                ],
            };
            if (this.chart && option && Object.keys(option).length > 0) {
                this.chart.setOption(option);
            }
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'dk_dkyezs',
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
<style scoped lang="scss"></style>
