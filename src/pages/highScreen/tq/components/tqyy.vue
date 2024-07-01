<template>
    <div class="df bg fdc" style="color:#ffffff;font-size: 15.994px;">
        <div
            class="fg1 h0 df fdc"
            v-if="dataList && dataList.length"
            style="margin-top:12.806px;"
        >
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0 df"
                    style="margin-left: 145.92px;margin-right:20.006px;"
                >
                    <div
                        class="circle"
                        :style="{ backgroundColor: color[0] }"
                    ></div>
                    <div class="w0 fg1 df fdc">
                        <div
                            class="line"
                            :style="{ borderColor: color2[0] }"
                        ></div>
                        <div class="h0 fg1"></div>
                    </div>
                </div>
                <div style="width:176.006px;" class="df">
                    <div style="width:80.006px" :style="{ color: color[0] }">
                        {{ dataList[0].yylx }}
                    </div>
                    <div class="w0 fg1">{{ dataList[0].je.toFixed(2) }}</div>
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0 df"
                    style="margin-left: 166.406px;margin-right: 20.006px;"
                >
                    <div
                        class="circle"
                        :style="{ backgroundColor: color[1] }"
                    ></div>
                    <div class="w0 fg1 df fdc">
                        <div
                            class="line"
                            :style="{ borderColor: color2[1] }"
                        ></div>
                        <div class="h0 fg1"></div>
                    </div>
                </div>
                <div style="width:176.006px;" class="df">
                    <div style="width:80.006px" :style="{ color: color[1] }">
                        {{ dataList[1].yylx }}
                    </div>
                    <div class="w0 fg1">{{ dataList[1].je.toFixed(2) }}</div>
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0 df"
                    style="margin-left:186.874px;margin-right: 20.006px;"
                >
                    <div
                        class="circle"
                        :style="{ backgroundColor: color[2] }"
                    ></div>
                    <div class="w0 fg1 df fdc">
                        <div
                            class="line"
                            :style="{ borderColor: color2[2] }"
                        ></div>
                        <div class="h0 fg1"></div>
                    </div>
                </div>
                <div style="width:176.006px;" class="df">
                    <div style="width:80.006px" :style="{ color: color[2] }">
                        {{ dataList[2].yylx }}
                    </div>
                    <div class="w0 fg1">{{ dataList[2].je.toFixed(2) }}</div>
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0 df"
                    style="margin-left: 204.806px;margin-right: 20.006px;"
                >
                    <div
                        class="circle"
                        :style="{ backgroundColor: color[3] }"
                    ></div>
                    <div class="w0 fg1 df fdc">
                        <div
                            class="line"
                            :style="{ borderColor: color2[3] }"
                        ></div>
                        <div class="h0 fg1"></div>
                    </div>
                </div>
                <div style="width:176.006px;" class="df">
                    <div style="width:80.006px" :style="{ color: color[3] }">
                        {{ dataList[3].yylx }}
                    </div>
                    <div class="w0 fg1">{{ dataList[3].je.toFixed(2) }}</div>
                </div>
            </div>
            <div class="fg1 h0 df">
                <div
                    class="fg1 w0 df"
                    style="margin-left: 225.274px;margin-right: 20.006px;"
                >
                    <div
                        class="circle"
                        :style="{ backgroundColor: color[4] }"
                    ></div>
                    <div class="w0 fg1 df fdc">
                        <div
                            class="line"
                            :style="{ borderColor: color2[4] }"
                        ></div>
                        <div class="h0 fg1"></div>
                    </div>
                </div>
                <div style="width:176.006px;" class="df">
                    <div style="width:80.006px" :style="{ color: color[4] }">
                        {{ dataList[4].yylx }}
                    </div>
                    <div class="w0 fg1">{{ dataList[4].je.toFixed(2) }}</div>
                </div>
            </div>
        </div>

        <div class="fg0 fs0" style="height:39.994px;"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            color: ['#C0392B ', '#F39C12 ', '#9BBB59 ', '#41B176', '#2980B9'],
            color2: [
                'rgba(192,57,43,0.500)',
                'rgba(243,156,18,0.500)',
                'rgba(155,187,89,0.500)',
                'rgba(65,177,118,0.500)',
                'rgba(41,128,185,0.500)',
            ],
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
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'tq_tqyyfx',
                    })
                    .then((res) => {
                        let list = res.retBody.retList;
                        this.dataList = list.sort((a, b) => {
                            return a.je - b.je;
                        });
                        resolve();
                    });
            });
        },
    },
};
</script>
<style scoped lang="scss">
.bg {
    margin-top: 25.594px;
    background-image: url(../../../../assets/images/dp/tq/jinzita.svg);
    background-repeat: no-repeat;
    background-size: contain;
}
.w0 {
    width: 0px;
}
.h0 {
    height: 0px;
}
.fg0 {
    flex-grow: 0;
}
.fs0 {
    flex-shrink: 0;
}
.circle {
    width: 10.003px;
    height: 10.003px;
    border-radius: 4.992px;
    position: relative;
    top: 3.994px;
}
.line {
    border-bottom: 0.998px solid;
    height: 11.002px;
}
</style>
