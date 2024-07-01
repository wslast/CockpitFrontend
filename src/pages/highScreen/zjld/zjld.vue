<template>
    <div class="zjld">
        <div class="zjld-left">
            <dqckdq class="zjld-left-1"/>
            <ywsz class="zjld-left-2"/>
            <zzsy class="zjld-left-3"/>
        </div>
        <div class="zjld-main">
            <num class="zjld-main-1"/>
            <zjllzst class="zjld-main-2"/>
            <yhck class="zjld-main-3"/>
        </div>
        <div class="zjld-right">
            <quota class="zjld-right-1"/>
            <ckzqfb class="zjld-right-2"/>
            <ckzsfx class="zjld-right-3"/>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        };
    },
    components: {
        Dqckdq: () => import('./components-new/dqckdq.vue'),
        Num: () => import('./components-new/num.vue'),
        zjllzst: () => import('./components-new/zjllzst.vue'),
        Yhck: () => import('./components-new/yhck.vue'),
        Ywsz: () => import('./components-new/ywsz.vue'),
        zzsy: () => import('./components-new/zzsy.vue'),
        ckzqfb: () => import('./components-new/ckzqfb.vue'),
        quota: () => import('./components-new/quota.vue'),
        ckzsfx: () => import('./components-new/ckzsfx.vue'),
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
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
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
        gap: 20px;
    }

    &-left {
        @for $i from 1 through 3 {
            &-#{$i} {
                padding-top: 33px;
            }
        }

        &-1 {
            height: 244px;
            background-image: url('../../../assets/images/dp/zjld/zjld_kuang_zuo1.svg');
        }

        &-2 {
            height: 390px;
            background-image: url('../../../assets/images/dp/zjld/zjld_kuang_zuo2.svg');
        }

        &-3 {
            height: 302px;
            background-image: url('../../../assets/images/dp/zjld/zjld_kuang_zuo3.svg');
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
            height: 302px;
            padding-top: 33px;
            background-image: url('../../../assets/images/dp/zjld/zjld_kuang_zhongxia.svg');
        }
    }


    &-right {
        &-1 {
            height: 258px;
            background-image: url('../../../assets/images/dp/zjld/zjld_kuang_you1.svg');
        }

        &-2 {
            height: 376px;
            padding-top: 33px;
            background-image: url('../../../assets/images/dp/zjld/zjld_kuang_you2.svg');
        }

        &-3 {
            height: 302px;
            padding-top: 33px;
            background-image: url('../../../assets/images/dp/zjld/zjld_kuang_you3.svg');
        }
    }
}
</style>
