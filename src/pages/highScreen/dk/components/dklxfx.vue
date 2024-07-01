<template>
    <div style="position: relative; height: 100%;width: 100%">
        <div style="width:100%;height: 100%" ref="chart"></div>
        <div class="btnbox">
            <div class="bgselect" @click="handleLeft='全部'" :class="handleLeft=='全部'?'bgselectAll':'bgdefaultAll'">
                全部
            </div>
            <div class="bgselect " @click="handleLeft='近一年'" :class="handleLeft=='近一年'?'bgse':'bgde'"
                 style="margin-right: 17px;">近一年
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
    components: {},
    data() {
        return {
            handleLeft: '全部',
            dataList: [],
            index: 0,
            color: ['#81C8F6 ', '#E59F3D ', '#88F8AB'],
            option: {},
            chart: null,
            sum: 0,
            pieData1: [],
            pieData2: [],
            pieData3: [],
            color1: [
                '#1AFDFE',
                '#1385D5'
            ],
            color2: [
                '#8C5CFF',
                '#A0E1FF'
            ],
            color3: [
                '#83F9F8',
                '#93C921',
                '#E59F3D',
                '#4A89F2'
            ]
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    async mounted() {
        await this.getData();
        this.getresData()
        this.$nextTick(() => {
            this.initChart();
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
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'dk_dklxfx',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        resolve();
                    });
            });
        },
        initChart() {
            this.chart = echarts.init(this.$refs.chart);
            let showData = [];
            this.dataList.forEach((item, index) => {
                this.sum += item.bs;
                showData.push({
                    ...item,
                    name: item.lx,
                    value: item.bs,
                    itemStyle: {color: this.color[index]},
                });
            });
            let showData2 = JSON.parse(JSON.stringify(showData));
            showData2.forEach((item, index) => {
                if (index != 0) {
                    item.itemStyle.color = 'rgba(35, 146, 173, 0.47)';
                }
            });
            this.option = {
                tooltip: {
                    trigger: 'item',
                    confine: true,
                },
                grid: {
                    bottom: '0%'
                },
                series: [
                    {
                        label: {
                            show: true,
                            position: 'inner',
                            fontSize: 14,
                            formatter: function (params) {
                                let seriesName = params.name;
                                let dataValue = params.value;
                                let percent = params.percent;
                                return '{seriesName|' + seriesName + '\n}{value|' + dataValue + '}{unit| 笔} \n  {percent|' + percent + '%}';
                            },
                            rich: {
                                unit: {
                                    fontSize: 12,  // 数据值字体大小
                                    color: '#0A0A0A',  // 数据值颜色
                                    fontWeight: 'bold'
                                },
                                seriesName: {
                                    fontSize: 14, // 系列名字体大小
                                    color: '#000000', // 系列名颜色
                                    fontFamily: 'Microsoft YaHei',
                                    lineHeight: 23,
                                },
                                value: {
                                    fontSize: 18,  // 数据值字体大小
                                    color: '#0A0A0A',  // 数据值颜色
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                    lineHeight: 23,
                                },
                                percent: {
                                    fontSize: 14,  // 数据值字体大小
                                    color: '#0A0A0A',  // 数据值颜色
                                    fontStyle: 'italic',
                                    fontWeight: 'bold'
                                }
                            }

                        },
                        name: '内层',
                        type: 'pie',
                        radius: ['0%', '40%'],
                        center: ['50%', '41%'],
                        data: this.pieData1,
                        itemStyle: {
                            normal: {
                                // 内层颜色
                                // color: '#ffde93'
                            }
                        }
                    },
                    {
                        avoidLabelOverlap: true,
                        name: '中层',
                        type: 'pie',
                        radius: ['48%', '60%'],
                        center: ['50%', '41%'],
                        data: [
                            {
                                value: 2378, name: '异地', itemStyle: {color: '#8C5CFF'}, label: {
                                    formatter: function (params) {
                                        let seriesName = params.name;
                                        let dataValue = params.value;
                                        let percent = params.percent;
                                        return '{seriesName|' + seriesName + '\n}{value|' + dataValue + '}{unit|  笔} \n  {percent|' + percent + '%}';
                                    },
                                    rich: {
                                        unit: {
                                            fontSize: 12,  // 数据值字体大小
                                            color: '#ffffff',  // 数据值颜色

                                            fontWeight: 'bold'
                                        },
                                        seriesName: {
                                            fontSize: 14, // 系列名字体大小
                                            color: '#ffffff', // 系列名颜色
                                            fontFamily: 'Microsoft YaHei',
                                            align: "right",
                                            lineHeight: 30,

                                        },
                                        value: {
                                            fontSize: 24,  // 数据值字体大小
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            color: 'inherit',
                                            lineHeight: 30,
                                            align: "right",
                                        },
                                        percent: {
                                            fontSize: 16,  // 数据值字体大小
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            color: 'inherit',
                                            align: "right",
                                        }
                                    }
                                },
                            },
                            {
                                value: 6578,
                                name: '本地',
                                itemStyle: {
                                    color: '#A0E1FF'
                                },
                                label: {
                                    formatter: function (params) {
                                        let seriesName = params.name;
                                        let dataValue = params.value;
                                        let percent = params.percent;
                                        return '{seriesName|' + ' ' + seriesName + '}\n{value|' + dataValue + '}{unit|  笔}\n{percent|' + percent + '%}';
                                    },
                                    rich: {
                                        unit: {
                                            fontSize: 12,  // 数据值字体大小
                                            color: '#ffffff',  // 数据值颜色
                                            fontWeight: 'bold'
                                        },
                                        seriesName: {
                                            fontSize: 14, // 系列名字体大小
                                            color: '#ffffff', // 系列名颜色
                                            fontFamily: 'Microsoft YaHei',
                                            align: "left",
                                            lineHeight: 30,

                                        },
                                        value: {
                                            fontSize: 24,  // 数据值字体大小
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            color: 'inherit',
                                            lineHeight: 30,
                                            align: "left",
                                        },
                                        percent: {
                                            fontSize: 16,  // 数据值字体大小
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            color: 'inherit',
                                            align: "left",
                                        }
                                    }
                                },
                            },
                        ],
                        labelLine: {
                            length: 50,
                            // minTurnAngle:90
                        },
                        labelLayout: {
                            hideOverlap: false,
                            verticalAlign: 'top',
                            y: '0px',
                        },
                        itemStyle: {
                            normal: {
                                // 中层颜色
                                // color: '#91c46e'
                            }
                        }
                    },
                    {
                        avoidLabelOverlap: true,
                        name: '外层',
                        type: 'pie',
                        radius: ['68%', '78%'],
                        center: ['50%', '41%'],
                        data: [
                            {value: 6245, name: '无提额', itemStyle: {color: '#83F9F8'}},
                            {value: 3023, name: '绿色建筑', itemStyle: {color: '#93C921'}},
                            {value: 2578, name: '三孩', itemStyle: {color: '#E59F3D'}},
                            {value: 7299, name: '高层次', itemStyle: {color: '#4A89F2'}},
                        ],
                        labelLine: {
                            length2: 1
                        },
                        labelLayout: {
                            hideOverlap: false,
                            y: '360px',
                            align: 'right',
                            width: 150,
                            moveOverlap: "shiftX"
                        },
                        label: {
                            formatter: function (params) {
                                let seriesName = params.name;
                                let dataValue = params.value;
                                let percent = params.percent;
                                return '{seriesName|' + seriesName + '\n}{value|' + dataValue + '}{unit|  笔} \n  {percent|' + percent + '%}';
                            },
                            rich: {
                                unit: {
                                    fontSize: 12,  // 数据值字体大小
                                    color: '#ffffff',  // 数据值颜色

                                    fontWeight: 'bold'
                                },
                                seriesName: {
                                    fontSize: 14, // 系列名字体大小
                                    color: '#ffffff', // 系列名颜色
                                    fontFamily: 'Microsoft YaHei',
                                    lineHeight: 23,

                                },
                                value: {
                                    fontSize: 24,  // 数据值字体大小
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                    color: 'inherit',
                                    lineHeight: 23,
                                },
                                percent: {
                                    fontSize: 16,  // 数据值字体大小
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                    color: 'inherit',
                                    lineHeight: 23,
                                }
                            },

                        },
                        itemStyle: {
                            normal: {
                                borderRadius: 15
                            }
                        }
                    }
                ]
            };
            this.chart.setOption(this.option);

        },
        getresData() {
            let res = [
                {value: 6245, name: '组合贷款'},
                {value: 14299, name: '公积金贷款'}
            ]
            this.pieData1 = res.map((item, index) => {
                    return {
                        value: item.value,
                        name: item.name,
                        itemStyle: {
                            color: this.color1[index]
                        }
                    }
                }
            )
        }
    },
};
</script>
<style scoped lang="scss">
.insideChart {
    width: 80.006px;
    height: 80.006px;
    position: absolute;
    top: 51.994px;
    left: 36px;
}

.round {
    width: 15.994px;
    height: 15.994px;
    margin: 19.2px 10.003px 0px 18.01px;
    border-radius: 8.006px;
}

.typeDiv {
    margin: 15.36px 10.003px 0px 0px;
    width: 68.006px;
    font-size: 15.994px;
}

.dataDiv {
    margin-top: 3.994px;
    height: 43.2px;
    // background-color: #ffffff;
    background-image: url('../../../../assets/images/dp/dk/dk_bingtu_bg.svg');
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right: 10.003px;
    line-height: 30px;
    font-size: 15.994px;
}

.btnbox {
    width: 100.994px;
    height: 45.006px;
    position: absolute;
    right: -3%;
    top: -10%;
    //background: yellow;
    display: flex;
    //align-items: end;
    padding-top: 10px;

    .bgselect {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
        font-size: 12px;
        color: #A0E1FF;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
    }


    .bgse {
        background-image: url("../../../../assets/images/dp/tq/3zi_selected.svg");
        width: 56px;
        color: #FFFFFF;
    }

    .bgde {
        width: 56px;
        background-image: url("../../../../assets/images/dp/tq/3zi_defult.svg");

    }

    .bgselectAll {
        background-image: url("../../../../assets/images/dp/tq/2zi_selected.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 46px;
        height: 20px;
        border-radius: 10px 0px 0px 10px;
        text-align: center;
        font-size: 12px;
        color: #FFFFFF;
        line-height: 20px;

    }

    .bgdefaultAll {
        background-image: url("../../../../assets/images/dp/tq/2zi_defult.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 46px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px 0px 0px 10px;
        text-align: center;
        font-size: 12px;
        color: #A0E1FF;
    }

}

</style>
