<template>
    <div class="df">
        <div class="df fdc w0 fg1" v-if="dataList && dataList.length">
            <div
                style="margin-top: 10.003px;margin-bottom: 6.01px;"
                class="df fdc h0 fg1"
                v-for="(item, index) in dataList"
                :key="item.lx"
            >
                <div style="margin-bottom: 14.995px;" class="df h0 fg1 por ">
                    <div class=" df fdc w0 fg1 contentDiv bg ">
                        <div style="margin-top: 10.003px;" class="h0 fg1 df">
                            <div class="bsicon"></div>
                            <div class="bs">放款笔数</div>
                            <div class="text">{{ item.fkbs + '笔' }}</div>
                            <div class="w0 fg1"></div>
                        </div>
                        <div class="lineDiv"></div>
                        <div class="h0 fg1 df">
                            <div class="jeicon"></div>
                            <div class="je">放款金额</div>
                            <div class="text">
                                {{
                                    item.fkje +
                                        (item.lx == '累计' ? '亿' : '万')
                                }}
                            </div>
                            <div class="w0 fg1"></div>
                        </div>
                        <div class="lineDiv"></div>
                        <div class="h0 fg1 df">
                            <div class="bsicon"></div>
                            <div class="bs">结清笔数</div>
                            <div class="text">{{ item.jqbs + '笔' }}</div>
                            <div class="w0 fg1"></div>
                        </div>
                        <div class="lineDiv"></div>
                        <div style="margin-bottom: 10.003px;" class="h0 fg1 df">
                            <div class="jeicon"></div>
                            <div class="je">回收本金</div>
                            <div class="text">
                                {{
                                    item.hsbj +
                                        (item.lx == '累计' ? '亿' : '万')
                                }}
                            </div>
                            <div class="w0 fg1"></div>
                        </div>
                    </div>
                    <div class="lxDiv">
                        <div>{{ nameList[index] }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nameList: ['累计', '本年', '本月'],
            dataList: [],
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
                    scriptId: 'sy_dkxxgk',
                })
                .then((res) => {
                    this.dataList = res.retBody.retList;
                    this.nameList = [];
                    this.dataList.forEach((item, index) => {
                        this.nameList.push(item.lx);
                    });
                });
        },
    },
};
</script>
<style scoped lang="scss">
.por {
    position: relative;
}
.lxDiv {
    width: 63.994px;
    height: 63.994px;
    position: absolute;
    left: 32.006px;
    top: 39.994px;
    opacity: 1;
    border-radius: 13.997px;
    box-shadow: inset 0px 0px 8.006px rgba(160, 225, 255, 0.7);
    color: #a0e1ff;
    font-size: 15.994px;
    line-height: 63.994px;
    text-align: center;
    z-index: 3;
}
.contentDiv {
    margin-left: 63.994px;
    margin-right: 21.005px;
    min-height: 153.907px !important;
}
.lineDiv {
    height: 1.498px;
    background: linear-gradient(
        to right,
        #4b85fb 0%,
        #00baff 50%,
        transparent 100%
    );
    margin: 0px 25.997px 0px 71.002px;
}
.bg {
    background-image: url('../../../../assets/images/dp/sy/dkxx_kuang.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bsicon {
    margin-left: 38.995px;
    height: 20.006px;
    width: 20.006px;
    background-image: url('../../../../assets/images/dp/sy/icon_fkbs.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.jeicon {
    margin-left: 38.995px;
    height: 20.006px;
    width: 20.006px;
    background-image: url('../../../../assets/images/dp/sy/icon_fkje.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bs {
    width: 80.006px;
    height: 20.006px;
    margin-left: 11.002px;
    font-size: 13.997px;
    font-weight: 400;
    color: #ffffff;
    line-height: 20.006px;
    text-align: center;
    background: linear-gradient(90deg, #66cdaa 0%, rgba(102, 205, 170, 0) 100%);
}
.je {
    width: 80.006px;
    height: 20.006px;
    margin-left: 11.002px;
    font-size: 13.997px;
    font-weight: 400;
    color: #ffffff;
    line-height: 20.006px;
    text-align: center;
    background: linear-gradient(90deg, #eed02a 0%, rgba(238, 208, 42, 0) 100%);
}
.text {
    width: 92.506px;
    color: #ffffff;
    height: 24px;
    font-size: 13.997px;
    font-weight: bold;
    line-height: 24px;
    text-align: right;
}
</style>
