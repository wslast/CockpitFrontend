<!-- 自定义iframe弹窗 -->
<template>
    <BaseDialog
        :title="iframeDialogConfig.title"
        :visible="iframeDialogVisible"
        top="5vh"
        append-to-body
        fullscreen
        @close="close">
        <template slot="body">
            <div class="iframeContent"></div>
        </template>
    </BaseDialog>
</template>

<script>
export default {
    name:'iframeDialog',
    components: {
        BaseDialog: resolve => resolve(require("@/components/baseDialog/index")),
    },

    props: {
        iframeDialogVisible:{
            type: Boolean,
            default: false,
        },
        iframeDialogConfig:{
            type: Object,
            default: () => {},
        },
    },
    data () {
        return {
            materials: {
                files: [],
            },
            //表单
            form: {
                tmpl: {},
                data: {},
            },
            formContent: {},
            showForm: false,
            url: "",
            iframe: null,
        };
    },

    created() {
        
    },
    mounted() {
        //监听发送事件方法
        window.addEventListener("message", this.fetchMessage, false);
        this.iframe = document.createElement("iframe");
        this.iframe.style.height = "calc(100vh - 60px)";
        this.iframe.style.width = "100%";
        this.iframe.style.border = "0px";
        this.iframe.src = this.iframeDialogConfig.url;
        //ie注册事件
        if (this.iframe.attachEvent){
            this.iframe.attachEvent("onload", () => {
                //向子页面发送数据
                this.iframe.contentWindow.postMessage(this.iframeDialogConfig.data, '*');
            });
        } else {
            this.iframe.onload = () => {
                this.iframe.contentWindow.postMessage(this.iframeDialogConfig.data, '*');
            };
        }
        this.$nextTick(() => {
            document.querySelector(".iframeContent").appendChild(this.iframe);
        });
    },
    beforeDestroy() {
        //回收监听事件
        window.removeEventListener("message", this.fetchMessage, false);
    },
    methods: {
        fetchMessage(e) {
            this.showForm = true;
            if(e.data.message === "表单postMessage提交") {
                this.formContent = JSON.parse(e.data.form.formcontent);
                this.$nextTick(() => {
                    setTimeout(() => {
                        e.data.form.tmplTargetContent = JSON.stringify(this.$refs['restore'].getValue().content);
                        this.$emit("onSuccess",e.data.form);
                        this.showForm = false;
                    }, 1000);
                })
            }
        },
        confirm() {
            this.close();
        },
        close() {
            this.$emit("update:iframeDialogVisible",false);
        },
    }
}

</script>
<style lang='scss' scoped>
.iframe{
    height: calc(100vh - 60px);
    width: 100%;
}
</style>