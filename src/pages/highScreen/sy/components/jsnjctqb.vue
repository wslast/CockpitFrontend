<template>
    <div ref="chart"></div>
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
            let bottom1 =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAeCAYAAABqpJ3BAAAD+0lEQVRYhc2YQY8VRRDHfz0zu+5DFjVoAgFBwiZrVi+eJHBhIcYziYGEg0e4EPwGnvATeCImJh69ePHg0XDYGCKJF2Q1bEB2FwjJCsRldx/73rzm0N3PevW65828hYR/Munpqurqqurq7poxc0s2AwxgcQjvkobgGaDnWwktK8dofSndQU/m21HjTCGMMmJgUJQrJeZ2l4MduAocA65PGi7O5CxXGJZygltdfgWYK5gXhgfEjNZ6egVQAm8Qj6im0YHvgFO+e3rb8j3wecToUQj6DS5QVTKxMRboFJ7RAyYZ9E6uBuL9UzXJMaDwOjIG00sbMJB+cwWfeXpBZIVIrwLAdhgI0MGtgo7E0CoY+N3CSdG/7g0Pyy/TIOWEjmqM3vP2hMAEWj/6erJtPyDzjuXAhHjPgGyP4SsD14BNA9emDZc8L/eymXgkLRdtruYqlFzh5858q+3q9KMxtzSw594hnY+vC0rgSegUirkFvEU8HyuPM9/qPA201LGZ4lXNsS6FtANtYDduQ0uDJGIbNZajYdLQ1wdET/Dle9CTKX0Z8Nw/SQcAngHvCQOkI6GfJfh6AweZWPTlHSMvU9nPlI5nWnnMgTZuk7QivFFIpcPLwBbOtgHEHAB4Cky/IkPGxdMYMbbk4DzdZPjIk61R/Hy5ZH6xy8Jil4XlknniR2fVk5LdJBJ9SK8AwBrwNuoi+6vLDwAfFnwpyAZgw3LF+v2zYbnC/yXHQD2l5omWLIIXbImiyoHnwH/AXkUPp8VEZIw0JFw8O8Vj1MkzMKG6yDQmgY9Ip9qArtWS4+uWr4Fy2vDNwZyFRqYOwwI38XVPdNIRDgAcBvYnlNfFqIst9W3xCPinSnGdJX6AcyCUGDJn5Xuskkzx9EdRbB+UwP1RxtVxoAM8BD6oIZsyJoZYQCTuI4q2FOrkNsAqLmKycgxHXKGeiQhNjimA4k7JhVtdfrlTcjEiY/2cI1HXgRK4JwwIpXZ4csWTjsnzvC/btpwFWm3LmYjee0D3ZToALiJdhqMcavaJCK9Q9L7jLcNPQLtl+FnJdICVukbVOYUkDgGfxPSoflWpLekxuT9wK1ALTS+aFWAWVyfJUrjqW7jJCbQO/T8ctdDUAQssAicELVdtHaRkF2lYzY5z1a/iKsN3Adu27NuyzJTwfgkHeq70mOpZdgFTAAbaxriCLIO1HB7ksDJluN0yPHIi/EuD3A9ougcC9q9bLm9YzvUsR8ZREJAZ7r5p+HHa8C3u0mwEY+143x/mbx4C+8YaPIzHdnaoaKyFJseoxnngxg7GB9wAvhh38E5WIOAocBxXtX4MHMHtj93ALi+zifueXQPu4irMP4HfgCUAOzuWGbwAtU4rt2uO5/4AAAAASUVORK5CYII=';
            let imgList = [];
            let iconData = [];
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
                    const c0 = [shape.x + 3, shape.y];
                    const c1 = [shape.x - 3, shape.y];
                    const c2 = [xAxisPoint[0] - 3, xAxisPoint[1]];
                    const c3 = [xAxisPoint[0] + 3, xAxisPoint[1]];
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
                    const c3 = [xAxisPoint[0] + 7, xAxisPoint[1]];
                    const c4 = [shape.x + 9, shape.y - 4];
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
                    const c1 = [shape.x + 4, shape.y];
                    const c2 = [shape.x + 10, shape.y - 4]; //右点
                    const c3 = [shape.x, shape.y - 4];
                    const c4 = [shape.x - 4, shape.y];
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
            let barData = [],
                barData2 = [],
                barData3 = [],
                lineData = [],
                xData = [],
                max = 0;
            max = this.dataList.reduce((prev, cur) => {
                if (!prev) {
                    return cur.ck < cur.tq ? cur.tq : cur.ck;
                } else {
                    let demoMax = cur.ck < cur.tq ? cur.tq : cur.ck;
                    return prev < demoMax ? demoMax : prev;
                }
            }, 0);
            max = parseInt(max / 1000) * 1000 + 1000;
            this.dataList.forEach((item, index) => {
                barData.push(item.ck);
                barData2.push(item.tq);
                barData3.push(max);
                lineData.push(item.tql);
                xData.push(item.year);
            });
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        return (
                            params[0].axisValue +
                            '<br/>' +
                            params[0].marker +
                            params[0].seriesName +
                            ' : ' +
                            params[0].data +
                            '万元' +
                            '<br/>' +
                            params[1].marker +
                            params[1].seriesName +
                            ' : ' +
                            params[1].data +
                            '万元' +
                            '<br/>' +
                            params[4].marker +
                            params[4].seriesName +
                            ' : ' +
                            params[4].data +
                            '%'
                        );
                    },
                },
                legend: {
                    selectMode: false,
                    textStyle: {
                        color: '#ffffff',
                    },
                    data: [
                        {
                            name: '存款',
                            itemStyle: {
                                color: '#0DC0FE',
                            },
                        },
                        {
                            name: '提取',
                            itemStyle: {
                                color: '#48F9AB',
                            },
                        },
                        {
                            name: '提取率',
                            itemStyle: {
                                color: '#FFE227',
                            },
                        },
                    ],
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    top: '25%',
                    bottom: '0%',
                    containLabel: true,
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
                        formatter: (params) => {
                            return params.slice(0, 4);
                        },
                    },
                },
                yAxis: [
                    {
                        name: '万元',
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, 0, 0, this.getFontSize(-30)],
                            fontSize: this.getFontSize(12),
                        },
                        show: true,
                        min: 0,
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
                            fontSize: this.getFontSize(12),
                            interval: 0,
                        },
                    },
                    {
                        nameTextStyle: {
                            color: '#ffffff',
                            padding: [0, this.getFontSize(-40), 0, 0],
                        },
                        show: true,
                        min: 0,
                        type: 'value',
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
                            fontSize: this.getFontSize(12),
                            interval: 0,
                            color: '#ffffff',
                            formatter: (params) => {
                                return params + '%';
                            },
                        },
                    },
                ],
                series: [
                    {
                        z: 2,
                        type: 'custom',
                        name: '存款',
                        renderItem: (params, api) => {
                            // const location = api.coord([api.value(0), api.value(1)]);
                            let location = api.coord([
                                api.value(0),
                                api.value(1),
                            ]);
                            location = [
                                location[0] + this.getFontSize(-10),
                                location[1],
                            ];
                            let location1 = api.coord([api.value(0), 0]);
                            location1 = [
                                location1[0] + this.getFontSize(-10),
                                location1[1],
                            ];
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
                                            xAxisPoint: location1,
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
                                            xAxisPoint: location1,
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
                                            xAxisPoint: location1,
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
                        data: barData,
                        yAxisIndex: 0,
                    },
                    {
                        z: 2,
                        type: 'custom',
                        name: '提取',
                        renderItem: (params, api) => {
                            // const location = api.coord([api.value(0), api.value(1)]);
                            let location = api.coord([
                                api.value(0),
                                api.value(1),
                            ]);
                            location = [
                                location[0] + this.getFontSize(3),
                                location[1],
                            ];
                            let location1 = api.coord([api.value(0), 0]);
                            location1 = [
                                location1[0] + this.getFontSize(3),
                                location1[1],
                            ];
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
                                            xAxisPoint: location1,
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
                                                        color: '#4BFAAC',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#04CD74',
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
                                            xAxisPoint: location1,
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
                                                        color: '#23DF8C',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#04854C ',
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
                                            xAxisPoint: location1,
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
                                                        color: '#02AD61 ',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#4BFAAC  ',
                                                    },
                                                ],
                                            ),
                                        },
                                    },
                                ],
                            };
                        },
                        data: barData2,
                        yAxisIndex: 0,
                    },
                    {
                        z: 1,
                        type: 'custom',
                        name: '存款',
                        renderItem: (params, api) => {
                            let location = api.coord([
                                api.value(0),
                                api.value(1),
                            ]);
                            location = [
                                location[0] + this.getFontSize(-10),
                                location[1],
                            ];
                            let location1 = api.coord([api.value(0), 0]);
                            location1 = [
                                location1[0] + this.getFontSize(-10),
                                location1[1],
                            ];
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
                                            xAxisPoint: location1,
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
                                                        color:
                                                            'rgba(4,202,249,0.4)',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color:
                                                            'rgba(21,109,227,0.4)',
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
                                            xAxisPoint: location1,
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
                                                        color:
                                                            'rgba(7,184,245,0.4)',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color:
                                                            'rgba(8,87,174,0.4)',
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
                                            xAxisPoint: location1,
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
                                                        color:
                                                            'rgba(15,119,231,0.4)',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color:
                                                            'rgba(4,201,249,0.4)',
                                                    },
                                                ],
                                            ),
                                        },
                                    },
                                ],
                            };
                        },
                        data: barData3,
                        yAxisIndex: 0,
                    },
                    {
                        z: 1,
                        type: 'custom',
                        name: '提取',
                        renderItem: (params, api) => {
                            // const location = api.coord([api.value(0), api.value(1)]);
                            let location = api.coord([
                                api.value(0),
                                api.value(1),
                            ]);
                            location = [
                                location[0] + this.getFontSize(3),
                                location[1],
                            ];
                            let location1 = api.coord([api.value(0), 0]);
                            location1 = [
                                location1[0] + this.getFontSize(3),
                                location1[1],
                            ];
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
                                            xAxisPoint: location1,
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
                                                        color:
                                                            'rgba(75,250,172,0.4)',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color:
                                                            'rgba(4,205,116,0.4)',
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
                                            xAxisPoint: location1,
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
                                                        color:
                                                            'rgba(35,223,140,0.4)',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color:
                                                            'rgba(4,133,76,0.4)',
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
                                            xAxisPoint: location1,
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
                                                        color:
                                                            'rgba(2,173,97,0.4)',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color:
                                                            'rgba(75,250,172,0.4)',
                                                    },
                                                ],
                                            ),
                                        },
                                    },
                                ],
                            };
                        },
                        data: barData3,
                        yAxisIndex: 0,
                    },
                    {
                        type: 'line',
                        name: '提取率',
                        data: lineData,
                        z: 3,
                        symbol: 'circle',
                        symbolSize: this.getFontSize(12),
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
                        scriptId: 'sy_jsnjctqb',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        // console.log(this.dataList);
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss"></style>
