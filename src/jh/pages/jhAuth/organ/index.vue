<template>
  <div class="organ">
    <div class="p10 df fdc pcth100">
      <div class="mb10 df">
        <el-button type="primary" @click="addItem({}, 1)">添加</el-button>
        <el-button type="primary" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" @click="folding">展开/折叠</el-button>
        <div class="fg1"></div>
        <searchDialog
          v-model="searchForm.searchKey"
          placeholder="请输入组织名称"
          @resetForm="resetSearch"
          @searchData="searchData"
          :showForm.sync="formShow"
        >
          <el-form
            label-position="top"
            :model="searchForm"
            label-width="80px"
            ref="searchForm"
          >
            <el-form-item label="组织名称" prop="organName">
              <el-input
                v-model="searchForm.organName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="机构简称" prop="shortName">
              <el-input
                v-model="searchForm.shortName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="master">
              <el-input
                v-model="searchForm.master"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="linkMan">
              <el-input
                v-model="searchForm.linkMan"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input
                v-model="searchForm.address"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="df jce" slot="footer">
            <el-button @click="resetSearch">重置</el-button>
            <el-button type="primary" @click="searchData">查询</el-button>
          </div>
        </searchDialog>
      </div>
      <div class="fg1 ova">
        <el-table
          v-if="refreshTable"
          :default-expand-all="isExpandAll"
          ref="table"
          :data="data.filter(dataFilter)"
          style="width: 100%"
          height="100%"
          row-key="id"
          border
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @select-all="selectALl"
          @select="select"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            type="index"
            width="60"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="organName"
            key="organName"
            align="left"
            label="组织名称"
            width="300"
          ></el-table-column>
          <el-table-column
            v-if="isSearch"
            prop="organLayerName"
            key="organLayerName"
            label="组织路径"
            width="300"
          ></el-table-column>
          <el-table-column
            v-if="!isSearch"
            prop="organCode"
            key="organCode"
            label="组织代码"
            width="170"
          ></el-table-column>
          <el-table-column
            v-if="!isSearch"
            prop="organType"
            key="organType"
            label="组织类型"
            width="100"
            :formatter="organTypeFormatter"
          ></el-table-column>
          <el-table-column
            v-if="!isSearch"
            prop="organOrderNum"
            key="organOrderNum"
            label="排序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="remark"
            key="remark"
            label="备注"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            label="操作"
            key="操作"
            width="200"
            align="center"
            :show-overflow-tooltip="false"
          >
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入一级菜单名称搜索" />
            </template>
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="editItem(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="addItem(scope.row, 2)"
                  >增加</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <organInfo
      v-if="organInfoDialogVisible"
      :organInfoDialogVisible.sync="organInfoDialogVisible"
      :organInfoDialogConfig="organInfoDialogConfig"
      @onSuccess="onSuccess"
    />
  </div>
</template>
<script>
export default {
  components: {
    organInfo: resolve => resolve(require("./components/organInfo"))
  },
  data() {
    return {
      isAdd: false,
      search: "",
      dialogFormVisible: false,
      form: {
        parentId: "",
        organCode: "",
        organName: "",
        organOrderNum: "",
        remark: "",
        organType: "2",
        status: "1",
        nodeType: "1"
      },
      rules: {
        organName: [
          { required: true, message: "机构名称不能为空！", trigger: "blur" }
        ]
      },
      organInfoDialogConfig: {
        title: "机构管理"
      },
      organInfoDialogVisible: false,
      data: [],
      props: {
        label: "organName",
        children: "children"
      },
      chackedNode: {},
      selectRows: [],
      formShow: false,
      isSearch: false,
      searchForm: {
        searchKey: "",
        organName: "",
        shortName: "",
        master: "",
        linkMan: "",
        address: ""
      },
      refreshTable: true,
      isExpandAll: false,
      organTypeOptions: []
    };
  },
  computed: {},
  async created() {
    await this.getOrganType();
    this.init();
  },
  methods: {
    async getOrganType() {
      return new Promise(resolve => {
        this.$api
          .formPost("/api/auth/sys/type/doGetOrganType", {})
          .then(res => {
            this.organTypeOptions = res.retBody;
            this.organInfoDialogConfig.organTypeOption = res.retBody;
            resolve();
          });
      });
    },
    folding() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    onSuccess() {
      if (this.isSearch) {
        this.searchData();
      } else {
        this.init();
      }
    },
    searchData() {
      this.isSearch = false;
      for (const key in this.searchForm) {
        if (this.searchForm[key] != "") {
          this.isSearch = true;
        }
      }
      if (!this.isSearch) {
        this.init();
        return;
      }
      this.formShow = false;
      this.$api
        .formPost("/api/auth/sysorgan/doGetSysOrganList", this.searchForm)
        .then(res => {
          this.data = res.retBody.list;
          console.log(1111);
          this.$refs.table.doLayout();
        });
    },
    resetSearch() {
      this.isSearch = false;
      this.formShow = false;
      this.searchForm.searchKey = "";
      this.$refs.searchForm.resetFields();
      this.$refs.table.doLayout();
      this.init();
    },
    selectALl(selection) {
      for (const iterator of this.data) {
        this.toggleSelection(
          iterator,
          this.$refs.table.store.states.isAllSelected
        );
      }
    },
    select(selection, row) {
      if (selection.indexOf(row) > -1) {
        this.$refs.table.toggleRowSelection(row, true);
        //降低递归事件等级 延后执行 否则会被上面覆盖
        this.$nextTick(() => {
          this.toggleSelection(row, true);
        });
      } else {
        this.$nextTick(() => {
          this.toggleSelection(row, false);
        });
      }
    },
    toggleSelection(row, state) {
      if (row.children && row.children.length > 0) {
        for (const iterator of row.children) {
          this.$refs.table.toggleRowSelection(iterator, state);
          if (iterator.children && row.children.length > 0) {
            this.toggleSelection(iterator, state);
          }
        }
      }
    },
    handleSelectionChange(row) {
      this.selectRows = row;
    },
    batchDelete() {
      if (this.selectRows.length === 0) {
        this.$message.warning("当前未选择数据");
        return;
      }
      this.$confirm("此操作将永久删除这些项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .formPost("/api/auth/sysorgan/doDelById", {
              id: this.selectRows
                .map(item => {
                  return item.id;
                })
                .join(",")
            })
            .then(res => {
              this.$message.success("删除成功");
              this.init();
            });
        })
        .catch(() => {});
    },
    organTypeFormatter(row, column) {
      let organName = "";
      for (const iterator of this.organTypeOptions) {
        if (row.organType === iterator.typeValue) {
          organName = iterator.typeName;
        }
      }
      return organName;
    },
    dataFilter(item) {
      return (
        !this.search ||
        item.organName.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    init() {
      this.formShow = false;
      this.$api
        .formPost("/api/auth/sysorgan/doGetSysOrganObject", {})
        .then(res => {
          if (res.retHead.code == "0000000") {
            this.data = this.deleteChildren(res.retBody);
          }
        });
      this.chackedNode = {};
    },
    deleteItem(row) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: row.id
        };
        this.$api
          .formPost("/api/auth/sysorgan/doDelSysOrgan", params)
          .then(res => {
            if (res.retHead.code == "0000000") {
              this.$message.success("操作成功！");
              this.init();
            } else {
              this.$message.error("操作失败！");
            }
          });
      });
    },
    /**
     * @description:
     * @param {*} row
     * @param {*} type 1是顶部添加按钮  2是表格添加按钮
     * @return {*}
     * @author: Junchi Zhao
     */
    addItem(row, type) {
      this.organInfoDialogConfig.data = JSON.parse(JSON.stringify(row));
      this.organInfoDialogConfig.isAdd = true;
      this.organInfoDialogConfig.options = JSON.parse(
        JSON.stringify(this.data)
      );
      this.organInfoDialogConfig.type = type;
      this.organInfoDialogVisible = true;
    },
    editItem(row) {
      this.organInfoDialogConfig.data = JSON.parse(JSON.stringify(row));
      this.organInfoDialogConfig.isAdd = false;
      this.organInfoDialogConfig.options = JSON.parse(
        JSON.stringify(this.data)
      );
      this.organInfoDialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.organ {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-form {
  .el-form-item__content .el-input-number,
  .el-form-item__content .el-input,
  .el-form-item__content .el-select {
    width: 98% !important;
  }
}
</style>
