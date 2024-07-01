<template>
    <div class="tq-num">
        <div class="tq-num-tag">
            <div class="tq-num-tags"
                 @click="clickSetTag(index)"
                 v-for="(item,index) in tag.tags"
                 :key="item"
                 :class="{active:index === tag.currentIndex}">
                {{ item }}
            </div>
        </div>
        <div class="tq-num-t">
            <div class="tq-num-ts" v-for="(item) in nums" :key="item.name">
                <div class="tq-num-ts-icon" :style="{backgroundImage: 'url(' + item.icon + ')'}"></div>
                <div class="tq-num-ts-main">
                    <div class="tq-num-ts-main-value">
                        <count-to
                            :decimals="decimalPlacesCount(item.value)"
                            ref="countTo"
                            :startVal="0"
                            :endVal="item.value"
                            :duration="1000"
                        />
                    </div>
                    <div class="tq-num-ts-main-name">
                        {{ item.name }}
                        <span class="tq-num-ts-main-name-unit">({{ item.mUnit + item.basicUnit }})</span>
                    </div>
                </div>
                <div class="tq-num-ts-tip" v-if="item.tb !== 0">
                    <div class="tq-num-ts-tip-value">
                        <count-to
                            ref="countTo"
                            suffix="%"
                            prefix="+"
                            :decimals="1"
                            :duration="1000"
                            :startVal="0"
                            :endVal="item.tb"/>
                    </div>
                    <div class="tq-num-ts-tip-name">
                        同比
                        <span class="tq-num-ts-tip-name-arr"></span>
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
            tag: {
                tags: ['累计', '当年', '当月'],
                currentIndex: 1,
                intervalId: null
            },
            nums: [
                {
                    name: '提取笔数',
                    icon: require('@/assets/images/dp/tq/icon_tq_tqbs.svg'),
                    mUnit: '',
                    basicUnit: '笔',
                    value: 0,
                    tb: 0
                },
                {
                    name: '提取金额',
                    icon: require('@/assets/images/dp/tq/icon_tq_tqje.svg'),
                    mUnit: '亿',
                    basicUnit: '元',
                    value: 0,
                    tb: 0
                }
            ],

// 当月（2023-12）：
// 笔数=97104
// 金额=98861.66万元
//
// 当月同比（2023-12）：
// 笔数同比= 18.11%
// 金额同比= 42.31%
            resData: [
                {
                    // 累计
                    num: 921.52,
                    numTb: 0,
                    numUnit: '万',
                    value: 634.33,
                    valueTb: 0,
                    valueUnit: '亿',
                },
                {
                    // 当年
                    num: 108.16,
                    numTb: 9.8,
                    numUnit: '万',
                    value: 104.52,
                    valueTb: 33.3,
                    valueUnit: '亿',
                },
                {
                    // 当月
                    num: 97104,
                    numTb: 18.11,
                    numUnit: '',
                    value: 9.886,
                    valueTb: 42.31,
                    valueUnit: '亿',
                }
            ]
        };
    },
    mounted() {
        this.setTag(this.tag.currentIndex);
        this.startScheduledTask()
    },
    beforeDestroy() {
        this.stopScheduledTask();
    },
    methods: {
        clickSetTag(index) {
            this.setTag(index)
            this.startScheduledTask()
        },
        /**
         * 调整tab
         * @param index
         */
        setTag(index) {
            this.tag.currentIndex = index;
            const data = this.resData[index]
            const {num, numTb, numUnit, value, valueTb, valueUnit,} = data;
            // 笔数
            this.nums[0].value = num;
            this.nums[0].tb = numTb;
            this.nums[0].mUnit = numUnit;
            // 金额
            this.nums[1].value = value;
            this.nums[1].tb = valueTb;
            this.nums[1].mUnit = valueUnit;

            this.$refs.countTo.map(ref => ref.reset())
        },
        /**
         * 判断数值小数点为
         * @param num
         * @returns {number|number}
         */
        decimalPlacesCount(num) {
            const numStr = num.toString();

            const decimalIndex = numStr.indexOf('.');

            if (decimalIndex === -1) {
                return 0;
            }

            const decimalCount = numStr.length - decimalIndex - 1;

            return decimalCount > 2 ? 2 : decimalCount;
        },
        /**
         * 启动定时器
         */
        startScheduledTask() {
            this.stopScheduledTask()
            this.tag.intervalId = setInterval(() => {
                this.tag.currentIndex = (this.tag.currentIndex + 1) % this.tag.tags.length;
                this.setTag(this.tag.currentIndex);
            }, 10 * 1000); // 间隔时间，以毫秒为单位
        },
        /**
         * 关闭定时器
         */
        stopScheduledTask() {
            if (this.tag.intervalId) {
                clearInterval(this.tag.intervalId);
                this.tag.intervalId = null;
            }
        }
    },
};
</script>

<style lang="scss">
.tq {
    $baseUrl: '../../../../assets/images/dp/tq/';

    &-num {
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        flex-wrap: nowrap;
        gap: 24px;
        width: 100%;

        &-tag {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 6px;

            &s {
                width: 62px;
                height: 24px;
                background-image: url("../../../../assets/images/dp/tq/tq_tab_defult.svg");
                background-size: contain; /* 确保背景图片按照原比例缩放 */
                background-repeat: no-repeat; /* 防止背景图片重复 */
                text-align: center;
                color: #a0e1ff;
                cursor: pointer;

                &.active {
                    background-image: url("#{$baseUrl}tq_tab_selected.svg");
                    color: #fff;
                }
            }
        }

        &-t {
            flex-shrink: 1;
            flex-grow: 1;
            display: flex;
            flex-wrap: nowrap;
            gap: 6px;
            width: 100%;
            padding: 12px 0;

            &s {
                flex-shrink: 0;
                flex-grow: 0;
                display: flex;
                gap: 10px;
                width: 381px;
                height: 100%;
                color: #ffffff;

                &-icon {
                    width: 76px;
                    height: 76px;
                    background-position: bottom left;
                    background-repeat: no-repeat;
                }

                &-main,
                &-tip,
                &-compare {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding-bottom: 9px;
                }

                &-main {

                    &-value {
                        position: relative;
                        min-width: 146px;
                        font-size: 36px;
                        color: #FFC35A;

                        span {
                            font-family: 'pmzdfont', sans-serif;
                        }

                        -webkit-box-reflect: below -12px linear-gradient(
                                to bottom,
                                rgba(0, 0, 0, 0) 45%,
                                rgba(0, 0, 0, 0.1) 50%,
                                rgba(0, 0, 0, 0.3) 75%,
                                #fff 100%
                        );
                    }

                    &-name {
                        font-size: 16px;
                        font-weight: bold;

                        &-unit {
                            padding-left: 8px;
                        }
                    }
                }

                &-tip {

                    &-value {
                        position: relative;
                        z-index: 1;
                        font-size: 36px;
                        color: #ef3628;

                        &.green {
                            color: #28ef6e;
                        }

                        span {
                            font-family: 'pmzdfont', sans-serif;
                        }

                        -webkit-box-reflect: below -12px linear-gradient(
                                to bottom,
                                rgba(0, 0, 0, 0) 45%,
                                rgba(0, 0, 0, 0.1) 50%,
                                rgba(0, 0, 0, 0.3) 75%,
                                #fff 100%
                        );
                    }

                    &-name {
                        z-index: 2;
                        font-size: 16px;
                        line-height: 16px;

                        &-arr {
                            display: inline-block;
                            width: 17px;
                            height: 16px;
                            margin-left: 12px;
                            background-image: url("#{$baseUrl}arrow_red.svg");
                        }
                    }
                }

                &-compare {
                    width: 115px;

                    &s {
                        padding-top: 10px;

                        &-value {
                            padding-left: 6px;
                            color: #EF3628;
                            font-size: 18px;
                            font-family: 'pmzdfont', sans-serif;
                        }
                    }
                }
            }
        }
    }
}
</style>
