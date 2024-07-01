<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<template>
    <div class="fk">
        <div class="df fdc leftContent">
            <card
                :title="'整体疑点分布'"
                style="height:289.997px;margin-bottom:30.01px"
            >
                <ztydfb></ztydfb>
            </card>
            <card
                title="新增疑点情况"
                isClick
                style="height:289.997px;margin-bottom:30.01px"
            >
                <xzydqk></xzydqk>
            </card>
            <card title="存量疑点分布情况" isClick style="height:289.997px;">
                <clydfbqk></clydfbqk>
            </card>
        </div>
        <div class="fg1 df fdc" style="padding: 0vw 32.006px">
            <kb></kb>
            <ydsydlqs style="height:595.008px;"></ydsydlqs>
            <card
                title="管理部疑点整改情况"
                long
                isClick
                style="height:289.997px;"
            >
                <glbydzlqk></glbydzlqk>
            </card>
        </div>
        <div class="df fdc rightContent">
            <card
                :title="'关注指标占比'"
                style="height:289.997px;margin-bottom:30.01px"
            >
                <gzzbzb></gzzbzb>
            </card>
            <card
                title="疑点率排名"
                isClick
                style="height:289.997px;margin-bottom:30.01px"
            >
                <ydlpm></ydlpm>
            </card>
            <card title="全省疑点率排名" style="height:289.997px;">
                <qsydlpm></qsydlpm>
            </card>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        card: () => import('./components/card.vue'),
        ztydfb: () => import('./components/ztydfb.vue'),
        xzydqk: () => import('./components/xzydqk.vue'),
        clydfbqk: () => import('./components/clydfbqk.vue'),
        ydlpm: () => import('./components/ydlpm.vue'),
        qsydlpm: () => import('./components/qsydlpm.vue'),
        glbydzlqk: () => import('./components/glbydzlqk.vue'),
        kb: () => import('./components/kb.vue'),
        ydsydlqs: () => import('./components/ydsydlqs.vue'),
        gzzbzb: () => import('./components/gzzbzb.vue'),
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style scoped lang="scss">
.fk {
    height: 100%;
    display: flex;
    padding: 0vw 24px;
}
.leftContent,
.rightContent {
    width: 476.006px;
    margin-top: 48px;
}
</style>
