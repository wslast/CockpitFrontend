<template>
    <div class="ckjepm">
        <div class="ckjepm-box">
            <div class="ckjepm-icon"></div>

            <div class="ckjepm-box-item">

                <div  class="ckjepm-box-item-img"></div>
                <div  class="ckjepm-box-item-text">
                    <div class="ckjepm-box-item-text-name">{{list[0].name}}</div>

                    <div class="ckjepm-box-item-text-number">{{list[0].value}}</div>

                    <div class="ckjepm-box-item-text-unit">亿元</div>


                </div>
            </div>

            <div class="ckjepm-box-item  ckjepm-box-item2">

                <div  class="ckjepm-box-item-img ckjepm-box-item2-img2"></div>
                <div  class="ckjepm-box-item-text">
                    <div class="ckjepm-box-item-text-name">{{list[1].name}}</div>

                    <div class="ckjepm-box-item-text-number">{{list[1].value}}</div>

                    <div class="ckjepm-box-item-text-unit">亿元</div>


                </div>
            </div>

            <div class="ckjepm-box-item  ckjepm-box-item3 ">

                <div  class="ckjepm-box-item-img"></div>
                <div  class="ckjepm-box-item-text">
                    <div class="ckjepm-box-item-text-name">{{list[2].name}}</div>

                    <div class="ckjepm-box-item-text-number">{{list[2].value}}</div>

                    <div class="ckjepm-box-item-text-unit">亿元</div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {name: '工商银行', value:'81'},
                {name: '农业银行', value:'20'},
                {name: '湖南银行', value:'20'},
            ]
        }
    },

}
</script>

<style lang="scss">
.ckjepm {
    $baseUrl: '../../../../assets/images/dp/yhhx/';
    display: flex;
    align-items: center;

    &-box {
        width: 100%;
        height: 180px;
        display: flex;
        position: relative;
        &-item {
            height: 18px;
            //background: yellow;
            position: absolute;
            left: 20%;
            top: 11%;
            width: 78%;
            display: flex;
            align-items: center;

            &-img {
                background: url("#{$baseUrl}ckpmje_line.svg") no-repeat;
                width: 195px;
                height: 6px;
                background-size: 100% 100%;
            }
            &-text {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                color: #FFFFFF;
                display: flex;
                align-items: end;
                //margin-left:18px;
                white-space: nowrap;
                &-name {
                    text-align: left;
                    width: 80px;
                    //min-width: 64px
                    line-height: 16px;
                }
                &-number {
                    font-weight: bold;
                    font-size: 18px;
                    color: #01FEFF;
                    margin-left:20px;
                    line-height: 18px;
                }

                &-unit {
                    font-size: 12px;
                }
            }
        }
        &-item2 {
            left: 25%;
            top: 43%;
            &-img2 {
                width: 171px;
            }
        }

        &-item3 {
            top: 73%;
        }
    }

    &-icon {
        width: 130px;
        height: 100%;
        background-image: url("#{$baseUrl}ckpmje_tu.svg");
    }



}
</style>
