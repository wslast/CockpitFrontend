<template>
    <div class="df bg">
        <div class="textDiv">
            <div class="leftText" v-if="dataList && dataList.length">
                {{ dataList[0].bs + '笔' }}&nbsp; {{ dataList[0].pct }} %
                <br />
                {{ dataList[0].je + '万元' }}
                <div class="bg1">
                    {{ 'Top1' + dataList[0].yhmc }}
                </div>
            </div>
        </div>
        <chart class="w0 fg1" :chartData="chartData"></chart>
        <div class="textDiv  df fdc ">
            <div
                class="df h0 fg1 rightText df fdc mt12"
                v-if="dataList && dataList.length"
            >
                {{ dataList[1].bs + '笔' }}&nbsp; {{ dataList[1].pct }} %
                <br />
                {{ dataList[1].je + '万元' }}
                <div class="bg2">{{ dataList[1].yhmc }}</div>
            </div>
            <div
                class="df h0 fg1 rightText df fdc mt12"
                v-if="dataList && dataList.length"
            >
                {{ dataList[2].bs + '笔' }}&nbsp; {{ dataList[2].pct }} %
                <br />
                {{ dataList[2].je + '万元' }}
                <div class="bg3">{{ dataList[2].yhmc }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '../../utils';
export default {
    data() {
        return {
            dataList: [],
            chartData: {},
            color: ['#4A89F2', '#A4DF19', '#20F5ED', '#E59F3D', '#fef85c'],
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
            this.dataList.forEach((item, index) => {
                item.value = item.bs;
                item.name = item.yhmc;
            });
            utils.calcPct(this.dataList, 0);
            this.dataList.sort(function(a, b) {
                return b.bs - a.bs;
            });
            this.dataList.forEach((item, index) => [
                (item.itemStyle = {
                    color: this.color[index],
                }),
            ]);
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                        return (
                            params.marker +
                            params.name +
                            '<br/>' +
                            '存量笔数 : ' +
                            params.data.bs +
                            '笔' +
                            '<br/>' +
                            '占比 : ' +
                            params.data.pct +
                            '%' +
                            '<br/>' +
                            '贷款余额 : ' +
                            params.data.je +
                            '万元'
                        );
                    },
                },
                series: [
                    {
                        type: 'pie',
                        center: ['48%', '50%'],
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                        },
                        emphasis: {
                            disabled: true,
                        },
                        labelLine: {
                            show: false,
                        },
                        minAngle: 5,
                        data: this.dataList,
                    },
                    {
                        type: 'pie',
                        radius: ['40%', '56%'],
                        center: ['48%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                        },
                        minAngle: 5,
                        emphasis: {
                            disabled: true,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: this.dataList,
                    },
                ],
                graphic: {
                    //图形中间图片
                    elements: [
                        {
                            type: 'image',
                            style: {
                                image: require('../../../../assets/images/dp/dk/icon_bank.png'), //你的图片地址
                                width: this.getFontSize(40),
                                height: this.getFontSize(40),
                            },
                            left: 'center',
                            top: 'center',
                        },
                    ],
                },
            };
            this.chartData = option;
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'dk_awdyhfx',
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
.textDiv {
    width: 144px;
    flex-grow: 0;
    flex-shrink: 0;
    color: #ffffff;
}
.leftText {
    font-size: 15.994px;
    text-align: center;
    margin: 39.994px 0px 0px 20.006px;
}
.rightText {
    font-size: 15.994px;
    margin: 0px 20.006px 0px 0px;
    text-align: center;
}
.bg1 {
    background: linear-gradient(to right, #4a89f2, transparent);
}
.bg2 {
    background: linear-gradient(to right, #a4df19, transparent);
}
.bg3 {
    background: linear-gradient(to right, #20f5ed, transparent);
}
.bg {
    background-image: url('../../../../assets/images/dp/dk/weidai_beijing.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.mt12 {
    margin-top: 12px;
}
</style>
