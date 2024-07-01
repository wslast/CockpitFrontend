<!--
 * @Author: 王硕
 * @LastEditors: 王硕
 * @Description: 新增疑点情况
-->
<template>
    <div>
        <chart class="fg1 pcth100" :chartData="chartData"></chart>
    </div>
</template>

<script>
export default {
    name: 'xzydqk',
    components: {},

    data() {
        return {
            chartData: {},
            resList: [],
        };
    },

    computed: {},

    created() {
        this.getData();
        // 参考
        let option = {
            polar: {},
            angleAxis: {
                max: 4,
                startAngle: 180,
                endAngle: 0
            },
            radiusAxis: {
                type: 'category',
                data: ['a', 'b', 'c', 'd']
            },
            tooltip: {},
            series: [{
                type: 'bar',
                data: [
                    {value: 2, itemStyle: {color: 'red'}},       // 红色
                    {value: 1.2, itemStyle: {color: 'green'}},   // 绿色
                    {value: 2.4, itemStyle: {color: 'blue'}},    // 蓝色
                    {value: 3.6, itemStyle: {color: 'yellow'}}   // 黄色
                ],
                coordinateSystem: 'polar',
                label: {
                    show: true,
                    position: 'middle',
                    formatter: '{c}'
                }
            }]
        };
    },

    methods: {
        getData() {
            this.$api
                .formPost("/api/dyncscript/scriptRule/query", {scriptId: "fk_sp_xzydqk"})
                .then(res => {
                    this.resList = res.retBody.retList;
                    this.initChart();
                });
        },
        initChart() {
            const color = {
                "缴存": '#A8E183',
                "提取": '#83B6F8',
                "贷款": '#8F77C3',
                "资金": '#CD6983',
                "财务": '#FFC515',
            };
            const max = Math.max.apply(
                null,
                this.resList.map((item) => item.sl),
            );
            this.chartData = {
                polar: {
                    radius: ['10%', '150%'],
                    center: ['50%', '80%'], //位置
                },
                legend: {
                    show: true,
                    x: 'center',
                    bottom: '10',
                    icon: 'circle',
                    textStyle: {
                        color: '#fff',
                        fontSize: this.getFontSize(14),
                    },
                    data: this.resList.map(({lx}) => lx),
                },
                grid: {
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: true,
                },
                angleAxis: {
                    max: max * 2, //最大值的两倍
                    startAngle: 180,
                    clockwise: true,
                    show: false,
                },
                radiusAxis: {
                    type: 'category',
                    data: ['a'],
                    show: false,
                },
                series: this.resList
                    .map((item) => {
                        return {
                            type: 'bar',
                            name: item.lx,
                            stack: item.lx,
                            barWidth: this.getFontSize(30),
                            coordinateSystem: 'polar',
                            label: {
                                show: true,
                                position: 'middle',
                                fontSize: this.getFontSize(18),
                                color: '#fff',
                            },
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: color[item.lx],
                                borderRadius: 15
                            },
                            data: [{name: 'a', value: item.sl}],
                        };
                    })
                    .concat(
                        this.resList.map((item) => {
                            return {
                                type: 'bar',
                                name: item.lx,
                                stack: item.lx,
                                barWidth: this.getFontSize(30),
                                coordinateSystem: 'polar',
                                itemStyle: {
                                    color: 'rgba(230, 238, 253, 0.1)',
                                },
                                label: {
                                    show: false,
                                },
                                data: [{name: 'a', value: max - item.sl}],
                            };
                        }),
                    ),
            };
        },
    },
};
</script>
<style lang="scss" scoped></style>
