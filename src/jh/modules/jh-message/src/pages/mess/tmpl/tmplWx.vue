<template>
  <div class="routerContent">
    <div class="card df p12">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.name"
        placeholder="请输入模板名字"
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
          <el-form-item label="模板名字" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="主营行业" prop="primaryIndustry">
            <el-input v-model="ruleForm.primaryIndustry"></el-input>
          </el-form-item>
          <el-form-item label="副营行业" prop="deputyIndustry">
            <el-input v-model="ruleForm.deputyIndustry"></el-input>
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
      title="新增微信消息模板"
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
        <el-form-item label="模板名字" prop="name">
          <el-input
            show-word-limit
            v-model="addForm.name"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="2000"
            show-word-limit
            v-model="addForm.content"
            placeholder="请参考微信消息模板内容格式"
          ></el-input>
        </el-form-item>
        <el-form-item label="主营行业" prop="primaryIndustry">
          <el-input
            show-word-limit
            v-model="addForm.primaryIndustry"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="副营行业" prop="deputyIndustry">
          <el-input
            show-word-limit
            v-model="addForm.deputyIndustry"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="模板实例" prop="example">
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="2000"
            show-word-limit
            v-model="addForm.example"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信消息模板ID" prop="templateId">
          <el-input
            show-word-limit
            v-model="addForm.templateId"
            maxlength="120"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务URL" prop="busUrl">
          <el-input
            show-word-limit
            v-model="addForm.busUrl"
            maxlength="1000"
            placeholder="如:http://www.dbfm.com/#/mess/messageMange?id=#{id},其中#{id}为动态参数"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog
      title="编辑微信消息模板"
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
        <el-form-item label="模板名字" prop="name">
          <el-input
            show-word-limit
            v-model="editForm.name"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="4000"
            show-word-limit
            v-model="editForm.content"
            placeholder="请参考微信消息模板内容格式"
          ></el-input>
        </el-form-item>
        <el-form-item label="主营行业" prop="primaryIndustry">
          <el-input
            show-word-limit
            v-model="editForm.primaryIndustry"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="副营行业" prop="deputyIndustry">
          <el-input
            show-word-limit
            v-model="editForm.deputyIndustry"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="模板实例" prop="example">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="4000"
            show-word-limit
            v-model="editForm.example"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信消息模板ID" prop="templateId">
          <el-input
            show-word-limit
            v-model="editForm.templateId"
            maxlength="120"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务URL" prop="busUrl">
          <el-input
            show-word-limit
            v-model="editForm.busUrl"
            maxlength="1000"
            placeholder="如:http://www.dbfm.com/#/mess/messageMange?id=#{id},其中#{id}为动态参数"
          ></el-input>
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
  { key: "name", name: "模板名字", width: "200px" },
  { key: "content", name: "内容" },
  // { key: "wxaccountId", name: "微信公众号", width:"100px"},
  { key: "templateId", name: "微信消息模板ID", width: "200px" }
  // { key: "primaryIndustry", name: "主营行业", width:"100px"},
  // { key: "deputyIndustry", name: "副营行业", width:"100px"},
];
import EnumSelector from "../../../components/form/enumSelector";
export default {
  components: { EnumSelector },
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
        primaryIndustry: "",
        deputyIndustry: "",
        templateId: "",
        wxaccountId: "",
        content: "",
        name: ""
      },
      style: {},
      rules: {
        primaryIndustry: [
          {
            required: true,
            message: "请输入帐号设置的主营行业",
            trigger: "change"
          }
        ],
        deputyIndustry: [
          {
            required: true,
            message: "请输入帐号设置主营行业的副营行业",
            trigger: "change"
          }
        ],
        templateId: [
          { required: true, message: "请输入模板id", trigger: "change" }
        ],
        //wxaccountId: [{ required: true, message: "请输入微信公众号id", trigger: "change" }],
        content: [{ required: true, message: "请输入内容", trigger: "change" }],
        name: [{ required: true, message: "请输入模板名字", trigger: "change" }]
      },
      addForm: {
        id: "",
        primaryIndustry: "",
        deputyIndustry: "",
        createDate: "",
        createUser: "",
        example: "",
        templateId: "",
        wxaccountId: "",
        content: "",
        name: "",
        busUrl: ""
      },
      editForm: {
        id: "",
        primaryIndustry: "",
        deputyIndustry: "",
        createDate: "",
        createUser: "",
        example: "",
        templateId: "",
        wxaccountId: "",
        content: "",
        name: "",
        busUrl: ""
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
          "primaryIndustry",
          "deputyIndustry",
          "createDate",
          "createUser",
          "example",
          "templateId",
          "wxaccountId",
          "content",
          "title"
        ];
        const filterVal = [
          "id",
          "primaryIndustry",
          "deputyIndustry",
          "createDate",
          "createUser",
          "example",
          "templateId",
          "wxaccountId",
          "content",
          "title"
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
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      this.$api
        .formPost("/api/mess/tmpl/wxTemplate/doGetList", params)
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
      if (row.primaryIndustry) {
        this.editForm.primaryIndustry = row.primaryIndustry;
      } else {
        this.editForm.primaryIndustry = "";
      }
      if (row.deputyIndustry) {
        this.editForm.deputyIndustry = row.deputyIndustry;
      } else {
        this.editForm.deputyIndustry = "";
      }
      if (row.createDate) {
        this.editForm.createDate = row.createDate;
      } else {
        this.editForm.createDate = "";
      }
      if (row.createUser) {
        this.editForm.createUser = row.createUser;
      } else {
        this.editForm.createUser = "";
      }
      if (row.example) {
        this.editForm.example = row.example;
      } else {
        this.editForm.example = "";
      }
      if (row.templateId) {
        this.editForm.templateId = row.templateId;
      } else {
        this.editForm.templateId = "";
      }
      if (row.wxaccountId) {
        this.editForm.wxaccountId = row.wxaccountId;
      } else {
        this.editForm.wxaccountId = "";
      }
      if (row.content) {
        this.editForm.content = row.content;
      } else {
        this.editForm.content = "";
      }
      if (row.name) {
        this.editForm.name = row.name;
      } else {
        this.editForm.name = "";
      }
      if (row.busUrl) {
        this.editForm.busUrl = row.busUrl;
      } else {
        this.editForm.busUrl = "";
      }
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let addFormParams = {};
          addFormParams.id = this.addForm.id;
          addFormParams.primaryIndustry = this.addForm.primaryIndustry;
          addFormParams.deputyIndustry = this.addForm.deputyIndustry;
          //addFormParams.createDate=this.addForm.createDate;
          let user = JSON.parse(sessionStorage.getItem("user"));
          addFormParams.createUser = user.userId;
          //addFormParams.createUser=this.addForm.createUser;
          addFormParams.example = this.addForm.example;
          addFormParams.templateId = this.addForm.templateId;
          addFormParams.wxaccountId = this.addForm.wxaccountId;
          addFormParams.content = this.addForm.content;
          addFormParams.name = this.addForm.name;
          addFormParams.busUrl = this.addForm.busUrl;
          this.$api
            .formPost("/api/mess/tmpl/wxTemplate/doSave", addFormParams)
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
          editFormParams.primaryIndustry = this.editForm.primaryIndustry;
          editFormParams.deputyIndustry = this.editForm.deputyIndustry;
          editFormParams.createDate = this.editForm.createDate;
          editFormParams.createUser = this.editForm.createUser;
          editFormParams.example = this.editForm.example;
          editFormParams.templateId = this.editForm.templateId;
          editFormParams.wxaccountId = this.editForm.wxaccountId;
          editFormParams.content = this.editForm.content;
          editFormParams.name = this.editForm.name;
          editFormParams.busUrl = this.editForm.busUrl;
          this.$api
            .formPost("/api/mess/tmpl/wxTemplate/doModById", editFormParams)
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
            .formPost("/api/mess/tmpl/wxTemplate/doRmById", {
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
      this.ruleForm = {
        primaryIndustry: "",
        deputyIndustry: "",
        templateId: "",
        wxaccountId: "",
        content: "",
        name: ""
      };
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
