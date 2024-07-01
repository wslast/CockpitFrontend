<template>
    <div class="df simpleTable">
        <div class="leftTable df fdc">
            <div class="contentTable bgFrame df fdc">
                <div class="tableTitle">回款走势分析</div>
                <hkzsfx class="h0 fg1"></hkzsfx>
            </div>
            <div class="contentTable bgFrame df fdc">
                <div class="tableTitle">贷款类型分析</div>
                <dklxfx class="h0 fg1"></dklxfx>
            </div>
            <div class="contentTable bgFrame df fdc">
                <div class="tableTitle">购房面积</div>
                <gfmj class="h0 fg1"></gfmj>
            </div>
            <div class="contentTable bgFrame df fdc">
                <div class="tableTitle">贷款人分析</div>
                <dkrfx class="h0 fg1"></dkrfx>
            </div>
        </div>
        <div class="centerTable  w0 fg1 df fdc">
            <div class="board df">
                <div class="selectBock df fdc">
                    <div
                        class="h0 fg1 selectButton"
                        :class="[
                            isYearSelect == false ? 'bgselect' : 'bgdefault',
                        ]"
                        style="margin-bottom:8.006px;"
                        @click.stop="changeBoardData(0)"
                    >
                        累计&存量
                    </div>
                    <div
                        class="h0 fg1  selectButton"
                        :class="[
                            isYearSelect == true ? 'bgselect' : 'bgdefault',
                        ]"
                        @click.stop="changeBoardData(1)"
                    >
                        当年&当月
                    </div>
                </div>
                <div
                    class="h0 fg1 df"
                    style="margin-left: 20.006px;margin-top: 8.006px;"
                    v-if="showData.length > 0"
                >
                    <div style="width:108px;height:60px;" class="bgdkbs df fdc">
                        <div class="h0 fg1"></div>
                        <div class="logoText">贷款笔数</div>
                    </div>
                    <div class="w0 fg1 df fdc">
                        <!-- <div class="dataText">{{ showData[0] }}</div> -->
                        <div class="dataText fontPMZD">
                            <animate-number
                                duration="2000"
                                from="0"
                                :to="showData[0]"
                            ></animate-number>
                        </div>
                        <div class="unitText fontPMZD">{{ unitList[0] }}</div>
                    </div>
                    <div class="w0 fg1 df fdc">
                        <!-- <div class="dataText">{{ showData[1] }}</div> -->
                        <div class="dataText fontPMZD">
                            <animate-number
                                duration="2000"
                                from="0"
                                :to="showData[1]"
                            ></animate-number>
                        </div>
                        <div class="unitText fontPMZD">{{ unitList[1] }}</div>
                    </div>
                </div>
                <div
                    class="h0 fg1 df"
                    style="margin-left: 24px;margin-top: 8.006px;"
                    v-if="showData.length > 0"
                >
                    <div style="width:108px;height:60px;" class="bgdkje df fdc">
                        <div class="h0 fg1"></div>
                        <div class="logoText">贷款金额</div>
                    </div>
                    <div class="w0 fg1 df fdc">
                        <!-- <div class="dataText">
                            {{
                                showData[2]
                                    ? showData[2].toFixed(2)
                                    : showData[2]
                            }}
                        </div> -->
                        <div class="dataText fontPMZD">
                            <animate-number
                                duration="2000"
                                from="0"
                                :formatter="formatter"
                                :to="showData[2]"
                            ></animate-number>
                        </div>
                        <div class="unitText fontPMZD">{{ unitList[2] }}</div>
                    </div>
                    <div class="w0 fg1 df fdc">
                        <!-- <div class="dataText">
                            {{
                                showData[3]
                                    ? showData[3].toFixed(2)
                                    : showData[3]
                            }}
                        </div> -->
                        <div class="dataText fontPMZD">
                            <animate-number
                                duration="2000"
                                from="0"
                                :formatter="formatter"
                                :to="showData[3]"
                            ></animate-number>
                        </div>
                        <div class="unitText fontPMZD">{{ unitList[3] }}</div>
                    </div>
                </div>
            </div>
            <div class="h0 fg1 df fdc">
                <dkcsfx class="h0 fg1"></dkcsfx>
            </div>
            <div class="bottomTable bgFrame2 df fdc">
                <div class="tableTitle">贷款余额走势</div>
                <dkyezs class="h0 fg1"></dkyezs>
            </div>
            </div>
        </div>
        <div class="rightTable df fdc">
            <div class="contentTable bgFrame3 h0 fg1 df fdc">
                <div class="tableTitle">近5年放款走势分析</div>
                <jwnfkzsfx class="h0 fg1"></jwnfkzsfx>
            </div>
            <div class="contentTable bgFrame df fdc">
                <div class="tableTitle">贷款逾期情况</div>
                <dkyqqk class="h0 fg1"></dkyqqk>
            </div>
            <div class="contentTable bgFrame df fdc">
                <div class="tableTitle">按委贷银行分析Top3</div>
                <awdyhfx class="h0 fg1"></awdyhfx>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        hkzsfx: () => import('./components/hkzsfx.vue'),
        dklxfx: () => import('./components/dklxfx.vue'),
        gfmj: () => import('./components/gfmj.vue'),
        dkrfx: () => import('./components/dkrfx.vue'),
        dkcsfx: () => import('./components/dkcsfx.vue'),
        dkyezs: () => import('./components/dkyezs.vue'),
        jwnfkzsfx: () => import('./components/jwnfkzsfx.vue'),
        dkyqqk: () => import('./components/dkyqqk.vue'),
        awdyhfx: () => import('./components/awdyhfx.vue'),
    },
    data() {
        return {
            dataList: [],
            showData: [],
            unitList: [],
            isYearSelect: true,
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
        changeBoardData(num) {
            this.showData = [];
            this.$nextTick(() => {
                if (num == 0) {
                    this.showData = [
                        this.dataList.ljdkbs,
                        this.dataList.cldkbs,
                        this.dataList.ljdkje,
                        this.dataList.cldkje,
                    ];
                    this.unitList = [
                        '累计(笔)',
                        '存量(笔)',
                        '累计(万元)',
                        '存量(万元)',
                    ];
                    this.isYearSelect = false;
                } else {
                    this.showData = [
                        this.dataList.dndkbs,
                        this.dataList.dydkbs,
                        this.dataList.dndkje,
                        this.dataList.dydkje,
                    ];
                    this.unitList = [
                        '当年(笔)',
                        '当月(笔)',
                        '当年(万元)',
                        '当月(万元)',
                    ];
                    this.isYearSelect = true;
                }
                console.log(this.showData);
            });
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'dk_kb',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList[0];
                        this.showData = [
                            this.dataList.dndkbs,
                            this.dataList.dydkbs,
                            this.dataList.dndkje,
                            this.dataList.dydkje,
                        ];
                        this.unitList = [
                            '当年(笔)',
                            '当月(笔)',
                            '当年(万元)',
                            '当月(万元)',
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
.leftTable {
    width: 477.005px;
    height: 934.003px;
    margin: 44.006px 0px 27.994px 24px;
}
.rightTable {
    height: 934.003px;
    width: 477.005px;
    margin: 44.006px 24px 27.994px 0px;
}
.centerTable {
    height: 934.003px;
    margin: 24px 27.994px 24px;
    .board {
        height: 68.006px;
        margin-bottom: 12px;
        .selectBock {
            margin-left: 20.006px;
            width: 128.006px;
            .selectButton {
                width: 108px;
                height: 32.006px;
                font-size: 14.995px;
                line-height: 34.003px;
                text-indent: 16.013px;
            }
        }
    }
    .bottomTable {
        height: 289.997px;
        margin-top: 32.006px;
    }
}
.logoText {
    color: #ffffff;
    line-height: 13.997px;
    font-size: 13.997px;
    height: 13.997px;
    text-align: center;
    margin-bottom: 6.01px;
}
/deep/ .dataText {
    color: #ffc35a;

    font-size: 20.006px;
    text-align: center;
    margin-top: 10.003px;
    line-height: 20.006px;
    // font-family: PangMenZhengDao !important;
    -webkit-box-reflect: below -10.003px -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0.5)),
            to(rgba(255, 255, 255, 0.6))
        );
}
/deep/ .fontPMZD span {
    font-family: PangMenZhengDao !important;
}
.unitText {
    color: #ffffff;
    font-size: 13.997px;
    text-align: center;
    line-height: 13.997px;
    margin-top: 10.003px;
}
.contentTable {
    height: 226.003px;
    margin-bottom: 10.003px;
}
.tableTitle {
    height: 39.994px;
    text-indent: 48px;
    line-height: 39.994px;
    flex-shrink: 0;
    background-image: linear-gradient(to right, #00c0ff, #43f0ff, 50%, #00c0ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 22.003px;
    font-weight: 900;
}
.bgFrame {
    background-image: url('../../../assets/images/dp/dk/dk_kuang1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgFrame2 {
    background-image: url('../../../assets/images/dp/dk/dk_kuang2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgFrame3 {
    background-image: url('../../../assets/images/dp/dk/dk_kuang3.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgdkbs {
    background-image: url('../../../assets/images/dp/dk/icon_dkbs.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgdkje {
    background-image: url('../../../assets/images/dp/dk/icon_dkje.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgselect {
    background-image: url('../../../assets/images/dp/dk/tab_minddle_selected.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
}
.bgdefault {
    background-image: url('../../../assets/images/dp/dk/tab_minddle_defult.svg');
    background-repeat: no-repeat;
    color: #a0e1ff;
    background-size: 100% 100%;
}
</style>
