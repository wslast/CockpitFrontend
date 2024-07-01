<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<template>
<div class="gjjzqfb pcth100 df fdc">
    <div class="title">
        <img class="icon" src="../../../../assets/images/portrait/person/icon_grhx_you1_2.svg" alt="" />
        <div class="content">
            公积金周期分布
        </div>
    </div>
    <empty :image-size="50" v-if="flag" ></empty>
    <chart class="fg1" :chartData="chartData"  v-if="!flag" ></chart>
</div>
</template>

<script>
export default {
    name: 'gjjzqfb',
    components: {},

    data() {
        return {
            chartData: {},
            flag:true,
        };
    },

    computed: {},

    mounted() {},

    methods: {
        getData(params) {
            let data = [{
                name: '新缴未满6个月',
                value: params.xjwmlgy
            },{
                name: '连续缴满6个月未贷款',
                value: params.lxjmlgywdk
            },{
                name: '首次贷款未还清',
                value: params.scdkwhq
            },{
                name: '首次贷款已还清',
                value: params.scdkyjq
            },{
                name: '二次贷款未还清',
                value: params.ecdkwhq
            },{
                name: '二次贷款已还清',
                value: params.ecdkyjq
            },{
                name: '已退休停缴',
                value: params.ydxtj
            }]
            this.initChart(data);
        },
        initChart(data) {
            if(data){
                this.flag=false;
            }
            const max = Math.max.apply(
                null,
                data.map((item) => item.value),
            );
            let option = {
                tooltip: {},
                grid: {
                    top: '10%',
                },
                radar: {
                    radius: '60%', //大小
                    nameGap: 10, // 图中工艺等字距离图的距离
                    center: ['50%', '50%'], // 图的位置
                    name: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.45)',
                            fontSize: 12,
                        },
                        formatter: function (name) {
                            return name;
                        },
                    },
                    indicator: data.map((item) => {
                        return {
                            name: item.name,
                            max: max,
                        };
                    }),
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(233, 233, 233, 1)',
                        },
                    },
                    splitArea: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: 'rgba(233, 233, 233, 1)',
                        },
                    },
                },

                series: [{
                    type: 'radar',
                    symbol: 'angle',
                    name: '公积金周期情况',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            },
                        },
                    },
                    data: [{
                        symbol: 'circle',
                        symbolSize: 0,
                        value: data.map((item) => item.value),
                        areaStyle: {
                            color: 'rgba(91, 143, 249, 0.60)',
                        },
                        lineStyle: {
                            color: 'rgba(24, 144, 255, 1)',
                            width: 1,
                        },
                    }, ],
                }, ],
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
