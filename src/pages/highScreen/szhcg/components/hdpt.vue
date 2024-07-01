<script>
export default {
    name: "hdpt",
    data(){
        return {
            tValue:[
                {
                    value:'344678',
                    name:'总呼叫量'
                },
                {
                    value:'6.3秒',
                    name:'平均响应时间'
                },
                {
                    value:'285702',
                    name:'自助语音接入量'
                },
                {
                    value:'32%',
                    name:'自助语音接入占比'
                },
            ],
            bValue:[
                8000,
                '3万次',
                '98%'
            ]
        }
    }
}
</script>

<template>
    <div class="hdpt">

        <div class="hdpt-rx">
            <div class="hdpt-rx-item hdpt-rx-item1">
                <div class="hdpt-rx-item-number">{{tValue[0].value}}</div>
                <div class="hdpt-rx-item-text">{{tValue[0].name}}</div>

            </div>
            <div class="hdpt-rx-item hdpt-rx-item2">

                <div class="hdpt-rx-item-number">{{tValue[1].value}}</div>
                <div class="hdpt-rx-item-text">{{tValue[1].name}}</div>
            </div>
            <div class="hdpt-rx-item">

                <div class="hdpt-rx-item-number">{{tValue[2].value}}</div>
                <div class="hdpt-rx-item-text">{{tValue[2].name}}</div>

            </div>
            <div class="hdpt-rx-item">

                <div class="hdpt-rx-item-number">{{tValue[3].value}}</div>
                <div class="hdpt-rx-item-text">{{tValue[3].name}}</div>

            </div>


        </div>
        <div class="hdpt-box">
            <div class="hdpt-box-left" >
                <div class="hdpt-box-left-number">{{bValue[0]}}</div>
            </div>
            <div class="hdpt-box-right">
                <div class="hdpt-box-right-ci">{{bValue[1]}}</div>
                <div class="hdpt-box-right-per">{{bValue[2]}}</div>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .hdpt {
        $baseUrl: '../../../../assets/images/dp/szhcg/';
        height: 100%;
        width: 100%;
        padding-left: 23px;
        padding-right: 34px;
        &-rx {
            width: 564px;
            height: 138px;
            background-image:  url("#{$baseUrl}xia3_kuang1.svg");
            display: flex;
            //background-size: 100% 100%;
            justify-content: center;
            &-item {
                width: 24%;

                &-number {
                    font-size: 30px;
                    color: #F8F671;
                    line-height: 17px;
                    text-align: center;
                    font-family: 'pmzdfont', sans-serif;
                    margin-top: 63px;
                }
                &-text {
                    text-align: center;
                    font-family:  MicrosoftYaHei;
                    font-weight: bold;
                    font-size: 14px;
                    color: #FFFFFF;
                    line-height: 14px;
                    margin-top: 20px;
                }
            }


            &-item1 {
                width: 27%;
                //margin-left: 10px;
            }
            &-item2 {
                width: 21%;
            }

        }
        &-box {
            width: 376px;
            height: 124px;
            background-image:  url("#{$baseUrl}xia3_kuang2.svg");
            margin-left: 7px;
            margin-top: 26px;
            display: flex;
            &-left {
                width: 136px;
                height: 123px;
                &-number {
                    font-size: 32px;
                    color: #F8F671;
                    line-height: 26px;
                    text-align: center;
                    font-family: 'pmzdfont', sans-serif;
                    margin-top: 28px;
                }
            }
            &-right {
                flex: 1;
                &-ci {
                    font-size: 24px;
                    color: #F8F671;
                    line-height: 24px;
                    margin-top: 56px;
                    font-family: 'pmzdfont', sans-serif;
                    margin-left: 23px;
                }

                &-per {
                    font-family: 'pmzdfont', sans-serif;
                    font-size: 24px;
                    color: #F8F671;
                    margin-top: 5px;
                    margin-left: 123px;
                }
            }
        }
    }
</style>
