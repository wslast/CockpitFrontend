<template>
    <div
        class="fg1 df"
        style="color:#ffffff;
  margin-top: 34.003px;
"
    >
        <div class="leftTable df fdc">
            <div class="contentTable1 bgkuang1 df fdc">
                <div class="title">到期未及时兑付回收</div>
                <dqwjsdfhs class="h0 fg1"></dqwjsdfhs>
            </div>
            <div class="contentTable1 bgkuang1 df fdc">
                <div class="title">应收款按月走势图</div>
                <yskayzst class="h0 fg1"></yskayzst>
            </div>
            <div class="contentTable2 bgkuang2  df fdc">
                <div class="title">近12个月个贷率</div>
                <zcfzbl class="h0 fg1"></zcfzbl>
            </div>
        </div>
        <div class="rightTable w0 fg1 fdc df">
            <div class="topTable df fdc">
                <div
                    class="barTable df"
                    v-if="dataList && Object.keys(dataList).length > 0"
                >
                    <div class="w0 fg1 df">
                        <div class="w0 fg1 df">
                            <div class="iconyhck iconSize"></div>
                            <div class="w0 fg1 df fdc">
                                <div class="h0 fg1 textDiv fontPMZD">
                                    <!-- {{ dataList.yhck }} -->
                                    <animate-number
                                        duration="2000"
                                        from="0"
                                        :formatter="format"
                                        :to="dataList.yhck"
                                    ></animate-number>
                                </div>
                                <div class="h0 fg1 unitDiv">
                                    银行存款(万元)
                                </div>
                            </div>
                        </div>
                        <div class="w0 fg1 df">
                            <div class="icongjjck iconSize"></div>
                            <div class="w0 fg1 df fdc">
                                <div class="h0 fg1 textDiv fontPMZD">
                                    <!-- {{ dataList.gjjck }} -->
                                    <animate-number
                                        duration="2000"
                                        from="0"
                                        :formatter="format"
                                        :to="dataList.gjjck"
                                    ></animate-number>
                                </div>
                                <div class="h0 fg1 unitDiv">
                                    公积金存款(万元)
                                </div>
                            </div>
                        </div>
                        <div class="w0 fg1 df">
                            <div class="iconzssy iconSize"></div>
                            <div class="w0 fg1 df fdc">
                                <div class="h0 fg1 textDiv fontPMZD">
                                    <!-- {{ dataList.zzsy }} -->
                                    <animate-number
                                        duration="2000"
                                        from="0"
                                        :formatter="format"
                                        :to="dataList.zzsy"
                                    ></animate-number>
                                </div>
                                <div class="h0 fg1 unitDiv">
                                    增值收益(万元)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cklogo df">
                        <div
                            class="bgc df dqckDiv"
                            :style="{
                                width: width[0],
                                maxWidth: '300px',
                                minWidth: '186.01px',
                            }"
                        >
                            <div class="ckDiv">
                                定期存款
                            </div>
                            <div class="df fdc w0 fg1 numDiv" id="numDiv1">
                                <div>{{ dataList.dqck }}</div>
                                <div style="font-size: 15.994px;">亿元</div>
                            </div>
                            <div
                                class="df fdc w0 fg1 percentDiv"
                                id="percentDiv1"
                            >
                                <div>{{ percent[0] }}</div>
                                <div style="font-size: 15.994px;">%</div>
                            </div>
                        </div>
                        <div
                            class="bgc2 df hqckDiv"
                            :style="{
                                width: width[1],
                                maxWidth: '300px',
                                minWidth: '186.01px',
                            }"
                        >
                            <div class="ckDiv">
                                活期存款
                            </div>
                            <div class="df fdc w0 fg1 numDiv" id="numDiv2">
                                <div>{{ dataList.hqck }}</div>
                                <div style="font-size: 15.994px;">亿元</div>
                            </div>
                            <div
                                class="df fdc w0 fg1 percentDiv"
                                id="percentDiv2"
                            >
                                <div>{{ percent[1] }}</div>
                                <div style="font-size: 15.994px;">%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fg1 h0 centerTable bgkuang4  df fdc">
                    <div class="title">近12月缴存余额分布</div>
                    <jcyefb class="h0 fg1"></jcyefb>
                </div>
            </div>
            <div class="bottomTable h0 fg1 bgkuang3  df fdc">
                <div class="title">各委托银行存款余额</div>
                <gwtyhckye class="h0 fg1"></gwtyhckye>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        dqwjsdfhs: () => import('./components/dqwjsdfhs.vue'),
        gwtyhckye: () => import('./components/gwtyhckye.vue'),
        zcfzbl: () => import('./components/zcfzbl.vue'),
        jcyefb: () => import('./components/jcyefb.vue'),
        yskayzst: () => import('./components/yskayzst.vue'),
    },
    data() {
        return {
            dataList: [],
            width: [],
            percent: [],
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
        format(val) {
            return val.toFixed(2);
        },
        getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'zjld_kb',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList[0];
                        let sum = this.dataList.hqck + this.dataList.dqck;
                        let percent1 =
                            parseInt(
                                ((this.dataList.dqck * 100) / sum).toFixed(2) *
                                    100,
                            ) / 100;
                        this.width = [
                            ((24.792 * percent1) / 100).toFixed(3) + 'vw',
                            (
                                24.792 - ((24.792 * percent1) / 100).toFixed(3)
                            ).toFixed(3) + 'vw',
                        ];
                        this.percent = [
                            percent1.toString(),
                            (100 - percent1.toFixed(2)).toFixed(2),
                        ];
                        resolve();
                    });
            });
        },
        /**
         * @description: number组件保留几位小数
         * @return {*}
         * @param {*} num
         */
        formatter(num) {
            return num.toFixed(2); //小数点后几位，数字就是几小数点后几位
        },
    },
};
</script>
<style scoped lang="scss">
.ova {
    overflow-y: auto;
}
.leftTable {
    width: 477.6px;
    margin-left: 24px;
    margin-bottom: 19.2px;
    .contentTable1 {
        height: 226.003px;
        margin-bottom: 10.003px;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .contentTable2 {
        height: 470.995px;
        flex-grow: 0;
        flex-shrink: 0;
    }
}
.rightTable {
    margin: 0px 24px 32.006px 24px;
    .barTable {
        height: 66.106px;
        margin-bottom: 32.006px;
        .cklogo {
            width: 476.006px;
        }
    }
    .centerTable {
        height: 527.904px;
        flex-grow: 0;
        margin-bottom: 10.003px;
        flex-shrink: 0;
    }
    .bottomTable {
        height: 289.997px;
        flex-grow: 0;
        flex-shrink: 0;
    }
}
.ckDiv {
    margin-left: 25.997px;
    width: 42.01px;
    font-size: 18.01px;
    line-height: 15.994px;
    margin-top: 12.998px;
    text-align: center;
}
.iconSize {
    width: 74.208px;
    height: 58.502px;
}
/deep/ .textDiv {
    line-height: 33.005px;
    font-size: 30.01px;
    text-align: left;
    margin-left: 20.006px;
    color: #ffc35a;
    -webkit-box-reflect: below -10.003px -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.6))
        );
}
/deep/ .fontPMZD span {
    font-family: PangMenZhengDao !important;
}
.unitDiv {
    line-height: 33.005px;
    font-size: 13.997px;
    text-align: left;
    margin-left: 20.006px;
    color: #ffffff;
}
.bgc {
    background-image: linear-gradient(
        to right,
        #00d4e8,
        rgba(0, 212, 232, 0.2)
    );
}
.bgc2 {
    background-image: linear-gradient(
        to right,
        #0e6de9,
        rgba(14, 109, 233, 0.2)
    );
}
.bgkuang1 {
    background-image: url('../../../assets/images/dp/zjld/zjld_kuang1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgkuang2 {
    background-image: url('../../../assets/images/dp/zjld/zjld_kuang2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgkuang3 {
    background-image: url('../../../assets/images/dp/zjld/zjld_kuang3.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgkuang4 {
    background-image: url('../../../assets/images/dp/zjld/zjld_kuang4.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.icongjjck {
    background-image: url('../../../assets/images/dp/zjld/icon_gjjck.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.iconyhck {
    background-image: url('../../../assets/images/dp/zjld/icon_yhck.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.iconzssy {
    background-image: url('../../../assets/images/dp/zjld/icon_zzsy.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.numDiv {
    margin: 8.006px 19.008px 8.006px 0px;
    text-align: right;
    font-size: 27.994px;
}
.percentDiv {
    margin: 8.006px 19.008px 8.006px 0px;
    text-align: right;
    font-size: 27.994px;
}
#percentDiv1 {
    display: none;
}
#percentDiv2 {
    display: none;
}
.dqckDiv {
    &:hover {
        #numDiv1 {
            display: none;
        }
        #percentDiv1 {
            display: flex;
        }
    }
}
.hqckDiv {
    &:hover {
        #numDiv2 {
            display: none;
        }
        #percentDiv2 {
            display: flex;
        }
    }
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
