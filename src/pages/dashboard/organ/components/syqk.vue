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
                    使用情况
                </div>
            </div>
            <empty :image-size="50"></empty>
        </template>
        <chart class="pcth100 fg1" :chartData="chartData" v-if="!flag"></chart>
    </div>
</template>

<script>
export default {
    name: 'syqk',
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
            if (params) {
                this.flag = false;
            }
            const data = params.map((item) => {
                return item;
            });
            this.initChart(data);
        },
        initChart(data) {
            const name = [
                {
                    name: '使用人数',
                    key: 'syrs',
                    color: 'rgba(91, 143, 249, 0.85)',
                },
                {
                    name: '使用提取人数',
                    key: 'sytqrs',
                    color: 'rgba(90, 216, 166, 0.85)',
                },
                {
                    name: '销户提取人数',
                    key: 'xhtqrs',
                    color: 'rgba(93, 112, 146, 0.85)',
                },
                {
                    name: '贷款人数',
                    key: 'dkrs',
                    color: 'rgba(246, 189, 22, 0.85)',
                },
                {
                    name: '申贷人数',
                    key: 'sdrs',
                    color: 'rgba(232, 104, 74, 0.85)',
                },
                // {
                //     name: '逾期人数',
                //     key: 'yqrs',
                //     color: 'rgba(109, 200, 236, 0.85)',
                // },
            ];
            let option = {
                backgroundColor: '',
                tooltip: {
                    trigger: 'axis',
                },
                title: {
                    text: `{a|}{b|近12个月使用情况}`,
                    textStyle: {
                        rich: {
                            a: {
                                height: 14,
                                width: 14,
                                padding: [0, 0, 0, 0],
                                backgroundColor: {
                                    image: require('@/assets/images/portrait/organ/icon_dwhx_you2.svg'),
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
                    data: name.map((item) => item.name),
                    textStyle: {
                        align: 'right',
                        color: 'rgba(140, 140, 140, 1)',
                    },
                    itemWidth: 11,
                    itemHeight: 8,
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
                series: name.map((item) => {
                    let serie = {
                        name: item.name,
                        type: 'bar',
                        barWidth: 6,
                        itemStyle: {
                            normal: {
                                color: item.color,
                            },
                        },
                        data: data.map((d) => d[item.key]),
                    };
                    return serie;
                }),
            };
            console.log(option);
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
