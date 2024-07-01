<template>
  <div class="messJob">
    <!-- 第一行按钮 -->
    <div class="card tr mb2">
      <el-tooltip content="显示字段筛选" placement="bottom" effect="light">
        <el-popover placement="bottom" width="200" trigger="click">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="showItemList"
            @change="handleCheckedChange"
          >
            <el-checkbox
              v-for="(item, key) in allItemList"
              :key="key"
              :label="item"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
          <el-button
            slot="reference"
            icon="el-icon-menu"
            type="primary"
            circle
          ></el-button>
        </el-popover>
      </el-tooltip>

      <el-tooltip content="展开/收起表单" placement="bottom" effect="light">
        <el-button
          icon="el-icon-search"
          @click="formShow = !formShow"
          type="primary"
          circle
        ></el-button>
      </el-tooltip>
      <el-tooltip content="下载当前表格数据" placement="bottom" effect="light">
        <el-button
          icon="el-icon-download"
          @click="handleDownload"
          type="primary"
          circle
        ></el-button>
      </el-tooltip>
      <el-button type="primary" icon="el-icon-plus" @click="showDialog"
        >添加</el-button
      >
    </div>

    <!-- 查询表单 -->
    <div class="card" v-show="formShow">
      <el-form
        :style="style"
        :model="ruleForm"
        ref="ruleForm"
        inline
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="调度任务名" prop="jobName">
          <el-input
            v-model="ruleForm.jobName"
            placeholder="请输入调度任务名"
          ></el-input>
        </el-form-item>
        <el-form-item label="调度任务描述" prop="jobDesc">
          <el-input
            v-model="ruleForm.jobDesc"
            placeholder="请输入调度任务描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="cron表达式" prop="jobCron">
          <el-input
            v-model="ruleForm.jobCron"
            placeholder="请输入cron表达式"
          ></el-input>
        </el-form-item>

        <el-form-item label="调度任务类型" prop="jobType">
          <el-select
            v-model="ruleForm.jobType"
            placeholder="请选择调度任务类型"
          >
            <el-option
              v-for="item in jobTypes"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务来源ID" prop="sourceId">
          <el-input
            v-model="ruleForm.sourceId"
            placeholder="请输入任务来源ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="调度任务状态" prop="jobState">
          <el-select
            v-model="ruleForm.jobState"
            placeholder="请选择调度任务状态"
          >
            <el-option
              v-for="item in jobStates"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="JSON参数" prop="jobData">
          <el-input
            v-model="ruleForm.jobData"
            placeholder="请输入JSON参数"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建人姓名" prop="createName">
          <el-input
            v-model="ruleForm.createName"
            placeholder="请输入创建人姓名"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="init">查询</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--table表格-->
    <div class="tableContent">
      <el-table
        ref="dragTable"
        height="100%"
        row-key="id"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in showItemList"
          :key="index"
          :label="item.name"
          width="120px"
        >
          <template slot-scope="scope">
            <template v-if="!item.formatter">
              <el-tooltip
                effect="light"
                :content="scope.row[item.key]"
                :visible-arrow="false"
                placement="bottom"
              >
                <span>{{ scope.row[item.key] }}</span>
              </el-tooltip>
            </template>
            <template v-else>
              <span v-text="item.formatter(scope.row, item)"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="248px"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="showEditDialog(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button
              type="primary"
              @click="showRecord(scope.$index, scope.row)"
              >执行记录</el-button
            >
            <el-button type="warning" @click="doClose(scope.$index, scope.row)"
              >暂停</el-button
            >
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card tr">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog title="新增管理" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm" :rules="rules">
        <el-form-item
          label="调度任务名"
          :label-width="formLabelWidth"
          prop="jobName"
        >
          <el-input
            v-model="form.jobName"
            autocomplete="off"
            placeholder="请输入调度任务名，必须确保唯一"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="调度任务描述"
          :label-width="formLabelWidth"
          prop="jobDesc"
        >
          <el-input v-model="form.jobDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="cron表达式"
          :label-width="formLabelWidth"
          prop="jobCron"
        >
          <el-input
            v-model="form.jobCron"
            autocomplete="off"
            @focus="doFocus"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="调度任务类型"
          :label-width="formLabelWidth"
          prop="jobType"
        >
          <el-select v-model="form.jobType" placeholder="请选择">
            <el-option
              v-for="item in jobTypes"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="任务来源ID"
          :label-width="formLabelWidth"
          prop="sourceId"
        >
          <el-input v-model="form.sourceId" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="调度任务状态" :label-width="formLabelWidth" prop="jobState">
          <el-input v-model="form.jobState" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item
          label="JSON参数"
          :label-width="formLabelWidth"
          prop="jobData"
        >
          <el-input
            v-model="form.jobData"
            autocomplete="off"
            placeholder="例如：{'title': '消息标题', 'content': '消息内容'}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog title="查看信息" :visible.sync="dialogEditVisible">
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item
          label="调度任务名"
          :label-width="formLabelWidth"
          prop="jobName"
        >
          <el-input v-model="editForm.jobName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="调度任务描述"
          :label-width="formLabelWidth"
          prop="jobDesc"
        >
          <el-input v-model="editForm.jobDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="cron表达式"
          :label-width="formLabelWidth"
          prop="jobCron"
        >
          <el-input v-model="editForm.jobCron" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="调度任务类型"
          :label-width="formLabelWidth"
          prop="jobType"
        >
          <el-input v-model="editForm.jobType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="任务来源ID"
          :label-width="formLabelWidth"
          prop="sourceId"
        >
          <el-input v-model="editForm.sourceId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="调度任务状态"
          :label-width="formLabelWidth"
          prop="jobState"
        >
          <el-input v-model="editForm.jobState" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="JOB类路径"
          :label-width="formLabelWidth"
          prop="classPath"
        >
          <el-input v-model="editForm.classPath" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="JSON参数"
          :label-width="formLabelWidth"
          prop="jobData"
        >
          <el-input v-model="editForm.jobData" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button> -->
      </div>
    </el-dialog>

    <!-- -------------------------------------------------------配置corn表达式---------- -->
    <el-dialog title="配置CRON表达式" :visible.sync="dialogCrontVisible">
      <cronExpression :that.sync="that"></cronExpression>
    </el-dialog>

    <!-- -------------------------------------------------------执行计划--------- -->
    <el-dialog title="执行记录" :visible.sync="dialogRecordVisible">
      <jobRecord :that.sync="that"></jobRecord>
    </el-dialog>
  </div>
</template>

<script>
import cronExpression from "./components/cron.vue";
import jobRecord from "./jobRecord.vue";
import { getLabelByCode } from "./components/function";

const jobStates2 = [
  { code: "1", label: "已启用" },
  { code: "2", label: "已暂停" },
  { code: "3", label: "已删除" },
  { code: "4", label: "已失效" }
];
const jobTypes2 = [{ code: "1", label: "日历提醒事件" }];

const defaultFormThead = [
  { key: "jobName", name: "调度任务名" },
  { key: "jobDesc", name: "调度任务描述" },
  { key: "jobCron", name: "cron表达式" },
  {
    key: "jobType",
    name: "任务类型",
    formatter: row => {
      if (row.jobType) {
        return getLabelByCode(row.jobType, jobTypes2);
      }
      return "";
    }
  },
  {
    key: "jobState",
    name: "任务状态",
    formatter: row => {
      if (row.jobState) {
        return getLabelByCode(row.jobState, jobStates2);
      }
      return "";
    }
  },
  { key: "classPath", name: "JOB类路径" },
  { key: "jobData", name: "JSON参数" },
  { key: "createName", name: "创建人姓名" },
  {
    key: "createTime",
    name: "创建时间",
    formatter: row => {
      if (row.createName) {
        return new Date(row.createName).toLocaleString();
      }
      return "";
    }
  }
];

export default {
  components: { cronExpression, jobRecord },
  data() {
    return {
      style: {},
      isIndeterminate: false,
      checkAll: true,
      allItemList: defaultFormThead,
      showItemList: defaultFormThead,
      formShow: false,
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      // 查询form
      ruleForm: {
        jobName: "",
        jobDesc: "",
        jobCron: "",
        jobType: "",
        sourceId: "",
        jobState: "",
        classPath: "",
        jobData: "",
        groupName: "",
        createId: "",
        createName: "",
        updateId: "",
        updateName: ""
      },

      jobStates: [
        { code: "1", label: "已启用" },
        { code: "2", label: "已暂停" },
        { code: "3", label: "已删除" },
        { code: "4", label: "已失效" }
      ],
      dialogRecordVisible: false,
      jobId: "",
      jobTypes: [{ code: "1", label: "日历提醒事件" }],
      that: this,
      user: {},
      // cron配置dialog
      dialogCrontVisible: false,
      dialogFormVisible: false,
      dialogEditVisible: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "100px",

      style: {},
      rules: {},
      form: {
        jobName: "",
        jobDesc: "",
        jobCron: "",
        jobType: "",
        sourceId: "",
        jobState: "",
        classPath: "",
        jobData: "",
        groupName: "",
        createId: "",
        createName: "",
        updateId: "",
        updateName: ""
      },
      editForm: {
        id: "",
        jobName: "",
        jobDesc: "",
        jobCron: "",
        jobType: "",
        sourceId: "",
        jobState: "",
        classPath: "",
        jobData: "",
        groupName: "",
        createId: "",
        createName: "",
        updateId: "",
        updateName: ""
      }
    };
  },

  mounted() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user = user;
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
    }
  },
  methods: {
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

    /**
     * table导出
     */
    handleDownload() {
      this.downloadLoading = true;
      import("@/assets/js/Export2Excel.js").then(excel => {
        const tHeader = [
          "调度任务名",
          "调度任务描述",
          "cron表达式",
          "任务类型",
          "任务状态",
          "JOB类路径",
          "JSON参数",
          "创建人姓名",
          "创建时间"
        ];
        const filterVal = [
          "jobName",
          "jobDesc",
          "jobCron",
          "jobType",
          "jobState",
          "classPath",
          "jobData",
          "createName",
          "createTime"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "调度管理列表"
        });
        this.downloadLoading = false;
      });
    },

    /**
    转json
    */
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

    getLabelByCode(code, enums) {
      return getLabelByCode(code, enums);
    },
    doFocus() {
      this.dialogCrontVisible = true;
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
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      this.$api.formPost("/api/mess/job/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
        }
      });
    },
    showDialog() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    showRecord(index, row) {
      this.jobId = row.id;
      this.dialogRecordVisible = true;
    },
    showEditDialog(index, row) {
      this.editForm.id = row.id;
      this.editForm.jobName = row.jobName;
      this.editForm.jobDesc = row.jobDesc;
      this.editForm.jobCron = row.jobCron;
      this.editForm.jobType = this.getLabelByCode(row.jobType, this.jobTypes);
      this.editForm.sourceId = row.sourceId;
      this.editForm.jobState = getLabelByCode(row.jobState, this.jobStates);
      this.editForm.classPath = row.classPath;
      this.editForm.jobData = row.jobData;
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let params = this.form;

          let jobCron = params.jobCron;
          if (!jobCron) {
            this.$message({
              message: "Cron表达式不存在！",
              type: "error"
            });
          } else {
            params.createId = this.user.id;
            params.createName = this.user.realName;
            this.$api.formPost("/api/mess/job/doSave", params).then(res => {
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
        }
      });
    },
    handleEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let params = this.editForm;
          params.updateId = this.user.id;
          params.updateName = this.user.realName;
          this.$api.formPost("/api/mess/job/doModById", params).then(res => {
            if (res.retHead.code == "0000000") {
              this.$message.success("执行成功！");
              this.init();
              this.dialogEditVisible = false;
            } else {
              this.$message.error("执行失败！");
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
            .formPost("/api/mess/job/doRmById", {
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
                  message: "操作失败！",
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      this.init();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    doClose(index, row) {
      this.$confirm("此操作将暂停该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .formPost("/api/mess/job/doStop", {
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
                  message: "操作失败！",
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消暂停操作"
          });
        });
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.messJob {
  display: flex;
  height: 100%;
  flex-direction: column;
  .tableContent {
    flex-grow: 1;
    overflow: auto;
  }
}
.card .el-select {
  width: 160px;
}
</style>
