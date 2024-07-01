<template>
  <div class="routerContent">
    <div class="card df p12">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.name"
        placeholder="请输入渠道名称"
        @resetForm="resetForm('ruleForm')"
        @searchData="submitForm('ruleForm')"
        :showForm.sync="formShow"
      >
        <el-form
          :style="style"
          :model="ruleForm"
          ref="ruleForm"
          label-position="top"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="渠道类型" prop="code">
            <el-select
              v-model="ruleForm.code"
              style="width: 100%"
              :clearable="true"
            >
              <el-option label="WX" value="WX"></el-option>
              <el-option label="SMS" value="SMS"></el-option>
              <el-option label="APP" value="APP"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="ruleForm.status"
              style="width: 100%"
              :clearable="true"
            >
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="0"></el-option>
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

    <div class="fg1 ova ml10 mr10">
      <el-table
        height="100%"
        ref="elTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="60px"
          align="center"
          fixed="left"
          label="序号"
        ></el-table-column>
        <el-table-column
          v-for="(item, index) in showItemList"
          align="center"
          :width="item.width || ''"
          :key="index"
          :label="item.name"
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
          width="120px"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="showEditDialog(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align:center;" class="pt10 pb10">
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
      title="新增渠道"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form
        :style="style"
        :model="addForm"
        ref="addForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="渠道名称" prop="name">
          <el-input
            show-word-limit
            v-model="addForm.name"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道账号" prop="account">
          <el-input
            show-word-limit
            v-model="addForm.account"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道密码" prop="pwd">
          <el-input
            show-word-limit
            v-model="addForm.pwd"
            show-password
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="应用ID" prop="appId">
          <el-input
            show-word-limit
            v-model="addForm.appId"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="应用key" prop="appKey">
          <el-input
            show-word-limit
            v-model="addForm.appKey"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="应用密钥" prop="appSecret">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="200"
            show-word-limit
            v-model="addForm.appSecret"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道token" prop="token">
          <el-input
            show-word-limit
            v-model="addForm.token"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道类型" prop="code">
          <el-select v-model="addForm.code" class="pctw100">
            <el-option label="WX" value="WX"></el-option>
            <el-option label="SMS" value="SMS"></el-option>
            <el-option label="APP" value="APP"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="addForm.status"
            active-text="启用"
            inactive-text="停用"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog
      title="编辑管理"
      :visible.sync="dialogEditVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form
        :style="style"
        :model="editForm"
        ref="editForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="渠道名称" prop="name">
          <el-input
            show-word-limit
            v-model="editForm.name"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道账号" prop="account">
          <el-input
            show-word-limit
            v-model="editForm.account"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道密码" prop="pwd">
          <el-input
            show-word-limit
            show-password
            v-model="editForm.pwd"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="应用ID" prop="appId">
          <el-input
            show-word-limit
            v-model="editForm.appId"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="应用key" prop="appKey">
          <el-input
            show-word-limit
            v-model="editForm.appKey"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="应用密钥" prop="appSecret">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="200"
            show-word-limit
            v-model="editForm.appSecret"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道token" prop="token">
          <el-input
            show-word-limit
            v-model="editForm.token"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道类型" prop="code">
          <el-select v-model="editForm.code" class="pctw100">
            <el-option label="WX" value="WX"></el-option>
            <el-option label="SMS" value="SMS"></el-option>
            <el-option label="APP" value="APP"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="editForm.status"
            active-text="启用"
            inactive-text="停用"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const defaultFormThead = [
  { key: "code", name: "渠道编码", width: "100px" },
  { key: "name", name: "渠道名称", width: "100px" },
  { key: "account", name: "渠道账号", width: "150px" },
  { key: "appId", name: "应用ID" },
  { key: "appKey", name: "应用KEY" },
  { key: "statusString", name: "状态", width: "80px" }
];
export default {
  data() {
    return {
      checkAll: true,
      isIndeterminate: false,
      allItemList: defaultFormThead,
      showItemList: defaultFormThead,
      formShow: false,
      dialogFormVisible: false,
      dialogEditVisible: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "120px",
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      ruleForm: {
        code: "",
        name: "",
        status: ""
      },
      style: {},
      rules: {
        code: [
          { required: true, message: "请输入渠道编码", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入渠道名称", trigger: "change" }]
      },
      addForm: {
        id: "",
        code: "",
        name: "",
        account: "",
        pwd: "",
        appId: "",
        appKey: "",
        appSecret: "",
        token: "",
        status: ""
      },
      editForm: {
        id: "",
        code: "",
        name: "",
        account: "",
        pwd: "",
        appId: "",
        appKey: "",
        appSecret: "",
        token: "",
        status: ""
      }
    };
  },

  mounted() {
    this.init();
    let formHeight = this.$refs.ruleForm.$el.clientHeight;
    if (formHeight > 62) {
      this.folding = true;
      this.style = {
        height: "62px",
        overflow: "hidden"
      };
    } else {
      this.folding = false;
      this.style = {
        height: "auto",
        overflow: "hidden"
      };
    }
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
    }
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true;
      import("@/assets/js/Export2Excel.js").then(excel => {
        const tHeader = [
          "id",
          "code",
          "name",
          "account",
          "pwd",
          "appId",
          "appKey",
          "appSecret",
          "token",
          "status"
        ];
        const filterVal = [
          "id",
          "code",
          "name",
          "account",
          "pwd",
          "appId",
          "appKey",
          "appSecret",
          "token",
          "status"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
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
    sizeChange(n) {
      this.pageSize = n;
      this.init();
    },
    currentChange(n) {
      this.currentPage = n;
      this.init();
    },
    init() {
      //let searchForm = {};
      let load = null;
      this.$nextTick(() => {
        load = this.$loading({
          target: this.$refs.elTable.$el
        });
      });
      this.formShow = false;
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      this.$api
        .formPost("/api/mess/account/channelAccount/doGetList", params)
        .then(res => {
          if (res.retHead.code == "0000000") {
            load.close();
            this.tableData = res.retBody.list;
            this.total = res.retBody.total;
            this.currentPage = res.retBody.pageNum;
          }
        });
    },
    showDialog() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.resetForm("addForm");
      });
      this.addForm.status = "1";
    },
    showEditDialog(index, row) {
      if (row.id) {
        this.editForm.id = row.id;
      } else {
        this.editForm.id = "";
      }
      if (row.code) {
        this.editForm.code = row.code;
      } else {
        this.editForm.code = "";
      }
      if (row.name) {
        this.editForm.name = row.name;
      } else {
        this.editForm.name = "";
      }
      if (row.account) {
        this.editForm.account = row.account;
      } else {
        this.editForm.account = "";
      }
      if (row.pwd) {
        this.editForm.pwd = row.pwd;
      } else {
        this.editForm.pwd = "";
      }
      if (row.appId) {
        this.editForm.appId = row.appId;
      } else {
        this.editForm.appId = "";
      }
      if (row.appKey) {
        this.editForm.appKey = row.appKey;
      } else {
        this.editForm.appKey = "";
      }
      if (row.appSecret) {
        this.editForm.appSecret = row.appSecret;
      } else {
        this.editForm.appSecret = "";
      }
      if (row.token) {
        this.editForm.token = row.token;
      } else {
        this.editForm.token = "";
      }
      if (row.status) {
        this.editForm.status = row.status;
      } else {
        this.editForm.status = "";
      }
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          if (
            this.addForm.code == "WX" &&
            this.addForm.appId == "" &&
            this.addForm.appSecret == ""
          ) {
            this.$message({
              message: "WX渠道，应用ID和应用密钥不能为空！",
              type: "error"
            });
            return;
          }
          let addFormParams = {};
          addFormParams.id = this.addForm.id;
          addFormParams.code = this.addForm.code;
          addFormParams.name = this.addForm.name;
          addFormParams.account = this.addForm.account;
          addFormParams.pwd = this.addForm.pwd;
          addFormParams.appId = this.addForm.appId;
          addFormParams.appKey = this.addForm.appKey;
          addFormParams.appSecret = this.addForm.appSecret;
          addFormParams.token = this.addForm.token;
          addFormParams.status = this.addForm.status;

          this.$api
            .formPost("/api/mess/account/channelAccount/doSave", addFormParams)
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.init();
              } else {
                this.$message({
                  message: res.retHead.message,
                  type: "error"
                });
              }
            });
        }
      });
    },
    handleEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (
            this.editForm.code == "WX" &&
            this.editForm.appId == "" &&
            this.editForm.appSecret == ""
          ) {
            this.$message({
              message: "WX渠道，应用ID和应用密钥不能为空！",
              type: "error"
            });
            return;
          }
          let editFormParams = {};
          editFormParams.id = this.editForm.id;
          editFormParams.code = this.editForm.code;
          editFormParams.name = this.editForm.name;
          editFormParams.account = this.editForm.account;
          editFormParams.pwd = this.editForm.pwd;
          editFormParams.appId = this.editForm.appId;
          editFormParams.appKey = this.editForm.appKey;
          editFormParams.appSecret = this.editForm.appSecret;
          editFormParams.token = this.editForm.token;
          editFormParams.status = this.editForm.status;
          this.$api
            .formPost(
              "/api/mess/account/channelAccount/doModById",
              editFormParams
            )
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message.success("执行成功！");
                this.init();
                this.dialogEditVisible = false;
              } else {
                this.$message.error(res.retHead.message);
              }
            });
        }
      });
    },

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .formPost("/api/mess/account/channelAccount/doRmById", {
              id: row.id
            })
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.init();
              } else {
                this.$message({
                  message: res.retHead.message,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {});
    },
    submitForm(formName) {
      this.init();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.submitForm("ruleForm");
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.btns {
  text-align: right;
}

.icon-arrow {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #f1f1f1;

  i {
    background-color: #fff;
    position: absolute;
    color: #999;
    bottom: -7px;
    margin-left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
