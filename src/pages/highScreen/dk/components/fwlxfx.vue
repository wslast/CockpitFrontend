<template>
    <div class="fwlxfxbox">
        <div class="perncentbox">
            <div v-for="(item,index) in topValue"


                 :class="index % 2 == 1 ?'percnet percentfg  ':index == 0 ?'percnet0':'percnet1'" :key="index"
                 :style="`width:${item.value};background:linear-gradient(to right, ${item.color1}, ${item.color2});`">
                {{ item.value }}
            </div>
        </div>
        <div class="topbox">
            <div class="tbi" v-for="(item,index) in tboxValue" :key="index">
                <div class="tbi-fl1">
                    <div :class="index < 3 ?'tbi_title':'tbi_title_right'">{{ item.title }}</div>
                    <div  :class="index < 3 ?'number':'number_right'" class="number">{{ item.value }}<span class="tbi_title  unit">笔</span></div>
                    <div class="tbb">
                        <div class="tbbleft">
                            <div class="rednumber" :class="index === 3 ?'text-c':'' " >{{ item.tbper }}</div>
                            <div class="fcb" :class="index === 3 ?'fcb-c':'' "  > <div class="textclor">同比</div>
                                <div class="arrowImg" :style="{backgroundImage: tqbstbbackgroundImagered}"></div></div>
                        </div>
                        <div class="tbbright">
                            <div class="greennumber"  :class="index === 3 ?'text-c':'' " >{{ item.hbper }}</div>
                            <div   class="fcb"  :class="index === 3 ?'fcb-c':'' " > <div class="textclor">环比</div>
                                <div class="arrowImg" :style="{backgroundImage: tqbstbbackgroundImagegreen}"></div></div>
                        </div>
                    </div>
                </div>

                <div class="fgx"  v-show=" index < 3 "></div>

            </div>
        </div>

        <div class="bottombox">
            <div class="tbi" v-for="(item,index) in bboxValue" :key="index">
                <div class="tbi-fl1">
                    <div class="fcb fcb-s">
                        <div class="tbi_title">{{ item.title }}</div>
                        <div  class="number"  >{{ item.value }}<span class="tbi_title  unit">笔</span></div>
                    </div>
                    <div class="tbb">
                        <div class="tbbleft">
                            <div class="rednumber" :class="index >0 ?'text-c':'' " >{{ item.tbper }}</div>
                            <div class="fcb"  :class="index >0 ?'fcb-c':'' "  style=""> <div class="textclor">同比</div>
                                <div class="arrowImg" :style="{backgroundImage: tqbstbbackgroundImagered}"></div></div>
                        </div>
                        <div class="tbbright">
                            <div class="greennumber" :class="index >0 ?'text-c':'' " >{{ item.hbper }}</div>
                            <div   class="fcb" :class="index >0 ?'fcb-c':'' " > <div class="textclor">环比</div>
                                <div class="arrowImg" :style="{backgroundImage: tqbstbbackgroundImagegreen}"></div></div>
                        </div>
                    </div>
                </div>

                <div class="fgx"  v-show=" index ==0 "></div>

            </div>
        </div>
        <div class="perncentbox">
            <div v-for="(item,index) in bottomValue"
                 :class="index % 2 == 0 ?'percnet percentfg margin0  ':index == 0 ?'percnet0':'percnet1'" :key="index"
                 :style="`width:${item.value};background:linear-gradient(to right, ${item.color1}, ${item.color2});`">
                {{ item.value }}
            </div>
        </div>

        <div   class="fwlxfxbox-btnbox">
             <div class="fwlxfxbox-btnbox-btn"  @click="handleBtnClick('月')" :class="cValue == '月'?'fwlxfxbox-btnbox-monthselected':'fwlxfxbox-btnbox-monthdefault'">月</div>
            <div class="fwlxfxbox-btnbox-btn"    @click="handleBtnClick('年')"  :class="cValue == '年'?'fwlxfxbox-btnbox-yearselected':'fwlxfxbox-btnbox-yeardefault'" >季</div>
            <div class="fwlxfxbox-btnbox-btn"    @click="handleBtnClick('季')"  :class="cValue == '季'?'fwlxfxbox-btnbox-seasonselected':'fwlxfxbox-btnbox-seasondefault'"  >年</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cValue:"月",
            topValue: [
                {
                    color1: "#00B6F6",
                    color2: '#006CFF',
                    value: '23%'
                },
                {
                    color1: "#FFE127",
                    color2: '#E7A33C',
                    value: '27%'
                },
                {
                    color1: "#127F41",
                    color2: '#40E86B',
                    value: '49%'
                },
                {
                    color1: "#E49C3C",
                    color2: '#D94D1D',
                    value: '1%'
                },
            ],
            bottomValue: [
                {
                    color1: "#E49C3C",
                    color2: '#D94D1D',
                    value: '7%'
                },
                {
                    color1: "#00B6F6",
                    color2: '#006CFF',
                    value: '93%'
                },


            ],
            tboxValue: [
                {
                    title: '商品房期房',
                    value: "460",
                    tbper: "15.8%",
                    hbper: "1.4%"
                },

                {
                    title: '商品房现房',
                    value: "540",
                    tbper: "6.1%",
                    hbper: "1.4%"
                },

                {
                    title: '二手房',
                    value: "1100",
                    tbper: "6.1%",
                    hbper: "1.4%"
                },

                {
                    title: '商转公',
                    value: "89",
                    tbper: "6.1%",
                    hbper: "1.4%"
                },

            ],
            bboxValue:[
                {
                    title: '二套房',
                    value: "49",
                    tbper: "15.8%",
                    hbper: "1.4%"
                },
                {
                    title: '首套房',
                    value: "651",
                    tbper: "15.8%",
                    hbper: "1.4%"
                }
            ],
            tqbstbbackgroundImagered: '',
            tqbstbbackgroundImagegreen: '',
            imgUrlList: [
                require('../../../../assets/images/dp/tq/arrow_red.svg'),
                require('../../../../assets/images/dp/tq/arrow_green.svg'),
            ],

        }
    },
    created() {
        this.tqbstbbackgroundImagered =
            'url(' + this.imgUrlList[0] + ')';
        this.tqbstbbackgroundImagegreen =
            'url(' + this.imgUrlList[1] + ')';
    },
    methods:{
        handleBtnClick(val){
            this.cValue = val
        }
    }
}
</script>

<style scoped lang="scss">
.arrowImg {
    height: 12.006px;
    width: 12.006px;
    border: none;
    margin-top: 5px;
    margin-left: 3px;
    background-size: cover;
}

.fwlxfxbox {
    padding-top: 52px;
    padding-left: 14px;
    padding-right: 17px;
    position: relative;
    &-btnbox {
        height: 21px;
        width: 96px;
        position: absolute;
        right: 0px;
        top: 5px;
        display: flex;
        &-btn {
            flex: 1;
            text-align: center;
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #A0E1FF;
            line-height: 18px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
        }
        &-monthdefault {
            background-image: url("../../../../assets/images/dp/dk/1zi_zuo_defult.svg");
        }
        &-monthselected {
            background-image: url("../../../../assets/images/dp/dk/1zi_zuo_selected.svg");
            color: #FFFFFF;
        }

        &-yeardefault {
            background-image: url("../../../../assets/images/dp/dk/1zi_zhong_defult.svg");
        }
        &-yearselected {
            background-image: url("../../../../assets/images/dp/dk/1zi_zhong_selected.svg");
            color: #FFFFFF;
        }

        &-seasondefault {
            background-image: url("../../../../assets/images/dp/dk/1zi_you_defult.svg");
        }
        &-seasonselected {
            background-image: url("../../../../assets/images/dp/dk/1zi_you_selected.svg");
            color: #FFFFFF;
        }

    }

    .topbox {
        margin-top: 8px;
        display: flex;
        padding-bottom: 8px;
        //background: #00d1b2;
        border-bottom:  solid 2px #4680F5;
        .tbi {
            flex: 1;
            display: flex;

            &-fl1 {
              flex: 1;
            }
            .tbb {
                display: flex;

                .tbbleft {
                    flex: 1;

                }

                .tbbright {
                    flex: 1;
                }

                .rednumber {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #EF3628;
                }

                .greennumber {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #28EF6E;
                }

                .textclor {
                    color: #FFFFFF;
                    font-size: 14px;
                }
            }



            .unit {
                margin-left: 2px;
            }

            .tbi_title {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #ccc;
            }
            .number {
                font-family: ArialMT;
                font-size: 24px;
                color: #00EAFF;
                letter-spacing: 2px; /* 增加字符间距 */
            }

            .tbi_title_right {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #ccc;
                text-align: right;
            }
            .number_right {
                font-family: ArialMT;
                font-size: 24px;
                color: #00EAFF;
                letter-spacing: 2px; /* 增加字符间距 */
                text-align: right;
            }

        }
    }

    .bottombox {
        display: flex;
        justify-content: space-between;
        .tbi {
            //flex: 1;
            display: flex;
            min-width: 125px;
            &-fl1 {
                flex: 1;
            }
            .tbb {
                display: flex;
                margin-top: -5px;
                .tbbleft {
                    flex: 1;

                }

                .tbbright {
                    flex: 1;
                }

                .rednumber {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #EF3628;
                }


                .greennumber {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #28EF6E;
                }

                .textclor {
                    color: #FFFFFF;
                    font-size: 14px;
                }
            }



            .unit {
                margin-left: 2px;
            }

            .tbi_title {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #ccc;
            }
            .number {
                font-family: ArialMT;
                font-size: 24px;
                color: #00EAFF;
                letter-spacing: 2px; /* 增加字符间距 */
            }

            .tbi_title_right {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #ccc;
                text-align: right;
            }
            .number_right {
                font-family: ArialMT;
                font-size: 24px;
                color: #00EAFF;
                letter-spacing: 2px; /* 增加字符间距 */
                text-align: right;
            }

        }
    }

    .fcb {
        display:flex;
        align-items: center;
        margin-top: -3px;
    }

    .fcb-s {
        justify-content: space-around;
    }
    .fcb-c {
        justify-content: center;
    }
    .perncentbox {
        height: 20px;
        display: flex;
        width: 100%;

    }
}

.percnet {
    border-radius: 10px;
    min-width: 36px;
    text-align: center;
    line-height: 22px;
    color: #FFFFFF;
}

.percnet0 {
    border-radius: 10px 0px 0px 10px;
    min-width: 36px;
    text-align: center;
    line-height: 22px;
    color: #FFFFFF;
}

.percnet2 {
    min-width: 36px;
    text-align: center;
    line-height: 22px;
    color: #FFFFFF;
}
.percnet1 {
    min-width: 36px;
    text-align: center;
    line-height: 22px;
    color: #FFFFFF;
    margin-left: -5px;
    margin-right: -5px;
    border-radius: 10px 10px 10px 10px;
}

.percentfg {
    //border-radius: 10px 10px 10px 10px;
    margin-left: -10px;
    margin-right: -10px;
    z-index: 1;
}

.margin0 {
    margin-left: 0px;
}


.text-c {
    text-align: center;
}
.fgx {
    margin-left: 5px;
    margin-right: 10px;
    background: radial-gradient(circle at 60% 60%, #a0d8f1 20%, #a0d8f1 20%, #a0d8f1 25%, transparent 80%);
    width: 1px;
    height: 100%;
}


</style>
