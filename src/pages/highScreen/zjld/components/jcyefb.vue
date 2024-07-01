<template>
    <div class="df" style="position: relative;" id="centerMap">
        <div class="" style="width:850px;margin-right:15px;">
            <div style="height:100%;width:100%;" ref="chart"></div>
        </div>
        <div style="width:490px;">
            <div style="height:100%;width:100%;" ref="chart1"></div>
        </div>
        <div class="smallMap df">
            <div class="w0 fg1 df" v-if="dataList && dataList.length">
                <div class="mapChart" ref="smallMapChart"></div>
                <div class="text w0 fg1 df fdc">
                    <div class="h0 fg1 qxDiv">
                        {{ dataList[dataIndex].name }}
                    </div>

                </div>
            </div>
        </div>
        <div class="barButton df" v-if="dataIndex == 1">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="信都区" name="first"></el-tab-pane>
                <el-tab-pane label="市直管理部" name="second"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
const echarts = require('echarts');
const xingtaiJson = require('../../../../assets/map/xingtai.json');
export default {
    data() {
        return {
            chartData: {},
            chart: null,
            smallMapChart: null,
            dataList: [],
            option: {},
            dataIndex: 0,
            isFirst: true,
            max: 0,
            min: 0,
            textDataList: [],
            timer: null,
            centerMap: null,
            activeName: 'first',
            oldActiveName: 'first',
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        await this.getData();
        // this.getTextData();
        this.$nextTick(() => {
            this.initChart();
            this.centerMap = document.getElementById('centerMap');
            window.addEventListener('resize', this.handler);
            this.centerMap.addEventListener('mouseleave', this.openPolling);
            this.centerMap.addEventListener('mouseenter', this.stopPolling);
            this.openPolling();
        });
    },
    beforeDestroy() {
        this.centerMap.removeEventListener('mouseleave', this.openPolling);
        this.centerMap.removeEventListener('mouseenter', this.stopPolling);
        this.stopPolling();
        if (this.chart) {
            window.removeEventListener('resize', this.handler);
            this.chart.off('selectchanged'); //取消全部选中改变事件
            this.chart.dispose();
            this.chart = null;
        }
        if (this.smallMapChart) {
            window.removeEventListener('resize', this.handler);
            this.smallMapChart.dispose();
            this.smallMapChart = null;
        } else {
            return;
        }
    },
    methods: {
        handler() {
            if (this.chart) {
                this.chart.resize();
            }
            if (this.smallMapChart) {
                this.smallMapChart.resize();
            }
        },
        /**
         * @description: 绘制地图数据
         * @return {*}
         */
        initChart() {
            this.chart = echarts.init(this.$refs.chart);
            echarts.registerMap('xingtai', xingtaiJson);
            let mapData = xingtaiJson.features.map((item, index) => {
                return {
                    name: item.properties.name,
                    coord: item.properties.centroid,
                };
            });
            let mapData2 = JSON.parse(JSON.stringify(mapData));
            console.log(mapData2.map((item) => item.name));
            //下方为测试数据,后需删除
            mapData2.forEach((item, index) => {
                if (item.name == '临西县' || item.name == '沙河市') {
                    item.coord[1] -= 0.04;
                } else if (item.name == '宁晋县') {
                    item.coord[1] -= 0.05;
                } else {
                    item.coord[1] -= 0.04;
                }
                item.itemStyle = {
                    color: '#00B7EE',
                };
            });
            //上方为测试数据,后需删除
            let option = {
                geo: [
                    {
                        silent: true,
                        show: true,
                        map: 'xingtai',
                        aspectScale: 0.8, //视角倾斜度
                        zoom: 1,
                        layoutCenter: ['55%', '50%'],
                        layoutSize: '140%',
                        z: 1,
                        itemStyle: {
                            areaColor: '#21FAF9',
                            borderColor: 'transparent',
                            borderWidth: 0,
                        },
                    },
                    {
                        silent: true,
                        show: true,
                        map: 'xingtai',
                        aspectScale: 0.8, //视角倾斜度
                        zoom: 1,
                        layoutCenter: ['55%', '50%'],
                        layoutSize: '136%',
                        z: 2,
                        itemStyle: {
                            areaColor: '#ffffff',
                            borderColor: 'transparent',
                            borderWidth: 0,
                        },
                    },
                ],
                visualMap: {
                    type: 'continuous',
                    min: this.min,
                    max: this.max,
                    left: 'left',
                    top: 'bottom',
                    calculable: false, //拖拽用手柄
                    hoverLink: true,
                    dimension: 0,
                    color: [
                        '#001761',
                        '#0A2C9A',
                        '#1F4DDE',
                        '#399FFE',
                        '#C3E9FE',
                    ],
                    text: [this.max + '万', this.min + '万'],
                    textStyle: {
                        color: '#ADECFF',
                        fontSize: this.getFontSize(14),
                    },
                },
                series: {
                    z: 3,
                    type: 'map',
                    map: 'xingtai',
                    aspectScale: 0.8, //视角倾斜度
                    zoom: 1, //缩放
                    layoutCenter: ['55%', '50%'],
                    layoutSize: '132%',
                    label: {
                        show: true,
                        color: '#ffffff',
                        fontSize: this.getFontSize(16),
                        padding: [
                            this.getFontSize(3),
                            0,
                            this.getFontSize(3),
                            this.getFontSize(5),
                        ],
                        backgroundColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#25E2F3', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'transparent', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                        position: 'top',
                    },
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: this.getFontSize(12),
                        data: mapData2,
                    },
                    itemStyle: {
                        areaColor: '#001761',
                        borderColor: '#6FEFF4',
                        shadowBlur: this.getFontSize(10),
                        shadowColor: '#6FEFF4',
                    },
                    emphasis: {
                        disabled: false,
                        label: {
                            show: true,
                            color: '#ffffff',
                            fontSize: this.getFontSize(16),
                            backgroundColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#DA6108', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'transparent', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        itemStyle: {
                            shadowBlur: 0,
                            areaColor: '#EDDC1C',
                        },
                    },
                    select: {
                        disabled: false,
                        label: {
                            show: true,
                            color: '#ffffff',
                            fontSize: this.getFontSize(16),
                            padding: [
                                this.getFontSize(3),
                                0,
                                this.getFontSize(3),
                                this.getFontSize(5),
                            ],
                            backgroundColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#DA6108', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'transparent', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        itemStyle: {
                            shadowBlur: 0,
                            areaColor: '#EDDC1C',
                        },
                    },
                    // data: this.dataList,
                    data: this.dataList,
                },
            };
            this.option = option;
            this.chart.setOption(option);
            this.chart.on('selectchanged', this.selectchanged);
            this.chart.dispatchAction({
                type: 'select',
                dataIndex: 0,
            });
        },
        /**
         * @description: 选中事件处理
         * @return {*}
         */
        selectchanged(params) {
            //取消选择时重新选中
            if (params.fromAction == 'unselect') {
                this.dataIndex =
                    params.fromActionPayload.dataIndex != undefined
                        ? params.fromActionPayload.dataIndex
                        : params.fromActionPayload.dataIndexInside;
                this.chart.dispatchAction({
                    type: 'select',
                    dataIndex: this.dataIndex,
                });
                return;
            } else {
                let selectDataIndex =
                    params.fromActionPayload.dataIndex != undefined
                        ? params.fromActionPayload.dataIndex
                        : params.fromActionPayload.dataIndexInside;
                // 首次加载
                if (this.isFirst) {
                    this.isFirst = false;
                    this.option.series.markPoint.data[
                        this.dataIndex
                    ].itemStyle = {
                        color: '#FAEF7F',
                    };
                    this.chart.setOption(this.option);
                    this.initBarChart(this.dataIndex);
                    this.initSmallMapChart(this.dataIndex);
                    return;
                }
                //非首次加载,且点击区域相同时,不做处理
                else if (this.dataIndex == selectDataIndex) {
                    return;
                }
                //非首次加载,点击区域不同
                else {
                    this.option.series.markPoint.data[
                        this.dataIndex
                    ].itemStyle = {
                        color: '#00B7EE',
                    };
                    this.dataIndex = selectDataIndex;
                    this.option.series.markPoint.data[
                        this.dataIndex
                    ].itemStyle = {
                        color: '#FAEF7F',
                    };
                    this.chart.setOption(this.option);
                    this.initBarChart(this.dataIndex);
                    this.initSmallMapChart(this.dataIndex);
                    return;
                }
            }
        },
        /**
         * @description: 绘制左侧柱状图数据
         * @return {*}
         * @param {*} num
         */
        initBarChart(num) {
            this.$nextTick(() => {
                this.chartData = echarts.init(this.$refs.chart1);
                let color = [
                    ['#6BE1A5', '#B7F9EF'],
                    ['#6167D5', '#C5E0FD'],
                    ['#F9A658', '#C5E0FD'],
                    ['#E75C7D ', '#F7D6CF'],
                    ['#67CAF9 ', '#B6F0FD'],
                    ['#6B73F5 ', '#D79EFA'],
                    ['#F4C553', '#81EAA7 '],
                    ['#904C0A', '#F8A95B'],
                    ['#6BE1A5 ', '#B7F9EF '],
                    ['#0A14B8', '#7980F0'],
                    ['#3F4164', '#B8BBEA'],
                    ['#08979C', '#6FEFF4'],
                ];
                let max = 0;
                let barData = this.dataList[num].data.map((item, index) => {
                    if (item.je > max) {
                        max = item.je;
                    }
                    return {
                        ...item,
                        name: item.ny,
                        value: item.je,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: color[index][0], // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: color[index][1], // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                    };
                });
                 console.log(barData);
                //测试数据后需删除
                let barData2 = [];
                barData.map((item, index) => {
                    let item2 = {
                        name: item.ny,
                        value: max,
                        je: item.je,
                        itemStyle: {
                            color: '#000000',
                        },
                    };
                    return barData2.push(item2);
                });
                let option = {
                    backgroundColor: '',
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow',
                        },
                        formatter: (params) => {
                            // console.log(params);
                            return (
                                params.marker +
                                ' ' +
                                params.name +
                                ' : ' +
                                params.data.je +
                                '万元'
                            );
                        },
                    },
                    yAxis: {
                        type: 'category',
                        data: barData.reverse().map((item) => {
                            return item.ny;
                        }),
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            color: '#FFFFFF',
                            fontSize: this.getFontSize(16),
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    xAxis: {
                        type: 'value',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    grid: {
                        left: '15%',
                        right: '18%',
                    },
                    series: [
                        {
                            z: 2,
                            type: 'bar',
                            barWidth: '50%',
                            seriesLayoutBy: 'row',
                            data: barData,
                            label: {
                                show: false,
                            },
                            itemStyle: {
                                borderRadius: this.getFontSize(12),
                            },
                        },
                        {
                            z: 1,
                            type: 'bar',
                            barWidth: '50%',
                            barGap: '-100%',
                            seriesLayoutBy: 'row',
                            data: barData2.reverse(),
                            itemStyle: {
                                borderRadius: this.getFontSize(12),
                            },
                            label: {
                                show: true,
                                color: '#00FCF9',
                                align: 'left',
                                position: 'outside',
                                formatter: (params) => {
                                    return params.data.je + '万元';
                                },
                            },
                        },
                    ],
                };
                this.chartData.setOption(option);
            });
        },
        initSmallMapChart(num) {
            const childMapJson = {
                type: 'FeatureCollection',
                features: xingtaiJson.features.filter((item, index) => {
                    return item.properties.name == this.dataList[num].name;
                }),
            };
            if (!this.smallMapChart) {
                this.smallMapChart = echarts.init(this.$refs.smallMapChart);
            }
            echarts.registerMap('childMap', childMapJson);
            let option = {
                geo: {
                    silent: true,
                    show: true,
                    map: 'childMap',
                    aspectScale: 0.8, //视角倾斜度
                    zoom: 1,
                    z: 1,
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '90%',
                    itemStyle: {
                        areaColor: '#21FAF9',
                    },
                },
                series: {
                    z: 2,
                    type: 'map',
                    map: 'childMap',
                    silent: true,
                    aspectScale: 0.8, //视角倾斜度
                    zoom: 1, //缩放
                    layoutCenter: ['50%', '45%'],
                    layoutSize: '90%',
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: '#0A2F9C',
                        borderColor: '#21FAF9',
                        borderWidth: this.getFontSize(2),
                        shadowBlur: this.getFontSize(10),
                        shadowColor: '#21FAF9',
                    },
                    emphasis: {
                        disabled: true,
                    },
                    select: {
                        disabled: true,
                    },
                },
            };
            this.smallMapChart.setOption(option);
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'zjld_jseyjcyefb',
                    })
                    .then((res) => {                        
                        this.dataList = [];
                        let name = '';
                        let list = [];
                        res.retBody.retList.forEach((item, index) => {
                            
                            if (item.glb != name) {
                                name = item.glb;
                                this.dataList.push({
                                    name: item.qx,
                                    glb:item.glb,
                                    data: [],
                                });
                            }
                        });
                        res.retBody.retList.forEach((item) => {
                            for (const iterator of this.dataList) {
                                
                                if (iterator.glb === item.glb) {
                                    iterator.data.push(item);
                                }
                            }
                        });
                        this.dataList.forEach((item, index) => {
                            let max1=0;
                            item.data.forEach((item2,index2)=>{
                                if(max1<item2.je){
                                    max1=item2.je;
                                }
                                
                            });
                            item.max = max1.toFixed(1);
                            item.value=max1.toFixed(1);
                            
                        });
                        this.dataList.forEach((item, index) => {
                                this.max =parseInt(item.max)>this.max ? parseInt(item.max) : this.max;
                                if (index == 0) {
                                    this.min =parseInt( item.max);
                                }else{
                                    this.min =parseInt(item.max )<this.min ? parseInt(item.max) : this.min;
                                }
                            });
                        
                        this.max = parseInt(this.max / 1000) * 1000 + 1000;
                        this.min = parseInt(this.min / 1000) * 1000;
                        resolve();
                    });
            });
        },

        // 开启轮询
        openPolling() {
            // 先生成timer后轮询
            this.timer = setTimeout(() => {
                this.dispatchEvent();
            }, 5000);
            setTimeout(() => {
                this.startPolling(this.dispatchEvent, 5000);
            }, 0);
        },
        //轮询
        startPolling(func, wait) {
            // console.log('开始轮询');
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    func();
                    this.startPolling(func, wait);
                }, wait);
            }
        },
        // 关闭轮询
        stopPolling() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },
        // 派发选择事件
        dispatchEvent() {
            if (this.dataIndex == 17) {
                this.dataIndex = 0;
            } else {
                this.dataIndex += 1;
            }
            this.option.series.markPoint.data.forEach((item, index) => {
                item.itemStyle = { color: '#00B7EE' };
            });
            this.option.series.markPoint.data[this.dataIndex].itemStyle = {
                color: '#FAEF7F',
            };
            this.chart.setOption(this.option);
            this.chart.dispatchAction({
                type: 'select',
                dataIndex: this.dataIndex,
            });
            this.initBarChart(this.dataIndex);
            this.initSmallMapChart(this.dataIndex);
        },
        handleClick(e) {
            if (e.name == this.oldActiveName) {
                return;
            } else {
                this.oldActiveName = e.name;
                let num = e.name == 'first' ? 1 : 18;
                this.initBarChart(num);
            }
        },
    },
};
</script>
<style scoped lang="scss">
.smallMap {
    position: absolute;
    margin-top: 20.006px;
    margin-left: 20.006px;
    width: 300px;
    height: 90.01px;
    .mapChart {
        width: 96px;
    }
    .text {
        margin-left: 20.006px;
        .qxDiv {
            font-size: 20.006px;
            font-weight: bold;
            color: #ffffff;
            line-height: 45.005px;
        }
        .yeDiv {
            font-size: 25.997px;
            font-weight: bold;
            color: #00f9df;
            line-height: 45.005px;
        }
    }
}
.barButton {
    position: absolute;
    height: 39.994px;
    right: 399.994px;
}
/deep/ .el-tabs__item {
    color: #ffffff !important;
}
/deep/ .el-tabs__item.is-active {
    color: #409eff !important;
}
</style>
