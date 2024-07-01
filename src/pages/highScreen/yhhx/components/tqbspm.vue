
<template>
    <div class="tqbspm">
        <chart  :chartData="chartData"></chart>

        <div class="tqbspm-textbox">
            <div class="tqbspm-textbox-text">TOP1</div>

            <div class="tqbspm-textbox-text tqbspm-textbox-text2">TOP2</div>

            <div class="tqbspm-textbox-text tqbspm-textbox-text3 ">TOP3</div>

            <div class="tqbspm-textbox-text tqbspm-textbox-text4 ">TOP4</div>

            <div class="tqbspm-textbox-text tqbspm-textbox-text5 ">TOP5</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tqbspm',
    components: {},

    data() {
        return {
            chartData: {},
            resList: [],
        };
    },

    computed: {},

    created() {
        this.getData();
    },

    methods: {
        getData() {
            this.$api
                .formPost("/api/dyncscript/scriptRule/query", {scriptId: "fk_sp_xzydqk"})
                .then(res => {
                    // this.resList = res.retBody.retList;
                    this.initChart();
                });
        },
        initChart() {
            let resList = [
                {
                    lx:'农业银行',
                    sl:'8453'
                },

                {
                    lx:'招商银行',
                    sl:'9428'
                },
                {
                    lx:'工商银行',
                    sl:'12428'
                },
                {
                    lx:'长沙银行',
                    sl:'9578'
                },
                {
                    lx:'建设银行',
                    sl:'10415'
                },

            ]

            resList = [...resList].sort((b, a) =>b.sl - Number(a.sl));

            console.log(resList,'resList')

            const color = {
                "工商银行": '#DFBA38',
                "建设银行": '#75ADF9',
                "长沙银行": '#8077CC',
                "招商银行": '#B46B95',
                "农业银行": '#95D195',
            };
            let max = Math.max.apply(
                null,
                resList.map((item) => item.sl),
            );

            max = (max / 0.6).toFixed()

            // 计算最大值百分之六十
            const maxPct60 = (max * 0.60).toFixed();

            this.chartData = {
                polar: {
                    radius: ['0%', '200%'],
                    center: ['50%', '80%'], //位置
                },
                legend: {
                    show: false,
                },
                grid: {
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '18%',
                    containLabel: true,
                },
                angleAxis: {
                    max: max * 2, //最大值的两倍
                    startAngle: 180,
                    clockwise: true,
                    show: false,
                },
                radiusAxis: {
                    type: 'category',
                    data: ['a'],
                    show: false,
                },
                series: resList
                    .map((item) => {
                        return {
                            barGap:'70%',
                            type: 'bar',
                            name: item.lx,
                            stack: item.lx,
                            barWidth: this.getFontSize(18),
                            coordinateSystem: 'polar',
                            label: {
                                show: true,
                                color:'#f6f6f6',
                                fontFamily:'Microsoft YaHei',
                                formatter: (params)=> {
                                    const  seriesName = params.seriesName
                                    const seriesValue = params.value
                            // 生成一个包含 HTML 的字符串
                                      return `{yhname|${seriesName} }{number|${seriesValue}}`+'笔'
                                },
                                minMargin:18,
                                rich:{
                                    yhname:{
                                        fontSize:16
                                    },
                                    number:{
                                        width:75,
                                        color:'#01FEFF',
                                        fontSize:18,
                                        fontWeight:'bold',
                                        align:'right'
                                    },
                                    unit:{
                                        color:'#fff',
                                        fontSize:12,
                                        align:'left'
                                    }
                                }
                            },
                            labelLine: {
                                show: true,
                                length:45,
                                length2:15,
                                lineStyle:{
                                    width:1
                                }
                            },
                            labelLayout:{
                                hideOverlap:false,
                                moveOverlap:'shiftY',
                                x:'108%',
                                dx:-45,
                                dy:35,
                                align: 'right',
                            },
                            itemStyle: {
                                color: color[item.lx],
                            },
                            data: [{name: 'a', value: item.sl}],
                        };
                    })
                    .concat(
                        resList.map((item) => {



                            return {
                                barGap:'70%',
                                type: 'bar',
                                name: item.lx,
                                stack: item.lx,
                                barWidth: this.getFontSize(18),
                                coordinateSystem: 'polar',
                                itemStyle: {
                                    color: 'rgba(230, 238, 253, 0.1)',
                                },
                                label: {
                                    show: false,
                                },
                                data: [{name: 'a', value: max - item.sl}],
                            };
                        }),
                    ),
            };
        },
    },
};
</script>
<style lang="scss" scoped>

.tqbspm {
    position: relative;
    &-textbox {
      height: 50px;
        width: 50px;
        position: absolute;
        top: 83%;
        left: 6%;
        &-text {
            position: absolute;
            width: 12px;
            height: 53px;
            font-family: MicrosoftYaHei, MicrosoftYaHei;
            font-weight: bold;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 14px;
            white-space: normal; /* 默认值，允许文本换行 */
            word-wrap: break-word; /* 允许长单词或无法使用空格分隔的文本在任意位置换行 */
            overflow-wrap: break-word;
            text-align: center;
        }

        &-text2 {
            left: 70%;
        }

        &-text3 {
            left: 130%;
        }

        &-text4 {
            left: 195%;
        }

        &-text5 {
            left: 255%;
        }
    }
}
</style>
