<template>
    <div class="zjld-yhck">
        <chart :chartData="chartData" ref="chart"></chart>
        <div class="zjld-yhck-tag zjld-yhck-tag-center">全部</div>
        <div class="zjld-yhck-tag zjld-yhck-tag-left">定期</div>
        <div class="zjld-yhck-tag zjld-yhck-tag-right">活期</div>
    </div>
</template>
<script>
const echarts = require('echarts');
const color = ["#75FBF0", "#5BC5F5", "#9C1FF5", "#E16662", "#E3B16B", "#BFBFBF"]
export default {
    data() {
        return {
            chartData: {},
            resData: {
                all: [
                    {value: 1048, name: '工商银行'},
                    {value: 735, name: '农业银行'},
                    {value: 580, name: '建设银行'},
                    {value: 484, name: '中国银行'},
                    {value: 300, name: '交通银行'},
                    {value: 234, name: '其他'},
                ],
                dq: [
                    {value: 1048, name: '工商银行'},
                    {value: 735, name: '农业银行'},
                    {value: 580, name: '建设银行'},
                    {value: 484, name: '中国银行'},
                    {value: 300, name: '交通银行'},
                    {value: 234, name: '其他'},
                ],
                hq: [
                    {value: 1048, name: '工商银行'},
                    {value: 735, name: '农业银行'},
                    {value: 580, name: '建设银行'},
                    {value: 484, name: '中国银行'},
                    {value: 300, name: '交通银行'},
                    {value: 234, name: '其他'},
                ]
            }
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
        /**
         * 赋值两侧扇叶数据
         * @param data
         * @param type
         * @returns {*}
         */
        setSeriesData(data, type = 1){
            return data.map((item, index) => ({
                ...item,
                color: color[index],
                label: {
                    show: true,
                    position: 'outside',
                    formatter: (param) => {
                        let text = `{name| `+ param.name + '}  ' +
                            '{percent|' + param.percent + '%}';
                        if (type === 0) {
                            text = '{name|' + param.name + '}' +
                                '\n' +
                                '{percent|' + param.percent + '%}';
                        }
                        // 默认为两行
                        return '{name|' + param.name + '}' +
                            '\n' +
                            '{percent|' + param.percent + '%}';
                    },
                    rich: {
                        name: {
                            fontSize: this.getFontSize(14),
                            lineHeight: this.getFontSize(14),
                            fontWeight: 'bold',
                            color: '#fff',
                        },
                        percent: {
                            fontSize: this.getFontSize(14),
                            lineHeight: this.getFontSize(14),
                            fontWeight: 'bold',
                            color: color[index],
                        },
                    },
                },
            }))
        },
        initChart() {
            this.chartData = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: '0',
                    left: 'center',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.getFontSize(12),
                    },
                },
                series: [
                    {
                        color,
                        name: '全部',
                        type: 'pie',
                        center: ['50%', '113px'],
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        data: this.setSeriesData(this.resData.all,0)
                    },
                    {
                        color,
                        name: '定期',
                        type: 'pie',
                        startAngle: 90,
                        endAngle: 270,
                        center: ['24px', '113px'],
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        data: this.setSeriesData(this.resData.dq)
                    },
                    {
                        color,
                        name: '活期',
                        type: 'pie',
                        startAngle: 270,
                        endAngle: 90,
                        center: ['856px', '113px'],
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        data: this.setSeriesData(this.resData.hq)
                    }
                ]
            };
        }
    },
};
</script>
<style scoped lang="scss">
.zjld-yhck {
    position: relative;
    &-tag {
        top: 133px;
        position: absolute;
        width: 46px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        border-radius: 10px 10px 10px 10px;
        background-image: url("../../../../assets/images/dp/zjld/left-nav.png");
        background-repeat: no-repeat;
        opacity: 0.7;

        &-center {
            left: 417px;
        }

        &-left {
            left: 20px;
        }

        &-right {
            right: 20px;
        }
    }
}
</style>
