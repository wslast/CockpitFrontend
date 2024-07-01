<template>
    <div  class="bfjl" style="">
        <chart :chartData="chartData" ref="chart"></chart>
        <div class="bfjl-circle"></div>
        <div class="bfjl-circle bfjl-circle2  "></div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            chartData: {},
            dataList: [],
            color:['#CDAD3D','#39437b'],
            ybValue:0.799,
            zValue:[0.6,0.2,0.2],
            zColor:['#D64647','#FFDA5A','#28EF6E']
        };
    },
    async mounted() {
        // await this.getData();
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {

            let colorList = [
                [0, '#CDAD3D'],
                [this.ybValue, '#CDAD3D'],
                [1, '#39437b']]

            let  zSeries =  this.zValue.map((item,index)=>{
                let obj = {
                    barWidth :5,
                    name: '',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        borderRadius:[0,0,0,0],
                        color:this.zColor[index]
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    markPoint: {
                        symbol: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z', // 设置标记点的符号为箭头
                        symbolSize: [6, 6], // 设置箭头大小
                        symbolOffset:[0,'100%'],
                        label:{
                            position:'bottom',
                            formatter:  (v)=> {
                                let sum = 0
                                for (let i = 0;i<=index;i++) {
                                    sum += this.zValue[i]
                                }
                                return `{textStyle|${(Number(sum) * 100).toFixed(0)}%}`
                            },
                            rich:{
                                textStyle:{
                                    fontSize:10,
                                    color:'#ffffff',
                                }
                            }
                        },
                        itemStyle: {
                            color: '#fff', // 设置箭头颜色

                        },
                        data: [
                            {type: 'max', name: ''},
                        ]
                    },
                    data: [item]
                }

                if(index == 0) {
                    obj.itemStyle.borderRadius = [5,0,0,5]
                }

                if(index == this.zValue.length-1) {
                    obj.itemStyle.borderRadius = [0,5,5,0]
                    obj.markPoint = {}
                }

                return  obj

            })

            this.chartData =   {
                tooltip: {
                    show:false,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    show:false,
                },
                title:{
                    text:'资金运用率',
                    left:'21%',
                    top:'5%',
                    textStyle:{
                        fontSize:14,
                        color:'#ffffff',
                        fontWeight:'normal',
                        fontFamily:'Microsoft YaHei'
                    }
                },
                grid: {
                    left: '-5%',
                    right: '5%',
                    bottom: '-35%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show:false,
                    min:0,
                    max:1,
                },
                yAxis: {
                    show:false,
                    type: 'category',

                },
                series: [
                    {
                        type: 'gauge',
                        startAngle: 0,
                        endAngle: 180,
                        center: ['48%', '60%'],
                        radius: '-5%',
                        min: 0,
                        max: 1,
                        splitNumber: 12,
                        axisLine: {
                            show:false,
                            lineStyle: {
                                width: 3,
                                color: colorList
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: 11,
                            width: 12,
                            offsetCenter: [0, 74],
                            itemStyle: {
                                color: '#FFDA5A'
                            }
                        },
                        axisTick: {
                            show:true,
                            length: 1,
                            distance:36,
                            lineStyle: {
                                color: '#39437b',
                                width: 9
                            }
                        },
                        splitLine: {
                            length: 22,
                            distance:30,
                            lineStyle: {
                                color: 'auto',
                                width: 6.5,
                            }
                        },
                        axisLabel: {
                            rich: {
                                // 定义富文本样式
                                perStyle0: {
                                    color:'#fff',
                                    height:10,
                                    lineHeight:40,
                                    verticalAlign:'bottom',
                                    fontSize:10
                                },
                                perStyle11: {
                                    color:'#fff',
                                    height:10,
                                    lineHeight:40,
                                    verticalAlign:'bottom',
                                    fontSize:10
                                }
                            },
                            show:true,
                            color: '#464646',
                            fontSize: 20,
                            distance: -6,
                            formatter: function (value) {
                                if (value === 0) {
                                    return '{perStyle0|0%}';
                                } else if (value === 1) {
                                    return '{perStyle11|100%}';
                                }
                                return '';
                            },

                        },
                        title:{
                            show:false
                        },
                        detail: {
                            offsetCenter: [0, '-8%'],
                            valueAnimation: false,
                            formatter: function (value) {
                                console.log(Math.trunc(value*100),((value * 100)%1).toString().slice(1),'数据打印')
                                return `{startNumValue|${Math.trunc(value*100)}}`+''+`{endNumValue|${((value * 100)%1).toFixed(1).toString().slice(1)+'%'}}`;
                            },
                            color: '#FFDA5A',
                            rich:{
                                startNumValue:{
                                    verticalAlign:'top',
                                    fontSize: 24,
                                    fontWeight:'bold',
                                    color: '#FFDA5A',
                                    fontFamily:'Microsoft YaHei'
                                },
                                endNumValue:{
                                    fontSize:16,
                                    fontWeight: 'bold',
                                    color: '#FFDA5A',
                                    verticalAlign:'middle',
                                    fontFamily:'Microsoft YaHei'
                                }
                            }
                        },
                        data: [
                            {
                                value: this.ybValue,
                                name: ''
                            }
                        ]
                    },
                    ...zSeries



                ]
            };
        }
    },
};
</script>

<style lang="scss" scoped>
.bfjl {
    height: 100%;
    width: 100%;
    position: relative;
    &-circle {
        position: absolute;
        top: 21%;
        left: 1%;
        //height: 80%;
        height: 140px;
        width: 140px;
        border-radius: 60%;
        border-top: solid 1.5px #293062;
        //border-left: solid 1.5px #cccccc;
        //border-right: solid 1.5px #cccccc;
    }
    &-circle2 {
        top: 25.5%;
        left: 4%;
        width: 87%;
        height: 75%;
        border-radius: 50%;
        border-top: solid 2px #fff;
    }
}

</style>
