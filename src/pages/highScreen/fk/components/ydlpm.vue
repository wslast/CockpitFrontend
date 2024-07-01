<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 疑点率排名
-->
<template>
    <div class="ydlpm" v-if="list.length > 0">
        <div class="fg1 w14 pm df fdc">
            <div class="title">
                全国排名
            </div>
            <div class="value">{{ list[0].qgpm }}</div>
            <img
                class="bg"
                src="../../../../assets/images/dp/fk/map_china.png"
                alt=""
            />
        </div>
        <div class="fg1 w14 pm df fdc">
            <div class="title">
                全省排名
            </div>
            <div class="value">{{ list[0].qspm }}</div>
            <img
                class="bg2"
                src="../../../../assets/images/dp/fk/map_xingtai.png"
                alt=""
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ydlpm',
    components: {},

    data() {
        return {
            list: [],
        };
    },

    computed: {},

    created() {
        this, this.getData();
    },

    methods: {
        getData() {
            this.$api
                .formPost("/api/dyncscript/scriptRule/query", { scriptId: "fk_sp_ydlpm" })
                .then(res => {
                this.list = res.retBody.retList;
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.ydlpm {
    display: flex;
    flex-grow: 1;
    padding: 0vw 15.994px;
    justify-content: space-between;
    .pm {
        height: 100%;
        background: url('../../../../assets/images/dp/fk/paiming_kuang.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .title {
            margin: 39.994px 20.006px 10.003px;
            font-size: 15.994px;
            color: #a0e1ff;
        }
        .value {
            width: 72.998px;
            height: 39.994px;
            background: rgba(9, 12, 74, 0.3);
            border-radius: 13.997px;
            font-size: 24px;
            font-weight: 400;
            color: #ffc35a;
            line-height: 39.994px;
            text-align: center;
            margin-left: 20.006px;
            box-shadow: 0vw 0vw 0.521vw rgba(0, 255, 255, 1) inset;
        }
    }
}
.bg {
    height: 120px;
    width: 144px;
    margin-left: 54.01px;
    margin-top: -10.003px;
}
.bg2 {
    height: 134.995px;
    width: 103.008px;
    margin-left: 109.997px;
    margin-top: -24.998px;
}
</style>
