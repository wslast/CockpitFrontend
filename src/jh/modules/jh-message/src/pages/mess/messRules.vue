<template>
  <div class="routerContent">
    <div class="card form df">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.name"
        placeholder="请输入规则名称"
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
          <el-form-item label="规则名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="ruleForm.status"
              style="width: 100%"
              :clearable="true"
            >
              <el-option label="启用" :value="1"></el-option>
              <el-option label="停用" :value="0"></el-option>
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog
      title="新增消息策略"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      inline
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
        <el-form-item label="规则名称" prop="name">
          <el-input
            show-word-limit
            v-model="addForm.name"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否避开节假日" prop="avoidHoliday">
          <el-switch
            v-model="addForm.avoidHoliday"
            active-text="避开"
            inactive-text="不避开"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="重试最大次数" prop="retryLimit">
          <el-input-number
            v-model="addForm.retryLimit"
            :min="0"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="重试类型" prop="retryType">
          <el-select
            v-model="addForm.retryType"
            class="pctw100"
            @change="handleRetryChange"
          >
            <el-option label="等长" :value="0"></el-option>
            <el-option label="指数" :value="1"></el-option>
            <el-option label="倍数" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="倍数值" prop="multiples" v-show="multipleshow">
          <el-input-number
            v-model="addForm.multiples"
            :min="1"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="间隔时长" prop="retryInterval">
          <el-input
            placeholder="请输入内容"
            v-model="addForm.retryInterval"
            class="input-with-select"
            oninput="value=value.replace(/[^0-9]/g,'')"
            maxlength="10"
          >
            <el-select v-model="addForm.unit" slot="append" style="width: 80px">
              <el-option label="天" value="天"></el-option>
              <el-option label="小时" value="小时"></el-option>
              <el-option label="分钟" value="分钟"></el-option>
              <el-option label="秒" value="秒"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="addForm.status"
            active-text="启用"
            inactive-text="停用"
            :active-value="1"
            :inactive-value="0"
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
      title="编辑消息策略"
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
        <el-form-item label="规则名称" prop="name">
          <el-input
            show-word-limit
            v-model="editForm.name"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否避开节假日" prop="avoidHoliday">
          <el-switch
            v-model="editForm.avoidHoliday"
            active-text="避开"
            inactive-text="不避开"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="重试最大次数" prop="retryLimit">
          <el-input-number
            v-model="editForm.retryLimit"
            :min="0"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="重试类型" prop="retryType">
          <el-select
            v-model="editForm.retryType"
            class="pctw100"
            @change="handleRetryChange"
          >
            <el-option label="等长" :value="0"></el-option>
            <el-option label="指数" :value="1"></el-option>
            <el-option label="倍数" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="倍数值" prop="multiples" v-show="multipleshow">
          <el-input-number
            v-model="editForm.multiples"
            :min="1"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="间隔时长" prop="retryInterval">
          <el-input
            placeholder="请输入内容"
            v-model="editForm.retryInterval"
            class="input-with-select"
            oninput="value=value.replace(/[^0-9]/g,'')"
            maxlength="10"
          >
            <el-select
              v-model="editForm.unit"
              slot="append"
              style="width: 80px"
            >
              <el-option label="天" value="天"></el-option>
              <el-option label="小时" value="小时"></el-option>
              <el-option label="分钟" value="分钟"></el-option>
              <el-option label="秒" value="秒"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="editForm.status"
            active-text="启用"
            inactive-text="停用"
            :active-value="1"
            :inactive-value="0"
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
  { key: "name", name: "规则名称" },
  { key: "avoidHolidayString", name: "是否避开节假日", width: "150px" },
  { key: "retryLimit", name: "重试最大次数", width: "120px" },
  { key: "retryTypeString", name: "重试类型", width: "100px" },
  { key: "retryInterval", name: "间隔时长", width: "100px" },
  { key: "unit", name: "间隔时长单位", width: "120px" },
  { key: "multiples", name: "倍数值", width: "100px" },
  { key: "statusString", name: "状态", width: "100px" }
];
import EnumSelector from "../../components/form/enumSelector";
export default {
  components: { EnumSelector },
  data() {
    return {
      multipleshow: false,

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
        avoidHoliday: "",
        retryLimit: "",
        retryType: "",
        retryInterval: "",
        status: ""
      },
      style: {},
      rules: {
        name: [
          { required: true, message: "请输入规则名称", trigger: "change" }
        ],
        retryType: [
          { required: true, message: "请选择重试类型", trigger: "change" }
        ],
        retryInterval: [
          { required: true, message: "请输入间隔时长", trigger: "change" }
        ],
        unit: [
          { required: true, message: "请选择间隔时长单位", trigger: "change" }
        ],
        retryLimit: [
          { required: true, message: "请输入重试最大次数", trigger: "change" }
        ]
      },
      addForm: {
        id: "",
        name: "",
        avoidHoliday: "0",
        retryLimit: 0,
        retryType: 0,
        retryInterval: 0,
        status: 1,
        mouldid: "",
        mouldname: "",
        unit: "",
        multiples: 1
      },
      editForm: {
        id: "",
        name: "",
        avoidHoliday: "0",
        retryLimit: 0,
        retryType: 0,
        retryInterval: 0,
        status: 1,
        mouldid: "",
        mouldname: "",
        unit: "",
        multiples: 1
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
          "ruleType",
          "code",
          "name",
          "avoidHoliday",
          "retryLimit",
          "retryType",
          "retryInterval",
          "status"
        ];
        const filterVal = [
          "id",
          "ruleType",
          "code",
          "name",
          "avoidHoliday",
          "retryLimit",
          "retryType",
          "retryInterval",
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
      this.$api.formPost("/api/mess/rule/rules/doGetList", params).then(res => {
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
      this.addForm.status = 1;
      this.addForm.retryInterval = 60;
      this.addForm.unit = "分钟";
      this.addForm.multiples = 0;
      this.multipleshow = false;
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
      if (row.avoidHoliday) {
        this.editForm.avoidHoliday = row.avoidHoliday;
      } else {
        this.editForm.avoidHoliday = "0";
      }
      if (row.retryLimit != null) {
        this.editForm.retryLimit = row.retryLimit;
      } else {
        this.editForm.retryLimit = 0;
      }
      if (row.retryType != null) {
        this.editForm.retryType = row.retryType;
        this.multipleshow = row.retryType == 2;
      } else {
        this.editForm.retryType = 0;
      }
      if (row.retryInterval != null) {
        this.editForm.retryInterval = row.retryInterval;
      } else {
        this.editForm.retryInterval = 0;
      }
      if (row.unit != null) {
        this.editForm.unit = row.unit;
      } else {
        this.editForm.unit = "";
      }
      if (row.status != null) {
        this.editForm.status = row.status;
      } else {
        this.editForm.status = 1;
      }
      if (row.multiples != null) {
        this.editForm.multiples = row.multiples;
      } else {
        this.editForm.multiples = 15;
      }
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let addFormParams = {};
          addFormParams.id = this.addForm.id;
          addFormParams.name = this.addForm.name;
          addFormParams.avoidHoliday = this.addForm.avoidHoliday;
          addFormParams.retryLimit = this.addForm.retryLimit;
          addFormParams.retryType = this.addForm.retryType;
          addFormParams.retryInterval = this.addForm.retryInterval;
          addFormParams.status = this.addForm.status;
          addFormParams.unit = this.addForm.unit;
          if (this.multipleshow) {
            addFormParams.multiples = this.addForm.multiples;
          }
          this.$api
            .formPost("/api/mess/rule/rules/doSave", addFormParams)
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
          editFormParams.avoidHoliday = this.editForm.avoidHoliday;
          editFormParams.retryLimit = this.editForm.retryLimit;
          editFormParams.retryType = this.editForm.retryType;
          editFormParams.retryInterval = this.editForm.retryInterval;
          editFormParams.status = this.editForm.status;
          editFormParams.unit = this.editForm.unit;
          if (this.multipleshow) {
            editFormParams.multiples = this.editForm.multiples;
          }
          this.$api
            .formPost("/api/mess/rule/rules/doModById", editFormParams)
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
            .formPost("/api/mess/rule/rules/doRmById", {
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
    handleRetryChange(value) {
      this.multipleshow = value == 2;
      if (this.dialogFormVisible) {
        if (value == 0) {
          this.addForm.retryInterval = 60;
          this.addForm.unit = "分钟";
        }
        if (value == 2) {
          this.addForm.retryInterval = 10;
          this.addForm.multiples = 15;
          this.addForm.unit = "分钟";
        }
        if (value == 1) {
          this.addForm.retryInterval = 10;
          this.addForm.unit = "分钟";
        }
      } else {
        if (value == 0) {
          this.editForm.retryInterval = 60;
          this.editForm.unit = "分钟";
        }
        if (value == 2) {
          this.editForm.retryInterval = 10;
          this.editForm.multiples = 15;
          this.editForm.unit = "分钟";
        }
        if (value == 1) {
          this.editForm.retryInterval = 10;
          this.editForm.unit = "分钟";
        }
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
</style>
