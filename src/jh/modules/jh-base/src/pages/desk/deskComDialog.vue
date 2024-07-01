<!-- 组件设置弹窗弹窗 -->
<template>
    <BaseDialog
        :title="deskComDialogConfig.title"
        :visible="deskComDialogVisible"
        width="600px"
        append-to-body
        top="5vh"
        @close="close">
        <template slot="body">
            <el-form :model="form" :rules="rules" label-width="100px" ref="form" >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="组件名称" prop="id">
                            <el-select v-model="form.compId" style="width:100%;" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.compName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="宽度" prop="w">
                            <el-input-number style="width:100%;" v-model="form.w" :step="10"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="高度" prop="h">
                            <el-input-number style="width:100%;" v-model="form.h" :step="10"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="横坐标" prop="x">
                            <el-input-number style="width:100%;" v-model="form.x" :step="10"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="纵坐标" prop="y">
                            <el-input-number style="width:100%;" v-model="form.y" :step="10"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
        <span slot="footer" class="dialog-footer">
            <el-button  @click="close">取 消</el-button>
            <el-button  type="primary" @click="confirm">确 定</el-button>
        </span>
    </BaseDialog>
</template>

<script>
export default {
    name:'deskComDialog',
    props: {
        deskComDialogVisible:{
            type: Boolean,
            default: false,
        },
        deskComDialogConfig:{
            type: Object,
            default: () => {},
        },
    },
    data () {
        return {
            form:{
                compId: "",
                x: "",
                y: "",
                w: 200,
                h: 200,
            },
            rules:{
                compId: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                x: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                y: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                w: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                h : [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
            },
            options:[],
        };
    },
    created() {
        if(this.deskComDialogConfig.data) {
            this.form = JSON.parse(JSON.stringify(this.deskComDialogConfig.data));
        }
        this.getData();
    },
    methods: {
        getData() {
            this.$api.formPost("/api/basfun/desk/deskComp/getListByUserId",{}).then(res => {
                this.options = res.retBody.list;
            })
        },
        confirm() {
            this.form.compName = this.options.filter(item => {return item.id === this.form.compId})[0].compName;
            this.$refs['form'].validate((valid) => {
                this.form.deskId = new Date().getTime();
                this.$emit("onSuccess",this.form);
                this.close();
            })
        },
        close() {
            this.$emit("update:deskComDialogVisible",false)
        },
    }
}

</script>
<style lang='scss' scoped>
</style>