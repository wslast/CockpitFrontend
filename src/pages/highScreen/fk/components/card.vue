<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
-->
<!--  -->
<template>
    <div
        :class="{
            cockpitCard: !isClick,
            clickableCard: isClick,
            longCard: long,
        }"
    >
        <div class="title">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'card',
    props: {
        long: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        isClick: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {};
    },

    computed: {},

    created() {},

    methods: {},
};
</script>
<style lang="scss" scoped>
.cockpitCard {
    background: url('../../../../assets/images/dp/fk/kuang_1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
}
.longCard {
    background: url('../../../../assets/images/dp/tq/kuang_long.png') !important;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    display: flex;
    flex-direction: column;
}
.clickableCard {
    //background: url('../../../../assets/images/dp/fk/fengkong_kuang_kedianji.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
}
.title {
    height: 39.994px;
    text-indent: 48px;
    line-height: 35.002px;
    background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#00c0ff),
        color-stop(#43f0ff),
        color-stop(50%),
        to(#00c0ff)
    );
    background-image: linear-gradient(to right, #00c0ff, #43f0ff, 50%, #00c0ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 22.003px;
    font-weight: 900;
}
</style>
