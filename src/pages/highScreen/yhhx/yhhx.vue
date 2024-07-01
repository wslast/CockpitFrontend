<template>
    <div class="yhhx">
        <div class="yhhx-left">
            <tqbspm  class="yhhx-left-1"></tqbspm>
            <dkfkbs class="yhhx-left-2"/>
            <khpm class="yhhx-left-3" ></khpm>
        </div>
        <div class="yhhx-main">
            <div class="yhhx-main-1">
                <num/>
                <yh-map/>
                <div class="yhhx-main-1-bottom"></div>
            </div>
            <div class="yhhx-main-2"></div>
        </div>
        <div class="yhhx-right">
            <rwwcqk class="yhhx-right-1"/>
            <ckjepm class="yhhx-right-2"/>
            <mydpm class="yhhx-right-3"/>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        num: () => import('./components/num.vue'),
        yhMap: () => import('./components/yh-map.vue'),
        rwwcqk: () => import('./components/rwwcqk.vue'),
        mydpm: () => import('./components/mydpm.vue'),
        ckjepm: () => import('./components/ckjepm.vue'),
        dkfkbs: () => import('./components/dkfkbs.vue'),
        khpm:()=>import('./components/khpm.vue'),
        tqbspm:()=>import('./components/tqbspm.vue')
    },
    data() {
        return {};
    },
    created() {
    },
    methods: {},
};
</script>

<style lang="scss">
.yhhx {
    $baseUrl: '../../../assets/images/dp/yhhx/';
    $gap: 20px;
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
        gap: $gap
    }

    &-left {
        @for $i from 1 through 3 {
            &-#{$i} {
                padding-top: 33px;
                background-image: url('#{$baseUrl}yhhx_kuang_zuo#{$i}.svg');
            }
        }

        &-1 {
            height: 310px;

        }

        &-2 {
            height: 310px;
        }

        &-3 {
            height: 316px;
        }
    }

    &-main {

        &-1 {
            height: 659px;
            position: relative;

            &-bottom {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 25px;
                background-image: url('#{$baseUrl}yhhx_zhongkuang.svg');
                background-position-x: 0;
                background-position-y: 25px;
            }
        }

        &-2 {
            height: 297px;
            background-image: url('#{$baseUrl}yhhx_kuang_zhongxia.svg');
        }
    }


    &-right {

        @for $i from 1 through 3 {
            &-#{$i} {
                padding-top: 33px;
                background-image: url('#{$baseUrl}yhhx_kuang_you#{$i}.svg');
            }
        }

        &-1 {
            height: 390px;
        }

        &-2 {
            height: 230px;
        }

        &-3 {
            height: 316px;
        }
    }
}
</style>
