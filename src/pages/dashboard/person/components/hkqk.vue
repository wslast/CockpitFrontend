<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 缴存情况
-->
<template>
    <empty :image-size="50" v-if="!dataList || dataList.length == 0"></empty>
    <chart class="pcth100" :chartData="chartData" v-else></chart>
</template>

<script>
export default {
    name: 'hkqk',
    components: {},
    props: {
        personInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            chartData: {},
            dataList: [],
        };
    },

    computed: {},
    watch: {
        personInfo: {
            handler(newVal, oldVal) {
                if (newVal.grzh != '') {
                    this.getData();
                }
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
        this.initChart();
    },

    methods: {
        async getData() {
            this.dataList = [];
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'grhx_hkqk',
                        grzh: this.personInfo.grzh,
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        this.initChart();
                        resolve();
                    });
            });
        },
        initChart() {
            let max = 100,
                xIdxs = [],
                value1 = [],
                value2 = [];
            for (let i = 0; i < 12; i++) {
                value1.push((Math.random() * 100).toFixed(0));
                value2.push((Math.random() * 100).toFixed(0));
                xIdxs.push('num' + (i + 1));
            }
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                grid: [
                    {
                        top: 40,
                        bottom: '48%',
                        left: 10,
                        right: 10,
                        containLabel: true,
                    },
                    {
                        top: '54%',
                        bottom: 20,
                        left: 10,
                        right: 10,
                        containLabel: true,
                    },
                ],
                xAxis: [
                    {
                        show: true,
                        type: 'category',
                        axisTick: { show: false },
                        data: this.dataList.map((item, index) => {
                            return item.hqqs;
                        }),
                    },
                    {
                        show: true,
                        type: 'category',
                        gridIndex: 1,
                        axisTick: { show: false },
                        axisLabel: { show: false },
                        data: this.dataList.map((item, index) => {
                            return item.hqqs;
                        }),
                    },
                ],
                yAxis: [
                    {
                        show: true,
                        type: 'value',
                        axisTick: { show: false },
                        axisLabel: { show: false },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.15)',
                            },
                        },
                        splitNumber: 2,
                    },
                    {
                        show: true,
                        type: 'value',
                        gridIndex: 1,
                        inverse: true,
                        axisTick: { show: false },
                        axisLabel: { show: false },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.15)',
                            },
                        },
                        splitNumber: 2,
                    },
                ],
                series: [
                    {
                        name: '本金',
                        type: 'bar',
                        z: 3,
                        barWidth: '30%',
                        data: this.dataList.map((item, index) => {
                            return item.bj;
                        }),
                        label: {
                            show: true,
                            color: 'rgba(115, 160, 250, 1)',
                            position: 'top',
                        },
                        itemStyle: {
                            color: 'rgba(115, 160, 250, 1)',
                        },
                    },
                    {
                        name: '利息',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        z: 3,
                        barWidth: '30%',
                        data: this.dataList.map((item, index) => {
                            return item.lx;
                        }),
                        label: {
                            show: true,
                            color: 'rgba(115, 222, 179, 1)',
                            position: 'bottom',
                        },
                        itemStyle: {
                            color: 'rgba(115, 222, 179, 1)',
                        },
                    },
                ],
            };

            this.chartData = option;
        },
    },
};
</script>
<style lang="scss" scoped></style>
