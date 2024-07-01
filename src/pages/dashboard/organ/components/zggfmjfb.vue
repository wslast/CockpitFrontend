<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<template>
    <div class="gjjzqfb pcth100 df fdc">
        <div class="title">
            <img
                class="icon"
                src="../../../../assets/images/portrait/person/icon_grhx_you1_2.svg"
                alt=""
            />
            <div class="content">
                职工购房面积分布
            </div>
        </div>
        <empty :image-size="50" v-if="flag" ></empty>
        <chart class="fg1" :chartData="chartData" v-if="!flag"></chart>
    </div>
</template>

<script>
export default {
    name: 'zggfmjfb',
    components: {},

    data() {
        return {
            flag:true,
            chartData: {},
        };
    },

    computed: {},

    mounted() {},

    methods: {
        getData(params) {
            const color = [
                'rgba(91, 143, 249, 0.85)',
                'rgba(90, 216, 166, 0.85)',
                'rgba(93, 112, 146, 0.85)',
            ];

            const data = [
                {name:'90平以下',value:params.jspmyx,itemStyle:{color:color[0]}},
                {name:'90~144平米',value:params.jszysspm,itemStyle:{color:color[1]}},
                {name:'145平米以上',value:params.yswpmys,itemStyle:{color:color[2]}}
            ];
            
            
            // params.map((item, index) => {
            //     item.name = item.zq;
            //     item.value = item.rs;
            //     item.itemStyle = {
            //         color: color[index],
            //     };
            //     return item;
            // });
            this.initChart(data);
        },
        initChart(data) {
            if(data){
                this.flag=false;
            }
            let option = {
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    right: '10%',
                    y: 'center',
                    icon: 'circle',
                    orient: 'vertical',
                    itemWidth: 9,
                    itemHeight: 9,
                    textStyle: {
                        color: 'rgba(140, 140, 140, 1)',
                    },
                    data: data.map((item) => item.name),
                },
                series: [
                    {
                        name: '职工购房面积分布',
                        type: 'pie',
                        radius: ['45%', '80%'],
                        center: ['40%', '50%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{c}',
                            color: '#595959',
                            fontSize: 12,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: data,
                    },
                ],
            };
            this.chartData = option;
        },
    },
};
</script>
<style lang="scss" scoped>
.title {
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-top: 40px;
    .icon {
        height: 8px;
    }
    .content {
        font-size: 12px;
        color: #1d1d1d;
        margin-left: 10px;
    }
}
</style>
