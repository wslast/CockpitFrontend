<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:  公积金缴存情况
-->
<template>
    <div class="pcth100 df fdc">
        <template v-if="flag">
            <div class="title">
                <img class="icon" :src="url" alt="" />
                <div class="content">
                    公积金缴存情况
                </div>
            </div>
            <empty :image-size="50"></empty>
        </template>
        <chart class=" fg1" :chartData="chartData" v-if="!flag"></chart>
    </div>
</template>

<script>
export default {
    name: 'gjjjcqk',
    components: {},

    data() {
        return {
            flag: true,
            chartData: {},
            url: require('@/assets/images/portrait/person/icon_grhx_you1_2.svg'),
        };
    },

    computed: {},

    mounted() {},

    methods: {
        getData(params) {
            const data = params.map((item) => {
                return item;
            });
            this.initChart(data);
        },
        initChart(data) {
            if (data) {
                this.flag = false;
            }
            let option = {
                backgroundColor: '',
                tooltip: {
                    trigger: 'axis',
                },
                title: {
                    text: `{a|}{b|近12个月公积金缴存情况}`,
                    textStyle: {
                        rich: {
                            a: {
                                height: 14,
                                width: 14,
                                padding: [0, 0, 0, 0],
                                backgroundColor: {
                                    image: require('@/assets/images/portrait/organ/icon_dwhx_zuo3.svg'),
                                },
                            },
                            b: {
                                fontSize: 14,
                                padding: [0, 0, 0, 10],
                                color: '#1d1d1d',
                                fontWeight: '900',
                            },
                        },
                    },
                    top: '0',
                    left: '0',
                },
                legend: {
                    data: ['实缴人数', '封存人数', '开户人数'],
                    textStyle: {
                        align: 'right',
                        color: 'rgba(140, 140, 140, 1)',
                    },
                    itemWidth: 11,
                    itemHeight: 8,
                    itemGap: 20,
                    icon: 'rect',
                    top: '0',
                    right: '20',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: data.map((item) => item.ny),
                    axisLabel: {
                        //坐标轴刻度标签的相关设置。
                        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                        //	margin:15,
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.45)',
                            fontStyle: 'normal',
                            fontSize: 12,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: { color: 'rgba(0, 0, 0, 0.65)' },
                    },
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.45)',
                                fontStyle: 'normal',
                                fontSize: 12,
                            },
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.15)',
                                // 	opacity:0.1
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.45)',
                                fontStyle: 'normal',
                                fontSize: 12,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '实缴人数',
                        type: 'line',
                        symbolSize: 0,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: 'rgba(91, 143, 249,1)',
                                lineStyle: {
                                    color: 'rgba(91, 143, 249, 1)',
                                    width: 2,
                                },
                                areaStyle: {
                                    color: 'rgba(91, 143, 249, 0.60)',
                                },
                            },
                        },
                        data: data.map((item) => item.sjrs),
                    },
                    {
                        name: '封存人数',
                        type: 'line',
                        symbolSize: 0,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: 'rgba(90, 216, 166, 1)',
                                lineStyle: {
                                    color: 'rgba(90, 216, 166, 1)',
                                    width: 2,
                                },
                                areaStyle: {
                                    color: 'rgba(90, 216, 166, 0.60)',
                                },
                            },
                        },
                        data: data.map((item) => item.fcrs),
                    },
                    {
                        name: '开户人数',
                        type: 'line',
                        symbolSize: 0,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: 'rgba(241, 109, 29,1)',
                                lineStyle: {
                                    color: 'rgba(241, 109, 29, 1)',
                                    width: 2,
                                },
                                areaStyle: {
                                    color: 'rgba(241, 109, 29, 0.60)',
                                },
                            },
                        },
                        data: data.map((item) => item.khrs),
                    },
                ],
            };
            this.chartData = option;
        },
    },
};
</script>
<style lang="scss" scoped>
.title {
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-top: 20px;

    .icon {
        height: 8px;
    }

    .content {
        font-size: 12px;
        color: #1d1d1d;
        margin-left: 10px;
    }
}
</style>
