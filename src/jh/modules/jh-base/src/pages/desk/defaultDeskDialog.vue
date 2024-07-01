<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<!-- 组件设置弹窗弹窗 -->
<template>
    <BaseDialog
        :title="defaultDeskDialogConfig.title"
        :visible="defaultDeskDialogVisible"
        width="1100px"
        append-to-body
        top="5vh"
        @close="close">
        <template slot="body">
            <index @onSuccess="confirm" :data="defaultDeskDialogConfig.data" />
        </template>
    </BaseDialog>
</template>

<script>
export default {
    name:'defaultDeskDialog',
    components: {
        index: resolve => resolve(require("./index")),
    },
    props: {
        defaultDeskDialogVisible:{
            type: Boolean,
            default: false,
        },
        defaultDeskDialogConfig:{
            type: Object,
            default: () => {},
        },
    },
    data () {
        return {
            
        };
    },
    methods: {
        confirm() {
            this.$emit("onSuccess");
            this.close();
        },
        close() {
            this.$emit("update:defaultDeskDialogVisible",false)
        },
    }
}

</script>
<style lang='scss' scoped>
</style>