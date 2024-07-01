<template>
    <div class="jc">
        <div class="jc-num">
            <div class="jc-nums" v-for="item in nums" :key="item.name">
                <div class="jc-nums-icon" :style="{backgroundImage: 'url(' + item.icon + ')'}"></div>
                <div class="jc-nums-main">
                    <div class="jc-nums-main-value">
                        <animate-number
                            duration="2000"
                            from="0"
                            :to="item.value"
                        ></animate-number>
                    </div>
                    <div class="jc-nums-main-name">
                        {{ item.name }}
                        <span class="jc-nums-main-name-unit">({{ item.unit + item.basicUnit }})</span>
                    </div>
                </div>
                <div class="jc-nums-compare">
                    <div class="jc-nums-compares">
                        同比<span class="jc-nums-compares-value">{{ item.tb }}%</span>
                    </div>
                    <div class="jc-nums-compares">
                        环比<span class="jc-nums-compares-value">{{ item.hb }}%</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="jc-row">
            <div class="jc-left">
                <div class="jc-left-1">
                    <sjzhzs/>
                </div>
                <div class="jc-left-2">
                    <jcjs/>
                </div>
                <div class="jc-left-3">
                    <jcrq/>
                </div>
            </div>
            <div class="jc-main">
                <div class="jc-main-1">
                    <tqzs/>
                </div>
                <div class="jc-main-row">
                    <tsqk class="jc-main-2"/>
                    <div class="jc-main-3">
                        <xhrq/>
                    </div>
                </div>
            </div>
            <div class="jc-right">
                <div class="jc-right-1">
                    <tj/>
                </div>
                <div class="jc-right-2">
                    <khxh/>
                </div>
                <div class="jc-right-3">
                    <jcnl/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        sjzhzs: () => import('./components/sjzhzs.vue'),
        jcjs: () => import('./components/jcjs.vue'),
        jcrq: () => import('./components/jcrq.vue'),
        tqzs: () => import('./components/tqzs.vue'),
        tsqk: () => import('./components/tsqk.vue'),
        xhrq: () => import('./components/xhrq.vue'),
        tj: () => import('./components/tj.vue'),
        khxh: () => import('./components/khxh.vue'),
        jcnl: () => import('./components/jcnl.vue'),
    },
    data() {
        return {
            nums: {
                xkhdws: {
                    name: '新开户单位',
                    icon: require('@/assets/images/dp/jc/icon_jc_sjdw.svg'),
                    basicUnit: '家',
                    mUnit: '',
                    value: 0,
                    tb: 0,
                    hb: 0,
                },
                xkhzgs: {
                    name: '新开户职工',
                    icon: require('@/assets/images/dp/jc/icon_jc_xkhzg.svg'),
                    basicUnit: '人',
                    mUnit: '',
                    value: 0,
                    tb: 0,
                    hb: 0,
                },
                sjdw: {
                    name: '实缴单位',
                    icon: require('@/assets/images/dp/jc/icon_jc_sjdw.svg'),
                    basicUnit: '家',
                    mUnit: '',
                    value: 0,
                    tb: 0,
                    hb: 0,
                },
                sjzg: {
                    name: '实缴职工',
                    icon: require('@/assets/images/dp/jc/icon_jc_sjzg.svg'),
                    basicUnit: '人',
                    mUnit: '万',
                    value: 0,
                    tb: 0,
                    hb: 0,
                },
                sjce: {
                    name: '实缴存额',
                    icon: require('@/assets/images/dp/jc/icon_jc_sjce.svg'),
                    basicUnit: '元',
                    mUnit: '亿',
                    value: 0,
                    tb: 0,
                    hb: 0,
                },
            }
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {
    },
    created() {
        this.getNumData()
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        /**
         * 查询头部数据
         */
        getNumData() {
            const res = {
                xkhdws: {
                    value: 99,
                    unit: '',
                    tb: '+33.43',
                    hb: -11.22,
                },
                xkhzgs: {
                    value: 21097,
                    unit: '',
                    tb: '+33.43',
                    hb: -11.22,
                },
                sjdw: {
                    value: 4477,
                    unit: '',
                    tb: '+33.43',
                    hb: -11.22,
                },
                sjzg: {
                    value: 321097,
                    unit: '',
                    tb: +'+33.43',
                    hb: -11.22,
                },
                sjce: {
                    value: 3.20,
                    unit: '亿',
                    tb: '+33.43',
                    hb: -11.22,
                }
            }

            for (const key in this.nums) {
                ['value', 'unit', 'tb', 'hb'].map(k => this.nums[key][k] = res[key][k])
            }

            // this.$api
            //     .formPost('/api/dyncscript/scriptRule/query', {
            //         scriptId: 'jc_kb',
            //     })
            //     .then((res) => {
            //         console.log(res.retBody.retList[0]);
            //     })
            //     .catch(error => {
            //         // todo
            //     })
        },
    },
};
</script>

<style scoped lang="scss">
.jc {
    $gap: 20px;
    $titleGap: 40px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: $gap;
    width: 100%;
    height: 100%;
    padding: 16px 24px 16px;

    &-num {
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        flex-wrap: nowrap;
        gap: 30px;
        width: 100%;
        height: 100px;
        padding: 12px 0;

        &s {
            display: flex;
            gap: 10px;
            width: 350px;
            height: 100%;
            color: #ffffff;

            &-icon {
                width: 76px;
                height: 76px;
                background-position: bottom left;
                background-repeat: no-repeat;
            }

            &-main,
            &-compare {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding-bottom: 9px;
            }

            &-main {
                width: 139px;

                &-value {
                    position: relative;
                    font-size: 36px;
                    color: #FFC35A;

                    span {
                        font-family: 'pmzdfont', sans-serif;
                    }

                    -webkit-box-reflect: below -12px linear-gradient(
                            to bottom,
                            rgba(0, 0, 0, 0) 0%,
                            rgba(0, 0, 0, 0) 25%,
                            #fff 100%
                    );
                }

                &-name {
                    font-size: 16px;

                    &-unit {
                        padding-left: 8px;
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

    &-row {
        display: flex;
        flex-wrap: nowrap;
        flex-grow: 1;
        flex-shrink: 1;
        gap: $gap;
        width: 100%;
        height: 100%;
    }

    &-left,
    &-right {
        width: 477px;
    }

    &-main {
        width: 878px;
    }

    &-left,
    &-right,
    &-main {
        display: flex;
        flex-direction: column;
        gap: $gap;
    }

    &-left {

        * {
            box-sizing: border-box;
        }

        &-1 {
            display: flex;
            height: 253px;
            padding-top: $titleGap;
            background-image: url('../../../assets/images/dp/jc/jc_kuang_zuo1.svg');
        }

        &-2 {
            height: 261px;
            padding-top: $titleGap;
            background-image: url('../../../assets/images/dp/jc/jc_kuang_zuo2.svg');
        }

        &-3 {
            height: 302px;
            padding-top: $titleGap;
            background-image: url('../../../assets/images/dp/jc/jc_kuang_zuo3.svg');
        }
    }

    &-main {

        &-1 {
            height: 534px;
            background-image: url('../../../assets/images/dp/centre.svg');
            // 备份用图
            //background-image: url('../../../assets/images/dp/jc/jc_kuang_zhong.svg');
        }

        &-2,
        &-3 {
            width: 100%;
            padding-top: $titleGap;
        }
        &-2 {
            background-image: url('../../../assets/images/dp/jc/jc_kuang_zhongxia1.svg');
        }
        &-3 {
            width: 100%;
            background-image: url('../../../assets/images/dp/jc/jc_kuang_zhongxia2.svg');
        }

        &-row {
            display: flex;
            gap: $gap;
            height: 302px;
        }
    }


    &-right {

        &-1,
        &-2,
        &-3 {
            padding-top: $titleGap;
        }

        &-1 {
            height: 253px;
            background-image: url('../../../assets/images/dp/jc/jc_kuang_you1.svg');
        }

        &-2 {
            height: 261px;
            background-image: url('../../../assets/images/dp/jc/jc_kuang_you2.svg');
        }

        &-3 {
            height: 302px;
            background-image: url('../../../assets/images/dp/jc/jc_kuang_you3.svg');
        }
    }
}
</style>
