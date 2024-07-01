<template>
    <div class="df fdc simpleTable">
        <div class="fg1 df topTable">
            <div class="leftTable df fdc">
                <div
                    class="childDiv normalDivImage df fdc"
                    style="margin-bottom: 30.01px;"
                >
                    <div class="tableTitle">购房提取分析</div>
                    <gftq class="fg1 h0"></gftq>
                </div>
                <div class="childDiv normalDivImage df fdc">
                    <div class="tableTitle">住房贡献率分析</div>
                    <zfgxl class="fg1 h0"></zfgxl>
                </div>
            </div>
            <div class="fg1 df fdc centerTable">
                <div class="logoTable df fdc">
                    <kb class="h0 fg1"></kb>
                </div>
                <div class="fg1 centerTable2 df">
                    <tqzs class="w0 fg1"></tqzs>
                </div>
            </div>
            <div class="rightTable">
                <div
                    class="childDiv normalDivImage df fdc"
                    style="margin-bottom: 30.01px;"
                >
                    <div class="tableTitle">提取原因分析(万元)</div>
                    <tqyy class="fg1 h0"></tqyy>
                </div>
                <div class="childDiv normalDivImage df fdc">
                    <div class="tableTitle">租房提取年龄分析</div>
                    <zftqnl class="fg1 h0"></zftqnl>
                </div>
            </div>
        </div>
        <div class="df bottomTable">
            <div class="leftbottomTable fg1  bottomTableImage df fdc">
                <div class="tableTitle">本年度提取金额占比</div>
                <bndtqje class="fg1 h0"></bndtqje>
            </div>
            <div class="rightbottomTable fg1 bottomTableImage df fdc">
                <div class="tableTitle">临近退休年限人群</div>
                <txnxrq class="fg1 h0"></txnxrq>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        kb: () => import('./components/kb.vue'),
        gftq: () => import('./components/gftq.vue'),
        zfgxl: () => import('./components/zfgxl.vue'),
        bndtqje: () => import('./components/bndtqje.vue'),
        txnxrq: () => import('./components/txnxrq.vue'),
        tqzs: () => import('./components/tqzs.vue'),
        tqyy: () => import('./components/tqyy.vue'),
        zftqnl: () => import('./components/zftqnl.vue'),
    },
    data() {
        return {
            imgUrlList: [
                require('../../../assets/images/dp/tq/icon_tqbs.svg'),
                require('../../../assets/images/dp/tq/icon_tqje.svg'),
                // require('../../../assets/images/dp/jc/icon_up.svg'),
                // require('../../../assets/images/dp/jc/icon_down.svg'),
            ],
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeDestroy() {},
    methods: {},
};
</script>
<style scoped lang="scss">
.simpleTable {
    color: #ffffff;
}
.topTable {
    height: 610.003px;
    margin-top: 44.006px;
}
.leftTable {
    margin-left: 24px;
}
.childDiv {
    width: 476.006px;
    height: 289.997px;
}
.centerTable {
    width: 0px;
    margin: 0px 24px;
    .logoTable {
        height: 80.006px;
        margin-bottom: 12px;
    }
    .centerTable2 {
        height: 0px;
        margin-top: 0px;
    }
}
.rightTable {
    margin-right: 24px;
}
.bottomTable {
    height: 354.01px;
    .leftbottomTable {
        width: 0px;
        height: 289.997px;
        margin: 32.006px 10.003px 32.006px 24px;
    }
    .rightbottomTable {
        height: 289.997px;
        width: 0px;
        margin: 32.006px 24px 32.006px 10.003px;
    }
    .bottomTableImage {
        background-image: url('../../../assets/images/dp/tq/kuang_long.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
.tableTitle {
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
.normalDivImage {
    background-image: url('../../../assets/images/dp/tq/kuang_short.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
bg2 {
    background-repeat: no-repeat;
    background-size: 50% 100%;
}
.arrowImg {
    height: 20.006px;
    width: 20.006px;
    border: none;
    margin-left: 10.003px;
}
.logoTextStyle1 {
    height: 24px;
    text-align: left;
    font-size: 1.25vw;
    line-height: 24px;
}
.logoTextStyle2 {
    height: 0px;
    text-align: center;
    color: #ffffff;
    font-size: 15.994px;
    line-height: 15.994px;
}
</style>
