<template>
    <div class="df h100percent">
        <div
            class="w0 fg1 bg df fdc leftFont"
            v-if="dataList && dataList.length"
        >
            <div class="fg1 h0 df">
                <div
                    style="width:44.006px;margin-left: 53.76px;margin-top: 22.003px;"
                >
                    {{ year[0].year1 }}
                    <br />
                    {{ year[0].year2 }}
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0 tl"
                    style="width:44.006px;margin-left: 36.48px;margin-top:19.2px;"
                >
                    {{ year[1].year1 }}
                    <br />
                    {{ year[1].year2 }}
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0"
                    style="margin-top: 17.28px;margin-left: 3.84px;"
                >
                    {{ year[2].year1 }}
                    <br />
                    {{ year[2].year2 }}
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0"
                    style="margin-top: 19.2px;margin-left: 63.36px;"
                >
                    {{ year[3].year1 }}
                    <br />
                    {{ year[3].year2 }}
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0"
                    style="margin-top: 19.2px;margin-left: 0px;"
                >
                    {{ year[4].year1 }}
                    <br />
                    {{ year[4].year2 }}
                </div>
            </div>
            <div class="fg1 h0" style="margin-top:21.12px;"></div>
        </div>
        <div class="rightDiv df fdc">
            <template v-if="dataList && dataList.length">
                <div
                    class="df fdc fg1 h0"
                    v-for="(item, index) in dataList"
                    :key="item.year"
                >
                    <div class="bgContent fg0 fs0 dataDiv df">
                        <div class="fg1 df numDiv fdc">
                            <div class="h0 fg1">
                                {{ '笔数：' + item.bs + '笔' }}
                            </div>
                            <div class="h0 fg1">
                                {{ '金额：' + item.je + '万' }}
                            </div>
                        </div>
                        <div class="percentDiv df fdc">
                            <div
                                class="h0 fg1"
                                :style="{ color: item.bsColor }"
                            >
                                {{ item.bsPct }}
                            </div>
                            <div
                                class="h0 fg1"
                                :style="{ color: item.jeColor }"
                            >
                                {{ item.jePct }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            year: [],
            dataList: [],
            yearList: [],
            color: ['#EF3628 ', '#28EF6E '],
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.$nextTick(() => {
            this.getData();
        });
    },
    beforeDestroy() {},
    methods: {
        getData() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dk_jwnfkzsfx',
                })
                .then((res) => {
                    this.dataList = res.retBody.retList;
                    console.log(this.dataList);
                    this.dataList.forEach((item, index) => {
                        console.log(item);
                        let nian = item.year.substring(0, 2);
                        let yue = item.year.substring(2, 4);
                        let yeardata = {
                            year1: nian,
                            year2: yue,
                        };
                        this.year.push(yeardata);
                        item.bsPct =
                            item.bsbfvb > 0
                                ? '+' + item.bsbfvb + '%'
                                : item.bsbfvb + '%';
                        item.jePct =
                            item.jebfvb > 0
                                ? '+' + item.jebfvb + '%'
                                : item.jebfvb + '%';
                        let bsColor = this.getColor(item.bsbfvb);
                        item.bsColor = bsColor;
                        let jeColor = this.getColor(item.jebfvb);
                        item.jeColor = jeColor;
                    });
                    console.log(this.year);
                });
        },
        getColor(num) {
            if (num == 0) {
                return 'orange';
            } else if (num > 0) {
                return '#EF3628 ';
            } else {
                return '#28EF6E';
            }
        },
    },
};
</script>
<style scoped lang="scss">
.bg {
    width: 153.6px;
    flex-shrink: 0 !important;
    flex-grow: 0 !important;
    margin: 0px auto;
    background-image: url('../../../../assets/images/dp/dk/5nian.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 100%;
}
.bgContent {
    background-image: url('../../../../assets/images/dp/dk/juxingkuang.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.rightDiv {
    width: 275.002px;
    margin-right: 24.998px;
    margin-top: 15.994px;
    .dataDiv {
        height: 68.006px;
        width: 275.002px;
        margin-bottom: 12px;
        .numDiv {
            margin: 10.003px 10.003px 10.003px 20.006px;
            color: #ffffff;
            text-align: left;
            line-height: 24px;
            text-indent: 12px;
            font-size: 15.994px;
        }
        .percentDiv {
            width: 80.006px;
            margin: 10.003px 20.006px 10.003px 0px;
            color: #ffffff;
            line-height: 24px;
            font-size: 15.994px;
            text-align: center;
        }
    }
}
.leftFont {
    color: #003e2a;
    // color: #ffffff;
    font-size: 13.997px;
    text-align: center;
}
</style>
