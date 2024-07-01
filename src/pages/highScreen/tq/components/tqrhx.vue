<template>
    <div>
        <div class="fbox">
            <div class="fbox-tqrhxbox">
                <div class="fbox-tqrhxbox-tqrhxboxleft">
                    年龄
                </div>
                <div class="fbox-tqrhxbox-tqrhxboxcontent">
                    <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox">
                        <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox">
                            16
                        </div>
                        <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx">
                            <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx-perboxradius" style="">
                                15-30
                            </div>
                        </div>
                        <div
                            class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox  fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox2"
                            style="">
                            65
                        </div>
                    </div>
                </div>
            </div>
            <div class="fbox-tqrhxbox">
                <div class="fbox-tqrhxbox-tqrhxboxleft">
                    提取额
                </div>
                <div class="fbox-tqrhxbox-tqrhxboxcontent">
                    <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox">
                        <div
                            class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-twoColor">
                            1千
                        </div>
                        <div
                            class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx  fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-twobColor">
                            <div
                                class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx-perboxradius fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx-twoColorLeft"
                                style="">2千-1.8万
                            </div>
                        </div>

                        <div
                            class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-twoColor   fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox2"
                            style="">
                            60万
                        </div>
                    </div>
                </div>
            </div>
            <div class="fbox-tqrhxbox">
                <div class="fbox-tqrhxbox-tqrhxboxleft">
                    缴存年限
                </div>
                <div class="fbox-tqrhxbox-tqrhxboxcontent">
                    <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox">
                        <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-threeColor">
                            3个月
                        </div>
                        <div
                            class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx  fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-threebColor">
                            <div
                                class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx-perboxradius fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx-threeColorLeft"
                                style="">2月-3年
                            </div>
                        </div>
                        <div
                            class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-threeColor  fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox2"
                            style="">
                            45年
                        </div>
                    </div>
                </div>
            </div>
            <div class="fbox-tqrhxbox">
                <div class="fbox-tqrhxbox-tqrhxboxleft">
                    收入水平
                </div>
                <div class="fbox-tqrhxbox-tqrhxboxcontent">
                    <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox">
                        <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox  fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-fourColor ">
                        </div>
                        <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-fourbColor  ">
                            <div class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx-perboxradius fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-percnettqrhx-fourColorLeft " style="">
                                中丶低收入(85.2%)
                            </div>
                        </div>
                        <div
                            class="fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox  fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-fourColor  fbox-tqrhxbox-tqrhxboxcontent-tqrhperbox-ibox2"
                            style="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss">


.fbox {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 95%;

    &-tqrhxbox {
        display: flex;
        align-items: center;
        text-align: center;

        &-tqrhxboxcontent {
            width: 73%;
            height: 24px;
            position: relative;


            &-tqrhperbox {
                width: 100%;
                display: flex;
                align-items: center;


                &-ibox {
                    border: 0;
                    height: 24px;
                    min-width: 38px;
                    line-height: 25px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    color: #b0b0b0;
                    font-style: normal;
                    text-transform: none;
                    border-right: solid 2px #154ED0;
                    text-align: right;
                    padding-right: 6px;
                }

                &-ibox2 {
                    border: 0;
                    border-left: solid 2px #154ED0;
                    text-align: left;
                    text-indent: 6px;
                }



                &-percnettqrhx {
                    flex: 1;
                    height: 2px;
                    background: #154ED0;
                    position: relative;


                    &-perboxradius {
                        left: 10%;
                        position: absolute;
                        padding-left: 15px;
                        padding-right: 15px;
                        background: #154ED0;
                        //top: -50%
                        height: 30px;
                        line-height: 30px;
                        margin-top: -15px;
                        border-radius: 15px;
                        font-family: MicrosoftYaHei;
                        font-size: 18px;
                        color: #FFFFFF;
                        text-align: center;
                        font-style: normal;
                        text-transform: none;
                    }

                    &-twoColorLeft {
                        background: #F39C12;
                        left: 6%;
                    }
                    &-threeColorLeft {
                        background: #297FC3;
                        left: 3%;
                    }

                    &-fourColorLeft {
                        background: #41B176;
                        left: 12%;
                    }

                }

                &-twoColor {
                    border-color: #F39C12;
                }

                &-twobColor {
                    background: #F39C12;
                }


                &-threeColor {
                    border-color: #297FC3;
                }

                &-threebColor {
                    background: #297FC3;
                }

                &-fourColor {
                    border-color: #41B176;
                }

                &-fourbColor {
                    background: #41B176;
                }

            }
        }

        &-tqrhxboxleft {
            width: 110px;
            text-align: left;
            padding-left: 30px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #FFFFFF;
            line-height: 16px;
            font-style: normal;
            text-transform: none;
        }
    }


}

</style>
