<template>
    <div class="szhcg">
        <div class="szhcg-left">
            <fwfs class="szhcg-left-1"/>
            <div class="szhcg-left-2">
                <sjgx ></sjgx>
            </div>

        </div>
        <div class="szhcg-main">
            <div class="szhcg-main-1"></div>
            <div class="szhcg-main-2"></div>
        </div>
        <div class="szhcg-right">
            <div class="szhcg-right-1"></div>
            <div class="szhcg-right-2">
                <hdpt></hdpt>
            </div>
        </div>
    </div>
</template>

<script>
import Fwfs from "./components/fwfs.vue";
import sjgx from './components/sjgx.vue'
import hdpt from "./components/hdpt.vue";

export default {
    components: {Fwfs,sjgx,hdpt},
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

<style scoped lang="scss">
.szhcg {
    $gap: 24px;
    $baseUrl: '../../../assets/images/dp/szhcg/';
    display: flex;
    flex-wrap: nowrap;
    gap: $gap;
    width: 100%;
    height: 100%;
    padding: 16px $gap 16px;

    &-left,
    &-right {
        width: 608px;
    }

    &-left,
    &-right,
    &-main {
        display: flex;
        flex-direction: column;
        gap: $gap;


        @for $i from 1 through 2 {
            &-#{$i} {
                padding-top: 80px;
            }
        }
    }


    &-left {

        &-1 {
            height: 570px;
            background-image: url("#{$baseUrl}szhcg_kuang_shang1.svg");
        }

        &-2 {
            height: 382px;
            background-image: url("#{$baseUrl}szhcg_kuang_xia1.svg") ;
        }
    }

    &-main {
        width: 616px;

        &-1 {
            height: 442px;
            background-image: url("#{$baseUrl}szhcg_kuang_shang2.svg");
        }

        &-2 {
            height: 510px;
            background-image: url("#{$baseUrl}szhcg_kuang_xia2.svg");
        }

    }


    &-right {

        &-1 {
            height: 570px;
            background-image: url("#{$baseUrl}szhcg_kuang_shang3.svg");
        }

        &-2 {
            height: 382px;
            background-image: url("#{$baseUrl}szhcg_kuang_xia3.svg");
        }

    }
}
</style>
