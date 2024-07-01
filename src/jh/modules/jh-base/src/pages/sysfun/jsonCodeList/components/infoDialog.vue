<!--
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
-->
<template>
    <BaseDialog
        :title="jsonCodeInfoDialogConfig.title"
        :visible="jsonCodeInfoDialogVisible"
        top="15vh"
        append-to-body
        width="1000px"
        @close="close">
        <template slot="body">
            <el-form :model="form" :rules="rules" ref="form" label-width="110px" label-position="right" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="参数类型" label-width="120px" prop="code">
                            <el-select v-model="form.code" placeholder="请选择参数类型" style="width:100%;">
                                <el-option
                                    v-for="item in options"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否可用" label-width="120px" prop="codeEnabledState">
                            <el-radio v-model="form.codeEnabledState" label="1">是</el-radio>
                            <el-radio v-model="form.codeEnabledState" label="0">否</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类别" label-width="120px">
                            <el-select v-model="form.codeType"  style="width:100%;">
                                <el-option
                                    v-for="item in codeType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注" label-width="120px" >
                            <el-input v-model="form.remark" type="textarea" :autosize="{minRows: 2,maxRows: 2}"   ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
        <div slot="footer">
            <el-button @click="close" >取 消</el-button>
            <el-button type="primary" @click="confirm" >保 存</el-button>
        </div>
    </BaseDialog>
</template>

<script>
export default {
    name:'jsonCodeInfoDialog',
    props: {
        jsonCodeInfoDialogConfig: {
            type: Object,
            default: () => {}
        },
        jsonCodeInfoDialogVisible: {
            type: Boolean,
            default: () => false
        }
    },
    data () {
        return {
            form: {
                code:"",
                codeName:"",
                codeEnabledState:"",
                remark:"",
                ordinal:"",
                codeType:""
            },
            codeType:[
                { "label": "固有", "value": "1" },
                { "label": "自定义", "value": "2" },
            ],
            options: [],
            rules: {
                code: [{ required: true, message: '请输入编码类型', trigger: 'submit' }],
                name: [{ required: true, message: '请输入编码名称', trigger: 'submit' }]
            },
        };
    },

    computed: {},

    created() {
        if(this.jsonCodeInfoDialogConfig.data) {
            for (const key in this.jsonCodeInfoDialogConfig.data) {
                for (const k in this.form) {
                    if(key === k) {
                        this.form[k] = this.jsonCodeInfoDialogConfig.data[key];
                    }
                }
            }
        }
        this.getOptions();
    },

    methods: {
        getOptions() {
            let params = {
                pageNum: 1,
                pageSize: 1000000
            };
            this.$api.formPost("/api/basfun/syscode/type/doGetList",params).then(res => {
                this.options = res.retBody.list;
            });
        },
        close() {
            this.$emit("update:jsonCodeInfoDialogVisible",false);
        },
        confirm() {
            this.$refs.form.validate((valid) => {
                if(valid) {
                    let params = JSON.parse(JSON.stringify(this.form));
                    if(params.id) {
                        this.$api.formPost("/api/basfun/syscode/type/doModById",params).then(res => {
                            this.$message.success("操作成功");
                            this.close();
                            this.$emit("onSuccess");
                        })
                    }else {
                        delete params.id;
                        this.$api.formPost("/api/basfun/syscode/type/doSave",params).then(res => {
                            this.$message.success("操作成功");
                            this.close();
                            this.$emit("onSuccess");
                        })
                    }
                }
            })
        }
    }
}

</script>
<style lang='scss' scoped>
.footer {
    display: flex;
    justify-content: center;
}
</style>