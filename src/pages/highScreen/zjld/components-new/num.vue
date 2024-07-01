<template>
<div class="zjld-num">
    <div class="zjld-nums" v-for="item in nums" :key="item.name">
        <div class="zjld-nums-icon" :style="{backgroundImage: 'url(' + item.icon + ')'}"></div>
        <div class="zjld-nums-main">
            <div class="zjld-nums-main-value">
                <animate-number
                    duration="2000"
                    from="0"
                    :formatter="(v) => v.toFixed(1)"
                    :to="item.value"
                ></animate-number>
            </div>
            <div class="zjld-nums-main-name">
                {{ item.name }}
                <span class="zjld-nums-main-name-unit">({{ item.mUnit + item.basicUnit }})</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            nums: {
                ckze: {
                    name: '存款总额',
                    icon: require('@/assets/images/dp/zjld/icon_zjld_ckze.svg'),
                    mUnit: '万',
                    basicUnit: '元',
                    value: 9752.5,
                },
                gjjck: {
                    name: '公积金存款',
                    icon: require('@/assets/images/dp/zjld/icon_zjld_gjjck.svg'),
                    mUnit: '万',
                    basicUnit: '元',
                    value: 7542.3,
                },
                zzsyck: {
                    name: '增值收益存款',
                    icon: require('@/assets/images/dp/zjld/icon_zjld_zzsyck.svg'),
                    mUnit: '万',
                    basicUnit: '元',
                    value: 1210.2,
                },
            },
            resData: [

            ]
        };
    },
    computed: {},
    watch: {},
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {},
};
</script>

<style scoped lang="scss">
.zjld {
    &-num {
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        flex-wrap: nowrap;
        gap: 20px;
        width: 100%;
        padding: 12px 0;

        &s {
            display: flex;
            gap: 20px;
            width: 279px;
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
                    font-weight: bold;

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
}
</style>
