<template>
    <div class="df fdc">
        <div class="topInfo df">
            <kb
                class="fg1 w0"
                :kbDataList="kbDataList"
                v-if="kbDataList && Object.keys(kbDataList).length > 0"
            ></kb>
        </div>
        <div class="centerTable df">
            <div class="cardTable bgkuang1 df fdc">
                <div class="title">贷款信息概况</div>
                <dkxxgk class="fg1 h0"></dkxxgk>
            </div>
            <div class="fg1 w0 df">
                <centerMap
                    class="w0 fg1"
                    :kbDataList="kbDataList"
                    v-if="kbDataList && Object.keys(kbDataList).length > 0"
                ></centerMap>
            </div>
            <div class="cardTable bgkuang1 df fdc ">
                <div class="title">财务概况</div>
                <cwgk class="fg1 h0"></cwgk>
            </div>
        </div>
        <div class="h0 fg1 bottomTable df">
            <div class="cardTable2 bgkuang2 df fdc">
                <div class="title">近10年缴存趋势</div>
                <jsnjcqs class="h0 fg1"></jsnjcqs>
            </div>
            <div class="w0 fg1 df">
                <dbkb class="w0 fg1"></dbkb>
            </div>
            <div class="cardTable2 bgkuang2 df fdc">
                <div class="title">近8年提取缴存比</div>
                <jsnjctqb class="h0 fg1"></jsnjctqb>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sy',
    components: {
        kb: () => import('./components/kb.vue'),
        dkxxgk: () => import('./components/dkxxgk.vue'),
        centerMap: () => import('./components/centerMap.vue'),
        cwgk: () => import('./components/cwgk.vue'),
        jsnjcqs: () => import('./components/jsnjcqs.vue'),
        dbkb: () => import('./components/dbkb.vue'),
        jsnjctqb: () => import('./components/jsnjctqb.vue'),
    },
    data() {
        return {
            kbDataList: {},
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    async mounted() {
        this.getData();
    },
    beforeDestroy() {},
    methods: {
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'sy_kb',
                    })
                    .then((res) => {
                        this.kbDataList = res.retBody.retList[0];
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
.topInfo {
    height: 70.003px;
    margin-top: 34.003px;
}
.centerTable {
    height: 562.003px;
    margin: 32.006px 0px 0px 0px;
    .cardTable {
        width: 356.602px;
        margin: 0px 24px;
        height: 562.003px;
    }
}
.bottomTable {
    margin: 20.006px 23.002px 42.01px 23.002px;
    height: 226.003px;
    .cardTable2 {
        width: 476.602px;
    }
}
.bgkuang1 {
    background-image: url('../../../assets/images/dp/sy/shouye_kuang1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgkuang2 {
    background-image: url('../../../assets/images/dp/sy/shouye_kuang2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.title {
    height: 39.994px;
    text-indent: 48px;
    line-height: 39.994px;
    background-image: linear-gradient(to right, #00c0ff, #43f0ff, 50%, #00c0ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 22.003px;
    font-weight: 900;
}
</style>
