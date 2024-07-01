<!--
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description: 日志类型
-->
<template>
  <div class="logType routerContent">
    <div class="card df p12">
        <el-button type="primary" @click="editData()">新增</el-button>
        <div class="fg1"></div>
       <searchDialog 
                v-model="searchForm.typeCode"
				placeholder="请输入类型编码"
				@resetForm="reset"
				@searchData="getData('refresh')"
				:showForm.sync="formShow"
			>
        <el-form
            :model="searchForm"
            label-width="auto"
            
            label-position="top"
            ref="searchForm">
                <el-form-item label="类型编码">
                    <el-input
                        v-model="searchForm.typeCode"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="类型名称">
                    <el-input
                        v-model="searchForm.typeName"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="模块名称">
                    <el-select v-model="searchForm.moduleId" style="width:100%;" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.moduleName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
        </el-form>
        <div class="df jce" slot="footer">
            <el-button  @click="reset">重置</el-button>
            <el-button  type="primary" @click="getData('refresh')">查询</el-button>
        </div>
    </searchDialog>
    </div>
    
    <div class="fg1 df fdc h14 ml10 mr10">
        <jh-table
            class="fg1 ova"
            height="100%"
            size="small"
            ref="jhTable"
            :columnList="columnList"
            :data="dataList"
            @deleteData="delData"
        >
        </jh-table>
        <div class="tc pt10 pb10">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-size="pageSize"  background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
        </div> 
    </div>
    <typeDialog  @onSuccess="getData" :typeDialogConfig="typeDialogConfig" v-if="typeDialogVisible" :typeDialogVisible.sync="typeDialogVisible" />
  </div>
</template>

<script>
export default {
    name: "logType",
    components: {
        typeDialog: resolve => resolve(require("./components/typeDialog")),
    },

    data() {
        return {
            pageSize: 20,
            currentPage: 0,
            total: 0,
            formShow: false,
            options: [],//模块数组
            searchForm: {
                typeCode: "",
                typeName: "",
                moduleId: ""
            },
            typeDialogVisible: false,
            typeDialogConfig: {
                title: "添加数据源"
            },
            dataList: [],
            columnList: [
                {
                    type: "index",
                    align: "center"
                },
                { prop: "typeCode", label: "类型编码", align: "center" },
                { prop: "typeName", label: "类型名称", align: "center" },
                { prop: "moduleName", label: "模块名称", align: "center" },
                { prop: "remark", label: "备注", align: "center" },
                {
                    prop: "",
                    fixed: "right",
                    label: "操作",
                    align: "center",
                    width: "120px",
                    render: (h,scope) => {
                        let that = this;
                        return h("div",{},[
                            h("el-button",{ 
                                on: {
                                    click:that.editData.bind(this,scope.row),
                                }, 
                                props: {
                                    type: "text",
                                },
                                class: {
                                    "test1": true
                                },
                                domProps:{
                                    innerHTML: '修改',
                                }
                            }),
                            h("el-button",{ 
                                on: {
                                    click:scope._self.deleteRow.bind(this,scope.row),
                                }, 
                                props: {
                                    type: "text",
                                },
                                domProps:{
                                    innerHTML: '删除',
                                }
                            }),
                        ]) 
                    }
                },
            ],
        };
    },
    mounted(){
        this.getData();
    },
    created() {
        this.getModuleOption();
    },

    methods: {
        getModuleOption() {
            this.$api.formPost("/api/log/module/doGetSelectList",{}).then(res => {
                this.options = res.retBody;
            })
        },
        getData(type) {
            if(type === 'refresh') {
                this.currentPage = 1
            }
            let params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                ...this.searchForm,
            };
             let load = this.$loading({
                target: this.$refs.jhTable.$el
            })
            this.formShow = false;
            this.$api.formPost("/api/log/type/doGetList", params).then((res) => {
                if (res.retHead.code == "0000000") {
                    load.close();
                    this.dataList = res.retBody.list;
                    this.total = res.retBody.total;
                }
            });
        },
        editData(row) {
            if (row) {
                this.typeDialogConfig.title = "修改类型信息";
                this.typeDialogConfig.data = JSON.parse(JSON.stringify(row));
            } else {
                this.typeDialogConfig.title = "添加类型信息";
                this.typeDialogConfig.data = null;
            }
            this.typeDialogVisible = true;
        },
        delData(row) {
            let params = { id: row.id }; 
            this.$api.formPost("/api/log/type/doRmById",params).then(res => {
                this.$message.success("删除成功");
                this.getData()
            });
        },
        reset() {
            this.$refs.searchForm.resetFields();
            for (const key in this.searchForm) {
                this.searchForm[key] = "";
            }
            this.currentPage = 1;
            this.getData("refresh");
        },
        sizeChange(n) {
            this.pageSize = n;
            this.getData();
        },
        currentChange(n) {
            this.currentPage = n;
            this.getData();
        },
        initData() {
            this.currentPage = 1;
            this.getData();
        },
    }
};
</script>
<style lang="scss" scoped>
.logType {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>