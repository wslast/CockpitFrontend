<!--
 * @Author: Junchi Zhao
 * @LastEditors: 王硕
 * @Description: 图标模板
-->
<template>
    <div :class="className" :style="{ width,height}" />
</template>

<script>
const echarts = require("echarts");
// require('echarts/theme/macarons') // echarts theme

export default {
    props: {
        //自定义className
        className: {
            type: String,
            default: "chart"
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "100%"
        },
        //图表的option
        chartData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                if (val && Object.keys(val).length > 0 && this.chart) {
                    this.chart.dispose();
                    this.chart = null;

                    this.chart = echarts.init(this.$el);
                    // if(val.is3d) {
                    //   this.chart = echartsGL.init(this.$el);
                    // }else {
                    //   this.chart = echarts.init(this.$el);
                    // }
                    this.chart.setOption(val);
                }
            }
        }
    },
    mounted() {
        //初始化监听窗口resize时间 重绘图表
        this.$nextTick(() => {
            this.initChart();
            window.addEventListener("resize", this.handler);
        });
    },
    //页面销毁时回收内存
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        window.removeEventListener("resize", this.handler);
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        handler() {
            if (this.chart) {
                this.chart.resize();
            }
        },
        /**
         * 初始化图表
         */
        initChart() {
            this.chart = echarts.init(this.$el, 'dark');
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
                // console.log(this.chartData);
                this.chart.setOption(this.chartData);
            }
        }
    }
};
</script>
