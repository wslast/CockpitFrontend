<template>
    <div class="khpm">
        <chart :chartData="chartData" ref="chart"></chart>


<!--        循环渲染逻辑编写-->
        <div class="khpm-bh" v-for="(item,index) in resData" :key="item.name"  :class="index+1 > 1?'khpm-bh'+(index+1) :''">
            <div class="khpm-bh-item">
                <div class="khpm-bh-item-left">
                    <div class="khpm-bh-item-left-image"  :class="index+1 > 1?'khpm-bh-item-left-image'+(index+1) :''" ></div>
                    <div class="khpm-bh-item-left-text" > {{item.name}}</div>
                </div>
                <div class="khpm-bh-item-right">
                    {{item.value}}<span class="khpm-bh-item-right-unit">分</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return {
            dataList: [],
            chartData: {},
            resData: [
                {name: '招商银行', value:88.9},
                {name: '长沙银行', value:87.6},
                {name: '工商银行', value:98.3},
                {name: '农业银行', value:94.2},
                {name: '湖南银行', value:90.3},

            ]
        };
    },
    async created() {
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {
            // 排序 高到低
            this.resData = [...this.resData].sort((b, a) => a.value - b.value);
            const maxData = Math.max(...this.resData.map(({value}) => value))
            const maxSeriesData = this.resData.map(() => maxData);
            const seriesData = [...this.resData].sort((a, b) => a.value - b.value).map(({value}) => value)

            this.chartData = {
                tooltip: {
                    show:false,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    show:false,
                },
                grid: {
                    left: '0%',
                    right: '-13%',
                    bottom: '-10%',
                    top:'8%',
                    containLabel: true
                },
                xAxis: {
                    show:false,
                    type: 'value',
                },
                yAxis: {
                    show:false,
                    type: 'category',
                    // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
                },
                series: [
                    {
                        type: 'pictorialBar',
                        itemStyle: {
                            color: '#04C8F8',
                        },
                        symbolSize: [12, 12],
                        data: seriesData,
                        symbol: 'rect',
                        symbolRepeat: 'fixed',
                        symbolPosition: 'start',
                        symbolMargin: 2,
                        symbolClip: true,
                        zlevel: 2,
                        symbolOffset: [8, 0],
                    },
                    {
                        type: 'pictorialBar',
                        itemStyle: {
                            color: '#061E65',
                        },
                        symbolSize: [12, 12],
                        data: maxSeriesData,
                        symbol: 'rect',
                        symbolRepeat: 'fixed',
                        symbolPosition: 'start',
                        symbolMargin: 2,
                        symbolClip: true,
                        zlevel: 1,
                        symbolOffset: [8, 0],
                    },
                    {
                        itemStyle:{
                            color: 'rgba(4, 220, 255, 0)',
                            borderWidth:1,
                            borderColor: '#04DCFF', // 边框颜色
                            borderRadius:20
                        },
                        barWidth:20,
                        barGap: '80%', // 控制同一类别中不同系列的柱子间隔
                        barCategoryGap: '100%',
                        name: '',
                        type: 'bar',
                        data: maxSeriesData.map(item=>{
                            return item + 2
                        }),
                    },
                ]
            }


        },

    },
};
</script>

<style lang="scss" scoped>
    .khpm {
        position: relative;
        &-bh {
            position: absolute;
            top: 14%;
            left: 4%;
            width: 91.5%;
            &-item {
                display: flex;
                justify-content: space-between;
                &-left {
                    display: flex;
                    align-items: center;
                    &-image {
                        width: 24px;
                        height: 24px;
                        background: url("../../../../assets/images/dp/yhhx/icon_khpm_jin.svg") ;
                        background-size: cover;
                    }
                    &-image2 {
                        background: url("../../../../assets/images/dp/yhhx/icon_khpm_yin.svg");
                    }

                    &-image3 {
                        background: url("../../../../assets/images/dp/yhhx/icon_khpm_tong.svg");
                    }

                    &-image4 {
                        background: url("../../../../assets/images/dp/yhhx/icon_khpm_4.svg");
                    }

                    &-image5 {
                        background: url("../../../../assets/images/dp/yhhx/icon_khpm_5.svg");
                    }

                    &-text {
                        font-family: MicrosoftYaHei;
                        font-size: 16px;
                        color: #FFFFFF;
                        margin-left: 12px;
                    }
                    &-textb {
                        margin-bottom: 2px;
                    }

                }
                &-right {
                    font-family: MicrosoftYaHei;
                    font-weight: bold;
                    font-size: 18px;
                    color: #FFC35A;
                    &-unit {
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        color: #FFFFFF;
                        font-weight: normal;
                    }
                }
            }
        }
        &-bh2 {
            top: 31%;
        }

        &-bh3 {
            top: 48%;
        }
        &-bh4 {
            top: 65%;
        }
        &-bh5 {
            top: 82%;
        }
    }

</style>
