<template>
    <div style="height: 100%;" class="df" id="allChildTable">
        <div class="fg1" style="width:0px;">
            <xhrqYearChart
                class="fg1 chart"
                :chartData="chartData"
                :inTable="inTable"
                :dataLength="4"
            ></xhrqYearChart>
        </div>


        <div class="fg1" style="width:0px;">
            <xhrqYearChart
                class="fg1 chart"
                :chartData="chartData2"
                :inTable="inTable"
                :dataLength="5"
            ></xhrqYearChart>
        </div>

<!--        <div class="df fdc1" style="width:240px;">-->
<!--            <div-->
<!--                style="height:38.4px;"-->
<!--                v-if="dataList && dataList.length"-->
<!--                class="df border"-->
<!--            >-->
<!--                <div-->
<!--                    class="monthText"-->
<!--                    :style="{-->
<!--                        background: dataList[dataIndex].itemStyle.color,-->
<!--                    }"-->
<!--                >-->
<!--                    {{ dataList[dataIndex].month }}-->
<!--                </div>-->
<!--                <div class="fg1 numText">-->
<!--                    {{ dataList[dataIndex].sum + '个' }}-->
<!--                </div>-->
<!--                <div class="pctText">-->
<!--                    {{ dataList[dataIndex].pct + '%' }}-->
<!--                </div>-->
<!--            </div>-->
<!--            <div style="height:0px;" class="df fg1">-->
<!--                <div style="width:0px;" class="df fg1">-->
<!--                    <chart-->
<!--                        v-if="chartData2"-->
<!--                        ref="chart2"-->
<!--                        :chartData="chartData2"-->
<!--                        class="fg1"-->
<!--                    ></chart>-->
<!--                    <div-->
<!--                        v-if="chartData2"-->
<!--                        class="text2"-->
<!--                        :style="{ color: color[0] }"-->
<!--                    >-->
<!--                        {{ monthList.data[0].pct + '%' }}-->
<!--                        <br />-->
<!--                        <span style="color:#ffffff;">-->
<!--                            {{ monthList.data[0].yy }}-->
<!--                        </span>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width:0px;" class="df fg1">-->
<!--                    <chart-->
<!--                        v-if="chartData3"-->
<!--                        ref="chart3"-->
<!--                        :chartData="chartData3"-->
<!--                        class="fg1"-->
<!--                    ></chart>-->
<!--                    <div-->
<!--                        v-if="chartData3"-->
<!--                        class="text2"-->
<!--                        :style="{ color: color[1] }"-->
<!--                    >-->
<!--                        {{ monthList.data[1].pct + '%' }}-->
<!--                        <br />-->
<!--                        <span style="color:#ffffff;">-->
<!--                            {{ monthList.data[1].yy }}-->
<!--                        </span>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div style="height:0px;" class="df fg1">-->
<!--                <div style="width:0px;" class="df fg1">-->
<!--                    <chart-->
<!--                        v-if="chartData4"-->
<!--                        ref="chart2"-->
<!--                        :chartData="chartData4"-->
<!--                        class="fg1"-->
<!--                    ></chart>-->
<!--                    <div-->
<!--                        v-if="chartData4"-->
<!--                        class="text2"-->
<!--                        :style="{ color: color[2] }"-->
<!--                    >-->
<!--                        {{ monthList.data[2].pct + '%' }}-->
<!--                        <br />-->
<!--                        <span style="color:#ffffff;">-->
<!--                            {{ monthList.data[2].yy }}-->
<!--                        </span>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width:0px;" class="df fg1">-->
<!--                    <chart-->
<!--                        v-if="chartData5"-->
<!--                        ref="chart3"-->
<!--                        :chartData="chartData5"-->
<!--                        class="fg1"-->
<!--                    ></chart>-->
<!--                    <div-->
<!--                        v-if="chartData5"-->
<!--                        class="text2"-->
<!--                        :style="{ color: color[3] }"-->
<!--                    >-->
<!--                        {{ monthList.data[3].pct + '%' }}-->
<!--                        <br />-->
<!--                        <span style="color:#ffffff;">-->
<!--                            {{ monthList.data[3].yy }}-->
<!--                        </span>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div style="height:38.4px;"></div>-->
<!--        </div>-->
    </div>
</template>
<script>
import { onMounted } from 'vue';
import jsnjcqsVue from '../../sy/components/jsnjcqs.vue';

const echarts = require('echarts');
export default {
    name: 'xhrq',
    components: {
        xhrqYearChart: () => import('./xhrqYearChart.vue'),
    },
    data() {
        return {
            chartData: {},
            chartData2: null,
            chartData3: null,
            chartData4: null,
            chartData5: null,
            dataList: [],
            dataIndex: 0,
            monthList: [],
            allSum: 0,
            color: ['#27EAC1', '#28E8FF', '#E5C452', '#E57152 '],
            color2: [
                '#3AA0FF',
                '#43C7E8',
                '#13C098',
                '#36C665',
                '#7ECD5A',
                '#EAC540',
                '#EA965B',
                '#EA695B',
                '#EA5B85',
                '#C965C5',
                '#9D70CF',
                '#7070CF',
            ],
            color3: [
                'rgba(58,160,255,0.5)',
                'rgba(67,199,232,0.5)',
                'rgba(19,192,152,0.5)',
                'rgba(54,198,101,0.5)',
                'rgba(126,205,90,0.5)',
                'rgba(234,197,64,0.5)',
                'rgba(234,197,64,0.5)',
                'rgba(234,105,91,0.5)',
                'rgba(234,91,133,0.5)',
                'rgba(201,101,197,0.5)',
                'rgba(157,112,207,0.5)',
                'rgba(112,112,207,0.5)',
            ],
            color4: [
                'rgba(39,234,193,0.5)',
                'rgba(40,232,255,0.5)',
                'rgba(229,196,82,0.5)',
                'rgba(229,113,82,0.5)',
            ],
            inTable: false,
            allChildTable: null,
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
            this.allChildTable = document.getElementById('allChildTable');
            this.allChildTable.addEventListener(
                'mouseleave',
                this.changeInTable,
            );
            this.allChildTable.addEventListener(
                'mouseenter',
                this.changeInTable,
            );
            this.initChart();
        });
    },
    beforeDestroy() {
        this.allChildTable.removeEventListener(
            'mouseleave',
            this.changeInTable1,
        );
        this.allChildTable.removeEventListener(
            'mouseenter',
            this.changeInTable,
        );
        this.allChildTable = null;
    },
    methods: {
        initChart() {
            // let option = {
            //     tooltip: {
            //         trigger: 'item',
            //         formatter: (params) => {
            //             return (
            //                 params.marker +
            //                 params.name +
            //                 ' : ' +
            //                 params.value +
            //                 '个'
            //             );
            //         },
            //     },
            //     series: [
            //         {
            //             type: 'pie',
            //             radius: ['40%', '70%'],
            //             avoidLabelOverlap: false,
            //             label: {
            //                 show: true,
            //                 position: 'center',
            //                 color: '#FFC35A',
            //                 fontSize: this.getFontSize(12),
            //                 formatter: `${this.allSum}`,
            //             },
            //             emphasis: {
            //                 label: {
            //                     show: false,
            //                     fontSize: this.getFontSize(12),
            //                     fontWeight: 'bold',
            //                 },
            //             },
            //             labelLine: {
            //                 show: false,
            //             },
            //             data: this.dataList.map((item, index) => {
            //                 return {
            //                     itemStyle: item.itemStyle,
            //                     value: item.sum,
            //                     name: item.month,
            //                 };
            //             }),
            //         },
            //         {
            //             type: 'pie',
            //             radius: ['30%', '40%'],
            //             silent: true,
            //             avoidLabelOverlap: false,
            //             label: {
            //                 show: false,
            //                 position: 'center',
            //             },
            //             emphasis: {
            //                 label: {
            //                     show: false,
            //                     fontWeight: 'bold',
            //                 },
            //             },
            //             labelLine: {
            //                 show: false,
            //             },
            //             data: this.dataList.map((item, index) => {
            //                 return {
            //                     itemStyle: item.itemStyle2,
            //                     value: item.sum,
            //                     name: item.month,
            //                 };
            //             }),
            //         },
            //     ],
            // };



            let option = {
                grid:{
                  left:'0%',
                    top:'0%',
                  right:'0%',
                    bottom:'0%'
                },
                title: {
                    text: '单位性质',
                    left: '31%',
                    top:'0',
                    textStyle:{
                        color:'#A0E1FF',
                        fontSize:16,
                        fontFamily:'MicrosoftYaHei'
                    }
                },
                series: [
                    {
                        name: '单位性质',
                        type: 'pie',
                        radius: ['48%', '78%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                            formatter: (params) => {
                                return `  \n{sum|${params.value}} \n{percent|${params.percent}%}\n{name|${params.name}}`;
                            },
                            rich: {
                                // 为名称和百分比设置样式
                                sum: {
                                    color: '#FFC35A', // 名称颜色
                                    fontSize: 24, // 名称字体大小
                                    align: 'center',
                                    verticalAlign:'middle'
                                },
                                percent: {
                                    color: '#FFC35A', // 名称颜色
                                    fontSize: 18, // 名称字体大小
                                    align: 'center',
                                    verticalAlign:'middle'
                                },
                                name: {
                                    color: '#ffffff', // 名称颜色
                                    fontSize: 14, // 名称字体大小
                                    align: 'center',
                                    verticalAlign:'middle'
                                }
                            }
                        },
                        emphasis: {
                            scaleSize:15,
                            label: {
                                show: true,
                                fontSize: this.getFontSize(30),
                                fontWeight: 'bold',
                            }
                        },
                        labelLine: {
                            show: false,

                        },
                        labelLayout:{
                            y:'45%'
                        },
                        data:[
                            {
                                name:'测试1',
                                value:637,
                                itemStyle:{
                                    color:'#E57152'
                                }

                            },
                            {
                                name:'测试2',
                                value:152,
                                itemStyle:{
                                    color:'#B0B0B0'
                                }

                            },
                            {
                                name:'测试3',
                                value:437,
                                itemStyle:{
                                    color:'#28E8FF'
                                }
                            },
                            {
                                name:'测试4',
                                value:937,
                                itemStyle:{
                                    color:'#E5C452'
                                }
                            },
                            {
                                name:'国家机关',
                                value:1437,
                                itemStyle:{
                                    color:'#27EAC1'
                                }
                            },
                        ]
                        // data: this.dataList.map((item, index) => {
                        //                     return {
                        //                         itemStyle: item.itemStyle,
                        //                         value: item.sum,
                        //                         name: item.month,
                        //                     };
                        //                 }),
                    }
                ]
            };

            let option2 = {
                grid:{
                    left:'0%',
                    top:'0%',
                    right:'0%',
                    bottom:'0%'
                },
                title: {
                    text: '单位所属行业',
                    left: '26%',
                    top:'0',
                    textStyle:{
                        color:'#A0E1FF',
                        fontSize:16,
                        fontFamily:'MicrosoftYaHei'
                    }
                },
                series: [
                    {
                        padAngle:4,
                        name: '单位所属行业',
                        type: 'pie',
                        radius: ['48%', '78%'],
                        avoidLabelOverlap: false,
                        // itemStyle: {
                        //     borderColor:'#0E126D',
                        //     borderWidth: this.getFontSize(4),
                        // },
                        label: {
                            show: false,
                            position: 'center',
                            formatter: (params) => {
                                return `   \n{sum|${params.value}} \n{percent|${params.percent}%}\n{name|${params.name}}`;
                            },
                            rich: {
                                // 为名称和百分比设置样式
                                sum: {
                                    color: '#FFC35A', // 名称颜色
                                    fontSize: 24, // 名称字体大小
                                    align: 'center',
                                    verticalAlign:'middle',
                                    fontFamily:'Microsoft YaHei'
                                },
                                percent: {
                                    color: '#FFC35A', // 名称颜色
                                    fontSize: 18, // 名称字体大小
                                    align: 'center',
                                    verticalAlign:'middle',
                                    fontFamily:'Microsoft YaHei'
                                },
                                name: {
                                    color: '#ffffff', // 名称颜色
                                    fontSize: 14, // 名称字体大小
                                    align: 'center',
                                    verticalAlign:'middle',
                                    fontFamily:'Microsoft YaHei'
                                }
                            }
                        },
                        labelLayout:{
                            // align:'center'
                            y:'45%'
                        },
                        emphasis: {
                            scaleSize:15,
                            label: {
                                show: true,
                                fontSize: this.getFontSize(30),
                                fontWeight: 'bold',
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data:[

                            {
                                name:'测试1',
                                value:637,
                                itemStyle:{
                                    color:'#E57152'
                                }

                            },
                            {
                                name:'测试2',
                                value:152,
                                itemStyle:{
                                    color:'#D0E3FE'
                                }

                            },
                            {
                                name:'测试3',
                                value:437,
                                itemStyle:{
                                    color:'#E5C452'
                                }
                            },
                            {
                                name:'测试4',
                                value:337,
                                itemStyle:{
                                    color:'#D6D6D6'
                                }
                            },

                            {
                                name:'测试5',
                                value:937,
                                itemStyle:{
                                    color:'#2BC191'
                                }
                            },

                            {
                                name:'制造业',
                                value:1437,
                                itemStyle:{
                                    color:'#0000FF'
                                }
                            },

                        ]
                        // data: this.dataList.map((item, index) => {
                        //         return {
                        //             itemStyle: item.itemStyle,
                        //             value: item.sum,
                        //             name: item.month,
                        //         };
                        // }),
                    }
                ]
            };
            this.chartData = option;
            this.chartData2 = option2
        },

        changeInTable(event) {
            // console.log(event.type);
            if (event.type == 'mouseleave') {
                this.inTable = false;
            } else if (event.type == 'mouseenter') {
                this.inTable = true;
            }
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_xhrqfx',
                    })
                    .then((res) => {
                        let data1 = res.retBody.retList;
                        this.dataList = [];
                        let month = '';
                        data1.forEach((item, index) => {
                            if (month != item.xhny) {
                                month = item.xhny;
                                let data = {
                                    month: item.xhny,
                                    data: [],
                                    sum: 0,
                                };
                                this.dataList.push(data);
                            }
                        });
                        this.dataList.forEach((item, index) => {
                            let demoData = data1.filter((item2, index2) => {
                                return item.month == item2.xhny;
                            });
                            item.data = demoData;
                            item.itemStyle = { color: this.color2[index] };
                            item.itemStyle2 = { color: this.color3[index] };
                            item.data.forEach((item2, index2) => {
                                item.sum += item2.rs;
                            });
                            this.allSum += item.sum;
                            let sumPct = 0;
                            item.data.forEach((item2, index2) => {
                                if (index2 < 3) {
                                    item2.pct = (
                                        (item2.rs / item.sum) *
                                        100
                                    ).toFixed(2);
                                    sumPct = sumPct + Number(item2.pct);
                                } else {
                                    item2.pct = (100 - sumPct).toFixed(1);
                                }
                            });
                            sumPct = 0;
                        });
                        // let sumPct2 = 0;
                        // this.dataList.forEach((item, index) => {
                        //     if (index < this.dataList.length - 1) {
                        //         let pct = (
                        //             (item.sum / this.allSum) *
                        //             100
                        //         ).toFixed(1);
                        //         item.pct = pct;
                        //         sumPct2 += Number(pct);
                        //     } else {
                        //         let pct = (100 - sumPct2).toFixed(1);
                        //         item.pct = pct;
                        //     }
                        // });
                        // console.log(this.dataList);
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
.fdc1 {
    flex-direction: column;
}
.text2 {
    font-size: 8.006px;
    text-align: center;
    width: 63.994px;
    padding-top: 20.006px;
}
.border {
    border-bottom: 0.052vw solid;
    border-image: linear-gradient(270deg, #4b85fb, #00baff) 10 10;
}
.monthText {
    width: 80.006px;
    height: 33.6px;
    line-height: 33.6px;
    text-align: center;
}
.numText {
    width: 0px;
    margin-left: 12px;
    height: 33.6px;
    line-height: 33.6px;
    text-align: left;
}
.pctText {
    width: 66.01px;
    height: 33.6px;
    line-height: 33.6px;
}
</style>
