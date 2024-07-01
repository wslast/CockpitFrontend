<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 还款情况
-->
<template>
    <empty :image-size="50" v-if="!dataList || dataList.length == 0"></empty>
    <chart class="pcth100" :chartData="chartData" ref="chart" v-else></chart>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'test',
    components: {},
    props: {
        personInfo: {
            type: Object,
            default: () => {},
        },
    },
    watch: {
        personInfo: {
            handler(newVal, oldVal) {
                //获取表格数据
                if (newVal.grzh != '') {
                    this.getData();
                }
            },
            deep: true,
            immediate: true,
        },
    },
    data() {
        return {
            dataList: [],
            chartData: {},
        };
    },

    computed: {},

    mounted() {},
    methods: {
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'grhx_jcqk',
                        grzh: this.personInfo.grzh,
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        this.$nextTick(() => {
                            this.initChart();
                        });
                        resolve();
                    });
            });
        },
        initChart() {
            let that = this;
            let option = {
                backgroundColor: '',
                grid: {
                    left: '3%',
                    right: '2%',
                    top: '20%',
                    bottom: '2%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999',
                        },
                        lineStyle: {
                            type: 'dashed',
                        },
                    },
                    formatter: function(params) {
                        var result = '';
                        var dotHtml =
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F1E67F"></span>'; // 定义第一个数据前的圆点颜色
                        var dotHtml2 =
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2BA8F1"></span>'; // 定义第二个数据前的圆点颜色
                        result +=
                            params[0].axisValue +
                            '</br>' +
                            dotHtml +
                            ' 缴存金额: ' +
                            that.dataList[params[0].dataIndex].jcje +
                            '</br>' +
                            dotHtml +
                            ' 缴存类型: ' +
                            that.dataList[params[0].dataIndex].jclx +
                            '</br>' +
                            dotHtml2 +
                            ' 缴存月份： ' +
                            that.dataList[params[0].dataIndex].jcyf;
                        return result;
                    },
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: 'rgba(0, 0, 0, 0.45)',
                            margin: 14,
                            textStyle: {
                                fontSize: 14,
                            },
                            interval: 0,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.45)',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        data: this.dataList.map((item) => {
                            return item.yearmonth;
                        }),
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        nameTextStyle: {
                            color: 'rgba(0, 0, 0, 0.45)',
                        },
                        min: 0,
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.45)',
                                fontSize: 14,
                            },
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.45)',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.45)',
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '缴存金额',
                        type: 'line',
                        stack: '总量',
                        symbol: 'circle',
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                color: 'rgba(64, 158, 255, 1)',
                                lineStyle: {
                                    color: 'rgba(64, 158, 255, 1)',
                                    width: 2,
                                },
                            },
                        },
                        data: this.dataList.map((item) => {
                            return item.jcje;
                        }),
                    },
                ],
            };
            this.chartData = option;
        },
    },
};
</script>
<style lang="scss" scoped>
.simpleTable {
    width: 100%;
    height: 100%;
}
</style>
