<template>
    <div class="board">
        <div class="board-selectBock ">
            <div
                class="board-selectBock-selectButton"
                :class="[ isYearSelect === false ? 'board-selectBock-bgselect' : 'board-selectBock-bgdefault',]"
                style="margin-bottom:8px;"
                @click.stop="changeBoardData(0)" >
                累计&存量
            </div>
            <div
                class="board-selectBock-selectButton"
                :class="[isYearSelect === true ? 'board-selectBock-bgselect' : 'board-selectBock-bgdefault',]"
                @click.stop="changeBoardData(1)"
            >
                当年&当月
            </div>
        </div>
        <div
            v-if="showData.length > 0"
            class="board-right"
        >
            <div  class="board-bgdkbs">
                <div class="board-logoText">贷款笔数</div>
                <div></div>
            </div>
            <div class="board-right-headTop" >
                <!-- <div class="dataText">{{ showData[0] }}</div> -->
                <div class=" board-right-headTop-dataText " style="">
                    <span style="" class="board-right-headTop-dataText-leftText">当年</span>
                    <div
                        class="fontPMZD  board-right-headTop-dataText-rightText "
                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="showData[0]"
                        ></animate-number>

                        <span  class="board-right-headTop-dataText-rightText-unit" style=""> 笔</span>

                    </div>

                </div>
                <div class="board-right-headTop-dataText " >
                    <span class="board-right-headTop-dataText-leftText">当月</span>
                    <div
                        class="fontPMZD board-right-headTop-dataText-rightText"
                    >
                        <animate-number

                            duration="2000"
                            from="0"
                            :to="showData[1]"
                        ></animate-number>

                        <span class="board-right-headTop-dataText-rightText-unit"> 笔</span>
                    </div>

                </div>
            </div>

        </div>
        <div
            v-if="showData.length > 0"
            class="board-right"
        >
            <div class="board-bgdkje">
                <div class="board-logoText">贷款金额</div>

                <div ></div>
            </div>
            <div class="board-right-headTop">
                <div class=" board-right-headTop-dataText " style="">
                    <span class="board-right-headTop-dataText-leftText">当年</span>
                    <div
                        class="fontPMZD board-right-headTop-dataText-rightText  "
                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :formatter="formatter"
                            :to="showData[2]"
                        ></animate-number>

                        <span class="board-right-headTop-dataText-rightText-unit"> 万元</span>
                    </div>

                </div>
                <div class="board-right-headTop-dataText " >
                    <span class="board-right-headTop-dataText-leftText">当月</span>
                    <div
                        class="fontPMZD board-right-headTop-dataText-rightText "

                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :formatter="formatter"
                            :to="showData[3]"
                        ></animate-number>

                        <span class="board-right-headTop-dataText-rightText-unit" > 万元</span>
                    </div>

                </div>
            </div>
        </div>
        <div
            class="board-right"
            v-if="showData.length > 0">
            <div  class="board-bgdklpzr">
                <div class="board-logoText">楼盘准入</div>

                <div  ></div>
            </div>
            <div class="board-right-headTop">
                <div class="board-right-headTop-dataText " style="">
                    <span class="board-right-headTop-dataText-leftText">当年</span>
                    <div
                        class="fontPMZD board-right-headTop-dataText-rightText "
                        style=""
                    >
                        <animate-number

                            duration="2000"
                            from="0"
                            :to="showData[4]"
                        ></animate-number>

                        <span class="board-right-headTop-dataText-rightText-unit"> 个</span>
                    </div>

                </div>
                <div class="board-right-headTop-dataText ">
                    <span class="board-right-headTop-dataText-leftText">当月</span>
                    <div
                        class="fontPMZD board-right-headTop-dataText-rightText "
                    >
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="showData[5]"
                        ></animate-number>

                        <span class="board-right-headTop-dataText-rightText-unit"> 个</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "kb",
    data() {
        return {
            isYearSelect:true,
            showData: [
                3752,824,9560.7,560.7,66,5
            ],
        };
    },
    methods:{
        changeBoardData(num) {
            // this.showData = [];
            // this.$nextTick(() => {
            //     if (num == 0) {
            //         this.showData = [
            //             this.dataList.ljdkbs,
            //             this.dataList.cldkbs,
            //             this.dataList.ljdkje,
            //             this.dataList.cldkje,
            //         ];
            //         this.unitList = [
            //             '累计(笔)',
            //             '存量(笔)',
            //             '累计(万元)',
            //             '存量(万元)',
            //         ];
            //         this.isYearSelect = false;
            //     } else {
            //         this.showData = [
            //             this.dataList.dndkbs,
            //             this.dataList.dydkbs,
            //             this.dataList.dndkje,
            //             this.dataList.dydkje,
            //         ];
            //         this.unitList = [
            //             '当年(笔)',
            //             '当月(笔)',
            //             '当年(万元)',
            //             '当月(万元)',
            //         ];
            //         this.isYearSelect = true;
            //     }
            //     console.log(this.showData);
            // });
        },
        formatter(num){
            return num.toFixed(1)
        },
    }
}
</script>

<style scoped lang="scss">

.board {
    height: 68px;
    margin-bottom: 12px;
    margin-top: 15px;
    width: 105%;
    display: flex;
    &-selectBock {
        width: 115px;
        &-selectButton {
            width: 90px;
            height: 34.006px;
            font-size: 14.995px;
            line-height: 34.003px;
            text-align: center;
            cursor: pointer;
        }

        &-bgselect {
            background-image: url('../../../../assets/images/dp/dk/tab_minddle_selected.svg');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            color: #ffffff;
        }
        &-bgdefault {
            background-image: url('../../../../assets/images/dp/dk/tab_minddle_defult.svg');
            background-repeat: no-repeat;
            color: #a0e1ff;
            background-size: 100% 100%;
        }
    }

    &-right {
        display: flex;
        flex: 1;
        margin-top: 10px;

        &-headTop {
            margin-top: -9px;
            flex: 1;

            &-dataText {
                color: #ffc35a;
                font-size: 24.006px;
                display: flex;
                flex-wrap: nowrap;
                line-height: 28.006px;
                white-space: nowrap;      /* 禁止换行 */
                overflow: hidden;          /* 隐藏超出部分 */
                text-overflow: ellipsis;
                &:nth-child(2) {
                    margin-top: 12px;
                }

                &-leftText {
                    color: #FFFFFF;
                    font-size: 14px;
                    width: 65px;
                    text-align: center;
                    text-indent:15px
                }
                &-rightText {
                    flex: 1;

                    &-unit {
                        color: #ffffff;
                        font-size: 13.997px;
                        font-family: "Microsoft YaHei" !important; ;
                    }
                }
            }

        }
    }
    &-logoText {
        color: #ffffff;
        line-height: 13.997px;
        font-size: 13.997px;
        height: 18.997px;
        text-align: center;
        margin-bottom: 6.01px;
        margin-top: -12px;
    }
    &-bgdkbs {
        background-image: url('../../../../assets/images/dp/dk/icon_dkbs.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 75px;height: 75px;
    }
    &-bgdkje {
        background-image: url('../../../../assets/images/dp/dk/icon_dkje.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 75px;height: 75px;
    }
    &-bgdklpzr {
        background-image: url('../../../../assets/images/dp/dk/icon_dk_lpzr.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 75px;height: 75px;
    }
}

/deep/ .fontPMZD span {
    font-family: 'pmzdfont', sans-serif !important;
}
</style>
