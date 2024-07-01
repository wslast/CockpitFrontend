<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
    <div class="gjjzqfb pcth100 df fdc">
        <div class="title">
            <img
                class="icon"
                src="../../../../assets/images/portrait/person/icon_grhx_you1_2.svg"
                alt=""
            />
            <div class="content">
                职工年龄情况
            </div>
        </div>
        <empty :image-size="50" v-if="flag"></empty>
        <chart class="fg1" :chartData="chartData" v-if="!flag"></chart>
    </div>
</template>

<script>
export default {
    name: 'gjjzqfb',
    components: {},

    data() {
        return {
            flag: true,
            chartData: {},
        };
    },

    computed: {},

    mounted() {},

    methods: {
        getData(params) {
            const data = params.map((item) => {
                item.type = item.xb;
                item.value = item.rs;
                item.name = item.zq;
                return item;
            });
            this.initChart(data);
        },
        initChart(data) {
            if (data) {
                this.flag = false;
            }
            const name = ['16-30岁', '31-40岁', '41-50岁', '51岁以上'];
            const color = [
                'rgba(91, 143, 249, 0.85)',
                'rgba(90, 216, 166, 0.85)',
                'rgba(250, 202, 0, 1)',
                'rgba(93, 112, 146, 0.85)',
            ];
            let option = {
                backgroundColor: '',
                legend: {
                    y: 'center',
                    right: '10%',
                    icon: 'circle',
                    orient: 'vertical',
                    data: name,
                    itemWidth: 9,
                    itemHeight: 9,
                    textStyle: {
                        color: 'rgba(140, 140, 140, 1)',
                    },
                },
                grid: {
                    right: '25%',
                    top: '10%',
                    bottom: '10%',
                    left: '10%',
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                },
                yAxis: {
                    type: 'category',
                    data: Array.from(new Set(data.map((item) => item.type))),
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(224, 224, 224, 1)',
                        },
                    },
                    axisLabel: {
                        color: 'rgba(140, 140, 140, 1)',
                        fontSize: '12',
                    },
                },
                series: name.map((item) => {
                    let index = name.indexOf(item);
                    let serie = {
                        type: 'bar',
                        name: item,
                        stack: 'a',
                        barWidth: '16',
                        itemStyle: {
                            color: color[index],
                        },
                        label: {
                            show: true,
                            fontSize: '12',
                            color: 'rgba(29, 29, 29, 1)',
                            position: ['40%', '-120%'],
                        },
                        data: data
                            .filter((i) => i.name === item)
                            .map((i) => i.value),
                    };
                    return serie;
                }),
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
    margin-left: 10px;
    margin-top: 40px;
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
