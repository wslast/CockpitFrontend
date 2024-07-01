<template>
    <div class="h100percent df" style="position: relative;">
        <div class="w0 fg1" ref="chart" id="chart"></div>
        <div class="kb df">
            <div
                class="fg1 w0 df"
                v-if="showkbDataList && showkbDataList.length"
            >
                <div style="width:13.542vw;" class="df">
                    <div
                        class="icon bg"
                        :style="{
                            backgroundImage: showkbDataList[0].backgroundImage,
                        }"
                    ></div>
                    <div class="w0 fg1 df fdc" style="margin-left: 1.042vw;">
                        <div class="h0 fg1 dataDiv fontPMZD">
                            <animate-number
                                duration="2000"
                                from="0"
                                :to="showkbDataList[0].showValue"
                            ></animate-number>
                        </div>
                        <div class="h0 fg1 df">
                            <div class="nameDiv2">
                                {{ showkbDataList[0].name }}
                            </div>
                            <div
                                class="icon2 bg"
                                :style="{
                                    backgroundImage:
                                        showkbDataList[0].backgroundImage,
                                }"
                            ></div>
                            <div class="w0 fg1"></div>
                        </div>
                    </div>
                </div>
                <div class="w0 fg1 df fdc">
                    <div
                        class="h0 fg1 dataDiv2 fontPMZD"
                        :style="{ color: showkbDataList[1].color }"
                    >
                        <template v-if="showkbDataList[1].showValue > 0">
                            +
                        </template>
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="showkbDataList[1].showValue"
                        ></animate-number>
                        %
                    </div>
                    <div class="h0 fg1 df">
                        <div class="nameDiv2">{{ showkbDataList[1].name }}</div>
                        <div
                            class="icon2 bg"
                            :style="{
                                backgroundImage:
                                    showkbDataList[1].backgroundImage,
                            }"
                        ></div>
                        <div class="w0 fg1"></div>
                    </div>
                </div>
                <div class="w0 fg1 df fdc">
                    <div
                        class="h0 fg1 dataDiv2 fontPMZD"
                        :style="{ color: showkbDataList[2].color }"
                    >
                        <template v-if="showkbDataList[2].showValue > 0">
                            +
                        </template>
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="showkbDataList[2].showValue"
                        ></animate-number>
                        %
                    </div>
                    <div class="h0 fg1 df">
                        <div class="nameDiv2">{{ showkbDataList[2].name }}</div>
                        <div
                            class="icon2 bg"
                            :style="{
                                backgroundImage:
                                    showkbDataList[2].backgroundImage,
                            }"
                        ></div>
                        <div class="w0 fg1"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const echarts = require('echarts');
const xingtaiJson = require('../../../../assets/map/xingtai.json');
export default {
    data() {
        return {
            dataList: [],
            showkbDataList: [],
            chart: null,
            option: {},
            mapTimer: null,
            dataIndex: 0,
            isFirst: true,
            isFirstSelect: false,
            tooltipStyleList: [],
            zxsIndex: 0,
            imgUrlList: [
                require('../../../../assets/images/dp/sy/icon_lgl.svg'),
                require('../../../../assets/images/dp/sy/icon_down.svg'),
                require('../../../../assets/images/dp/sy/icon_up.svg'),
                require('../../../../assets/images/dp/sy/tip_kuang.svg'),
                require('../../../../assets/images/dp/sy/tip_kuang2.svg'),
            ],
        };
    },
    props: {
        kbDataList: {
            type: Object,
            default: () => {},
        },
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        await this.getData();
        await this.getKbData();
        // await this.getTextData();
        this.$nextTick(() => {
            this.initChart();
            window.addEventListener('resize', this.handler);
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        } else {
            window.removeEventListener('resize', this.handler);
            // 关闭弹窗
            this.chart.dispatchAction({
                type: 'hideTip',
            });
            this.chart.off('selectchanged'); //取消全部选中改变事件
            this.chart.off('globalout');
            this.chart.off('mouseover');
            this.chart.dispose();
            this.chart = null;
        }
    },
    methods: {
        // 缩放
        handler() {
            if (this.chart) {
                this.chart.resize();
            }
        },
        // 首次加载
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
            mapData2.forEach((item, index) => {
                item.coord[1] -= 0.04;
                item.itemStyle = {
                    color: 'transparent',
                };
            });
            let imageUrl = this.imgUrlList[3];
            let imageUrl2 = this.imgUrlList[4];
            this.tooltipStyleList[0] =
                'background-repeat: no-repeat;background-size: 100% 100%;width:19.792vw;height:14.583vw;';
            this.tooltipStyleList[0] +=
                "background-image:url('" + imageUrl + "')";
            this.tooltipStyleList[1] =
                'background-repeat: no-repeat;background-size: 100% 100%;width:40.625vw;height:15.625vw;';
            this.tooltipStyleList[1] +=
                "background-image:url('" + imageUrl2 + "')";
            let option = {
                tooltip: {
                    alwaysShowContent: true,
                    triggerOn: 'none',
                    show: true,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textStyle: {
                        color: '#ffffff',
                    },
                    confine: true, //tooltip限制在图标区域内
                    borderWidth: 0,
                    formatter: (params) => {
                        if (params.name == '信都区') {
                            let showData =
                                "<div style='width:39.583vw;height:14.583vw;display:flex;'>" +
                                "<div style='flex-grow:1;width:0%;'> " +
                                "<span style='margin-left:1.563vw; font-size: 1.354vw;font-weight: bold;color: #1AF3FD;line-height:3.854vw;'>" +
                                params.name +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存人数: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.jcrs +
                                '人' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存单位: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.jcdw +
                                '家' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存余额 : ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.jcye +
                                '万元' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '公积金贷款余额: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.gjjdkye +
                                '万元' +
                                '</span>' +
                                // '<br/>' +
                                // "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                // '离柜率: ' +
                                // '</span>' +
                                // "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                // params.data.lgl +
                                // '%' +
                                // '</span>' +
                                '</div>' +
                                "<div style='flex-grow:1;width:0%;'> " +
                                "<span style='margin-left:1.563vw; font-size: 1.354vw;font-weight: bold;color: #1AF3FD;line-height:3.854vw;'>" +
                                this.dataList[18].glb +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存人数: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                this.dataList[18].jcrs +
                                '人' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存单位: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                this.dataList[18].jcdw +
                                '家' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存余额 : ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                this.dataList[18].jcye +
                                '万元' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '公积金贷款余额: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                this.dataList[18].gjjdkye +
                                '万元' +
                                '</span>' +
                                // '<br/>' +
                                // "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                // '离柜率: ' +
                                // '</span>' +
                                // "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                // this.dataList[18].lgl +
                                // '%' +
                                // '</span>' +
                                '</div>' +
                                '</div>';
                            return showData;
                        } else {
                            let showData =
                                "<span style='margin-left:1.563vw; font-size: 1.354vw;font-weight: bold;color: #1AF3FD;line-height:3.854vw;'>" +
                                params.name +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存人数: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.jcrs +
                                '人' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存单位: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.jcdw +
                                '家' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '缴存余额 : ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.jcye +
                                '万元' +
                                '</span>' +
                                '<br/>' +
                                "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                '公积金贷款余额: ' +
                                '</span>' +
                                "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                params.data.gjjdkye +
                                '万元' +
                                '</span>';
                                // '<br/>' +
                                // "<span style='margin-left:1.563vw; font-size: 0.99vw;font-weight: bold;color: #ffffff;line-height:1.51vw;'>" +
                                // '离柜率: ' +
                                // '</span>' +
                                // "<span style='margin-left:0.521vw; font-size: 1.51vw;font-weight: bold;color: #03FBE2;line-height:1.823vw;'>" +
                                // params.data.lgl +
                                // '%' +
                                // '</span>';
                            return showData;
                        }
                    },
                    extraCssText: this.tooltipStyleList[0],
                },
                geo: [
                    {
                        silent: true,
                        show: true,
                        map: 'xingtai',
                        aspectScale: 0.85, //视角倾斜度
                        zoom: 1,
                        layoutCenter: ['50%', '54%'],
                        layoutSize: '158%',
                        z: 1,
                        itemStyle: {
                            areaColor: '#865A24',
                            borderColor: 'transparent',
                            borderWidth: 0,
                        },
                    },
                    {
                        silent: true,
                        show: true,
                        map: 'xingtai',
                        aspectScale: 0.85, //视角倾斜度
                        zoom: 1,
                        layoutCenter: ['50%', '52%'],
                        layoutSize: '158%',
                        z: 1,
                        itemStyle: {
                            areaColor: '#000000',
                            borderColor: 'transparent',
                            borderWidth: 0,
                        },
                    },
                ],
                series: {
                    z: 3,
                    type: 'map',
                    map: 'xingtai',
                    aspectScale: 0.85, //视角倾斜度
                    zoom: 1, //缩放
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '158%',
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: this.getFontSize(12),
                        itemStyle: {
                            color: 'transparent',
                        },
                        data: mapData2,
                    },
                    itemStyle: {
                        areaColor: 'rgba(124,220,255,1.000)',
                        borderColor: '#ffffff',
                        shadowBlur: this.getFontSize(10),
                        shadowColor: '#6FEFF4',
                    },
                    emphasis: {
                        disabled: false,
                        label: {
                            show: true,
                            color: '#ffffff',
                            fontSize: this.getFontSize(16),
                            padding: [
                                this.getFontSize(5),
                                0,
                                this.getFontSize(5),
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
                                        color: '#141E38', // 0% 处的颜色
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
                            areaColor: '#EDDC1C ',
                        },
                    },
                    select: {
                        disabled: false,
                        label: {
                            show: true,
                            color: '#ffffff',
                            padding: [
                                this.getFontSize(5),
                                0,
                                this.getFontSize(5),
                                this.getFontSize(5),
                            ],
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
                                        color: '#141E38', // 0% 处的颜色
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
                            areaColor: '#EDDC1C ',
                        },
                    },
                    data: this.dataList,
                },
            };
            this.option = option;
            this.chart.setOption(this.option);
            // 选中派发事件
            this.chart.on('selectchanged', this.selectchanged);
            this.chart.on('globalout', this.globalout);
            this.chart.on('mouseover', this.mouseover);
            // this.chart.dispatchAction({
            //     type: 'hideTip',
            // });
            // //默认选中内容
            this.chart.dispatchAction({
                dataIndex: 0,
                type: 'select',
            });
            this.$nextTick(() => {
                this.openPolling();
            });
        },
        mouseover(params) {
            // 如果进来鼠标在地图内,则关闭轮询事件
            this.changePolling(this.dispatchEvent, 5000, false);
        },
        globalout(params) {
            //如果进来鼠标不在地图内,则开启轮询事件
            this.dataIndex += 1;
            this.openPolling();
        },
        // 选中后增加marker,增加tooltip
        selectchanged(params) {
            //取消选择时重新选中,
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
                    this.dataIndex = 0;
                    this.option.series.markPoint.data[
                        this.dataIndex
                    ].itemStyle = {
                        color: 'orange',
                    };
                    this.chart.setOption(this.option);
                    // 派发提示框
                    this.chart.dispatchAction({
                        type: 'showTip',
                        dataIndex: 0,
                        seriesIndex: 0,
                    });
                    this.dataIndex = 1;
                    return;
                }
                //消除初始下标为1时,轮询或点击时markpoint和数据错乱问题
                else if (
                    this.dataIndex == selectDataIndex &&
                    this.dataIndex == 1 &&
                    this.isFirstSelect == false
                ) {
                    this.isFirstSelect = true;
                    this.option.series.markPoint.data.forEach((item, index) => {
                        item.itemStyle = {
                            color: 'transparent',
                        };
                    });
                    this.dataIndex = 1;
                    this.option.series.markPoint.data[
                        this.dataIndex
                    ].itemStyle = {
                        color: 'orange',
                    };
                    this.option.tooltip.extraCssText =
                        this.dataIndex == this.zxsIndex
                            ? this.tooltipStyleList[1]
                            : this.tooltipStyleList[0];
                    //选择直辖市时根据他的下标判断
                    this.chart.dispatchAction({
                        type: 'hideTip',
                    });
                    this.chart.setOption(this.option);
                    this.chart.dispatchAction({
                        type: 'showTip',
                        dataIndex: this.dataIndex,
                        seriesIndex: 0,
                    });
                    return;
                }
                //非首次加载,且点击区域相同时,不做处理
                else if (this.dataIndex == selectDataIndex) {
                    return;
                }
                //非首次加载,点击区域不同
                else {
                    this.option.series.markPoint.data.forEach((item, index) => {
                        item.itemStyle = {
                            color: 'transparent',
                        };
                    });
                    this.dataIndex = selectDataIndex;
                    this.option.series.markPoint.data[
                        this.dataIndex
                    ].itemStyle = {
                        color: 'orange',
                    };
                    this.option.tooltip.extraCssText =
                        this.dataIndex == this.zxsIndex
                            ? this.tooltipStyleList[1]
                            : this.tooltipStyleList[0];
                    //选择直辖市时根据他的下标判断
                    this.chart.dispatchAction({
                        type: 'hideTip',
                    });
                    this.chart.setOption(this.option);
                    this.chart.dispatchAction({
                        type: 'showTip',
                        dataIndex: this.dataIndex,
                        seriesIndex: 0,
                    });
                    return;
                }
            }
        },
        // 开启沦陷
        openPolling() {
            this.isFirst = false;
            this.mapTimer = setTimeout(() => {
                this.dispatchEvent();
            }, 5000);
            setTimeout(() => {
                this.changePolling(this.dispatchEvent, 5000, true);
            }, 0);
        },
        // 地图轮询
        changePolling(func, wait, type) {
            if (type == true) {
                if (this.mapTimer) {
                    clearTimeout(this.mapTimer);
                    this.mapTimer = setTimeout(() => {
                        func();
                        this.changePolling(func, wait, type);
                    }, wait);
                }
            } else {
                clearTimeout(this.mapTimer);
                this.mapTimer = null;
                return;
            }
        },
        // 派发选择事件
        dispatchEvent() {
            //此时展示只会单项流动,只要做关闭弹窗事件,选择地图,派发弹窗事件
            //关闭弹窗
            this.option.series.markPoint.data.forEach((item, index) => {
                item.itemStyle = { color: 'transparent' };
            });
            this.option.series.markPoint.data[this.dataIndex].itemStyle = {
                color: 'orange',
            };
            this.option.tooltip.extraCssText =
                this.dataIndex == this.zxsIndex
                    ? this.tooltipStyleList[1]
                    : this.tooltipStyleList[0];
            this.chart && this.chart.setOption(this.option);
            this.chart &&
                this.chart.dispatchAction({
                    type: 'hideTip',
                });
            this.chart &&
                this.chart.dispatchAction({
                    dataIndex: this.dataIndex,
                    type: 'select',
                });
            this.chart &&
                this.chart.dispatchAction({
                    type: 'showTip',
                    dataIndex: this.dataIndex,
                    seriesIndex: 0,
                });
            if (this.dataIndex == 17) {
                this.dataIndex = 0;
            } else {
                this.dataIndex += 1;
            }
        },
        // 请求数据
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'sy_dt',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        this.dataList.forEach((item, index) => {
                            if (item.glb === '信都区管理部') {
                                this.zxsIndex = index;
                            }
                            item.name = item.qx;
                            item.value = index;
                        });
                        resolve();
                    });
            });
        },
        //整理首页数据
        async getKbData() {
            return new Promise((resolve, reject) => {
                let data1 = this.kbDataList;
                let nameList = ['最近月缴存额(万元)', '同比', '环比'];
                this.showkbDataList = [
                    { value: data1.tb },
                    { value: data1.hb },
                ];
                this.showkbDataList = this.showkbDataList.map((item, index) => {
                    let color = '',
                        showValue = '',
                        backgroundImage = '';
                    if (item.value < 0) {
                        color = '#28EF6E ';
                        showValue = item.value;
                        backgroundImage = 'url(' + this.imgUrlList[1] + ')';
                    } else if (item.value > 0) {
                        color = '#EF3628';
                        showValue = '+' + item.value;
                        backgroundImage = 'url(' + this.imgUrlList[2] + ')';
                    } else {
                        color = 'lightgray';
                        showValue = item.value;
                    }
                    return {
                        ...item,
                        color: color,
                        showValue: showValue,
                        backgroundImage: backgroundImage,
                    };
                });
                this.showkbDataList.unshift({
                    value: data1.zjyjce,
                    color: '#FFC35A ',
                    showValue: data1.zjyjce,
                    backgroundImage: 'url(' + this.imgUrlList[0] + ')',
                });
                this.showkbDataList.forEach((item, index) => {
                    item.name = nameList[index];
                });
                resolve();
            });
        },
        /**
         * @description: number组件保留几位小数
         * @return {*}
         * @param {*} num
         */
        formatter(num) {
            return num.toFixed(2); //小数点后几位，数字就是几小数点后几位
        },
        // 获取测试地图数据
        // async getTextData() {
        //     return new Promise((resolve, reject) => {
        //         let qxList = [
        //             '襄都区',
        //             '信都区',
        //             '任泽区',
        //             '南和区',
        //             '临城县',
        //             '内丘县',
        //             '柏乡县',
        //             '隆尧县',
        //             '宁晋县',
        //             '巨鹿县',
        //             '新河县',
        //             '广宗县',
        //             '平乡县',
        //             '威县',
        //             '清河县',
        //             '临西县',
        //             '南宫市',
        //             '沙河市',
        //             '直辖市',
        //         ];
        //         qxList.forEach((item, index) => {
        //             if (item == '信都区') {
        //                 this.zxsIndex = index;
        //             }
        //             let data = {
        //                 id: index,
        //                 qx: item,
        //                 name: item,
        //                 value: index,
        //                 jcrs: Math.round(
        //                     Math.random() * (150000 - 50000) + 50000,
        //                 ),
        //                 jcdw: Math.round(Math.random() * (1000 - 100) + 100),
        //                 jcye: (
        //                     Math.random() * (100000 - 10000) +
        //                     10000
        //                 ).toFixed(2),
        //                 gjjdkye: (Math.random() * (10000 - 100) + 100).toFixed(
        //                     2,
        //                 ),
        //                 lgl: (Math.random() * (100 - 0) + 0).toFixed(2),
        //             };
        //             this.dataList.push(data);
        //         });
        //         resolve();
        //     });
        // },
    },
};
</script>
<style scoped lang="scss">
.kb {
    position: absolute;
    width: 27.083vw;
    height: 3.646vw;
    margin-top: 1.563vw;
}
.icon {
    height: 3.047vw;
    width: 3.865vw;
    margin-top: 0.313vw;
}
.bg {
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.dataDiv {
    font-size: 1.563vw;
    text-align: left;
    color: #ffc35a;
    font-family: PangMenZhengDao;
    -webkit-box-reflect: below -0.521vw -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.6))
        );
}
.nameDiv {
    font-size: 0.729vw;
    text-align: left;
    line-height: 2.083vw;
    color: #ffffff;
}
.dataDiv2 {
    font-size: 1.563vw;
    color: #ffffff;
    font-family: PangMenZhengDao;
    -webkit-box-reflect: below -0.521vw -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.6))
        );
}
/deep/ .fontPMZD span {
    font-family: PangMenZhengDao !important;
}
.nameDiv2 {
    // width: 2.083vw;
    font-size: 0.729vw;
    margin-right: 0.729vw;
    color: #ffffff;
    line-height: 2.083vw;
}
.icon2 {
    width: 0.833vw;
    height: 0.833vw;
    margin-top: 0.625vw;
}
</style>
