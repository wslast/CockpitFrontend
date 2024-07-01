<template>
    <div class="zjld-zzsy">
        <chart :chartData="chartData" ref="chart"></chart>
    </div>
</template>
<script>

export default {
    data() {
        return {
            chartData: {},
            dataList: [],
        };
    },
    async mounted() {
        // await this.getData();
        this.$nextTick(this.initChart);
    },
    methods: {
        initChart() {
            this.chartData =  {
                color:['#517fb1','#a7b970','#dca24f','#a64a3b'],
                series: [
                    {
                        name: "增值收益",
                        type: 'funnel',
                        left: '0',
                        top: '16px',
                        right: '190px',
                        bottom: '16px',
                        sort: 'ascending',
                        label: {
                            show: true,
                            position: 'outside',
                            formatter: (params) => {
                                return `{name|${params.name}} {percent|${params.percent}%}`;
                            },
                            rich: {
                                percent: {
                                    color: '#FFC35A', // 名称颜色
                                    fontSize: 16, // 名称字体大小
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
                        labelLine: {
                            show: true,
                            length: 80,
                            join : 'round',
                            lineStyle: {
                                width: 3,
                                type: 'solid',
                                cap : 'round'
                            }
                        },
                        itemStyle: {
                            borderWidth: 0
                        },
                        data: [
                            { value: 40.4, name: '贷款收益' },
                            { value: 18.7, name: '公积金存款收益' },
                            { value: 13.5, name: '增值收益存款收益' },
                            { value: 4.6, name: '其他收益' },
                        ],
                        gap: 5, // 漏斗项之间的间距
                        minSize: '0%', // 漏斗最小处的尺寸，为相对值
                        maxSize: '60%', // 漏斗最大处的尺寸，为相对值
                    },
                ]
            };
        }
    },
};
</script>
