<template>
    <div class="df" style="justify-content: around;">
        <div
            class="w0 fg1 df"
            style="margin-left: 60.998px;margin-right: 60.998px;"
            v-if="dataList && dataList.length > 0"
        >
            <div
                class="w0 fg1 df"
                v-for="(item, index) in dataList"
                :key="index"
            >
                <div class="w0 fg1 df">
                    <div
                        class="bg icon1"
                        :style="{
                            backgroundImage: 'url(' + imgUrlList[index] + ')',
                        }"
                    ></div>
                    <div class="w0 fg1 fdc" style="margin-left: 20.006px;">
                        <!-- <div class="dataDiv">
                            {{ item }}
                        </div> -->
                        <div class="dataDiv fontPMZD">
                            <animate-number
                                v-if="index > 3"
                                duration="2000"
                                from="0"
                                :formatter="format"
                                :to="item"
                            ></animate-number>
                            <animate-number
                                v-else
                                duration="2000"
                                from="0"
                                :to="item"
                            ></animate-number>
                            <template v-if="nameList[index] === '离柜率'">
                                %
                            </template>
                        </div>
                        <div class="h0 fg1 nameDiv">
                            {{ nameList[index] }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="df tbhbDiv">
      <div class="df w0 fg1" v-if="dataList2 && dataList2.length">
        <div class="w0 fg1 fdc df">
          <div class="dataDiv2" :style="{ color: dataList2[0].color }">
            {{ dataList2[0].showValue }}
          </div>
          <div class="h0 fg1 df">
            <div class="nameDiv2">
              同比
            </div>
            <div
              class="bg icon2"
              :style="{ backgroundImage: dataList2[0].backgroundImage }"
            ></div>
            <div class="w0 fg1"></div>
          </div>
        </div>
        <div class="w0 fg1 fdc df">
          <div class="dataDiv2" :style="{ color: dataList2[1].color }">
            {{ dataList2[1].showValue }}
          </div>
          <div class="h0 fg1 df">
            <div class="nameDiv2">
              环比
            </div>
            <div
              class="bg icon2"
              :style="{ backgroundImage: dataList2[1].backgroundImage }"
            ></div>
            <div class="w0 fg1"></div>
          </div>
        </div>
      </div>
    </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataList: [],
            dataList2: [],
            nameList: [
                '单位总数(家)',
                '单位实缴数(家)',
                '缴存职工总人数(个)',
                '实缴人数(个)',
                '缴存余额(万元)',
                // "最近月缴余额(万)",
                '离柜率',
            ],
            imgUrlList: [
                require('../../../../assets/images/dp/sy/icon_shouye_dwzs.svg'),
                require('../../../../assets/images/dp/sy/icon_sjdw.svg'),
                require('../../../../assets/images/dp/sy/icon_jczgzrs.svg'),
                require('../../../../assets/images/dp/sy/icon_sjrs.svg'),
                require('../../../../assets/images/dp/sy/icon_jcye.svg'),
                require('../../../../assets/images/dp/sy/icon_zjyjce.svg'),
                // require("../../../../assets/images/dp/sy/icon_lgl.svg"),
                // require("../../../../assets/images/dp/sy/icon_down.svg"),
                // require("../../../../assets/images/dp/sy/icon_up.svg")
            ],
        };
    },
    props: {
        kbDataList: {
            type: Object,
            default: () => {},
        },
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    async beforeMount() {
        this.getData();
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        format(val) {
            return val.toFixed(2);
        },
        async getData() {
            return new Promise((resolve, reject) => {
                let data1 = this.kbDataList;
                this.dataList = [
                    data1.dwzs,
                    data1.dwsjs,
                    data1.jczgzs,
                    data1.sjrs,
                    data1.jcye,
                    // data1.zjyjce,
                    data1.lgl,
                ];
                console.log(this.dataList);
                // let dataList2 = [{ value: data1.tb }, { value: data1.hb }];
                // this.dataList2 = dataList2.map((item, index) => {
                //   let color = "",
                //     showValue = "",
                //     backgroundImage = "";
                //   if (item.value < 0) {
                //     color = "#28EF6E ";
                //     showValue = item.value + "%";
                //     backgroundImage = "url(" + this.imgUrlList[7] + ")";
                //   } else if (item.value > 0) {
                //     color = "#EF3628";
                //     showValue = "+" + item.value + "%";
                //     backgroundImage = "url(" + this.imgUrlList[8] + ")";
                //   } else {
                //     color = "lightgray";
                //     showValue = item.value + "%";
                //   }
                //   return {
                //     ...item,
                //     color: color,
                //     showValue: showValue,
                //     backgroundImage: backgroundImage
                //   };
                // });
                resolve();
            });
        },
    },
};
</script>
<style scoped lang="scss">
.bg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.icon1 {
    height: 58.502px;
    width: 74.208px;
}
.dataDiv {
    height: 30.01px;
    line-height: 30.01px;
    font-size: 30.01px;
    text-align: left;
    color: #ffc35a;
    font-family: PangMenZhengDao;
    -webkit-box-reflect: below -10.003px -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.6))
        );
}
.nameDiv {
    line-height: 39.994px;
    font-size: 13.997px;
    text-align: left;
    color: #ffffff;
}
.tbhbDiv {
    margin-right: 60.998px;
    margin-left: 10.003px;
    width: 289.997px;
}
.dataDiv2 {
    height: 30.01px;
    line-height: 30.01px;
    font-size: 30.01px;
    font-family: PangMenZhengDao;
    -webkit-box-reflect: below -10.003px -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(255, 255, 255, 0.6))
        );
}
.nameDiv2 {
    width: 39.994px;
    font-size: 13.997px;
    margin-right: 13.997px;
    color: #ffffff;
    line-height: 39.994px;
}
.icon2 {
    width: 15.994px;
    height: 15.994px;
    margin-top: 12px;
}
/deep/ .fontPMZD span {
    font-family: PangMenZhengDao !important;
}
</style>
