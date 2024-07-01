<template>
<div class="zjld-dqckdq">
    <div class="zjld-dqckdqs" v-for="item in resData" :key="item.name">
        <div class="zjld-dqckdqs-title">{{ item.name }}</div>
        <div class="zjld-dqckdqs-data">
            <div class="zjld-dqckdqs-data-num">
                <span class="zjld-dqckdqs-data-num-v">
                    {{item.num}}
                </span>
                笔
            </div>
            <div class="zjld-dqckdqs-data-value">
                <span class="zjld-dqckdqs-data-value-v">
                    {{item.value}}
                </span>
                {{item.unit}}元
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "dqckdq",
    data() {
        return {
            resData:[
                {
                    name: "一月内",
                    num: "4",
                    unit: '万',
                    value: '847.3',
                },
                {
                    name: "1-3个月",
                    num: "12",
                    unit: '万',
                    value: '4828.3',
                },
                {
                    name: "3-6个月",
                    num: "25",
                    unit: '万',
                    value: '6462.7',
                },
                {
                    name: "6-12月",
                    num: "56",
                    unit: '亿',
                    value: '5.36',
                },
            ]
        }
    }
}
</script>

<style scoped lang="scss">
$colors: (
    #ED3628,
    #FFC35A,
    #457AFF,
    #28EF6E
);
.zjld-dqckdq {
    display: flex;
    flex-wrap: wrap;
    padding: 50px 16px 0;
    gap: 8px 16px;

    &s {
        width: 214px;
        height: 82px;
        padding: 15px 20px;
        background-image: url('../../../../assets/images/dp/zjld/zjld_kuang_zuo1_neikuang.svg');

        &-title {
            display: inline-block;
            height: 18px;
            padding-left: 6px;
            color: #fff;
            font-size: 14px;
            line-height: 18px;
            border-radius: 2px 2px 2px 2px;
            font-family: MicrosoftYaHei,serif;
        }

        &-data {
            display: flex;
            justify-content: space-between;
            padding-top: 8px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;

            &-num {
                flex-grow: 0;
                flex-shrink: 0;

                &-v {
                    font-size: 20px;
                    font-weight: bold;
                    font-family: MicrosoftYaHei,serif;
                }
            }

            &-value {
                flex-grow: 1;
                flex-shrink: 1;
                text-align: right;

                &-v {
                    font-size: 20px;
                    font-weight: bold;
                    font-family: MicrosoftYaHei,serif;
                }
            }
        }


        @for $i from 1 through length($colors) {
            &:nth-child(#{$i}) &-title {
                background: linear-gradient(to right, nth($colors, $i), rgba(0, 0, 0, 0));
            }
            &:nth-child(#{$i}) &-data-num-v,
            &:nth-child(#{$i}) &-data-value-v {
                color: nth($colors, $i);
            }
        }
    }
}
</style>
