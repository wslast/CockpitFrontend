<template>
    <div style="height:100%;" class="df" >
        <chart ref="chart" class="fg1 chart" :chartData="chartData"></chart>
    </div>
</template>
<script>
const echarts = require('echarts');
export default {
    data() {
        return { chartData: {}, dataList: [], nodeList: [], lineList: [] };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        await this.getData();
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {},
    methods: {
        initChart() {
            let linkList = [];
            let xbList = [
                { name: '男', rs: 0, type: 'line', value: 17 },
                { name: '女', rs: 0, type: 'line', value: 17 },
            ];
            let nxList = [
                { name: '2年以下', rs: 0, type: 'line', value: 10 },
                { name: '2-5年', rs: 0, type: 'line', value: 10 },
                { name: '5-10年', rs: 0, type: 'line', value: 10 },
                { name: '10-20年', rs: 0, type: 'line', value: 10 },
                { name: '20-30年', rs: 0, type: 'line', value: 10 },
                { name: '30年以上', rs: 0, type: 'line', value: 10 },
            ];
            let srdjList = [
                { name: '高收入', rs: 0, type: 'line', value: 20 },
                { name: "中收入", rs: 0, type: "line", value: 20 },
                { name: '低收入', rs: 0, type: 'line', value: 20 },
            ];
            xbList.forEach((item, index) => {
                nxList.forEach((item2, index2) => {
                    let arr = this.dataList.filter((item3, index3) => {
                        return item3.xb == item.name && item3.nx == item2.name;
                    });
                    let sum = arr.reduce((prev, cur) => {
                        return prev + cur.rs;
                    }, 0);
                    linkList.push({
                        source: item.name,
                        target: item2.name,
                        value: item.value,
                        rs: sum,
                    });
                });
            });
            nxList.forEach((item, index) => {
                srdjList.forEach((item2, index2) => {
                    let arr = this.dataList.filter((item3, index3) => {
                        return (
                            item3.srdj == item2.name && item3.nx == item.name
                        );
                    });
                    let sum = arr.reduce((prev, cur) => {
                        return prev + cur.rs;
                    }, 0);
                    linkList.push({
                        source: item.name,
                        target: item2.name,
                        value: item2.value,
                        rs: sum,
                    });
                });
            });
            let color = {
                男: '#43f0ff',
                女: '#F18A8A',
                '2年以下': '#41B176',
                '2-5年': '#9BBB59',
                '5-10年': '#2980B9',
                '10-20年': '#FFE227 ',
                '20-30年': '#F39C12 ',
                '30年以上': '#C0392B',
                高收入: '#E334B4 ',
                中收入: '#8234E3 ',
                低收入: '#3476E3',
            };
            let dataList1 = [];
            //遍历color
            for (let key in color) {
                let depth = 0;
                let name1 = key;
                if (name1.includes('收入')) {
                    depth = 2;
                } else if (name1.includes('年')) {
                    depth = 1;
                } else {
                    depth = 0;
                }
                dataList1.push(
                    {
                        name: key,
                        itemStyle: { normal: { color: color[key] , } },
                        depth: depth,
                        label: {
                            position: 'inside',
                            color: '#ffffff',
                            // borderRadius:[15,15,0,0]
                        },
                    }, //构造节点对象，包括name和itemStyle
                );
            }
            this.nodeList.forEach((item, index) => {
                item.depth = dataList1[index].depth;
                item.itemStyle = dataList1[index].itemStyle;
                item.label = dataList1[index].label;
            });
            for (let i = 0; i < linkList.length; i++) {
                let linkMarkerColor =
                    'linear-gradient(' +
                    color[linkList[i].source] +
                    ',' +
                    color[linkList[i].target] +
                    ')';
                linkList[i].label = {
                    textStyle: {
                        fontSize: this.getFontSize(16),
                        fontWeight: 400,
                        color: '#666666',
                    },
                };
                linkList[i].linkMarkerColor = linkMarkerColor;
                linkList[i].lineStyle = {
                    color: 'gradient',
                };
            }
            let option = {
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow',
                    },
                    formatter: (params) => {
                        if (params.data.type == 'node') {
                            return (
                                params.marker +
                                params.name +
                                ' : ' +
                                params.data.rs +
                                '人'
                            );
                        } else {
                            let marker =
                                "<span style='display:inline-block;margin-right:3.994px;border-radius:10.003px;width:10.003px;height:10.003px;background-image:" +
                                params.data.linkMarkerColor +
                                ";'></span>";
                            return (
                                marker +
                                params.name +
                                ' : ' +
                                params.data.rs +
                                '人'
                            );
                        }
                    },
                },
                //4.0版本
                series: [
                    {
                        type: 'sankey',
                        top: '5%',
                        left: '5%',
                        right: '5%',
                        nodeGap: this.getFontSize(10),
                        nodeWidth: this.getFontSize(65),
                        data: this.nodeList,
                        links: linkList,
                        focusNodeAdjacency: 'allEdges',
                        itemStyle: {
                            borderWidth: 0,
                            borderColor: '#fff',
                            //opacolor: 1,

                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.5,
                          opacity: 0.4     // 线条的透明度
                        },
                         label: {
                            normal: {
                                fontSize: this.getFontSize(15),
                              fontWeight: 800,
                                color: '#212b43',
                            },
                        },
                    },
                ],
            };
            console.log(option);
            this.chartData = option;
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_jcrqfx',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList;
                        let xbList = [
                            { name: '男',  rs: 0, type: 'node', value: 30 },
                            { name: '女', rs: 0, type: 'node', value: 30 },
                        ];
                        let nxList = [
                            { name: '2年以下', rs: 0, type: 'node', value: 20 },
                            { name: '2-5年', rs: 0, type: 'node', value: 20 },
                            { name: '5-10年', rs: 0, type: 'node', value: 20 },
                            { name: '10-20年', rs: 0, type: 'node', value: 20 },
                            { name: '20-30年', rs: 0, type: 'node', value: 20 },
                            {
                                name: '30年以上',
                                rs: 0,
                                type: 'node',
                                value: 20,
                            },
                        ];
                        let srdjList = [
                            { name: '高收入', rs: 0, type: 'node', value: 40 },
                            {
                                name: '中收入',
                                rs: 0,
                                type: 'node',
                                value: 40,
                            },
                            { name: '低收入', rs: 0, type: 'node', value: 40 },
                        ];
                        this.dataList.forEach((item, index) => {
                            xbList.forEach((item2, index) => {
                                if (item2.name == item.xb) {
                                    item2.rs += item.rs;
                                }
                            });
                            nxList.forEach((item3, index) => {
                                if (item3.name == item.nx) {
                                    item3.rs += item.rs;
                                }
                            });
                            srdjList.forEach((item4, index) => {
                                if (item4.name == item.srdj) {
                                    item4.rs += item.rs;
                                }
                            });
                        });
                        this.nodeList = [...xbList, ...nxList, ...srdjList];
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss"></style>
