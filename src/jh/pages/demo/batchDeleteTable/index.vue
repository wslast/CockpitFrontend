<template>
  <div class="batchDeleteTable routerContent">
    <div class="card df p10">
      <el-button type="primary" @click="editData()">新增</el-button>
      <el-button type="primary" @click="batchDelete()">批量删除</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="searchForm.typeCode"
        placeholder="请输入"
        @resetForm="resetForm('searchForm')"
        @searchData="getData('refresh')"
        :showForm.sync="formShow"
      >
        <el-form
          label-position="top"
          :model="searchForm"
          label-width="80px"
          ref="searchForm"
        >
          <el-form-item label="标签1" prop="typeCode">
            <el-input
              v-model="searchForm.typeCode"
              placeholder="请输入"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="标签2" prop="moduleId">
            <el-select
              v-model="searchForm.moduleId"
              style="width:100%;"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.moduleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="df jce" slot="footer">
          <el-button @click="resetForm('searchForm')">重置</el-button>
          <el-button type="primary" @click="getData('refresh')">查询</el-button>
        </div>
      </searchDialog>
    </div>
    <div class="fg1 df fdc h14 ml10 mr10">
      <jh-table
        class="fg1 ova"
        height="100%"
        size="small"
        row-key="id"
        ref="jhTable"
        :columnList="columnList"
        :data="dataList"
        @selection-change="handleSelectionChange"
        @deleteData="delData"
      />
      <div class="tc pt10 pb10">
        <jh-pager :pager.sync="pager" @getData="getData" />
      </div>
    </div>
    <infoDialog
      @onSuccess="getData"
      :infoDialogConfig="infoDialogConfig"
      v-if="infoDialogVisible"
      :infoDialogVisible.sync="infoDialogVisible"
    />
  </div>
</template>
<script>
export default {
  name: "batchDeleteTable",
  components: {
    infoDialog: resolve =>
      resolve(
        require("@/jh/pages/demo/threeTypesDialog/components/tripleDialog")
      )
  },

  data() {
    return {
      pager: {
        size: 20,
        total: 0,
        page: 1
      },
      showForm: false, //高级搜索
      showSelect: false, //表格动态列
      options: [], //模块数组
      searchForm: {
        typeCode: "",
        typeName: "",
        moduleId: ""
      },
      infoDialogVisible: false,
      infoDialogConfig: {
        title: "添加信息"
      },
      dataList: [], //表格数据
      selectList: [], //选中数组
      columnList: [
        {
          type: "selection",
          align: "center",
          reserveSelection: true //与表格的row-key配合使用 实现跨页选中
        },
        {
          type: "index",
          align: "center"
        },
        {
          prop: "typeName",
          label: "类型名称",
          align: "center",
          width: "100px"
        },
        {
          prop: "moduleName",
          label: "模块名称",
          align: "center",
          formatter: (row, column, store, index) => {
            return (
              row.moduleName + index + "213333333333333333333333333333333333333"
            );
          }
        },
        {
          prop: "remark",
          label: "备注",
          align: "center",
          render: (h, scope) => {
            return <div>{scope.row.moduleName}</div>;
          }
        },
        {
          prop: "",
          fixed: "right",
          label: "操作",
          align: "center",
          width: "120px",
          render: (h, scope) => {
            return h("div", {}, [
              h("el-button", {
                on: {
                  click: this.editData.bind(this, scope.row)
                },
                props: {
                  type: "text"
                },
                domProps: {
                  innerHTML: "修改"
                }
              }),
              h("el-button", {
                on: {
                  click: scope._self.deleteRow.bind(this, scope.row)
                },
                props: {
                  type: "text"
                },
                domProps: {
                  innerHTML: "删除"
                }
              })
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.getModuleOption();
    this.getData();
  },

  methods: {
    handleSelectionChange(row) {
      this.selectList = row;
    },
    batchDelete() {
      if (this.selectList.length === 0) {
        this.$message.warning("当前未选择数据");
        return;
      }
      this.$confirm("此操作将永久删除这些项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //批量删除
          this.$refs.jhTable.clearSelection();
        })
        .catch(() => {});
    },
    getModuleOption() {
      this.$api.formPost("/api/log/module/doGetSelectList", {}).then(res => {
        this.options = res.retBody;
      });
    },
    getData(type) {
      if (type === "refresh") {
        this.pager.page = 1;
      }
      let params = {
        pageNum: this.pager.page,
        pageSize: this.pager.size,
        ...this.searchForm
      };
      let load = this.$loading({
        target: this.$refs.jhTable.$el
      });
      this.showForm = false;
      this.$api.formPost("/api/log/collection/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          load.close();
          this.dataList = res.retBody.list;
          this.pager.total = res.retBody.total;
        }
      });
    },
    editData(row) {
      if (row) {
        this.infoDialogConfig.title = "修改信息";
        this.infoDialogConfig.data = JSON.parse(JSON.stringify(row));
      } else {
        this.infoDialogConfig.title = "添加信息";
        this.infoDialogConfig.data = null;
      }
      this.infoDialogVisible = true;
    },
    delData(row) {
      let params = { id: row.id };
      this.$apiData.demo.deleteData(params).then(res => {
        this.$message.success("删除成功");
        this.getData();
      });
    },
    reset() {
      this.$refs.searchForm.resetFields();
      this.getData("refresh");
    }
  }
};
</script>
<style lang="scss" scoped>
.batchDeleteTable {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
