<template>
    <div class="fk-num">
        <div class="fk-nums">
            <div class="fk-nums-icon" :style="{backgroundImage: 'url(' + ztyds.icon + ')'}"></div>
            <div class="fk-nums-main">
                <div class="fk-nums-main-value">
                    <animate-number
                        duration="2000"
                        from="0"
                        :to="ztyds.value"/>
                </div>
                <div class="fk-nums-main-name">
                    {{ ztyds.name }}
                    <span class="fk-nums-main-name-unit">({{ ztyds.unit + ztyds.basicUnit }})</span>
                </div>
            </div>
            <div class="fk-nums-mainSub">
                <div class="fk-nums-mainSub-value">
                    <animate-number
                        :formatter="format"
                        duration="100"
                        from="0"
                        :to="ztyds.ydl"/>
                    <span>%</span>
                </div>
                <div class="fk-nums-mainSub-name">
                    疑点率
                </div>
            </div>
        </div>
        <div class="fk-nums">
            <div class="fk-nums-icon" :style="{backgroundImage: 'url(' + dyxz.icon + ')'}"></div>
            <div class="fk-nums-main">
                <div class="fk-nums-main-value">
                    <animate-number
                        duration="2000"
                        from="0"
                        :to="dyxz.value"/>
                </div>
                <div class="fk-nums-main-name">
                    {{ dyxz.name }}
                </div>
            </div>
            <div class="fk-nums-mainSub">
                <div class="fk-nums-mainSub-value red">
                    <animate-number
                        :formatter="format"
                        duration="100"
                        from="0"
                        :to="dyxz.hb"/>
                    <span>%</span>
                </div>
                <div class="fk-nums-mainSub-name">
                    新增环比
                </div>
            </div>
        </div>
        <!--关注指标数-->
        <div class="fk-nums">
            <div class="fk-nums-icon" :style="{backgroundImage: 'url(' + gzzbs.icon + ')'}"></div>
            <div class="fk-nums-main">
                <div class="fk-nums-main-value">
                    <animate-number
                        :formatter="(v) => v.toFixed(1)"
                        duration="100"
                        from="0"
                        :to="gzzbs.value"/>
                    <span>%</span>
                </div>
                <div class="fk-nums-main-name">
                    {{ gzzbs.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'kb',
    components: {},

    data() {
        return {
            ztyds: {
                name: '总体疑点数',
                icon: require('@/assets/images/dp/fk/icon_fk_ztyds.svg'),
                basicUnit: '个',
                unit: '',
                mUnit: '',
                value: 528,
                ydl: '15.8',
            },
            dyxz: {
                name: '当月新增',
                icon: require('@/assets/images/dp/fk/icon_fk_dyxz.svg'),
                basicUnit: '',
                unit: '',
                mUnit: '',
                value: 2000,
                hb: 12,
            },
            gzzbs: {
                name: '关注指标占比',
                icon: require('@/assets/images/dp/fk/icon_dk_gzzbzb.svg'),
                value: 45,
            }
        };
    },

    created() {
        this.getData();
    },

    methods: {
        format(val) {
            return val.toFixed(1);
        },
        getData() {
            this.$api.formPost("/api/dyncscript/scriptRule/query", {
                scriptId: "fk_sp_kb"
            }).then(res => {
                this.list = res.retBody.retList;
            });
        },
        /**
         * @description: number组件保留几位小数
         * @return {*}
         * @param {*} num
         */
        formatter(num) {
            return num.toFixed(2); //小数点后几位，数字就是几小数点后几位
        },
    },
};
</script>

<style lang="scss">
.fk-num {
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    width: 100%;
    height: 100px;
    padding: 12px 0;

    &s {
        display: flex;
        gap: 14px;
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
        &-mainSub,
        &-compare {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: 9px;
        }

        &-main {
            width: 126px;

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
                    padding-left: 4px;
                }
            }
        }

        &-mainSub {
            width: 80px;

            &-value {
                position: relative;
                font-size: 24px;
                color: #FFC35A;

                &.green {
                    color: #28ef6e;
                }

                &.red {
                    color:  #ef3628;
                }

                span {
                    font-family: 'pmzdfont', sans-serif;
                }

                -webkit-box-reflect: below -8px linear-gradient(
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
    }
}
</style>
