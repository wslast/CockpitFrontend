<template>
  <div class="routerContent">
    <div class="card df p12">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.taskName"
        placeholder="请输入任务名称"
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
          <el-form-item label="任务名称" prop="taskName">
            <el-input v-model="ruleForm.taskName"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" prop="taskType">
            <el-select
              v-model="ruleForm.taskType"
              style="width: 100%"
              :clearable="true"
            >
              <el-option label="java" value="java"></el-option>
            </el-select>
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
      title="新增消息调度"
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
        <el-form-item label="任务名称" prop="taskName">
          <el-input
            show-word-limit
            v-model="addForm.taskName"
            maxlength="120"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务类型" prop="taskType">
          <el-select v-model="addForm.taskType" class="pctw100">
            <el-option label="java" value="java"></el-option>
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
        <el-form-item label="任务内容" prop="taskBody">
          <el-select v-model="addForm.taskBody" class="pctw100">
            <el-option
              v-for="(item, index) in interfaceList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="CRON值" prop="cron">
          <el-input v-model="addForm.cron" @focus="doFocus" maxlength="32">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog
      title="编辑消息调度"
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
        <el-form-item label="任务名称" prop="taskName">
          <el-input
            show-word-limit
            v-model="editForm.taskName"
            maxlength="120"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务类型" prop="taskType">
          <el-select v-model="editForm.taskType" class="pctw100">
            <el-option label="java" value="java"></el-option>
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
        <el-form-item label="任务内容" prop="taskBody">
          <el-select v-model="editForm.taskBody" class="pctw100">
            <el-option
              v-for="(item, index) in interfaceList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="CRON值" prop="cron">
          <el-input
            v-model="editForm.cron"
            @focus="doFocus"
            maxlength="32"
            style="width: 500px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- -------------------------------------------------------配置corn表达式---------- -->
    <cronExpression ref="cronExp" @backCall="onReflushCron"></cronExpression>
  </div>
</template>

<script>
const defaultFormThead = [
  { key: "taskName", name: "任务名称", width: "100px" },
  { key: "taskType", name: "任务类型", width: "100px" },
  { key: "taskBody", name: "任务内容" },
  { key: "cron", name: "CRON", width: "150px" },
  { key: "statusString", name: "状态", width: "100px" }
];
import cronExpression from "./components/cron.vue";
import EnumSelector from "../../components/form/enumSelector";
export default {
  components: { EnumSelector, cronExpression },
  data() {
    return {
      that: this,
      dialogCrontVisible: false,

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
        taskName: "",
        taskType: "",
        status: ""
      },
      style: {},
      rules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "change" }
        ],
        cron: [
          { required: true, message: "请输入CRON内容", trigger: "change" }
        ],
        taskBody: [
          { required: true, message: "请选择任务内容", trigger: "change" }
        ],
        taskType: [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ]
      },
      addForm: {
        id: "",
        taskName: "",
        taskType: "",
        taskBody: "",
        cron: "",
        status: ""
      },
      editForm: {
        id: "",
        taskName: "",
        taskType: "",
        taskBody: "",
        cron: "",
        status: ""
      },
      interfaceList: []
    };
  },

  mounted() {
    this.init();
    this.getInterfaceList();
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
          "taskName",
          "taskType",
          "taskBody",
          "cron",
          "status"
        ];
        const filterVal = [
          "id",
          "taskName",
          "taskType",
          "taskBody",
          "cron",
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
    getInterfaceList() {
      this.$api
        .formPost("/api/mess/bizmesstask/doGetInterfaceList", {})
        .then(res => {
          if (res.retHead.code == "0000000") {
            this.interfaceList = res.retBody;
            //console.log(this.interfaceList);
          }
        });
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
        .formPost("/api/mess/bizmesstask/doGetList", params)
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
        this.addForm.status = "1";
        this.addForm.taskType = "java";
      });
    },
    showEditDialog(index, row) {
      if (row.id) {
        this.editForm.id = row.id;
      } else {
        this.editForm.id = "";
      }
      if (row.taskName) {
        this.editForm.taskName = row.taskName;
      } else {
        this.editForm.taskName = "";
      }
      if (row.taskType) {
        this.editForm.taskType = row.taskType;
      } else {
        this.editForm.taskType = "";
      }
      if (row.taskBody) {
        this.editForm.taskBody = row.taskBody;
      } else {
        this.editForm.taskBody = "";
      }
      if (row.cron) {
        this.editForm.cron = row.cron;
      } else {
        this.editForm.cron = "";
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
          let addFormParams = {};
          addFormParams.id = this.addForm.id;
          addFormParams.taskName = this.addForm.taskName;
          addFormParams.taskType = this.addForm.taskType;
          addFormParams.taskBody = this.addForm.taskBody;
          addFormParams.cron = this.addForm.cron;
          addFormParams.status = this.addForm.status;
          this.$api
            .formPost("/api/mess/bizmesstask/doSave", addFormParams)
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
          editFormParams.taskName = this.editForm.taskName;
          editFormParams.taskType = this.editForm.taskType;
          editFormParams.taskBody = this.editForm.taskBody;
          editFormParams.cron = this.editForm.cron;
          editFormParams.status = this.editForm.status;
          this.$api
            .formPost("/api/mess/bizmesstask/doModById", editFormParams)
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
            .formPost("/api/mess/bizmesstask/doRmById", {
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
    },
    doFocus() {
      this.$refs.cronExp.onInit(this.editForm.cron);
    },
    onReflushCron(cron) {
      if (this.dialogFormVisible == true) {
        this.addForm.cron = cron;
      } else {
        this.editForm.cron = cron;
      }
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
.el-icon-edit {
  cursor: pointer;
  font-size: 25px;
  color: black;
}
</style>
