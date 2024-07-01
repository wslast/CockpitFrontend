<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 上传文件
-->
<template>
    <div>
        <div ref="upload"></div>
        <div ref="fileView"></div>
    </div>
</template>
<script>
import Uploader from './index.js'
export default {
    name:'uploader',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    components: {},

    data () {
        return {
            uploader: null
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.config.uploadBtn = this.$refs.upload;
            this.config.fileView = this.$refs.fileView;
            this.uploader = new Uploader(this.config);
        })
    },
    beforeDestroy() {
        this.uploader = null;
    },

    methods: {}
}

</script>
<style lang='scss' scoped>
@import "./index.css";
</style>
