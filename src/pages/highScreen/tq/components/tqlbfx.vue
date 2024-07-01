<template>
    <div class="tqlbfx">
        <div class="tqlbfx-lbfxbox">
            <div class="tqlbfx-lbfxbox-left"></div>
            <div class="tqlbfx-lbfxbox-centerbox">
                <div class="tqlbfx-lbfxbox-centerbox-ctbox">
                    <div class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxOne">
                        住房消费
                    </div>
                    <div class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo">
                        <div class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-zb">
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-zb-lefth">占比:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-zb-number">{{ resData.zflxf.zb }}%</span>
                        </div>
                        <div class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je">
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je-lefth">金额:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je-number">{{ resData.zflxf.num }}</span>
                            <span  class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je-unit" >{{ resData.zflxf.numUnit }}元</span>
                        </div>
                        <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-lefth">+{{ resData.zflxf.tb }}%</span>
                    </div>
                </div>
                <div class="tqlbfx-lbfxbox-centerbox-ccbox">
                    <div class="tqlbfx-lbfxbox-centerbox-ccbox-ccboxPercent" :style="{width: `${resData.zflxf.zb}%`}"></div>
                </div>
                <div class="tqlbfx-lbfxbox-centerbox-cbbox">
                    <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo" >
                        <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-one">
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-one-lefth">占比:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-one-number">{{ resData.fzflxf.zb }}%</span>
                        </div>
                        <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-two">
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-two-lefth">金额:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je-number">{{ resData.fzflxf.num }}</span>
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je-unit">{{ resData.fzflxf.numUnit }}元</span>
                        </div>
                        <span  class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-percent">+{{ resData.fzflxf.tb }}%</span>
                    </div>
                    <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxOne">
                        非住房消费
                    </div>
                </div>
            </div>
            <div class="tqlbfx-lbfxbox-right"></div>
        </div>
        <div class="tqlbfx-line"></div>
        <div class="tqlbfx-lbfxbox">
            <div class="tqlbfx-lbfxbox-left tqlbfx-lbfxbox-leftb"></div>
            <div class="tqlbfx-lbfxbox-centerbox">
                <div class="tqlbfx-lbfxbox-centerbox-ctbox">
                    <div class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxOne   tqlbfx-lbfxbox-centerbox-ctbox-ctboxbOne">
                        部分
                    </div>
                    <div class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo  tqlbfx-lbfxbox-centerbox-ctbox-ctboxTowLeft">
                        <div class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-top">
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-top-lefth">占比:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-zb-number">{{ resData.bftq.zb }}%</span>
                        </div>

                        <div   class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je" >
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je-lefth">金额:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-je-number">{{ resData.bftq.num }}</span>
                            <span  class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-bottom-unit">{{ resData.bftq.numUnit }}元</span>
                        </div>
                        <span class="tqlbfx-lbfxbox-centerbox-ctbox-ctboxTwo-lefth">+{{ resData.bftq.tb }}%</span>
                    </div>
                </div>
                <div class="tqlbfx-lbfxbox-centerbox-ccbox  tqlbfx-lbfxbox-centerbox-ccboxb  ">
                    <div class="tqlbfx-lbfxbox-centerbox-ccbox-ccboxPercent  tqlbfx-lbfxbox-centerbox-ccbox-ccboxPercentb" :style="{width: `${resData.bftq.zb}%`}"></div>
                </div>
                <div class="tqlbfx-lbfxbox-centerbox-cbbox   tqlbfx-lbfxbox-centerbox-cbboxb">
                    <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo">
                        <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-one">
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-one-lefth">占比:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-one-number">{{ resData.xhtq.zb }}%</span>
                        </div>
                        <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-two">
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-two-lefth">金额:</span>
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-two-number">{{ resData.xhtq.num }}</span>
                            <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-two-unit">{{ resData.xhtq.numUnit }}元</span>
                        </div>
                        <span class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxTwo-percent">+{{ resData.xhtq.tb }}%</span>
                    </div>
                    <div class="tqlbfx-lbfxbox-centerbox-cbbox-ctboxOne  tqlbfx-lbfxbox-centerbox-cbbox-ctboxOneb">
                        销户
                    </div>
                </div>
            </div>
            <div class="tqlbfx-lbfxbox-right tqlbfx-lbfxbox-rightb"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            resData: {
                // 住房类消费类：
                // 金额 = 65.66亿
                // 占比 = 62.82%
                // 同比 = 25.62%
                zflxf: {
                    num: 65.66,
                    numUnit: "亿",
                    zb:62.82,
                    tb:25.62
                },
                // 非住房类消费类：
                // 金额 = 38.86亿
                // 占比 = 37.18%
                // 同比 = 48.72%
                fzflxf: {
                    num: 38.86,
                    numUnit: "亿",
                    zb:37.18,
                    tb:48.72
                },
                // 部分提取：
                // 金额 = 65.86亿
                // 占比 = 63.01%
                // 同比 = 25.45%
                bftq: {
                    num: 65.86,
                    numUnit: "亿",
                    zb:63.01,
                    tb:25.45
                },
                // 销户提取：
                // 金额 = 38.66亿
                // 占比 = 36.99%
                // 同比 = 49.27%
                xhtq: {
                    num: 38.66,
                    numUnit: "亿",
                    zb:36.99,
                    tb:49.27
                }
            }
        }
    }
}
</script>

<style lang="scss">
.tqlbfx {
    &-line {
        height: 2px;
        background-image: url('../../../../assets/images/dp/tq/fengexian.svg');
    }
    &-lbfxbox {
        display: flex;
        height: 48%;
        width: 100%;
        padding-top: 24px;
        padding-left: 22px;
        padding-right: 21px;

        &-left {
            width: 1.5px;
            margin-top: 10px;
            height: 44%;
            background-color: #06C6EB;
            margin-right: -2px;
            //z-index: 2;
        }

        &-leftb {
            background: #98DA89;
        }
        &-centerbox {
            width: 433px;

            &-ctbox {
                width: 100%;
                display: flex;
                border-bottom: solid 2px #00D3E7;

                &-ctboxOne {
                    width: 114px;
                    height: 30px;
                    background: #00D3E7;
                    border-radius: 10px 0 0 0;
                    font-family: MicrosoftYaHei, serif;
                    font-size: 20px;
                    color: #FFFFFF;
                    text-shadow: 1px 1px 3px #00000094;
                    font-style: normal;
                    text-transform: none;
                    text-align: center;
                    line-height: 30px;
                }

                &-ctboxbOne {
                    width: 64px;
                    background: #98DA89;
                }
                &-ctboxTwo {
                    white-space: nowrap; /* 保持文本在一行显示 */
                    overflow: hidden; /* 隐藏超出部分的文本 */
                    text-overflow: ellipsis; /* 超出部分显示为省略号 */
                    font-family: MicrosoftYaHei, serif;
                    font-size: 14px;
                    color: #FFFFFF;
                    line-height: 20px;
                    text-shadow: 2px 0 2px #000000;
                    text-align: right;
                    font-style: normal;
                    text-transform: none;
                    margin-top: 3px;
                    display: flex;

                    &-zb {
                        width: 123px;
                        &-lefth {
                            margin-left: 12px;
                        }
                        &-number {
                            font-size: 18px;
                            font-weight: bold;
                            color:#C0F6FB;
                        }
                    }
                    &-je {
                        width: 135px;
                        &-lefth {
                            margin-left: 12px;
                        }
                        &-number {
                            color:#FFC35A;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        &-unit {
                            margin-left: -3px;
                        }

                    }

                    &-lefth {
                        margin-left: 12px;
                        color: #EF3628;
                        font-size: 16px;

                    }

                    .number {
                        font-size: 18px;
                        font-weight: bold;
                    }
                }

                &-ctboxTowLeft {
                    margin-left: 64px;
                }
            }

            &-cbbox {
                width: 100%;
                display: flex;
                border-top: solid 2px #0E6DE9;


                &-ctboxOne {
                    font-family: MicrosoftYaHei, serif;
                    font-size: 20px;
                    color: #FFFFFF;
                    line-height: 30px;
                    text-shadow: 1px 1px 3px #00000094;
                    font-style: normal;
                    text-transform: none;
                    text-align: center;
                    box-sizing: border-box;
                    width: 133px;
                    height: 30px;
                    background: #0E6DE9;
                    border-radius: 0 0 10px 0;

                }
                &-ctboxOneb  {
                    background: #4CC6F8;
                    width: 64px;
                    margin-left: 64px;
                }


                &-ctboxTwo {
                    padding-top: 4px;
                    font-family: MicrosoftYaHei, serif;
                    font-size: 14px;
                    color: #FFFFFF;
                    line-height: 20px;
                    text-shadow: 2px 0 2px #000000;
                    text-align: left;
                    font-style: normal;
                    text-transform: none;
                    margin-top: 3px;
                    display: flex;

                    &-percent {
                        text-align: center;
                        width: 64px;
                        display: inline-block;
                        color: #EF3628;
                        font-size: 16px;
                    }
                    &-one {
                        white-space: nowrap; /* 保持文本在一行显示 */
                        overflow: hidden; /* 隐藏超出部分的文本 */
                        text-overflow: ellipsis; /* 超出部分显示为省略号 */
                        width: 110px;

                        &-lefth {
                            margin-left: 0
                        }

                        &-number {
                            font-size: 18px;
                            font-weight: bold;
                            color: #C0F6FB;
                        }


                    }

                    &-two {
                        white-space: nowrap; /* 保持文本在一行显示 */
                        overflow: hidden; /* 隐藏超出部分的文本 */
                        text-overflow: ellipsis; /* 超出部分显示为省略号 */
                        width: 130px;

                        &-lefth {
                            margin-left: 17.5px;

                        }

                        &-number {
                            font-size: 18px;
                            font-weight: bold;
                            color:#FFC35A;
                        }

                        &-unit {
                            margin-left: -3px;
                        }

                    }

                }


            }
            &-cbboxb{
                border-top: solid 2px #4CC6F8;
            }

            &-ccbox {
                width: 100%;
                margin-top: 10px;
                margin-bottom: 10px;
                box-sizing: border-box;
                height: 30px;
                background: linear-gradient(to right, #0A267B, #0C3D9F, #0E68E2);
                border-radius: 5px;
                border: 1px solid #0D55C4;
                &-ccboxPercent {
                    width: 166px;
                    height: 100%;
                    box-sizing: border-box;
                    background: linear-gradient(to right, #06376A, #047CA3, #00D4E8);
                    //z-index: 3;
                    border: 1px solid #00D4E8;
                    border-radius: 5px 0 0 5px;
                }


                &-ccboxPercentb {

                    background: linear-gradient(to right, #2A3C55, #699676, #96D888);
                    //z-index: 3;
                    border: 1px solid #98DA89;
                    border-radius: 5px 0 0 5px;
                }

            }

            &-ccboxb {
                background: linear-gradient(to right, #0A267B, #2A64A6, #42A8DF);

            }
        }

        &-right {
            width: 1.5px;
            height: 46%;
            background: #0E6DE9;
            margin-top: 43px;
            margin-left: -2px;
        }

        &-rightb {
            background: #4CC6F8;
            margin-left: -2px;
        }
    }
}
</style>
