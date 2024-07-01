<template>
    <div class="dk-yhzb">
        <div class="dk-yhzb-chart">
            <chart :chartData="chartData" ref="chart"/>
        </div>
        <div class="dk-yhzb-l">
            <div class="dk-yhzb-ls" v-for="item in resData" :key="item.name">
                <div class="dk-yhzb-ls-i"></div>
                <div class="dk-yhzb-ls-name">{{item.name}}</div>
                <div class="dk-yhzb-ls-num">
                    <span class="dk-yhzb-ls-numV">{{item.num}}</span>
                    笔
                </div>
                <div class="dk-yhzb-ls-value">
                    <span class="dk-yhzb-ls-numV">{{item.value}}</span>
                    {{item.unit}}元
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const echarts = require('echarts');
const color =  [
    "#4B9BF8",
    "#63C2E5",
    "#AEE4BB",
    "#F9DC71",
    "#F2A385",
    "#E0BEEF",
    "#8178E3",
    "#B1B2B2",
]
export default {
    data() {
        return {
            chartData: {},
            resData: [
                {name:'建设银行', num: '1231', value: '9535.4', unit: '万',},
                {name:'工商银行', num: '1001', value: '4651.1', unit: '万',},
                {name:'农业银行', num: '944', value: '4532.9', unit: '万',},
                {name:'中国银行', num: '944', value: '4532.9', unit: '万',},
                {name:'交通银行', num: '678', value: '4091', unit: '万',},
                {name:'湖南银行', num: '588', value: '4002', unit: '万',},
                {name:'长沙银行', num: '520', value: '3291', unit: '万',},
                {name:'其他', num: '675', value: '5348', unit: '万',},
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
        this.$nextTick(this.initChart);
    },
    beforeDestroy() {
    },
    methods: {
        initChart() {
            this.chartData = {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        color,
                        name: '银行占比',
                        type: 'pie',
                        startAngle: 90,
                        endAngle: 270,
                        center:['56px','178px'],
                        radius: ['90px', '160px'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.resData
                    }
                ]
            };
        }
    },
};
</script>
<style scoped lang="scss">


$colors: (
    #4B9BF8,
    #63C2E5,
    #AEE4BB,
    #F9DC71,
    #F2A385,
    #E0BEEF,
    #8178E3,
    #B1B2B2,
);
.dk-yhzb {
    display: flex;

    &-chart {
        flex-shrink: 0;
        flex-grow: 0;
        width: 230px;
        z-index: 10;
    }

    &-l {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 16px;
        flex-grow: 1;
        flex-shrink: 1;
        row-gap: 24px;

        &s {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 10px;

            &-i {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: -16px;
            }

            &-name {
                flex-shrink: 0;
                flex-grow: 0;
                width: 70px;
                font-size: 14px;
                line-height: 14px;
            }

            &-num {
                width: 62px;
                text-align: right;
                &V {
                    font-size: 18px;
                    line-height: 18px;
                    font-weight: bold;
                    font-family: MicrosoftYaHei,serif;
                    font-style: italic;
                }
            }

            &-value {
                width: 100px;
                text-align: right;
                &V {
                    font-size: 18px;
                }
            }

            @for $i from 1 through length($colors) {
                &:nth-child(#{$i}) &-i {
                    background-image: linear-gradient(to right, nth($colors, $i), rgba(0, 192, 255, 0.25));
                }
                &:nth-child(#{$i}) &-numV {
                    color: nth($colors, $i);
                    text-shadow: 0 0 4px nth($colors, $i);
                }
            }
        }
    }
}
</style>
