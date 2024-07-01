<template>
    <div class="df fdc" style="margin: 0 99.994px;">
        <div class="dbkbDiv df">
            <div class="w0 fg1 showDiv df">
                <div style="margin-left: 42.01px;" class="w0 fg1 df fdc">
                    <div class="dataDiv fontPMZD">
                        {{ dataList.bnfdcjj }}
                    </div>
                    <div class="h0 fg1 textDiv">
                        本年房地产均(元/㎡)
                    </div>
                </div>
                <div class="lineDiv"></div>
                <div class="w0 fg1  df fdc">
                    <div class="dataDiv">
                        {{ dataList.bnlpqys }}
                    </div>
                    <div class="h0 fg1 textDiv">
                        本年楼盘签约数
                    </div>
                </div>
                <div class="lineDiv"></div>
                <div style="margin-right: 42.01px;" class="w0 fg1  df fdc">
                    <div class="dataDiv">
                        {{ dataList.bnzltqje }}
                    </div>
                    <div class="h0 fg1 textDiv">
                        本年租赁提取金额(万元)
                    </div>
                </div>
            </div>
        </div>
        <div class="h0 fg1"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataList: {},
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.getData();
    },
    beforeDestroy() {},
    methods: {
        getData() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'sy_dbkb',
                })
                .then((res) => {
                    this.dataList = res.retBody.retList[0];
                });
        },
    },
};
</script>
<style scoped lang="scss">
.dbkbDiv {
    height: 123.994px;
    margin-top: 78.01px;
    background-image: linear-gradient(0deg, #01e8ee, #4180e6, #01e8ee);
    padding: 1.997px 10.003px;
    border-radius: 61.997px;
    .showDiv {
        background: #051045;
        border-radius: 60px;
    }
    .lineDiv {
        width: 1.997px;
        height: 60px;
        margin-top: 30.01px;
        background-image: linear-gradient(
            0deg,
            transparent,
            #4180e6,
            transparent
        );
    }
    .dataDiv {
        margin-top: 27.994px;
        margin-bottom: 13.997px;
        height: 36px;
        line-height: 36px;
        font-size: 36px;
        color: #ffc35a;
        text-align: center;
    }
    .textDiv {
        text-align: center;
        color: #feffff;
        font-size: 13.997px;
    }
}
</style>
