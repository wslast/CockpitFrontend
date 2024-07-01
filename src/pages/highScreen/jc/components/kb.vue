<template>
    <div class="df">
        <div
            class="fg1 w0 df"
            v-if="dataList && Object.keys(dataList).length > 0">
            <div class="w0 fg1 df">
                <div style="width:74.995px;" class="df  fdc">
                    <div
                        style="height:76.8px;"
                        class="bg"
                        :style="{
                            backgroundImage: 'url(' + imgUrlList[0] + ')',
                        }"
                    ></div>
                    <div style="height:0px;" class="fg1"></div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <div
                        class="fg1 logoTextStyle1 fontPMZD"
                        style="color:#FFC35A ;text-align: center;">
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="dataList.sjdw"
                        ></animate-number>
                    </div>
                    <div class="fg1 logoTextStyle2">
                        新开户单位&nbsp;&nbsp;(家)
                    </div>
                </div>
                <div style="width:0;" class="df fg1 fdc">
                    <div class="textBox fg1 df">
                        <div class="unit">
                            同比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>


                    <div class="textBox fg1 df">
                        <div class="unit">
                            环比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>

                </div>
            </div>
            <div class="w0  fg1 df">
                <div style="width:74.995px;" class="df  fdc">
                    <div
                        style="height:76.8px;"
                        class="bg"
                        :style="{
                            backgroundImage: 'url(' + imgUrlList[1] + ')',
                        }"
                    ></div>
                    <div style="height:0px;" class="fg1"></div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        {{ dataList.sjrs }}
                    </div> -->
                    <div
                        class="fg1 logoTextStyle1 fontPMZD"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="dataList.sjrs"
                        ></animate-number>
                    </div>
                    <div class="fg1 logoTextStyle2">
                        新开户职工&nbsp;&nbsp;(人)
                    </div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        :style="{ color: sjdwtbclolor }"
                    >
                        {{ dataList.sjdwtb }}
                    </div> -->

                    <div class="textBox fg1 df">
                        <div class="unit">
                            同比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>


                    <div class="textBox fg1 df">
                        <div class="unit">
                            环比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>

                </div>
            </div>
            <div class="w0  fg1 df">
                <div style="width:74.995px;" class="df  fdc">
                    <div
                        style="height:76.8px;"
                        class="bg"
                        :style="{
                            backgroundImage: 'url(' + imgUrlList[2] + ')',
                        }"
                    ></div>
                    <div style="height:0px;" class="fg1"></div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        {{ dataList.sjrs }}
                    </div> -->
                    <div
                        class="fg1 logoTextStyle1 fontPMZD"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="dataList.sjrs"
                        ></animate-number>
                    </div>
                    <div class="fg1 logoTextStyle2">
                        实缴单位&nbsp;&nbsp;(家)
                    </div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        :style="{ color: sjdwtbclolor }"
                    >
                        {{ dataList.sjdwtb }}
                    </div> -->

                    <div class="textBox fg1 df">
                        <div class="unit">
                            同比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>


                    <div class="textBox fg1 df">
                        <div class="unit">
                            环比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>

                </div>
            </div>
            <div class="w0  fg1 df">
                <div style="width:74.995px;" class="df  fdc">
                    <div
                        style="height:76.8px;"
                        class="bg"
                        :style="{
                            backgroundImage: 'url(' + imgUrlList[3] + ')',
                        }"
                    ></div>
                    <div style="height:0px;" class="fg1"></div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        {{ dataList.sjrs }}
                    </div> -->
                    <div
                        class="fg1 logoTextStyle1 fontPMZD"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="dataList.sjrs"
                        ></animate-number>
                    </div>
                    <div class="fg1 logoTextStyle2">
                        实缴职工&nbsp;&nbsp;(万人)
                    </div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        :style="{ color: sjdwtbclolor }"
                    >
                        {{ dataList.sjdwtb }}
                    </div> -->

                    <div class="textBox fg1 df">
                        <div class="unit">
                            同比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>


                    <div class="textBox fg1 df">
                        <div class="unit">
                            环比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>

                </div>
            </div>
            <div class="w0  fg1 df">
                <div style="width:74.995px;" class="df  fdc">
                    <div
                        style="height:76.8px;"
                        class="bg"
                        :style="{
                            backgroundImage: 'url(' + imgUrlList[4] + ')',
                        }"
                    ></div>
                    <div style="height:0px;" class="fg1"></div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        {{ dataList.sjrs }}
                    </div> -->
                    <div
                        class="fg1 logoTextStyle1 fontPMZD"
                        style="color:#FFC35A ;text-align: center;"
                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="dataList.sjrs"
                        ></animate-number>
                    </div>
                    <div class="fg1 logoTextStyle2">
                        实缴存额&nbsp;&nbsp;(亿元)
                    </div>
                </div>
                <div style="width:0px;" class="df fg1 fdc">
                    <!-- <div
                        class="fg1 logoTextStyle1"
                        :style="{ color: sjdwtbclolor }"
                    >
                        {{ dataList.sjdwtb }}
                    </div> -->

                    <div class="textBox fg1 df">
                        <div class="unit">
                            同比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
                        </div>
                    </div>


                    <div class="textBox fg1 df">
                        <div class="unit">
                            环比
                        </div>

                        <div style="width: 0px;font-size: 20px" class=" percentSub fg1 fontPMZD ">+<span>15.8</span>%
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
            imgUrlList: [
                require('../../../../assets/images/dp/jc-old/icon_sjdw.svg'),
                require('../../../../assets/images/dp/jc-old/icon_sjrs.svg'),
                require('../../../../assets/images/dp/jc-old/icon_shouye_dwzs.svg'),
                require('../../../../assets/images/dp/jc-old/icon_jczgzrs.svg'),
                require('../../../../assets/images/dp/jc-old/icon_zjyjce.svg'),
            ],
            dataList: {},
            sjrstbbackgroundImage: '',
            sjrstbclolor: '',
            sjdwtbbackgroundImage: '',
            sjdwtbclolor: '',
            color: '',
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
        this.getData();
    },
    beforeDestroy() {
    },
    methods: {
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'jc_kb',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList[0];
                        let unitList = [
                            '实缴单位(家)',
                            '同比',
                            '实缴人数(个)',
                            '同比',
                        ];
                        if (this.dataList.sjdwtb > 0) {
                            this.dataList.sjdwtb = '+' + this.dataList.sjdwtb;
                            this.sjdwtbbackgroundImage =
                                'url(' + this.imgUrlList[2] + ')';
                            this.sjdwtbclolor = '#EF3628';
                        } else if (this.dataList.sjdwtb < 0) {
                            this.dataList.sjdwtb = this.dataList.sjdwtb;
                            this.sjdwtbbackgroundImage =
                                'url(' + this.imgUrlList[3] + ')';
                            this.sjdwtbclolor = '#28EF6E';
                        } else {
                            this.dataList.sjdwtb = this.dataList.sjdwtb;
                            this.sjdwtbbackgroundImage = '';
                            this.sjdwtbclolor = 'gray';
                        }
                        if (this.dataList.sjrstb > 0) {
                            this.dataList.sjrstb = '+' + this.dataList.sjrstb;
                            this.sjrstbbackgroundImage =
                                'url(' + this.imgUrlList[2] + ')';
                            this.sjrstbclolor = '#EF3628';
                        } else if (this.dataList.sjrstb < 0) {
                            this.dataList.sjrstb = this.dataList.sjrstb;
                            this.sjrstbbackgroundImage =
                                'url(' + this.imgUrlList[3] + ')';
                            this.sjrstbclolor = '#28EF6E';
                        } else {
                            this.dataList.sjrstb = this.dataList.sjrstb;
                            this.sjrstbbackgroundImage = '';
                            this.sjrstbclolor = 'gray';
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

        formatter(num) {
            return num.toFixed(2); //小数点后几位，数字就是几小数点后几位
        },
    },
};
</script>
<style scoped lang="scss">
.bg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.logoTextStyle1 {
    height: 36px;
    text-align: left;
    font-size: 36px;
    line-height: 36px;
    font-family: 'pmzdfont', sans-serif;
    -webkit-box-reflect: below -52px linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 25%,
            #fff 100%
    );
}

///deep/ .fontPMZD span {
//    font-family: PangMenZhengDao !important;
//}

/deep/ .fontPMZD span {
    font-family: 'pmzdfont', sans-serif;
}

//.fontPMZD  {
//  font-family: 'pmzdfont', sans-serif;
//}


.logoTextStyle2 {
    height: 0px;
    text-align: center;
    color: #ffffff;
    font-size: 15.994px;
    line-height: 15.994px;
    margin-top: -6.5px;
}

.unit {
    margin-left: 20.006px;
    //line-height: 15.994px;
    font-size: 15.994px;
}

.arrowIcon {
    height: 20.006px;
    width: 20.006px;
    border: none;
    margin-left: 20.006px;
}

.textBox {
    height: 35px;
    text-align: center;
    display: flex;
    line-height: 48px;
}


.percentSub {
    color: #EF3628;
}

.percentSum {
    color: #28EF6E;
}
</style>
