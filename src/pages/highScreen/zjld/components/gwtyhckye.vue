<template>
    <div class="df">
        <div style="width:619.008px;" class="df">
            <chart class="fg1 w0" :chartData="chartData"></chart>
        </div>
        <div class="w0 fg1 df fdc jcc aic">
            <div class="bg df hqckDiv">
                <div class="w0 fg1 tc">
                    活期存款&nbsp;&nbsp;
                </div>
            </div>
            <div class="bg2 df dqckDiv">
                <div class="w0 fg1 tc" style="transform: rotateY(-180deg);">
                    定期存款&nbsp;&nbsp;
                </div>
            </div>
        </div>
        <div style="width:619.008px;" class="df">
            <chart class="fg1 w0" :chartData="chartData2"></chart>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chartData: {},
            chartData2: {},
            dataList: [],
            color: [
                '#00FFF0',
                '#04C8F9 ',
                '#A800FF ',
                '#F25C5D',
                '#EDAE5D ',
                '#BFBFBF ',
            ],
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    async beforeMount() {
        await this.getData();
        this.$nextTick(() => {
            this.initChart();
        });
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        initChart() {
            let pieData = this.dataList[0].map((item, index) => {
                return {
                    ...item,
                    value: item.je,
                    name: item.yhlx,
                    itemStyle: {
                        color: this.color[index],
                    },
                };
            });
            let pieData2 = this.dataList[1].map((item, index) => {
                return {
                    ...item,
                    value: item.je,
                    name: item.yhlx,
                    itemStyle: {
                        color: this.color[index],
                    },
                };
            });
            let option = {
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: (params) => {
                        return (
                            params.marker +
                            params.name +
                            ' : ' +
                            params.data.je +
                            '万元' +
                            '<br>' +
                            '占比' +
                            ' : ' +
                            params.percent +
                            '%'
                        );
                    },
                },
                legend: {
                    textStyle: {
                        color: '#ffffff',
                    },
                    orient: 'vertical',
                    left: '50%',
                    top: '20%',
                },
                series: {
                    type: 'pie',
                    center: ['20%', '50%'],
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        color: '#ffffff',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: '#ffffff',
                        },
                    },
                    labelLine: {
                        show: true,
                    },
                    data: pieData,
                    minAngle: 5,
                },
            };
            this.chartData = option;
            let option2 = {
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: (params) => {
                        return (
                            params.marker +
                            params.name +
                            ' : ' +
                            params.data.je +
                            '万元' +
                            '<br>' +
                            '占比' +
                            ' : ' +
                            params.percent +
                            '%'
                        );
                    },
                },
                legend: {
                    textStyle: {
                        color: '#ffffff',
                    },
                    orient: 'vertical',
                    left: '50%',
                    top: '20%',
                },
                series: {
                    type: 'pie',
                    center: ['20%', '50%'],
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        color: '#ffffff',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: '#ffffff',
                        },
                    },
                    labelLine: {
                        show: true,
                    },
                    data: pieData2,
                    minAngle: 5,
                },
            };
            this.chartData2 = option2;
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'zjld_gwtyhckye',
                    })
                    .then((res) => {
                        let arr = res.retBody.retList;
                        this.dataList = [[], []];
                        arr.forEach((item, index) => {
                            if (item.lx == '活期存款') {
                                this.dataList[0].push(item);
                            } else {
                                this.dataList[1].push(item);
                            }
                        });
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
.bg {
    background-image: url('../../../../assets/images/dp/zjld/ding&huo_kuang.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: 78.01px;
    width: 130.003px;
    flex-shrink: 0;
    flex-grow: 0;
}
.bg2 {
    background-image: url('../../../../assets/images/dp/zjld/ding&huo_kuang.svg');
    background-repeat: no-repeat;
    background-size: contain;
    transform: rotateY(180deg);
    height: 78.01px;
    width: 130.003px;
    flex-shrink: 0;
    flex-grow: 0;
}
.hqckDiv {
    line-height: 70.003px;
    color: #a0e1ff;
    font-size: 20.006px;
    text-align: center;
    text-indent: 22.003px;
    margin-bottom: 20.006px;
    margin-right: 10.003px;
}
.dqckDiv {
    color: #ffffff;
    line-height: 70.003px;
    font-size: 20.006px;
    text-align: center;
    text-indent: 12px;
    margin-left: 10.003px;
}
</style>
