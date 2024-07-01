<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<template>
<div class="df pcth100 fg1" style="position:relative">
    <chart class="fg1 pcth100" :chartData="chartData"></chart>
    <img class="bg" src="../../../../assets/images/dp/fk/yibiaopan.svg" alt="" srcset="" />
</div>
</template>

<script>
//require("../../../../assets/images/dp/fk/yibiaopan.svg")
import * as echarts from 'echarts';
export default {
    name: 'gzzbzb',
    components: {},

    data() {
        return {
            chartData: {},
            list: [],
        };
    },

    computed: {},

    created() {
        this.getData();
    },

    methods: {
        getData() {
            this.$api
                .formPost("/api/dyncscript/scriptRule/query", {
                    scriptId: "fk_sp_gzzbzb"
                })
                .then(res => {
                    this.list = res.retBody.retList;
                    this.initChart();
                });
        },
        initChart() {
            let option = {
                backgroundColor: 'transparent',
                series: [
                    // {
                    //   tooltip: {
                    //     show: false
                    //   },
                    //   type: "gauge",
                    //   radius: "145%",
                    //   center: ["50%", "90%"],
                    //   startAngle: 180,
                    //   endAngle: 0,
                    //   detail: {
                    //     show: false
                    //   },
                    //   axisLine: {
                    //     lineStyle: {
                    //       width: 6,
                    //       color: [
                    //         [0, "#545680"],
                    //         [1, "#545680"]
                    //       ]
                    //     }
                    //   },
                    //   axisLabel: {
                    //     show: false
                    //   },
                    //   axisTick: {
                    //     show: false
                    //   },
                    //   splitLine: {
                    //     show: false
                    //   }
                    // },
                    {
                        tooltip: {
                            show: false,
                        },
                        type: 'gauge',
                        radius: '140%',
                        center: ['50%', '90%'],
                        startAngle: 180,
                        endAngle: 180 - 180 * (this.list[0].zbzb / 100),
                        detail: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: this.getFontSize(40),
                                color: [
                                    [
                                        0.9,
                                        new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            1,
                                            0,
                                            [{
                                                    offset: 0,
                                                    color: '#000000',
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#FEC415',
                                                },
                                            ],
                                        ),
                                    ],
                                    [1, '#FEC415'],
                                ],
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        z: 4,
                        type: 'gauge',
                        radius: '102%',
                        min: 0,
                        max: 100,
                        center: ['50%', '90%'],
                        data: [{
                            value: this.list[0].zbzb,
                        }, ],
                        splitNumber: 10,
                        startAngle: 180,
                        endAngle: 0,
                        title: {
                            offsetCenter: ['0', '-60%'],
                            fontSize: this.getFontSize(40),
                        },
                        detail: {
                            formatter: function (value) {
                                return value;
                            },
                            fontSize: this.getFontSize(40),
                            color: '#FFC35A',
                            offsetCenter: ['0%', '-40%'],
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: this.getFontSize(14),
                            distance: this.getFontSize(-65),
                        },
                        axisTick: {
                            splitNumber: 1,
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.5)',
                                width: 5,
                            },
                            length: -15,
                        },
                        splitLine: {
                            show: false,
                            length: -25,
                            lineStyle: {
                                color: '#ccc',
                                width: 1,
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#fff',
                            },
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 8,
                            icon: 'circle',
                            itemStyle: {
                                color: '#fff',
                            },
                        },
                        pointer: {
                            width: 2,
                            length: '80%',
                        },
                    },
                ],
            };
            this.chartData = option;
        },
    },
};
</script>

<style lang="scss" scoped>
.bg {
    position: absolute;
    bottom: 8.006px;
    left: 10%;
    width: 80%;
    height: 90%;
    z-index: 1;
}
</style>
