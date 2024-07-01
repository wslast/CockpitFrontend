<template>
    <div style="height:100%" class="df">
        <div class="leftArea df fdc">
            <div class="button text">50岁以上</div>
            <div class="button text">41~50岁</div>
            <div class="button text">31-40岁</div>
            <div class="button text">16~30岁</div>
        </div>
        <div style="width:0px" class="df fg1 fdc  ">
            <div class="df">
                <div class="chartButton " style="margin-left: 45.005px; ">
                </div>
                <div class="chartButton " style="margin-left: 55.008px; ">
                </div>
            </div>
            <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chartData: {},
            dataList: [],
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        await this.getData();
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {},
    methods: {
        initChart() {
            let nanDataList = this.dataList.slice(4);
            let nvDataList = this.dataList.slice(0, 4);
            let option = {
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        let showData =
                            params.marker +
                            params.name +
                            '(' +
                            params.seriesName +
                            ')' +
                            ' : ' +
                            params.value +
                            '人';
                        return showData;
                    },
                },
                xAxis: [
                    {
                        type: 'value',
                        gridIndex: 0,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        type: 'value',
                        gridIndex: 1,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: 'category',
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        data: ['16-30岁', '31-40岁', '41-50岁', '50岁以上'],
                    },
                    {
                        gridIndex: 1,
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        type: 'category',
                        data: ['16-30岁', '31-40岁', '41-50岁', '50岁以上'],
                    },
                ],
                grid: [
                    {
                        top: '10%',
                        right: '51%',
                        bottom: '5%', //拉伸距离底部高度
                        containLabel: true,
                    },
                    {
                        top: '10%',
                        left: '51%',
                        bottom: '5%', //拉伸距离底部高度
                        containLabel: true,
                    },
                ],
                series: [
                    // These series are in the first grid.
                    {
                        type: 'bar',
                        name: '男',
                        seriesLayoutBy: 'row',
                        data: nanDataList.map((item, index) => {
                            return {
                                name: item.lx,
                                value: item.rs,
                            };
                        }),
                        label: {
                            show: true,
                            color: '#03153B',
                          fontSize:this.getFontSize(14),
                            verticalAlign:'middle',
                            align:'left'
                        },
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 1,
                                y: 0,
                                x2: 0,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#84F5DE ', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#56E8F2', // 50% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#4CC5F8', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                            barWidth: this.getFontSize(24),
                            barBorderRadius: this.getFontSize(12),
                        },
                        showBackground: true,
                        backgroundStyle: {
                            borderRadius: this.getFontSize(12),
                        },
                        barWidth: 24,
                    },
                    {
                        barWidth: 24,
                        type: 'bar',
                        name: '女',
                        seriesLayoutBy: 'row',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: nvDataList.map((item) => {
                            return {
                                name: item.lx,
                                value: item.rs,
                            };
                        }),
                        label: {
                            show: true,
                            color: '#03153B',
                           fontSize:this.getFontSize(14),
                            verticalAlign:'middle',
                            align:'left'
                        },
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#107739', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#25BF78', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#4CF860', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                            barBorderRadius: this.getFontSize(12),
                            barWidth: this.getFontSize(24),
                        },
                        showBackground: true,
                        backgroundStyle: {
                            borderRadius: this.getFontSize(12),
                        },
                    },
                ],
            };
            this.chartData = option;
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_jcnldfx',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
.leftArea {
    width: 93.005px;
    height: 185.006px;
    background: rgba(46, 54, 159, 0.49);
    border: 0.998px solid #bfbfbf;
    border-radius: 10.003px;
    margin-top: 74.997px;
    margin-left: 20.006px;
    padding-bottom: 1.92px;
}
.button {
    width: 80.006px;
    height: 24px;
    background: rgba(46, 54, 159, 0.51);
    border: 0.998px solid #bfbfbf;
    border-radius: 12px;
    margin: 19.002px 6.01px 0px 6.01px;
}
.button:first-child {
    margin-top: 14.998px;
}
.text {
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
}


.chartButton {
    margin-top: 21px;
    width: 78.01px;
    height: 45.002px;
    font-size: 18.01px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 35.002px;
    border-radius: 10.003px;
    text-align: center;
    box-sizing: border-box;
    &:nth-child(1) {
        background: url("../../../../assets/images/dp/jc/jc_icon_nan.svg");
    }

    &:nth-child(2) {
        background: url("../../../../assets/images/dp/jc/jc_icon_nv.svg");
    }
}
</style>
