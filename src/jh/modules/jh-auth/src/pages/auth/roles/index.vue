<template>
  <div class="role routerContent">
    <div class="card df p12">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <el-button @click="handleDownload" type="primary"
        >下载当前表格数据</el-button
      >
      <el-button type="primary" @click="batchDelete">批量删除</el-button>
      <div class="fg1"></div>

      <searchDialog
        v-model="ruleForm.roleName"
        placeholder="请输入角色名称"
        @resetForm="resetForm('ruleForm')"
        @searchData="submitForm('ruleForm')"
        :showForm.sync="formShow"
      >
        <el-form
          :style="style"
          :model="ruleForm"
          ref="ruleForm"
          label-position="top"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="ruleForm.roleCode"></el-input>
          </el-form-item>
          <el-form-item label="启用状态" prop="roleEnabledState">
            <el-select v-model="ruleForm.roleEnabledState" style="width: 100%;">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否包含下级">
            <el-select v-model="ruleForm.organRecurFlag" style="width: 100%;">
              <el-option label="不含下级" value="0"></el-option>
              <el-option label="包含下级" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="df jce" slot="footer">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >查询</el-button
          >
        </div>
      </searchDialog>
    </div>
    <div class="tableContent ml10 mr10">
      <el-table
        ref="dragTable"
        height="100%"
        row-key="id"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          type="index"
          width="60px"
          align="center"
          fixed="left"
          label="序号"
        ></el-table-column>
        <el-table-column
          :formatter="item.formatter"
          v-for="(item, index) in allItemList"
          :key="index"
          :label="item.name"
          v-if="item.show"
        >
          <template slot-scope="scope">
            <template v-if="!item.formatter">{{
              scope.row[item.key]
            }}</template>
            <template v-else>
              <span v-text="item.formatter(scope.row, item)"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="showEditDialog(scope.$index, scope.row)"
              >编辑</el-button
            ><el-button type="text" @click="showUser(scope.row)">用户</el-button
            ><el-button type="text" @click="privilege(scope.row)"
              >权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pt10 pb10 tc">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog
      title="角色管理"
      width="600px"
      top="5vh"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" label-width="auto" ref="addForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="roleAttr">
          <el-radio-group v-model="form.roleAttr">
            <el-radio :label="'0'">管理权限</el-radio>
            <el-radio :label="'1'">经办权限</el-radio>
            <el-radio :label="'2'">审核权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色属性" prop="roleType">
          <el-input v-model="form.roleType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="roleEnabledState">
          <el-radio-group v-model="form.roleEnabledState">
            <el-radio :label="'1'">启用</el-radio>
            <el-radio :label="'0'">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark" width="100%">
          <el-input
            v-model="form.remark"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog
      title="角色管理"
      width="600px"
      top="5vh"
      v-if="dialogEditVisible"
      :visible.sync="dialogEditVisible"
    >
      <el-form
        :model="editForm"
        label-width="auto"
        ref="editForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="roleAttr">
          <el-radio-group v-model="editForm.roleAttr">
            <el-radio :label="'0'">管理权限</el-radio>
            <el-radio :label="'1'">经办权限</el-radio>
            <el-radio :label="'2'">审核权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色属性">
          <el-input v-model="editForm.roleType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" width="100%" prop="roleEnabledState">
          <el-radio-group v-model="editForm.roleEnabledState">
            <el-radio :label="'1'">启用</el-radio>
            <el-radio :label="'0'">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="editForm.remark"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ---------------------------------------------------------用户弹出框 -->
    <el-dialog
      title="用户管理"
      v-if="dialogUser"
      :visible.sync="dialogUser"
      top="5vh"
      width="1200px"
    >
      <div class="card df aic">
        <el-button type="primary" @click="dialogAllUser = true">添加</el-button>
        <div class="fg1"></div>
        <el-form :model="searchForm" inline ref="searchForm" label-width="auto">
          <el-form-item label="用户名" prop="username">
            <el-input
              style="width: 170px;"
              v-model="searchForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户机构" prop="organId">
            <cascader-user
              style="width: 170px;"
              v-model="searchForm.organId"
            ></cascader-user>
          </el-form-item>
          <el-form-item label="是否包含下级" prop="organRecurFlag">
            <el-select
              v-model="searchForm.organRecurFlag"
              style="width: 170px;"
            >
              <el-option label="本级机构" value="0"></el-option>
              <el-option label="所有子机构" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetSearch">重置</el-button>
            <el-button type="primary" @click="searchData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="userTableData" border style="width: 100%">
        <el-table-column
          type="index"
          width="60px"
          align="center"
          fixed="left"
          label="序号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="realName"
          label="真实姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="organName"
          label="机构名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="mobile"
          label="手机号码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="email"
          label="电子邮箱"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="delUser(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="card" style="text-align:right;">
        <el-pagination
          @size-change="sizeChange1"
          @current-change="currentChange1"
          :current-page="currentPage1"
          :page-size="pageSize1"
          background
          layout="total, sizes, prev, pager, next"
          :total="total1"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUser = false">取 消</el-button>
        <el-button type="primary" @click="dialogUser = false">确 定</el-button>
      </span>
    </el-dialog>
    <qx-dialog ref="qxDL" :roleId="roleId"></qx-dialog>

    <el-dialog
      title="所有用户"
      width="80%"
      :visible.sync="dialogAllUser"
      :fullscreen="fullscreen"
    >
      <users ref="user" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { export_json_to_excel } from "@/assets/js/Export2Excel.js";
// import { getList, deleteItem, addItem, editItem } from "./function";
import qxDialog from "./components/qxgl";
const defaultFormThead = [
  { key: "roleName", name: "角色名称", show: true },
  { key: "roleType", name: "角色属性", show: true },
  { key: "roleCode", name: "角色编码", show: true },
  { key: "createOrganName", name: "创建机构", show: true },
  {
    key: "roleDesc",
    name: "权限类型",
    show: true,
    formatter: function(row, column) {
      if (row.roleAttr === "0") {
        return "管理权限";
      } else if (row.roleAttr === "1") {
        return "经办权限";
      } else if (row.roleAttr === "2") {
        return "审核权限";
      } else {
        return "";
      }
    }
  },
  { key: "localOrgan", name: "是否本级", show: true },
  { key: "remark", name: "备注", show: true }
];
export default {
  components: {
    qxDialog
  },
  data() {
    return {
      fullscreen: false,
      checkAll: true,
      isIndeterminate: false,
      sortable: null,
      allItemList: defaultFormThead,
      showItemList: defaultFormThead,
      formShow: false,
      roleId: "",
      key: 1,
      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogUser: false,
      dialogAllUser: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      tableData: [],
      tableData1: [],
      userTableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      total1: 0,
      pageSize1: 20,
      currentPage1: 1,
      ruleForm: {
        roleName: "",
        roleCode: "",
        organRecurFlag: "0",
        roleEnabledState: ""
      },
      style: {},
      rules: {
        roleEnabledState: [
          {
            required: true,
            message: "请选择启用状态",
            trigger: "change"
          }
        ],
        roleAttr: [
          {
            required: true,
            message: "请选择权限类型",
            trigger: "change"
          }
        ],
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleType: [
          { required: false, message: "请选择角色类型", trigger: "change" }
        ]
      },
      form: {
        roleName: "",
        roleType: "",
        roleAttr: "0",
        roleCode: "",
        roleEnabledState: "1",
        remark: ""
      },
      editForm: {
        roleName: "",
        roleType: "",
        roleAttr: "0",
        roleCode: "",
        roleEnabledState: "",
        remark: "",
        id: ""
      },
      businessVisible: false, //业务选择弹窗
      businessConfig: {
        id: null
      }, //业务选择弹窗配置
      selectRows: [],
      searchForm: {
        username: "",
        organId: "",
        organRecurFlag: "1"
      }
    };
  },

  mounted() {
    this.init();
  },
  computed: {},
  watch: {
    offForm: function(v) {
      if (v) {
        this.style = {
          height: "62px",
          overflow: "hidden"
        };
      } else {
        this.style = {
          height: "auto",
          overflow: "hidden"
        };
      }
    },
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
        this.$refs.dragTable.doLayout();
      });
    }
  },
  methods: {
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
            .formPost("/api/auth/sysrole/doDelRole", {
              id: this.selectRows
                .map(item => {
                  return item.id;
                })
                .join(",")
            })
            .then(res => {
              this.$message.success("删除成功");
              this.selectRows = [];
              this.$refs.dragTable.clearSelection();
              this.init();
            });
        })
        .catch(() => {});
    },
    sizeChange1(n) {
      this.pageSize1 = n;
      this.getUserListByRoleId();
    },
    currentChange1(n) {
      this.currentPage1 = n;
      this.getUserListByRoleId();
    },
    addUserOk() {
      // console.log(this.$refs.user.selectedTableData)
      let checkedUsers = this.$refs.user.selectedTableData;
      if (!checkedUsers || checkedUsers.length === 0) {
        this.$message.warning("请选择用户");
        return;
      }
      let userids = "";
      checkedUsers.forEach(item => {
        userids += item.id + ",";
      });

      let params = {
        roleId: this.roleId,
        userIds: userids
      };
      this.$api
        .formPost("/api/auth/sysrole/doAddRoleUser", params)
        .then(res => {
          this.dialogAllUser = false;
          if (res.retHead.code == "0000000") {
            this.$message.success(res.retHead.message);
            this.getUserListByRoleId();
          } else {
            this.$message.error(res.retHead.message);
          }
        });
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === defaultFormThead.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < defaultFormThead.length;
    },
    handleCheckAllChange(val) {
      this.showItemList = val ? defaultFormThead : [];
      this.isIndeterminate = false;
    },
    handleDownload() {
      this.downloadLoading = true;
      const tHeader = [
        "序号",
        "角色名称",
        "角色属性",
        "角色编码",
        "备注",
        "启用状态"
      ];
      const filterVal = [
        "id",
        "roleName",
        "roleType",
        "roleCode",
        "remark",
        "roleEnabledState"
      ];
      const data = this.formatJson(filterVal, this.tableData);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "table-list-role"
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
          } else if (j === "roleEnabledState") {
            if (v[j] == 1) {
              return "启用";
            } else {
              return "禁用";
            }
          } else {
            return v[j];
          }
        })
      );
    },
    cancle() {
      this.dialogFormVisible = false;
      this.resetForm("addForm");
    },
    privilege(row) {
      this.roleId = row.id;
      this.$refs.qxDL.qxDialogShow = true;
    },
    showUser(row) {
      this.$refs.searchForm && this.$refs.searchForm.resetFields();
      this.dialogUser = true;
      let id = row.id;
      this.roleId = id;
      this.getUserListByRoleId();
    },
    searchData() {
      this.getUserListByRoleId();
    },
    resetSearch() {
      this.$refs.searchForm.resetFields();
      this.getUserListByRoleId();
    },
    getUserListByRoleId() {
      let params = {
        pageNum: this.currentPage1,
        pageSize: this.pageSize1,
        roleId: this.roleId,
        ...this.searchForm
      };
      if (this.searchForm.organId && this.searchForm.organId.length > 0) {
        params.organId = this.searchForm.organId[
          this.searchForm.organId.length - 1
        ];
      } else {
        params.organId = "";
      }
      this.$api
        .formPost("/api/auth/sysuser/doGetListWithRoleId", params)
        .then(res => {
          this.userTableData = res.retBody.list;
          this.total1 = res.retBody.total;
          this.currentPage1 = res.retBody.pageNum;
        });
    },
    delUser(index, row) {
      let params = {
        roleId: this.roleId,
        userIds: row.id
      };
      this.$api
        .formPost("/api/auth/sysrole/doDelRoleUser", params)
        .then(res => {
          this.$message.success(res.retHead.message);
          this.getUserListByRoleId();
        });
    },
    // showAssignUser(index, row) {},
    sizeChange(n) {
      this.pageSize = n;
      this.init();
    },
    currentChange(n) {
      this.currentPage = n;
      this.init();
    },
    init() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      let load = this.$loading({
        target: this.$refs.dragTable.$el
      });
      this.formShow = false;
      this.$api.formPost("/api/auth/sysrole/doGetList", params).then(res => {
        load.close();
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list.map(item => {
            item.localOrgan =
              item.localOrganFlag === "1" ? "本级机构" : "非本级机构";
            return item;
          });
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
          // this.setSort();//可移动
        }
      });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);
        }
      });
    },
    showDialog() {
      this.dialogFormVisible = true;
      this.form.roleName = "";
    },
    showEditDialog(index, row) {
      for (const key in this.editForm) {
        if (Object.hasOwnProperty.call(row, key)) {
          this.editForm[key] = row[key];
        }
      }
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        this.form.changeUserId = JSON.parse(sessionStorage.getItem("user")).id;
        if (valid) {
          this.$api
            .formPost("/api/auth/sysrole/doSaveRole", this.form)
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.resetForm("addForm");
            });
        } else {
          this.$message.error("请完善表单！");
        }
      });
    },
    handleEdit() {
      this.$refs.editForm.validate(valid => {
        this.editForm.changeUserId = JSON.parse(
          sessionStorage.getItem("user")
        ).id;
        if (valid) {
          this.$api
            .formPost("/api/auth/sysrole/doModRole", this.editForm)
            .then(res => {
              this.dialogEditVisible = false;
              if (res.retHead.code == "0000000") {
                this.$message.success("执行成功！");
                this.init();
              } else {
                this.$message.error("执行失败！");
              }
            });
        } else {
          this.$message.error("请完善表单！");
        }
      });
    },
    submitForm(formName) {
      this.init();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.organRecurFlag = "0";
      this.init();
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.role {
  display: flex;
  height: 100%;
  flex-direction: column;
  .tableContent {
    flex-grow: 1;
    overflow: auto;
  }
}
.w14 {
  width: 14px;
}
/deep/ .el-form-item {
  margin-bottom: 0px;
}
</style>
