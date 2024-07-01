<template>
    <div class="tq">
        <div class="tq-left">
            <tqlbfx class="tq-left-1"/>
            <zfgxl class="tq-left-2"/>
            <gftq class="tq-left-3"/>
        </div>
        <div class="tq-main">
            <num class="tq-main-1"/>
            <tqzs class="tq-main-2"/>
            <bndtqje class="tq-main-3"/>
        </div>
        <div class="tq-right">
            <tqrhx class="tq-right-1"/>
            <zftqnl class="tq-right-2"/>
            <txnxrq class="tq-right-3"/>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        kb: () => import('./components/kb.vue'),
        gftq: () => import('./components/gftq.vue'),
        zfgxl: () => import('./components/zfgxl.vue'),
        bndtqje: () => import('./components/bndtqje.vue'),
        txnxrq: () => import('./components/txnxrq.vue'),
        tqzs: () => import('./components/tqzs.vue'),
        tqyy: () => import('./components/tqyy.vue'),
        zftqnl: () => import('./components/zftqnl.vue'),
        tqlbfx:()=>import('./components/tqlbfx.vue'),
        tqrhx:()=>import('./components/tqrhx.vue'),
        num:()=>import('./components/num.vue'),
    },
};
</script>

<style scoped lang="scss">
.tq {
    $gap: 20px;
    $titleGap: 33px;
    $baseUrl: '../../../assets/images/dp/tq/';
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
                background-image: url('#{$baseUrl}tq_kuang_zuo#{$i}.svg');
            }
        }

        &-1 {
            height: 360px;
        }

        &-2 {
            height: 274px;
        }

        &-3 {
            height: 302px;
        }
    }

    &-main {

        &-1 {
            display: flex;
            height: 100px;
            background-color: transparent;
        }

        &-2 {
            position: relative;
            height: 534px;
            background-image: url('../../../assets/images/dp/centre.svg');
        }

        &-3 {
            height: 302px;
            padding-top: $titleGap;
            background-color: transparent;
            display: flex;
            flex-direction: column;
            background-image: url('#{$baseUrl}tq_kuang_zhongxia.svg');
        }
    }


    &-right {

        &-1 {
            height: 290px;
            padding-top: $titleGap;
            background-image: url('../../../assets/images/dp/tq/tq_kuang_you1.svg');
        }

        &-2 {
            display: flex;
            flex-direction: column;
            height: 286px;
            background-image: url('../../../assets/images/dp/tq/tq_kuang_you2.svg');
        }

        &-3 {
            height: 360px;
            padding-top: $titleGap;
            background-image: url('../../../assets/images/dp/tq/tq_kuang_you3.svg');
        }
    }
}
</style>
