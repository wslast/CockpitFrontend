<template>
    <div class="sjgx" >
        <div class="sjgx-top">
            <div class="sjgx-top-item" v-for="(item) in resData" :key="item.name">
                <div class="sjgx-top-item-number">
                    <count-to
                        ref="countTo"
                        :startVal="0"
                        :endVal="item.value"
                        :duration="1000"
                    />
                </div>
                <div class="sjgx-top-item-text">{{item.name}}</div>
            </div>
        </div>
        <div class="sjgx-title">共享接口种类</div>
        <div class="sjgx-bottom">
            <div class="sjgx-bottom-item" v-for="item in zlList" :key="item">
                <div class="sjgx-bottom-item-text">{{item}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "sjgx",
    data(){
        return{
            resData: [
                {name:'共享部门数量',value:'9'},
                {name:'共享接口数量',value:'78'},
                {name:'共享接口调用次数',value:'1780976'},
            ],
            zlList:[
                '住建',
                '民政',
                '税务',
                '工商',
                '不动产',
                '公安',
                '人社',
                '...'
            ]
        }
    }
}
</script>

<style lang="scss">
.sjgx {
    $baseUrl: '../../../../assets/images/dp/szhcg/';
    height: 100%;
    width: 100%;
    padding-left: 33px;
    padding-right: 24px;

    &-title {
        font-family: MicrosoftYaHei;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 44px;
        margin-left: 312px;
        margin-bottom: 5px;
        margin-top: 8px;
    }

    &-top {
        width: 100%;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;

        &-item {
            height: 111px;
            width: 165px;
            background-image: url("#{$baseUrl}xia1_neirongkuang.svg");
            text-align: center;
            &-number {
                margin-top: 33px;
                margin-bottom: 5px;
                span {
                    font-family: 'pmzdfont', sans-serif;
                    font-size: 32px;
                    color: #C3F542;
                }
            }

            &-text {
                font-family: MicrosoftYaHei;
                font-weight: bold;
                font-size: 14px;
                color: #FFFFFF;
            }
        }

    }

    &-bottom {
        margin-left: 186px;
        //background: #00d1b2;
        margin-bottom: 20px;
        height: 120px;
        width: 368px;
        display: flex;
        flex-wrap: wrap;
        &-item {
            width: 82px;
            height: 50px;
            margin-left: 9px;
            margin-top: 4px;
            //margin-top: 10px;
            background-image: url("#{$baseUrl}xia1_jiekouzhonglei_kuang.svg");
            &-text {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                color: #CEE9FF;
                line-height: 51px;
                text-align: center;
            }
        }
    }

}
</style>
