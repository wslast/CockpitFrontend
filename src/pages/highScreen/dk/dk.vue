<template>
    <div class="dk">
        <div class="dk-left">
            <div class="dk-left-1">
                <dklxfx/>
            </div>
            <gfmj class="dk-left-2"/>
            <slqdzb class="dk-left-3"/>
        </div>
        <div class="dk-main">
            <div class="dk-main-1">
                <kb></kb>
            </div>
            <dkzsfx  class="dk-main-2"></dkzsfx>
            <div class="dk-main-row">
                <hkzsfx class="dk-main-3"/>
                <dkyezs class="dk-main-4"/>
            </div>
        </div>
        <div class="dk-right">
            <fwlxfx class="dk-right-1"/>
            <dkcsfx class="dk-right-2"/>
            <yhzb class="dk-right-3"/>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        hkzsfx: () => import('./components/hkzsfx.vue'),
        dklxfx: () => import('./components/dklxfx.vue'),
        gfmj: () => import('./components/gfmj.vue'),
        slqdzb: () => import('./components/slqdzb.vue'),
        dkzsfx: () => import('./components/dkzsfx.vue'),
        dkyezs: () => import('./components/dkyezs.vue'),
        jwnfkzsfx: () => import('./components/jwnfkzsfx.vue'),
        dkyqqk: () => import('./components/dkyqqk.vue'),
        awdyhfx: () => import('./components/awdyhfx.vue'),
        fwlxfx:()=> import('./components/fwlxfx.vue'),
        yhzb:()=> import('./components-new/yhzb.vue'),
        dkcsfx:()=> import('./components/dkcsfx.vue'),
        kb:()=> import('./components/kb.vue')
    },
    data() {
        return {
            isYearSelect:true,
            showData: [
                3752,824,9560.7,560.7,66,5
            ],
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
    async mounted() {
        this.getData();
    },
    beforeDestroy() {
    },
    methods: {
        formatter(num){
            return num.toFixed(1)
        },
        changeBoardData(num) {
            // this.showData = [];
            // this.$nextTick(() => {
            //     if (num == 0) {
            //         this.showData = [
            //             this.dataList.ljdkbs,
            //             this.dataList.cldkbs,
            //             this.dataList.ljdkje,
            //             this.dataList.cldkje,
            //         ];
            //         this.unitList = [
            //             '累计(笔)',
            //             '存量(笔)',
            //             '累计(万元)',
            //             '存量(万元)',
            //         ];
            //         this.isYearSelect = false;
            //     } else {
            //         this.showData = [
            //             this.dataList.dndkbs,
            //             this.dataList.dydkbs,
            //             this.dataList.dndkje,
            //             this.dataList.dydkje,
            //         ];
            //         this.unitList = [
            //             '当年(笔)',
            //             '当月(笔)',
            //             '当年(万元)',
            //             '当月(万元)',
            //         ];
            //         this.isYearSelect = true;
            //     }
            //     console.log(this.showData);
            // });
        },
        async getData() {
            return new Promise((resolve, reject) => {
                this.$api
                    .formPost('/api/dyncscript/scriptRule/query', {
                        scriptId: 'dk_kb',
                    })
                    .then((res) => {
                        this.dataList = res.retBody.retList[0];
                        this.showData = [
                            this.dataList.dndkbs,
                            this.dataList.dydkbs,
                            this.dataList.dndkje,
                            this.dataList.dydkje,
                        ];
                        this.unitList = [
                            '当年(笔)',
                            '当月(笔)',
                            '当年(万元)',
                            '当月(万元)',
                        ];
                        resolve();
                    });
            });
        },

    },
};
</script>

<style scoped lang="scss">
.dk {
    $gap: 20px;
    $titleGap: 40px;
    $baseUrl: '../../../assets/images/dp/dk/';

    display: flex;
    flex-wrap: nowrap;
    gap: $gap;
    width: 100%;
    height: 100%;
    padding: 16px 24px 16px;

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
        @for $i from 1 through 3 {
            &-#{$i} {
                padding-top: $titleGap;
                background-image: url('#{$baseUrl}dk_kuang_zuo#{$i}.svg');
            }
        }

        &-1 {
            position: relative;
            height: 437px;
        }

        &-2 {
            display: flex;
            height: 197px;
        }

        &-3 {
            height: 302px;
        }
    }

    &-main {
        &-1 {
            height: 100px;
        }

        &-2 {
            height: 534px;
            background-image: url('../../../assets/images/dp/centre.svg');
        }

        &-3 {
            width: 100%;
            background-image: url('#{$baseUrl}dk_kuang_zhongxia1.svg');
        }

        &-4 {
            width: 100%;
            background-image: url('#{$baseUrl}dk_kuang_zhongxia2.svg');
        }

        &-row{
            display: flex;
            gap: $gap;
            height: 302px;
        }
    }


    &-right {
        @for $i from 1 through 3 {
            &-#{$i} {
                padding-top: $titleGap;
                background-image: url('#{$baseUrl}dk_kuang_you#{$i}.svg');
            }
        }

        &-1 {
            height: 247px;
        }

        &-2 {
            height: 283px;
        }

        &-3 {
            height: 406px;
        }
    }
}

.logoText {
    color: #ffffff;
    line-height: 13.997px;
    font-size: 13.997px;
    height: 13.997px;
    text-align: center;
    margin-bottom: 6.01px;
    margin-top: -12px;
}


.unitText {
    color: #ffffff;
    font-size: 13.997px;
    text-align: center;
    line-height: 13.997px;
    margin-top: 10.003px;
}
.contentTable {
    height: 226.003px;
    margin-bottom: 10.003px;
}
.tableTitle {
    height: 39.994px;
    text-indent: 48px;
    line-height: 39.994px;
    flex-direction: 0;
    flex-shrink: 0;
    background-image: linear-gradient(to right, #00c0ff, #43f0ff, 50%, #00c0ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 22.003px;
    font-weight: 900;
}
.bgFrame {
    background-image: url('../../../assets/images/dp/dk/dk_kuang1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgFrame2 {
    background-image: url('../../../assets/images/dp/dk/dk_kuang2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgFrame3 {
    background-image: url('../../../assets/images/dp/dk/dk_kuang3.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgdkbs {
    background-image: url('../../../assets/images/dp/dk/icon_dkbs.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgdkje {
    background-image: url('../../../assets/images/dp/dk/icon_dkje.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgdklpzr {
    background-image: url('../../../assets/images/dp/dk/icon_dk_lpzr.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}




.bgselect {
    background-image: url('../../../assets/images/dp/dk/tab_minddle_selected.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
}
.bgdefault {
    background-image: url('../../../assets/images/dp/dk/tab_minddle_defult.svg');
    background-repeat: no-repeat;
    color: #a0e1ff;
    background-size: 100% 100%;
}

/deep/ .dataText {
    color: #ffc35a;
    font-size: 24.006px;
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    line-height: 28.006px;
    justify-content: space-between;
}
/deep/ .fontPMZD span {
    font-family: 'pmzdfont', sans-serif !important;
}

.leftText {
    color: #FFFFFF;
    font-size: 14px;
    line-height: 32px;
}
.cunit {
    color: #FFFFFF;
    font-size: 14px;
    padding-left: 5px;
    white-space: nowrap;
    line-height: 32px;
}

.headTop {
    margin-top: -10px;
}
.hleft1 {
    min-width: 95px;
}
.hleft2 {
    min-width: 110px;
}
.hleft3 {
    min-width: 35px;
    margin-left: 10px;
}
</style>
