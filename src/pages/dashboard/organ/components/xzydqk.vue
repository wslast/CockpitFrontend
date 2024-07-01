<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 新增疑点情况
-->
<template>
    <chart class="fg1 pcth100" :chartData="chartData"></chart>
</template>

<script>
import utils from '../../..//highScreen/utils';
export default {
    name: 'xzydqk',
    components: {},

    data() {
        return {
            chartData: {},
            list: [],
        };
    },

    computed: {},
    mounted() {
        // this.initChart();
    },
    methods: {
        getData(params) {
            this.list = [
                { lx: '职工贷款人数', sl: params.zgdkrs },
                { lx: '购房提取人数', sl: params.gftqrs },
                { lx: '租房提取人数', sl: params.zftqrs },
                { lx: '封存半年以上人员', sl: params.fcbnysry },
                { lx: '临近退休人员', sl: params.ljtxry },
            ];
            this.initChart();
        },
        initChart() {
            let total = 0;
            // this.list = [
            //     { lx: '职工贷款人数', sl: 100 },
            //     { lx: '购房提取人数', sl: 300 },
            //     { lx: '租房提取人数', sl: 100 },
            //     { lx: '封存半年以上人员', sl: 100 },
            //     { lx: '临近退休人员', sl: 100 },
            // ];
            this.list = this.list.map((item) => {
                item.value = item.sl;
                total += item.sl;
                return item;
            });
            utils.calcPct(this.list);
            console.log(this.list);
            const color = {
                职工贷款人数: 'rgba(91, 143, 249, 0.85)',
                购房提取人数: 'rgba(90, 216, 166, 0.85)',
                购房提取人数: 'rgba(246, 189, 22, 0.85)',
                封存半年以上人员: 'rgba(232, 104, 74, 0.85)',
                封存半年以上人员: 'rgba(109, 200, 236, 0.85)',
            };
            const max = Math.max.apply(
                null,
                this.list.map((item) => item.sl),
            );
            let option = {
                title: {
                    bottom: '10%',
                    left: '20%',
                    text: total,
                    textStyle: {
                        color: 'rgba(64, 158, 255, 1)',
                        fontSize: 18,
                    },
                },
                polar: {
                    radius: ['10%', '200%'],
                    center: ['25%', '80%'], //位置
                },
                legend: {
                    show: true,
                    y: 'center',
                    right: '0',
                    icon: 'circle',
                    orient: 'vertical',
                    itemWidth: 6,
                    itemHeight: 6,
                    textStyle: {
                        color: '#D7E5FF',
                        rich: {
                            name1: {
                                color: 'rgba(140, 140, 140, 1)',
                                fontSize: '12',
                            },
                            name2: {
                                color: 'rgba(29, 29, 29, 1)',
                                fontSize: '12',
                            },
                        },
                    },
                    formatter: (name) => {
                        let res = this.list.filter((v) => v.lx === name);
                        let str = '';
                        str =
                            '{name1|  ' +
                            res[0].lx +
                            '   }{name2|' +
                            res[0].pct +
                            '%(' +
                            res[0].sl +
                            ')}';
                        return str;
                    },
                },
                grid: {
                    top: '10%',
                    left: '0%',
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
                series: this.list
                    .map((item) => {
                        let serie = {
                            type: 'bar',
                            name: item.lx,
                            stack: item.lx,
                            barWidth: this.getFontSize(10),
                            coordinateSystem: 'polar',
                            stack: item.lx,
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: color[item.lx],
                            },
                            data: [{ name: 'a', value: item.sl }],
                        };
                        return serie;
                    })
                    .concat(
                        this.list.map((item) => {
                            let serie = {
                                type: 'bar',
                                name: item.lx,
                                stack: item.lx,
                                barWidth: this.getFontSize(30),
                                coordinateSystem: 'polar',
                                stack: item.lx,
                                itemStyle: {
                                    color: 'rgba(234, 234, 234, 1)',
                                },
                                label: {
                                    show: false,
                                },
                                data: [{ name: 'a', value: max - item.sl }],
                            };
                            return serie;
                        }),
                    ),
            };
            this.chartData = option;
        },
    },
};
</script>
<style lang="scss" scoped></style>
