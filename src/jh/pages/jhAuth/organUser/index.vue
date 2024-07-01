<template>
  <div class="user routerContent">
    <div class="df pcth100">
      <div class="leftContent">
        <el-input
          class="p10"
          placeholder="输入关键字进行过滤"
          v-model="filterText"
        >
        </el-input>
        <el-tree
          class="ova"
          style="max-height:calc(100vh - 190px);"
          highlight-current
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
          :props="{ label: 'organName', children: 'children' }"
          :data="organList"
          node-key="id"
          :default-expanded-keys="defaultKeys"
          :filter-node-method="filterNode"
          ref="tree"
        ></el-tree>
      </div>
      <div class="rightContent">
        <div class="card df">
          <el-button type="primary" @click="showDialog">添加</el-button>
          <el-button @click="handleDownload" type="primary"
            >下载当前表格数据</el-button
          >
          <el-button type="primary" @click="batchDelete">批量删除</el-button>
          <div class="fg1"></div>
          <searchDialog
            v-model="searchForm.realName"
            placeholder="请输入真实姓名"
            @resetForm="resetForm('searchForm')"
            @searchData="init"
            :showForm.sync="formShow"
          >
            <el-form
              label-position="top"
              :model="searchForm"
              label-width="80px"
              ref="searchForm"
            >
              <el-form-item label="真实姓名" prop="realName">
                <el-input
                  v-model="searchForm.realName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="登陆账号" prop="username">
                <el-input
                  v-model="searchForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="df jce" slot="footer">
              <el-button @click="resetForm('searchForm')">重置</el-button>
              <el-button type="primary" @click="init">查询</el-button>
            </div>
          </searchDialog>
        </div>
        <jh-table
          class="fg1 ova ml10 mr10"
          height="100%"
          row-key="id"
          ref="jhTable"
          :columnList="columnList"
          :data="tableData"
          @selection-change="handleSelectionChange"
        />

        <div class="tc pt10 pb10">
          <jh-pager :pager.sync="pager" @getData="init" />
        </div>
      </div>
    </div>

    <el-dialog
      width="70%"
      title="角色权限"
      top="5vh"
      :visible.sync="dialogQsVisible"
    >
      <select-role
        ref="selectRole"
        @selection="getSelectRoles"
        :defaultData="checkbox.checkedRoles"
      />
      <!-- <el-checkbox-group v-model="checkbox.checkedRoles">
        <el-checkbox
          v-for="item in checkbox.Roles"
          :label="item.id"
          :key="item.id"
        >{{item.roleName}}</el-checkbox>
      </el-checkbox-group>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQsVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole">确 定</el-button>
      </div>
    </el-dialog>
    <infoDialog
      :infoDialogVisible.sync="infoDialogVisible"
      v-if="infoDialogVisible"
      :infoDialogConfig="infoDialogConfig"
      @onSuccess="init"
    />
  </div>
</template>

<script>
import selectRole from "../user/components/selectRole.vue";
import infoDialog from "../user/components//infoDialog.vue";
import { export_json_to_excel } from "../user/components/Export2Excel";

export default {
  components: {
    infoDialog,
    selectRole
  },
  data() {
    return {
      formShow: false,
      createUserName: JSON.parse(sessionStorage.getItem("user")).username,
      qxUserId: "",
      checkbox: {
        checkedRoles: [],
        Roles: []
      },
      dialogQsVisible: false,
      tableData: [],
      searchForm: {
        username: "",
        usertype: "",
        organ: "",
        organRecurFlag: "0",
        realName: ""
      },
      options: [],
      cascaderProps: {
        value: "id",
        label: "organName",
        children: "children"
      },
      selectRows: [],
      organList: [],
      filterText: "",
      defaultKeys: [],
      current: "",
      infoDialogVisible: false,
      infoDialogConfig: {
        title: "编辑信息"
      },
      columnList: [
        {
          type: "selection",
          align: "center",
          width: 50
        },
        {
          type: "index",
          label: "序号",
          align: "center",
          width: 60
        },
        {
          prop: "realName",
          label: "真实姓名",
          width: 120,
          align: "center"
        },
        {
          prop: "username",
          label: "登陆账号",
          width: 120,
          align: "center"
        },
        {
          prop: "organName",
          label: "机构名称",
          align: "center"
        },
        {
          prop: "mobile",
          label: "手机号码",
          width: 120,
          align: "center"
        },
        { prop: "localOrgan", label: "是否本级", width: 100, align: "center" },
        {
          prop: "leader",
          label: "是否领导",
          width: 100,
          align: "center",
          formatter: row => {
            if (row.userLevel == 1) {
              return "是";
            } else {
              return "否";
            }
          }
        },
        {
          prop: "userStatus",
          label: "启用状态",
          width: 100,
          align: "center",
          formatter: row => {
            if (row.userStatus == 1) {
              return "启用";
            } else {
              return "禁用";
            }
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
                  click: this.showEditDialog.bind(this, scope.row)
                },
                props: {
                  type: "text"
                },
                domProps: {
                  innerHTML: "编辑"
                }
              }),
              h("el-button", {
                on: {
                  click: this.showQxDialog.bind(this, scope.row)
                },
                props: {
                  type: "text"
                },
                domProps: {
                  innerHTML: "权限"
                }
              })
            ]);
          }
        }
      ],
      pager: {
        size: 20,
        total: 0,
        page: 1
      }
    };
  },
  computed: {},
  watch: {
    showItemList(valArr) {
      for (let key in this.allItemList) {
        this.allItemList[key].show = false;
        for (let key1 in valArr) {
          if (this.allItemList[key].key == valArr[key1].key) {
            this.allItemList[key].show = true;
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.jhTable.doLayout();
      });
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  async mounted() {
    await this.getOrgan();
    this.init();
    this.getGlbOptions();
  },
  methods: {
    async getOrgan() {
      return new Promise((resolve, reject) => {
        this.$api
          .formPost("/api/auth/sysorgan/doGetSysOrganObject", {})
          .then(res => {
            this.organList = this.deleteChildren(res.retBody);
            this.defaultKeys = res.retBody.map(item => item.id);
            if (this.organList.length === 0) {
              return;
            }
            this.current = res.retBody[0] && res.retBody[0].id;
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(res.retBody[0].id, true);
            });
            resolve();
          });
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.organName.indexOf(value) !== -1;
    },
    handleNodeClick(row) {
      this.current = row.id;
      this.init();
    },
    handleSelectionChange(row) {
      console.log(row);
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
            .formPost("/api/auth/sysuser/doDel", {
              id: this.selectRows
                .map(item => {
                  return item.id;
                })
                .join(",")
            })
            .then(res => {
              this.$message.success("删除成功");
              this.selectRows = [];
              this.$refs.jhTable.clearSelection();
              this.init();
            });
        })
        .catch(() => {});
    },
    handleDownload() {
      this.downloadLoading = true;
      const tHeader = [
        "序号",
        "真实姓名",
        "登陆账号",
        "机构名称",
        "手机号码",
        "启用状态",
        "创建日期"
      ];
      const filterVal = [
        "id",
        "realName",
        "username",
        "organName",
        "mobile",
        "userStatus",
        "createTime"
      ];
      const data = this.formatJson(filterVal, this.tableData);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "table-list-user"
      });
      this.downloadLoading = false;
    },
    formatJson(filterVal, jsonData) {
      let i = 0;
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "id") {
            i++;
            return i;
          } else if (j == "userStatus") {
            return v[j] == "1" ? "启用" : "禁用";
          } else {
            return v[j];
          }
        })
      );
    },

    filter2(row, column, cellValue) {
      if (cellValue == 0) {
        return "不启用";
      }
      if (cellValue == 1) {
        return "启用";
      }
    },

    changeRole() {
      this.dialogQsVisible = false;

      let params = {
        userId: this.qxUserId,
        roleIds: this.checkbox.Roles
      };
      this.$api
        .formPost("/api/auth/sysuserrole/doAddUserRole", params)
        .then(res => {
          if (res.retHead.code == "0000000") {
            this.$message.success(res.retHead.message);
          } else {
            this.$message.error(res.retHead.message);
          }
        });
    },
    showQxDialog(row) {
      this.checkbox.checkedRoles = [];
      this.qxUserId = row.id;
      this.dialogQsVisible = true;
      this.getRoleListByUserId();
    },
    getRoleListByUserId() {
      let params = {
        userId: this.qxUserId
      };
      this.$api
        .formPost("/api/auth/sysrole/doGetListByUserId", params)
        .then(res => {
          if (res.retHead.code == "0000000") {
            this.checkbox.checkedRoles = res.retBody;
            this.$refs.selectRole.init();
          }
        });
    },
    getSelectRoles(Roles) {
      this.checkbox.Roles = [];
      Roles.forEach(item => {
        this.checkbox.Roles.push(item.id);
      });
    },
    getGlbOptions() {
      this.$api
        .formPost("/api/auth/sysorgan/doGetSysOrganObject", {})
        .then(res => {
          console.log("ok");
          console.log(res.retBody);
          if (res.retHead.code == "0000000") {
            this.options = this.deleteChildren(res.retBody);
          }
        });
    },
    init() {
      let params = {
        pageNum: this.pager.page,
        pageSize: this.pager.size,
        organId: this.current,
        organRecurFlag: this.searchForm.organRecurFlag,
        username: this.searchForm.username,
        realName: this.searchForm.realName
      };
      let load = this.$loading({
        target: this.$refs.jhTable.$el
      });
      this.formShow = false;
      this.$api
        .formPost("/api/auth/sysuser/doGetListWithOrganId", params)
        .then(res => {
          if (res.retHead.code == "0000000") {
            load.close();
            this.tableData = res.retBody.list;
            this.pager.total = res.retBody.total;
            this.pager.page = res.retBody.pageNum;
          }
        });
    },
    showDialog() {
      this.infoDialogConfig.title = "添加信息";
      this.infoDialogConfig.type = "add";
      this.infoDialogConfig.data = null;
      this.infoDialogVisible = true;
    },
    showEditDialog(row) {
      this.infoDialogConfig.title = "编辑信息";
      this.infoDialogConfig.data = JSON.parse(JSON.stringify(row));
      this.infoDialogConfig.type = "edit";
      this.infoDialogVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.organRecurFlag = "0";
      this.init();
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  height: 100%;
  flex-direction: column;
  .tableContent {
    flex-grow: 1;
    overflow: auto;
    width: calc(100% - 1px);
  }
}
.leftContent {
  flex-shrink: 0;
}
.rightContent {
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 14px;
  height: 100%;
  padding: 0px 10px;
}
.btns {
  text-align: right;
}
</style>
