<template>
    <div class="zjld-ckzqfb">
        <chart :chartData="chartData" ref="chart"></chart>
    </div>
</template>
<script>

export default {
    data() {
        return {
            chartData: {},
            resData: [
                {name: '活期', value: 23.69, percent: 12},
                {name: '7天', value: 23.59, percent: 12},
                {name: '一年', value: 23, percent: 12},
                {name: '两年', value: 20, percent: 12},
                {name: '三年', value: 19, percent: 12},
            ],
            color:['#457AFF', "#A901FD", "#04C8F9", "#F2D45C", "#BFBFBF"]
        };
    },
    async created() {
        // await this.getData();
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {
            const {color} = this
            const seriesData = this.resData.map(({name,value,percent},index) => ({
                name,
                value,
                color: color[index],
                itemStyle:{
                    color: color[index],
                },
                label: {
                    position: [5,5],
                    // align:'center',
                    // verticalAlign:'middle',
                    formatter: '{name|' + name + '} ' + '\n{label|占比} {percent|：' + percent + '%} \n{value|' + value + '亿元}',
                    rich: {
                        name: {
                            fontSize: 18, // 系列名字体大小
                            color: color[index], // 系列名颜色
                            fontFamily: 'Microsoft YaHei',
                            fontWeight: 'bolder',
                            lineHeight: 24,
                            textShadowColor: 'rgba(0,0,0,0.9)',
                            textShadowBlur: 4,
                            textShadowOffsetX: 1,
                            textShadowOffsetY: 2,
                        },
                        label: {
                            fontSize: 16,  // 数据值字体大小
                            color: '#fff',  // 数据值颜色
                            fontStyle: 'italic',
                            lineHeight: 24,
                        },
                        value: {
                            fontSize: 18,  // 数据值字体大小
                            color: '#fff',  // 数据值颜色
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            lineHeight: 24,
                        },
                        percent: {
                            lineHeight: 24,
                            fontSize: 18,  // 数据值字体大小
                            color: '#fff',  // 数据值颜色
                            fontStyle: 'italic',
                            fontWeight: 'bold'
                        }
                    }
                }
            }))
            this.chartData = {
                legend: {
                    show: false,
                },
                series: [
                    {
                        type: 'treemap',
                        width: 445,
                        silent: true, // 禁用该系列的所有交互
                        levels:[{
                            // 第一层级的配置
                            visibleMin: -1, // 假设你想要显示这一层级的节点
                            // 其他配置...
                        },],
                        data: seriesData,
                    }
                ]
            };
        }
    },
};
</script>
<style lang="scss">
.zjld-ckzqfb {
    pointer-events: none;
}
</style>
