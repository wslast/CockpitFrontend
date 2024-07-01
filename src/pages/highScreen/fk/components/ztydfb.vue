<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 整体疑点分布
-->
<template>
    <div class="ztydfb df fg1 ovh">
        <div class="df fdc pcth100">
            <div class="chart" ref="chart"></div>
        </div>
        <div class="fg1 df fdc pcth100">
            <div class="pcth100 ova list">
                <div class="item" v-for="item in areaList" :key="item.id">
                    <div class="areaName showOne" :title="item.qx">
                        {{ item.qx }}
                    </div>
                    <div class="progress">
                        <div
                            class="progressVal"
                            :style="{
                                width: ((item.sl / max) * 100).toFixed(1) + '%',
                            }"
                        ></div>
                    </div>
                    <div class="value" :title="item.sl">{{ item.sl }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import utils from '../../utils';
export default {
    name: 'ztydfb',
    data() {
        return {
            chart: null,
            list: [],
            total: 0,
            index: 0,
            option: null,
            areaList: [],
            chart2: null,
            max: 0,
        };
    },
    mounted() {
        //初始化监听窗口resize时间 重绘图表
        this.$nextTick(() => {
            this.getData();
            window.addEventListener('resize', this.handler);
        });
    },
    //页面销毁时回收内存
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        window.removeEventListener('resize', this.handler);
        this.chart.dispose();
        this.chart = null;
    },

    methods: {
        handler() {
            if (this.chart) {
                this.chart.resize();
            }
        },
        getData() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'fk_sp_ztydfb',
                })
                .then((res) => {
                    this.list = res.retBody.retList;
                    // console.log(this.list);
                    this.initChart();
                });
        },
        initChart() {
            this.chart = echarts.init(this.$refs.chart);
            let data = this.list.reduce(
                (acc, cur) => {
                    this.total += cur.sl;
                    if (cur.lx === '销号') {
                        acc[0].value += cur.sl;
                    } else if (cur.lx === '存量') {
                        acc[1].value += cur.sl;
                    } else if (cur.lx === '白名单') {
                        acc[2].value += cur.sl;
                    }
                    return acc;
                },
                [
                    { name: '销号', value: 0 },
                    { name: '存量', value: 0 },
                    { name: '白名单', value: 0 },
                ],
            );
            utils.calcPct(data);
            const color = ['#91c6f2', '#E59F3D', '#88F8AB'];
            const calcData = () => {
                return data.map((item, index) => {
                    if (index === this.index) {
                        return {
                            value: item.value,
                            itemStyle: {
                                color: color[index],
                            },
                            name: item.name,
                        };
                    } else {
                        return {
                            value: item.value,
                            itemStyle: {
                                color: 'rgba(35, 146, 173, 0.47)',
                            },
                            name: item.name,
                        };
                    }
                });
            };
            this.option = {
                backgroundColor: 'transparent',
                color: color,
                legend: {
                    x: 'center',
                    y: 'bottom',
                    align: 'left', //字在图例的左边或右边【left/right】
                    orient: 'vertical', //图例方向【horizontal/vertical】
                    icon: 'circle', //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
                    itemGap: this.getFontSize(10),
                    formatter(name) {
                        const item = data.filter(
                            (item) => item.name === name,
                        )[0];
                        return `{name|${name}} {value| ${item.value}}     {prop| ${item.pct} %}`;
                    },
                    textStyle: {
                        rich: {
                            name: {
                                display: 'inline-block',
                                width: 50,
                                color: '#fff',
                                fontSize: this.getFontSize(14),
                                fontWeight: 600,
                            },
                            value: {
                                display: 'inline-block',
                                width: 50,
                                color: '#fff',
                                fontSize: this.getFontSize(14),
                                fontWeight: 600,
                            },
                            prop: {
                                display: 'inline-block',
                                width: 40,
                                align: 'right',
                                color: '#E59F3D',
                                fontSize: this.getFontSize(14),
                                fontWeight: 600,
                            },
                        },
                    },
                },
                series: [
                    {
                        type: 'pie',
                        startAngle: 180, //起始角度
                        radius: ['38%', '40%'],
                        center: ['50%', '35%'],
                        silent: true,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: calcData(),
                    },
                    {
                        type: 'pie',
                        startAngle: 180, //起始角度
                        radius: ['50%', '66%'],
                        center: ['50%', '35%'],
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: data,
                    },

                    {
                        name: '总疑点',
                        type: 'pie',
                        radius: ['0%', '0%'],
                        center: ['50%', '30%'],
                        itemStyle: {
                            // 防止鼠标悬浮到标签时出现放大的点
                            color: 'transparent',
                        },
                        label: {
                            position: 'inside',
                            formatter: `{serie|{a}}\n{data|{c}}`,
                            rich: {
                                data: {
                                    fontWeight: 900,
                                    fontSize: this.getFontSize(20),
                                    color: `#fff`,
                                    textBorderColor: `transparent`,
                                    textBorderWidth: 0,
                                },
                                serie: {
                                    fontSize: this.getFontSize(14),
                                    color: `#fff`,
                                    lineHeight: this.getFontSize(28),
                                    textBorderColor: `transparent`,
                                    textBorderWidth: 0,
                                },
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            // 计算表格数据value总和
                            this.list.reduce((prev, cur) => prev + cur.sl, 0),
                        ],
                    },
                ],
            };
            this.chart.setOption(this.option);
            this.$nextTick(() => {
                this.chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 1,
                    dataIndex: 0,
                });
                this.chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0,
                });
                this.calcAreaList(data[0].name);
            });

            this.chart.on('mouseover', (e) => {
                if (e.dataIndex != this.index) {
                    this.chart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: this.index,
                    });
                    this.chart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 1,
                        dataIndex: this.index,
                    });
                }
            });
            this.chart.on('mouseover', (e) => {
                this.index = e.dataIndex;
                this.calcAreaList(data[this.index].name);
                this.option.series[0].data = calcData();
                this.$nextTick(() => {
                    this.chart.setOption(this.option);
                    setTimeout(() => {
                        this.chart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: e.dataIndex,
                        });
                        this.chart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 1,
                            dataIndex: e.dataIndex,
                        });
                    }, 0);
                });
            });
        },
        calcAreaList(type) {
            this.areaList = [];
            this.max = 0;
            this.$nextTick(() => {
                this.areaList = this.list.filter((item) => {
                    return item.lx === type;
                });
                this.areaList.forEach((element) => {
                    if (element.sl > this.max) {
                        this.max = element.sl;
                    }
                });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.chart {
    height: 100%;
    width: 228.998px;
}
.item {
    display: flex;
    align-items: center;
    padding: 0vw 9.005px;
    .areaName {
        width: 49.997px;
        font-size: 13.997px;
        font-weight: 400;
        color: #ffffff;
        line-height: 30.01px;
    }
    .progress {
        background: #121e47;
        border-radius: 0.208vw;
        height: 10.003px;
        flex-grow: 1;
        .progressVal {
            height: 10.003px;
            background: linear-gradient(90deg, #84f5de, #56e8f2, #4cc5f8);
            border-radius: 0.156vw;
        }
    }
    .value {
        width: 39.994px;
        font-size: 13.997px;
        font-weight: 400;
        color: #ffc35a;
        line-height: 30.01px;
        margin-left: 14.995px;
        text-align: right;
    }
}
.list::-webkit-scrollbar {
    width: 0.104vw !important;
}
.list .item:nth-child(even) {
    background: rgba(113, 205, 249, 0.1);
}
</style>
