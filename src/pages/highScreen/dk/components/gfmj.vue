<template>
    <div>
        <div class="img fg0 fs0"></div>
        <div class="fg1"></div>
        <div class="fg1 w0 df">
            <div v-if="dataList && dataList.length" class="w0 df fg1 fdc">
                <div
                    v-for="(item, index) in dataList"
                    :key="item.id"
                    class="df fg1 h0"
                    style="position: relative;">
                    <div class="fg1 w0 df">
                        <div
                            :style="{ backgroundImage: bgColor[index * 2] }"
                            class="line"
                        ></div>
                        <div class="fg1 df w0">
                            <div
                                class="fg1 df fdc w0"
                                style="position: relative;"
                            >
                                <div
                                    :style="{
                                        backgroundImage: bgColor[index * 2 + 1],
                                    }"
                                    class="line2"
                                ></div>
                                <div class="fg1 h0 df">
                                    <div style="width:20.006px;">
                                        <i
                                            :style="{ color: color[index] }"
                                            class="el-icon-caret-top"
                                            style="margin-top: 24.998px;"
                                        ></i>
                                    </div>
                                    <div
                                        :style="{ color: color[index] }"
                                        class="fg1 text"
                                    >
                                        {{ item.lx }}
                                    </div>
                                    <div
                                        :style="{ color: color[index] }"
                                        class="fg1 text w0"
                                        style="text-align: left;font-size: 18px;"
                                    >
                                        {{ item.ts }} <span style="color: #999999;font-size: 12px">套</span>
                                    </div>

                                </div>
                            </div>
                            <div class="pctDiv text">
                                {{ item.pct }}
                            </div>
                        </div>
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
            dataList: [],
            color: ['#12E7E8', '#4DA3FF ', '#ffffff'],
            bgColor: [
                'linear-gradient( 40deg, transparent, rgba(77,163,255,1) )',
                'linear-gradient( to right, rgba(77,163,255, 1), transparent )',
                'linear-gradient( 40deg, transparent, rgba(77,163,255,1) )',
                'linear-gradient( to right, rgba(77,163,255, 1), transparent )',
                'linear-gradient( 40deg, transparent, rgba(77,163,255,1) )',
                'linear-gradient( to right, rgba(77,163,255, 1), transparent )',
            ],
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {
    },
    beforeMount() {
    },
    created() {
        this.getData();
    },
    beforeDestroy() {
    },
    methods: {
        /**
         * 获取数据
         */
        getData() {
            this.$api
                .formPost('/api/dyncscript/scriptRule/query', {
                    scriptId: 'dk_gfmj',
                })
                .then((res) => {
                    this.dataList = res.retBody.retList;

                    let sum = this.dataList.reduce((prev, item) => {
                        prev += item.ts;
                        return prev;
                    }, 0);
                    let pctSum = 0;
                    this.dataList.forEach((item, index) => {
                        if (index !== this.dataList.length - 1) {
                            let pct = Math.round(
                                (item.ts * 1000) / sum,
                            ).toFixed(1);
                            pctSum += parseInt(pct);
                            item.pct = (parseInt(pct) / 10).toFixed(1) + '%';
                        } else {
                            item.pct = ((1000 - pctSum) / 10).toFixed(1) + '%';
                            pctSum = 1000;
                        }
                    });
                });
        },
        // 数据格式整理
        getresData() {
            let dataList = [
                {
                    lx:
                        "90平米(含)以下",
                    pct:
                        "6.9%",
                    ts:
                        3817
                }

            ]
        }
    },
};
</script>
<style lang="scss" scoped>

.line {
    width: 35px;
    height: 1.997px;
    margin-left: 20.006px;
    transform: rotate(40deg);
    margin-top: 42px;
}

.line2 {
    width: 192.499px;
    height: 1.997px;
    position: absolute;
    top: 53px;
    left: -4px;
}

.pctDiv {
    width: 70px;
    color: #FFFFFF
}

.text {
    text-align: center;
    line-height: 15.994px;
    margin-top: 28.006px;
    font-size: 14px;
}
</style>
