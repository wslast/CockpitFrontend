<template>
  <div class="routerContent">
    <div class="card df p12">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.name"
        placeholder="请输入模板名称"
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
          <el-form-item label="模板名称" prop="name">
            <el-input show-word-limit v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="name">
            <el-input
              show-word-limit
              v-model="ruleForm.createUserName"
            ></el-input>
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

    <div class="ova fg1 ml10 mr10">
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
      title="新增消息模板"
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
        <el-form-item label="模板名称" prop="name">
          <el-input
            show-word-limit
            v-model="addForm.name"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
          <el-input
            type="textarea"
            :rows="10"
            :maxlength="2000"
            show-word-limit
            v-model="addForm.content"
            placeholder="支持freemarker语法"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleOpenDisplay()">预 览</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog
      title="编辑消息模板"
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
        <el-form-item label="模板名称" prop="name">
          <el-input
            show-word-limit
            v-model="editForm.name"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
          <el-input
            type="textarea"
            :rows="10"
            :maxlength="2000"
            show-word-limit
            v-model="editForm.content"
            placeholder="支持freemarker语法"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleOpenDisplay()">预 览</el-button>
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- -------------------消息内容预览------------------------------------- -->
    <el-dialog
      title="消息内容预览"
      :visible.sync="dialogDisplayVisible"
      append-to-body
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form
        :style="style"
        :model="displayForm"
        ref="displayForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="参数内容(JSON格式)">
          <el-input
            type="textarea"
            :rows="10"
            v-model="displayForm.jsondata"
            placeholder="JSON格式"
          ></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input
            type="textarea"
            :rows="10"
            v-model="displayForm.content"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDisplayVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDisplay()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const defaultFormThead = [
  { key: "name", name: "消息模板名称" },
  { key: "content", name: "消息内容" },
  { key: "createUserName", name: "创建人" },
  { key: "updateUserName", name: "最近修改人" }
];
export default {
  data() {
    return {
      dialogDisplayVisible: false,
      displayForm: {
        content: "",
        jsondata: ""
      },

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
        name: "",
        createUserName: ""
      },
      style: {},
      rules: {
        name: [
          { required: true, message: "请输入模板名称", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入消息内容", trigger: "change" }
        ]
      },
      addForm: {
        id: "",
        name: "",
        content: "",
        createUserId: "",
        createUserName: "",
        createTime: "",
        updateUserId: "",
        updateUserName: "",
        updateTime: ""
      },
      editForm: {
        id: "",
        name: "",
        content: "",
        createUserId: "",
        createUserName: "",
        createTime: "",
        updateUserId: "",
        updateUserName: "",
        updateTime: ""
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
          "title",
          "content",
          "createUserId",
          "createUserName",
          "createTime",
          "updateUserId",
          "updateUserName",
          "updateTime"
        ];
        const filterVal = [
          "id",
          "code",
          "name",
          "title",
          "content",
          "createUserId",
          "createUserName",
          "createTime",
          "updateUserId",
          "updateUserName",
          "updateTime"
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
      let load = null;
      this.$nextTick(() => {
        load = this.$loading({
          target: this.$refs.elTable.$el
        });
      });
      this.formShow = false;
      //let searchForm = {};
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      this.$api
        .formPost("/api/mess/tmpl/pmTemplate/doGetList", params)
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
    },
    showEditDialog(index, row) {
      if (row.id) {
        this.editForm.id = row.id;
      } else {
        this.editForm.id = "";
      }
      if (row.name) {
        this.editForm.name = row.name;
      } else {
        this.editForm.name = "";
      }
      if (row.content) {
        this.editForm.content = row.content;
      } else {
        this.editForm.content = "";
      }
      if (row.createUserId) {
        this.editForm.createUserId = row.createUserId;
      } else {
        this.editForm.createUserId = "";
      }
      if (row.createUserName) {
        this.editForm.createUserName = row.createUserName;
      } else {
        this.editForm.createUserName = "";
      }
      if (row.createTime) {
        this.editForm.createTime = row.createTime;
      } else {
        this.editForm.createTime = "";
      }
      if (row.updateUserId) {
        this.editForm.updateUserId = row.updateUserId;
      } else {
        this.editForm.updateUserId = "";
      }
      if (row.updateUserName) {
        this.editForm.updateUserName = row.updateUserName;
      } else {
        this.editForm.updateUserName = "";
      }
      if (row.updateTime) {
        this.editForm.updateTime = row.updateTime;
      } else {
        this.editForm.updateTime = "";
      }
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let addFormParams = {};
          addFormParams.id = this.addForm.id;
          addFormParams.name = this.addForm.name;
          addFormParams.content = this.addForm.content;
          let user = JSON.parse(sessionStorage.getItem("user"));
          addFormParams.createUserId = user.userId;
          addFormParams.createUserName = user.realName;
          addFormParams.updateUserId = user.userId;
          addFormParams.updateUserName = user.realName;

          this.$api
            .formPost("/api/mess/tmpl/pmTemplate/doSave", addFormParams)
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
          let editFormParams = {};
          editFormParams.id = this.editForm.id;
          editFormParams.name = this.editForm.name;
          editFormParams.content = this.editForm.content;
          editFormParams.createUserId = this.editForm.createUserId;
          editFormParams.createUserName = this.editForm.createUserName;
          editFormParams.createTime = this.editForm.createTime;
          let user = JSON.parse(sessionStorage.getItem("user"));
          editFormParams.updateUserId = user.userId;
          editFormParams.updateUserName = user.realName;
          this.$api
            .formPost("/api/mess/tmpl/pmTemplate/doModById", editFormParams)
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message.success("保存成功！");
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
            .formPost("/api/mess/tmpl/pmTemplate/doRmById", {
              id: row.id
            })
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message({
                  message: "删除成功！",
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
      this.ruleForm = {
        name: "",
        createUserName: ""
      };
      this.$refs[formName].resetFields();
      this.submitForm("ruleForm");
    },
    handleOpenDisplay() {
      let content = "";
      if (this.dialogFormVisible == true) {
        content = this.addForm.content;
      } else {
        content = this.editForm.content;
      }
      if (content == "") {
        this.$message({
          message: "消息内容不能为空",
          type: "error"
        });
        return;
      }
      this.displayForm.jsondata = "";
      this.displayForm.content = "";
      this.dialogDisplayVisible = true;
    },
    handleDisplay() {
      if (this.displayForm.jsondata == "") {
        this.$message({
          message: "参数内容不能为空",
          type: "error"
        });
        return;
      }
      try {
        JSON.parse(this.displayForm.jsondata);
        if (
          this.displayForm.jsondata.indexOf("{") < 0 ||
          this.displayForm.jsondata.indexOf("}") < 0
        ) {
          this.$message({
            message: "参数内容JSON格式异常！",
            type: "error"
          });
          return;
        }
      } catch (e) {
        this.$message({
          message: "参数内容JSON格式异常！",
          type: "error"
        });
        return;
      }
      let content = "";
      if (this.dialogFormVisible == true) {
        content = this.addForm.content;
      } else {
        content = this.editForm.content;
      }
      let editFormParams = {};
      editFormParams.jsondata = this.displayForm.jsondata;
      editFormParams.templateContent = content;
      this.$api
        .formPost("/api/mess/tmpl/pmTemplate/doDisplayMess", editFormParams)
        .then(res => {
          if (res.retHead.code == "0000000") {
            this.displayForm.content = res.retBody;
          } else {
            this.$message.error(res.retHead.message);
          }
        });
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
