<template>
    <div class="yhhx-num">
        <div class="yhhx-nums">
            <div class="yhhx-nums-icon" :style="{backgroundImage: 'url(' + yhzs.icon + ')'}"></div>
            <div class="yhhx-nums-main">
                <div class="yhhx-nums-main-value">
                    <animate-number
                        duration="100"
                        from="0"
                        :to="yhzs.value"/>
                    <span class="yhhx-nums-main-value-add">+1</span>
                </div>
                <div class="yhhx-nums-main-name">
                    {{ yhzs.name }}
                    <span class="yhhx-nums-main-name-unit">({{ yhzs.unit + yhzs.basicUnit }})</span>
                </div>
            </div>
        </div>
        <div class="yhhx-nums">
            <div class="yhhx-nums-icon" :style="{backgroundImage: 'url(' + gjjzh.icon + ')'}"></div>
            <div class="yhhx-nums-main">
                <div class="yhhx-nums-main-value">
                    <animate-number
                        duration="1000"
                        from="0"
                        :to="gjjzh.value"/>
                </div>
                <div class="yhhx-nums-main-name">
                    {{ gjjzh.name }}
                </div>
            </div>
        </div>
        <!--关注指标数-->
        <div class="yhhx-nums">
            <div class="yhhx-nums-icon" :style="{backgroundImage: 'url(' + gzzbs.icon + ')'}"></div>
            <div class="yhhx-nums-main">
                <div class="yhhx-nums-main-value">
                    <animate-number
                        duration="100"
                        from="0"
                        :to="gzzbs.value"/>
                </div>
                <div class="yhhx-nums-main-name">
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
            yhzs: {
                name: '银行总数',
                icon: require('@/assets/images/dp/yhhx/icon_yhhx_gjjzh.svg'),
                basicUnit: '家',
                unit: '',
                mUnit: '',
                value: 18,
                ydl: '15.8',
            },
            gjjzh: {
                name: '公积金专户',
                icon: require('@/assets/images/dp/yhhx/icon_yhhx_gjjzh.svg'),
                basicUnit: '',
                unit: '',
                mUnit: '',
                value: 18,
                hb: 12,
            },
            gzzbs: {
                name: '增值收益专户',
                icon: require('@/assets/images/dp/yhhx/icon_yhhx_yhzs.svg'),
                value: 1,
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
.yhhx-num {
    flex-shrink: 0;
    flex-grow: 0;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    width: 100%;
    height: 120px;
    padding: 12px 0 32px 60px;
    background-image: url('../../../../assets/images/dp/yhhx/yhhx_zhongkuang.svg');

    &s {
        display: flex;
        gap: 14px;
        width: 320px;
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

                &-add {
                    font-size: 28px;
                    color:  #ef3628;
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
    }
}
</style>
