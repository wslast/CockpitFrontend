<template>
    <div
        :class="className"
        :style="{ width: width }"
        style="height:100%;"
        ref="chart"
        id="chart"
    />
</template>

<script>
const echarts = require('echarts');
// require('echarts/theme/macarons') // echarts theme

export default {
    props: {
        //自定义className
        dataLength:{
          default:5,
          type:Number
        },
        className: {
            type: String,
            default: 'chart',
        },
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '100%',
        },
        //图表的option
        chartData: {
            type: Object,
            required: true,
        },
        inTable: {
            type: Boolean,
            default: () => false,
        },
    },
    data() {
        return {
            chart: null,
            myTimer: null,
            pointDataIndex: 0,
            timer: null,
        };
    },
    watch: {
        chartData: {
            deep: true,
            handler: function(val) {
                // console.log(val);
                // 有数据且有chart
                if (val && Object.keys(val).length > 0) {
                    // console.log(1111);
                    if (this.chart) {
                        this.chart.dispose();
                        this.chart = null;
                    }
                    // console.log(this.chartData);
                    // console.log(this.$el);
                    this.$nextTick(() => {
                        this.initChart();
                    });
                    // this.chart = echarts.init(this.$el);
                    // if(val.is3d) {
                    //   this.chart = echartsGL.init(this.$el);
                    // }else {
                    //   this.chart = echarts.init(this.$el);
                    // }
                    // this.chart.setOption(val);
                }
            },
            immediate: true,
        },
        inTable: {
            deep: true,
            handler: function(val) {
                if (val == false) {
                    this.startPolling();
                } else {
                    this.stopPolling();
                }
            },
            immediate: true,
        },
    },
    mounted() {
        //初始化监听窗口resize时间 重绘图表
        this.$nextTick(() => {
            // this.initChart();
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
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = null;
        if (this.myTimer) {
            clearTimeout(this.myTimer);
        }
        this.myTimer = null;
    },
    methods: {
        handler() {
            if (this.chart) {
                this.chart.resize();
            }
        },
        //初始化图表
        initChart() {
            this.chart = echarts.init(this.$el);
            // console.log(this.chartData, "xhrqYearChart");
            // if(this.chartData.is3d) {
            //   console.log(echartsGL);
            //   this.chart = echartsGL.init(this.$el);
            // }else {
            //   this.chart = echarts.init(this.$el);
            // }
            if (
                this.chartData &&
                Object.keys(this.chartData).length > 0 &&
                this.chart
            ) {
                this.chart.setOption(this.chartData);
                // 监听高亮事件
                this.chart.on('highlight', (params) => {
                    // console.log(params.dataIndex, "highlight");
                    this.debounce(params.dataIndex, 500);
                });
                // 监听鼠标停留事件
                this.chart.on('mouseover', (params) => {
                    // 派发消除高亮事件
                    this.chart.dispatchAction({
                        type: 'downplay',
                        // dataIndex: this.pointDataIndex,
                    });
                    this.pointDataIndex = params.dataIndex;
                    // 派发高亮时间
                    this.chart.dispatchAction({
                        type: 'highlight',
                        dataIndex: this.pointDataIndex,
                    });
                });
                // 首次进入后增加高亮事件
                this.chart.dispatchAction({
                    type: 'highlight',
                    dataIndex: this.pointDataIndex,
                });
            }
        },
        // 派发外部chart数据索引
        debounce(index, num) {
            // console.log("触发了高亮");
            let that = this;
            //防抖
            if (this.myTimer) {
                clearTimeout(this.myTimer);
                this.myTimer = null;
            }
            let flag = true;
            if (flag) {
                flag = false;
                this.myTimer = setTimeout(() => {
                    // console.log(params.dataIndex);
                    this.$emit('initChart2', index);
                }, num);
            }
        },
        // 开始轮询
        startPolling() {
            this.timer = setTimeout(() => {
                this.dispatchEvent();
            }, 5000);
            setTimeout(() => {
                this.changePolling(this.dispatchEvent, 5000);
            }, 0);
        },
        // 轮询中
        changePolling(func, wait) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    func();
                    this.changePolling(func, wait);
                }, wait);
            }
        },
        //结束轮询
        stopPolling() {
            clearTimeout(this.timer);
            this.timer = null;
        },
        //派发事件
        dispatchEvent() {
            this.chart.dispatchAction({
                type: 'downplay',
                // dataIndex: this.pointDataIndex,
            });
            if (this.pointDataIndex < this.dataLength) {
                this.pointDataIndex += 1;
            } else {
                this.pointDataIndex = 0;
            }
            this.chart.dispatchAction({
                type: 'highlight',
                dataIndex: this.pointDataIndex,
            });
            this.debounce(this.pointDataIndex, 0);
        },
    },
};
</script>
