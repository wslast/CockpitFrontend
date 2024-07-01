<template>
    <div class="rwwcqk">
        <div class="rwwcqk-title">
            <div class="rwwcqk-title-top">
                <div class="rwwcqk-title-top-company">
                    净增单位数
                </div>
                <div class="rwwcqk-title-top-money">
                    缴存金额
                </div>
            </div>
            <div class="rwwcqk-title-button">
                <div class="rwwcqk-title-button-company">
                    <div class="rwwcqk-title-button-company-num">任务数（家）</div>
                    <div class="rwwcqk-title-button-company-p">完成情况</div>
                </div>
                <div class="rwwcqk-title-button-money">
                    <div class="rwwcqk-title-button-money-num">任务数（万）</div>
                    <div class="rwwcqk-title-button-money-p">完成情况</div>
                </div>
            </div>
        </div>
        <div class="rwwcqk-data">
            <div class="rwwcqk-datas" v-for="(item,index) in resData" :key="item.name">
                <div class="rwwcqk-datas-index"> {{ index + 1 }}</div>
                <div class="rwwcqk-datas-name"> {{ item.name }}</div>
                <div class="rwwcqk-datas-slip"/>
                <div class="rwwcqk-datas-company">
                    <div class="rwwcqk-datas-company-num">{{ item.company.num }}</div>
                    <div class="rwwcqk-datas-company-finish">
                        <span class="rwwcqk-datas-company-finish-n">{{ item.company.finishNum }}</span>
                        <span class="rwwcqk-datas-company-finish-t">/</span>
                        <span class="rwwcqk-datas-company-finish-p">{{ item.company.percent }}%</span>
                    </div>
                </div>
                <div class="rwwcqk-datas-slip"/>
                <div class="rwwcqk-datas-money">
                    <div class="rwwcqk-datas-money-num">{{ item.money.num }}</div>
                    <div class="rwwcqk-datas-money-finish">
                        <span class="rwwcqk-datas-money-finish-n">{{ item.money.finishNum }}</span>
                        <span class="rwwcqk-datas-money-finish-t">/</span>
                        <span class="rwwcqk-datas-money-finish-p">{{ item.money.percent }}%</span>
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
            resData: [
                {name: "工商银行",company:{num: 49,finishNum:100,percent: 10},money:{num: 9999,finishNum:9999,percent: 100}},
                {name: "建设银行",company:{num: 999,finishNum:999,percent: 100},money:{num: '19,999',finishNum:'19,999',percent: 100}},
                {name: "农业银行",company:{num: 999,finishNum:999,percent: 100},money:{num: 9999,finishNum:9999,percent: 100}},
                {name: "光大银行",company:{num: 999,finishNum:999,percent: 100},money:{num: 9999,finishNum:9999,percent: 100}},
                {name: "长沙银行",company:{num: 999,finishNum:999,percent: 100},money:{num: 9999,finishNum:9999,percent: 100}},
                {name: "湖南银行",company:{num: 999,finishNum:999,percent: 100},money:{num: 9999,finishNum:9999,percent: 100}},
                {name: "交通银行",company:{num: 999,finishNum:999,percent: 100},money:{num: 9999,finishNum:9999,percent: 100}},
                {name: "中国银行",company:{num: 999,finishNum:999,percent: 100},money:{num: 9999,finishNum:9999,percent: 100}},
            ]
        }
    }
}

</script>

<style lang="scss">
.rwwcqk {
    $baseUrl: '../../../../assets/images/dp/yhhx/';
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;

    &-title {
        width: 442px;
        padding-left: 130px;
        padding-bottom: 4px;
        color: #92F9F8;

        &-top {
            display: flex;
            text-align: center;
            font-size: 14px;
            font-family: MicrosoftYaHei, serif;

            &-company {
                width: 142px;
                padding-right: 2px;
            }
            &-money {
                width: 170px;
            }
        }

        &-button {
            display: flex;
            text-align: center;
            font-size: 12px;
            font-family: MicrosoftYaHei, serif;

            &-company {
                display: flex;
                justify-content: space-between;
                width: 142px;
                padding-right: 2px;
                font-size: 12px;
                &-p {
                    padding-right: 14px;
                }
            }
            &-money {
                display: flex;
                justify-content: space-between;
                width: 170px;
                padding-right: 2px;
                font-size: 12px;
                &-num {
                    padding-left: 4px;
                }
                &-p {
                    padding-right: 14px;
                }
            }
        }
    }

    &-data {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 442px;

        &s {
            $sHig: 32px;
            flex-shrink: 0;
            flex-grow: 0;
            display: flex;
            align-items: center;
            width: 100%;
            height: $sHig;
            padding-left: 6px;
            background-image: url('#{$baseUrl}yhhx_rwpm_bjkuang.svg');
            background-repeat: no-repeat;

            &-index {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 22px;
                height: 22px;
                font-size: 12px;
                font-weight: bold;
                color: #fff;
            }

            &-name {
                width: 100px;
                padding-left: 6px;
                line-height: 20px;
                font-size: 14px;
                font-family: MicrosoftYaHei, serif;
                color: #fff;
            }

            &-slip {
                width: 2px;
                height: 20px;
                background-image: url('#{$baseUrl}slip.svg');
            }

            &-companyNum {
            }

            &-company,
            &-money {
                display: flex;
                justify-content: space-between;
                width: 140px;
                padding: 0 8px 0 16px;
                font-size: 14px;
                font-family: MicrosoftYaHei, serif;
                font-weight: bold;
                color: #01FEFF;

                &-num {
                    text-align: left;
                }

                &-finish {
                    text-align: right;

                    &-n {
                        color: #FFC35A;
                    }
                    &-t {
                        font-weight: lighter;
                        opacity: 0.5;
                    }

                    &-p {
                        color: #FA5E52;
                    }
                }
            }


            &-money {
                width: 170px;
            }
        }
    }
}
</style>
