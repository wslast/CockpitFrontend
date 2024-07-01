<template>
    <div
        v-if="dataList && Object.keys(dataList).length > 0">
        <div class="selectBock  df fdc">
            <div
                class="h0  selectButton"
                :class="[
                            isYearSelect == '累计' ? 'bgselect' : 'bgdefault',
                        ]"
                @click.stop="changeBoardData('累计')"
            >
                累计
            </div>
            <div
                class="h0   selectButton"
                :class="[
                            isYearSelect == '当年' ? 'bgselect' : 'bgdefault',
                        ]"
                @click.stop="changeBoardData('当年')"
            >
                当年
            </div>

            <div
                class="h0   selectButton"
                :class="[
                            isYearSelect == '当月' ? 'bgselect' : 'bgdefault',
                        ]"
                @click.stop="changeBoardData('当月')"
            >
                当月
            </div>
        </div>

        <div style="width: 0px" class="fg1 df">
            <div style="width: 74.995px" class="df fdc">
                <div
                    style="height: 76.8px"
                    class="bg"
                    :style="{
                            backgroundImage: 'url(' + imgUrlList[0] + ')',
                        }"
                ></div>
                <div class="fg1 h0"></div>
            </div>
            <div style="width: 0px" class="df fg1 fdc">
                <!-- <div
                    class="fg1 logoTextStyle1 "
                    style="color: #ffc35a; text-align: center"
                >
                    {{ dataList.tqbs }}
                </div> -->
                <div
                    class="fg1 logoTextStyle1 fontPMZD"
                    style="color: #ffc35a; text-align: center"
                >
                    <animate-number
                        duration="2000"
                        from="0"
                        :to="dataList.tqbs"
                    ></animate-number>
                </div>
                <div class="fg1 logoTextStyle2">
                    提取笔数(笔)
                </div>
            </div>
            <div style="width: 0px;" class="df fg1 fdc">
                <!-- <div
                    class="fg1 logoTextStyle3"
                    :style="{ color: tqbstbclolor }"
                >
                    {{ dataList.tqbstb }}
                </div> -->
                <div
                    class="fg1 logoTextStyle3 "
                    :style="{ color: tqbstbclolor }"
                >
                    <template v-if="dataList.tqbstb > 0">
                        +
                    </template>
                    <animate-number
                        duration="2000"
                        from="0"
                        :formatter="formatter1"
                        :to="dataList.tqbstb"
                    ></animate-number>
                    %
                </div>
                <div class="fg1 df h0" >
                    <div class="unit1">
                        同比
                    </div>
                    <div
                        class="bg arrowImg"
                        :style="{
                                backgroundImage: tqbstbbackgroundImage,
                            }"
                    ></div>
                    <div class="fg1 w0"></div>
                </div>
            </div>
        </div>
        <div style="width: 0px;margin-left: 10px" class="fg1 df">
            <div style="width: 74.995px" class="df fdc">
                <div
                    style="height: 76.8px"
                    class="bg"
                    :style="{
                            backgroundImage: 'url(' + imgUrlList[1] + ')',
                        }"
                ></div>
                <div class="fg1 h0"></div>
            </div>
            <div style="width: 0px" class="df fg1 fdc">
                <!-- <div
                    class="fg1 logoTextStyle1"
                    style="color: #ffc35a; text-align: center"
                >
                    {{ dataList.tqje }}
                </div> -->
                <div
                    class="fg1 logoTextStyle1 fontPMZD"
                    style="color: #ffc35a; text-align: center"
                >
                    <animate-number
                        duration="2000"
                        from="0"
                        :formatter="formatter"
                        :to="dataList.tqje"
                    ></animate-number>
                </div>
                <div class="fg1 logoTextStyle2">
                    提取金额(万元)
                </div>
            </div>
            <div style="width: 0px;" class="df fg1 fdc">
                <!-- <div
                    class="fg1 logoTextStyle3 "
                    :style="{ color: tqjetbclolor }"
                >
                    {{ dataList.tqjetb }}
                </div> -->
                <div
                    class="fg1 logoTextStyle3 "
                    :style="{ color: tqjetbclolor }"
                >
                    <template v-if="dataList.tqjetb > 0">
                        +
                    </template>
                    <animate-number
                        duration="2000"
                        from="0"
                        :formatter="formatter1"
                        :to="dataList.tqjetb"
                    ></animate-number>
                    %
                </div>
                <div class="fg1 df" >
                    <div class="fg1 df h0">
                        <div class="unit1">
                            同比
                        </div>
                        <div
                            class="bg arrowImg"
                            :style="{
                                    backgroundImage: tqjetbbackgroundImage,
                                }"
                        ></div>
                        <div class="fg1 w0"></div>
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
            isYearSelect:'当月',
            imgUrlList: [
                require('../../../../assets/images/dp/tq/icon_tq_tqbs.svg'),
                require('../../../../assets/images/dp/tq/icon_tq_tqje.svg'),
                require('../../../../assets/images/dp/tq/arrow_red.svg'),
                require('../../../../assets/images/dp/tq/arrow_green.svg'),
            ],
            dataList: {},
            tqbstbbackgroundImage: '',
            tqbstbclolor: '',
            tqjetbbackgroundImage: '',
            tqjetbclolor: '',
            color: '',
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
        changeBoardData(val){
            this.isYearSelect = val
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'tq_kb',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList[0];

                        let unitList = [
                            '提取笔数(笔)',
                            '同比',
                            '提取金额(万元)',
                            '同比',
                        ];
                        if (this.dataList.tqbstb > 0) {
                            this.dataList.tqbstb = '+' + this.dataList.tqbstb;
                            this.tqbstbbackgroundImage =
                                'url(' + this.imgUrlList[2] + ')';
                            this.tqbstbclolor = '#EF3628';
                        } else if (this.dataList.tqbstb < 0) {
                            this.dataList.tqbstb = this.dataList.tqbstb;
                            this.tqbstbbackgroundImage =
                                'url(' + this.imgUrlList[3] + ')';
                            this.tqbstbclolor = '#28EF6E';
                        } else {
                            this.dataList.tqbstb = this.dataList.tqbstb;
                            this.tqbstbbackgroundImage = '';
                            this.tqbstbclolor = 'gray';
                        }
                        if (this.dataList.tqjetb > 0) {
                            this.dataList.tqjetb = '+' + this.dataList.tqjetb;
                            this.tqjetbbackgroundImage =
                                'url(' + this.imgUrlList[2] + ')';
                            this.tqjetbclolor = '#EF3628';
                        } else if (this.dataList.tqjetb < 0) {
                            this.dataList.tqjetb = this.dataList.tqjetb;
                            this.tqjetbbackgroundImage =
                                'url(' + this.imgUrlList[3] + ')';
                            this.tqjetbclolor = '#28EF6E';
                        } else {
                            this.dataList.tqjetb = this.dataList.tqjetb;
                            this.tqjetbbackgroundImage = '';
                            this.tqjetbclolor = 'gray';
                        }
                        this.color = '#FFC35A';
                        resolve();
                    });
            });
        },
        /**
         * @description: number组件保留几位小数
         * @return {*}
         * @param {*} num
         */
        formatter1(num) {
            return num.toFixed(1); //小数点后几位，数字就是几小数点后几位
        },
        formatter(num) {
            return num.toFixed(2); //小数点后几位，数字就是几小数点后几位
        },
    },
};
</script>
<style scoped lang="scss">
.selectBock {

    width: 90.006px;
    .selectButton {
        width: 58px;
        height: 26.006px;
        font-size: 14px;
        line-height: 26.003px;
        text-indent: 12.013px;;
        cursor: pointer;
    }
}


.arrowImg {
    height: 20.006px;
    width: 20.006px;
    border: none;
    margin-left: 10.003px;
}
.logoTextStyle1 {
    padding-top: 3px;
    height: 23px;
    text-align: left;
    font-size: 36px;
    line-height: 36px;
    font-family: 'pmzdfont', sans-serif;
    -webkit-box-reflect: below -64px -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.4))
        );
}
.logoTextStyle2 {
    height: 0px;
    text-align: center;
    color: #ffffff;
    font-size: 15.994px;
    line-height: 15.994px;
    margin-top: -12px;
}
.logoTextStyle3 {
    height: 26px;
    text-align: left;
    font-size: 36px;
    line-height: 36px;
    font-family: PangMenZhengDao;
    font-weight: bold;
    -webkit-box-reflect: below -36.76px -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.5))
        );
}
/deep/ .fontPMZD span {
    font-family: 'pmzdfont', sans-serif  !important ;

}
.unit1 {
    margin-left: 10.003px;
    line-height: 15.994px;
    font-size: 15.994px;
    color: #FFFFFF;
}
.bg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
bg2 {
    background-repeat: no-repeat;
    background-size: 50% 100%;
}

.bgselect {
    background-image: url('../../../../assets/images/dp/dk/tab_minddle_selected.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
}
.bgdefault {
    background-image: url('../../../../assets/images/dp/dk/tab_minddle_defult.svg');
    background-repeat: no-repeat;
    color: #a0e1ff;
    background-size: 100% 100%;
}

</style>
