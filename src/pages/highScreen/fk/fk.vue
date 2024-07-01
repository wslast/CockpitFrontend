<template>
    <div class="fk">
        <div class="fk-left">
            <ztydfb class="fk-left-1"/>
            <xzydqk class="fk-left-2"/>
            <clydfbqk class="fk-left-3"/>
        </div>
        <div class="fk-main">
            <kb class="fk-main-1"/>
            <ydsydlqs class="fk-main-2"/>
            <glbydzlqk class="fk-main-3"/>
        </div>
        <div class="fk-right">
            <div class="fk-right-1">
                <div class="fk-right-1-value">12</div>
                <div class="fk-right-1-value">3</div>
            </div>
            <qspm class="fk-right-2"/>
            <zbydsl class="fk-right-3"/>
        </div>
    </div>
</template>

<script>
import Kb from "./components/kb.vue";
import Ydsydlqs from "./components/ydsydlqs.vue";
import Glbydzlqk from "./components/glbydzlqk.vue";
import Ztydfb from "./components/ztydfb.vue";
import Clydfbqk from "./components/clydfbqk.vue";
import Qspm from "./components/qspm.vue";
import Zbydsl from "./components/zbydsl.vue";
import Xzydqk from "./components/xzydqk.vue";

export default {
    components: {
        Xzydqk,
        Zbydsl,
        Qspm,
        Clydfbqk,
        Ztydfb,
        Ydsydlqs,
        Kb,
        Glbydzlqk
    },
    data() {
        return {};
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

<style lang="scss">
.fk {
    $gap: 20px;
    $titleGap: 40px;
    $baseUrl: '../../../assets/images/dp/fk/';

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
                background-image: url('#{$baseUrl}fk_kuang_zuo#{$i}.svg');
            }
        }

        &-1 {
            height: 332px;
        }

        &-2 {
            height: 302px;
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
            padding-top: $titleGap;
            height: 302px;
            background-image: url('#{$baseUrl}fk_kuang_zhongxia.svg');
        }
    }

    &-right {
        @for $i from 1 through 3 {
            &-#{$i} {
                padding-top: $titleGap;
                background-image: url('#{$baseUrl}fk_kuang_you#{$i}.svg');
            }
        }

        &-1 {
            display: flex;
            justify-content: space-between;
            height: 247px;
            padding: 132px 125px 0 34px;

            &-value {
                width: 92px;
                height: 50px;
                line-height: 50px;
                font-size: 42px;
                color: #ffc35a;
                text-align: center;
                font-family: 'pmzdfont', sans-serif;
            }
        }

        &-2 {
            height: 387px;
        }

        &-3 {
            height: 302px;
        }
    }
}
</style>
