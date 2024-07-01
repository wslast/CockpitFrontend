<template>
  <div class>
    <div class="card tr mb2">
      <el-tooltip content="显示字段筛选" placement="bottom" effect="light">
        <el-popover placement="bottom" width="200" trigger="click">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选
          </el-checkbox>
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
    <div class="card" v-show="formShow">
      <el-form
        :style="style"
        :model="ruleForm"
        ref="ruleForm"
        inline
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="创建日期" prop="aaTestCreateTime">
          <el-date-picker
            style="width: 178px"
            v-model="ruleForm.aaTestCreateTime"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证件类型" prop="aaTestCardType">
          <enum-selector
            style="width: 178px"
            :model="ruleForm.aaTestCardType"
            v-model="ruleForm.aaTestCardType"
            code="card_1"
            enabledState="1"
            clearable="1"
            placeholder="请选择"
          ></enum-selector>
        </el-form-item>
        <el-form-item label="名称" prop="aaTest2Name">
          <el-input v-model="ruleForm.aaTest2Name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="aaTest2Type">
          <enum-selector
            style="width: 178px"
            :model="ruleForm.aaTest2Type"
            v-model="ruleForm.aaTest2Type"
            code="card_1"
            enabledState="1"
            clearable="1"
            placeholder="请选择"
          ></enum-selector>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >查询</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        type="index"
        width="60px"
        align="center"
        fixed="left"
        label="序号"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in showItemList"
        :width="item.width || ''"
        :key="index"
        :label="item.name"
      >
        <template slot-scope="scope">
          <template v-if="!item.formatter">{{ scope.row[item.key] }}</template>
          <template v-else>
            <span v-text="item.formatter(scope.row, item)"></span>
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="180px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button  @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button  type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        -->
    </el-table>
    <el-card style="text-align:right;">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog
      title="新增管理"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="主表表单">
          <el-form
            :style="style"
            :model="addForm"
            ref="addForm"
            :rules="rules"
            inline
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="备注"
              :label-width="formLabelWidth"
              prop="aaTestRemark"
            >
              <el-input
                maxlength="255"
                show-word-limit
                style="width: 178px"
                type="textarea"
                v-model="addForm.aaTestRemark"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="创建日期"
              :label-width="formLabelWidth"
              prop="aaTestCreateTime"
            >
              <el-date-picker
                style="width: 178px"
                v-model="addForm.aaTestCreateTime"
                type="datetime"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="证件类型"
              :label-width="formLabelWidth"
              prop="aaTestCardType"
            >
              <enum-selector
                style="width: 178px"
                :model="addForm.aaTestCardType"
                v-model="addForm.aaTestCardType"
                code="card_1"
                enabledState="1"
                clearable="1"
                placeholder="请选择"
              ></enum-selector>
            </el-form-item>
            <el-form-item
              label="姓名"
              :label-width="formLabelWidth"
              prop="aaTestName"
            >
              <el-input
                maxlength="32"
                show-word-limit
                v-model="addForm.aaTestName"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="金额"
              :label-width="formLabelWidth"
              prop="aaTestJe"
            >
              <el-input-number
                v-model="addForm.aaTestJe"
                :precision="4"
                style="width: 178px"
                :step="1"
                :min="0"
                :max="100"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              label="城市"
              :label-width="formLabelWidth"
              prop="aaTestCity"
            >
              <el-input
                maxlength="255"
                show-word-limit
                v-model="addForm.aaTestCity"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="从表表单">
          <el-table :data="tableDataC" border style="width: 100%">
            <el-table-column align="center" width="30" fixed>
              <template slot="header">
                <el-button
                  class="el-icon-circle-plus"
                  @click="cAddShow"
                  style="padding:0"
                  type="text"
                ></el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  type="text"
                  class="el-icon-remove"
                  @click="deleteRow(scope.$index, scope.row)"
                  style="padding:0"
                ></el-button>
              </template>
            </el-table-column>

            <el-table-column prop="aaTest2Name" label="名称">
              <template slot-scope="scope">
                <el-input
                  maxlength="255"
                  show-word-limit
                  style="width: 100%"
                  v-model="scope.row.aaTest2Name"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="aaTest2CreateTime" label="时间">
              <template slot-scope="scope">
                <el-date-picker
                  style="width:100%"
                  v-model="scope.row.aaTest2CreateTime"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="aaTest2Type" label="类型">
              <template slot-scope="scope">
                <enum-selector
                  style="width: 100%"
                  :model="scope.row.aaTest2Type"
                  v-model="scope.row.aaTest2Type"
                  code="card_1"
                  enabledState="1"
                  clearable="1"
                  placeholder="请选择"
                ></enum-selector>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------从表弹出框 -->
    <el-dialog title="从表表单" :visible.sync="dialogFormCVisible">
      <el-form
        :style="style"
        :model="addFormC"
        ref="addFormC"
        :rules="rulesC"
        inline
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="名称"
          :label-width="formLabelWidth"
          prop="aaTest2Name"
        >
          <el-input
            maxlength="255"
            show-word-limit
            v-model="addFormC.aaTest2Name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="时间"
          :label-width="formLabelWidth"
          prop="aaTest2CreateTime"
        >
          <el-date-picker
            style="width: 178px"
            v-model="addFormC.aaTest2CreateTime"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="类型"
          :label-width="formLabelWidth"
          prop="aaTest2Type"
        >
          <enum-selector
            style="width: 178px"
            :model="addFormC.aaTest2Type"
            v-model="addFormC.aaTest2Type"
            code="card_1"
            enabledState="1"
            clearable="1"
            placeholder="请选择"
          ></enum-selector>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormCVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddC">确 定</el-button>
      </div>
    </el-dialog>

    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog
      title="编辑管理"
      :visible.sync="dialogEditVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :style="style"
        :model="editForm"
        ref="editForm"
        :rules="rules"
        inline
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
          prop="aaTestRemark"
        >
          <el-input
            style="width: 178px"
            type="textarea"
            v-model="editForm.aaTestRemark"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="创建日期"
          :label-width="formLabelWidth"
          prop="aaTestCreateTime"
        >
          <el-date-picker
            style="width: 178px"
            v-model="editForm.aaTestCreateTime"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="证件类型"
          :label-width="formLabelWidth"
          prop="aaTestCardType"
        >
          <enum-selector
            style="width: 178px"
            :model="editForm.aaTestCardType"
            v-model="editForm.aaTestCardType"
            code="card_1"
            enabledState="1"
            clearable="1"
            placeholder="请选择"
          ></enum-selector>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="aaTestName"
        >
          <el-input v-model="editForm.aaTestName"></el-input>
        </el-form-item>
        <el-form-item
          label="金额"
          :label-width="formLabelWidth"
          prop="aaTestJe"
        >
        </el-form-item>
        <el-form-item
          label="城市"
          :label-width="formLabelWidth"
          prop="aaTestCity"
        >
          <el-input v-model="editForm.aaTestCity"></el-input>
        </el-form-item>
        <el-form-item
          label="名称"
          :label-width="formLabelWidth"
          prop="aaTest2Name"
        >
          <el-input v-model="editForm.aaTest2Name"></el-input>
        </el-form-item>
        <el-form-item
          label="时间"
          :label-width="formLabelWidth"
          prop="aaTest2CreateTime"
        >
          <el-date-picker
            style="width: 178px"
            v-model="editForm.aaTest2CreateTime"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="类型"
          :label-width="formLabelWidth"
          prop="aaTest2Type"
        >
          <enum-selector
            style="width: 178px"
            :model="editForm.aaTest2Type"
            v-model="editForm.aaTest2Type"
            code="card_1"
            enabledState="1"
            clearable="1"
            placeholder="请选择"
          ></enum-selector>
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
import export_json_to_excel from "@/assets/js/Export2Excel.js";
const defaultFormThead = [
  { key: "aaTestRemark", name: "备注" },
  {
    key: "aaTestCreateTime",
    name: "创建日期",
    formatter: row => {
      if (row.aaTestCreateTime) {
        return new Date(row.aaTestCreateTime).toLocaleString();
      } else {
        return "";
      }
    }
  },
  { key: "aaTestCardType", name: "证件类型" },
  { key: "aaTestName", name: "姓名" },
  { key: "aaTestJe", name: "金额" },
  { key: "aaTestCity", name: "城市" },
  { key: "aaTest2Name", name: "名称" },
  {
    key: "aaTest2CreateTime",
    name: "时间",
    formatter: row => {
      if (row.aaTest2CreateTime) {
        return new Date(row.aaTest2CreateTime).toLocaleString();
      } else {
        return "";
      }
    }
  },
  { key: "aaTest2Type", name: "类型" }
];
export default {
  data() {
    return {
      tableDataC: [],
      checkAll: true,
      isIndeterminate: false,
      allItemList: defaultFormThead,
      showItemList: defaultFormThead,
      formShow: false,
      dialogFormVisible: false,
      dialogFormCVisible: false,
      dialogEditVisible: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "80px",
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      ruleForm: {
        aaTestCreateTime: "",
        aaTestCardType: "",
        aaTest2Name: "",
        aaTest2Type: ""
      },
      style: {},
      addFormC: {
        aaTest2Name: "",
        aaTest2CreateTime: "",
        aaTest2Type: ""
      },
      rulesC: {},
      rules: {},
      addForm: {
        aaTestRemark: "",
        aaTestCreateTime: "",
        aaTestCardType: "",
        aaTestName: "",
        aaTestJe: "",
        aaTestCity: ""
      },
      editForm: {
        aaTestRemark: "",
        aaTestCreateTime: "",
        aaTestCardType: "",
        aaTestName: "",
        aaTestJe: "",
        aaTestCity: "",
        aaTest2Name: "",
        aaTest2CreateTime: "",
        aaTest2Type: ""
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
    deleteRow(index, row) {
      this.tableDataC.splice(index, 1);
    },
    cAddShow() {
      this.dialogFormCVisible = true;
      this.$nextTick(() => {
        this.resetForm("addFormC");
      });
    },
    handleAddC() {
      this.$refs.addFormC.validate(valid => {
        if (valid) {
          this.tableDataC.push({
            aaTest2Name: this.addFormC.aaTest2Name,
            aaTest2CreateTime: this.addFormC.aaTest2CreateTime,
            aaTest2Type: this.addFormC.aaTest2Type
          });
          this.dialogFormCVisible = false;
        }
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      const tHeader = [
        "备注",
        "创建日期",
        "证件类型",
        "姓名",
        "主表主键",
        "金额",
        "城市",
        "名称",
        "从表主键",
        "主id",
        "时间",
        "类型"
      ];
      const filterVal = [
        "aaTestRemark",
        "aaTestCreateTime",
        "aaTestCardType",
        "aaTestName",
        "aaTestId",
        "aaTestJe",
        "aaTestCity",
        "aaTest2Name",
        "aaTest2Id",
        "aaTest2ZId",
        "aaTest2CreateTime",
        "aaTest2Type"
      ];
      const data = this.formatJson(filterVal, this.tableData);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "table-list"
      });
      this.downloadLoading = false;
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
      let searchForm = {};
      if (this.ruleForm.aaTestCreateTime) {
        searchForm.aaTestCreateTime = this.ruleForm.aaTestCreateTime;
      }
      searchForm.aaTestCardType = this.ruleForm.aaTestCardType;
      searchForm.aaTest2Name = this.ruleForm.aaTest2Name;
      searchForm.aaTest2Type = this.ruleForm.aaTest2Type;
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...searchForm
      };
      this.$api
        .formPost("/api/biz/flow/aaTestAaTest2/doGetList", params)
        .then(res => {
          if (res.retHead.code == "0000000") {
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
      this.form = {};
      this.tableDataC = [];
    },
    showEditDialog(index, row) {
      if (row.aaTestRemark) {
        this.editForm.aaTestRemark = row.aaTestRemark;
      }
      if (row.aaTestCreateTime) {
        this.editForm.aaTestCreateTime = new Date(row.aaTestCreateTime);
      }
      if (row.aaTestCardType) {
        this.editForm.aaTestCardType = row.aaTestCardType;
      }
      if (row.aaTestName) {
        this.editForm.aaTestName = row.aaTestName;
      }
      if (row.aaTestId) {
        this.editForm.aaTestId = row.aaTestId;
      }
      if (row.aaTestJe) {
        this.editForm.aaTestJe = row.aaTestJe;
      }
      if (row.aaTestCity) {
        this.editForm.aaTestCity = row.aaTestCity;
      }
      if (row.aaTest2Name) {
        this.editForm.aaTest2Name = row.aaTest2Name;
      }
      if (row.aaTest2Id) {
        this.editForm.aaTest2Id = row.aaTest2Id;
      }
      if (row.aaTest2ZId) {
        this.editForm.aaTest2ZId = row.aaTest2ZId;
      }
      if (row.aaTest2CreateTime) {
        this.editForm.aaTest2CreateTime = new Date(row.aaTest2CreateTime);
      }
      if (row.aaTest2Type) {
        this.editForm.aaTest2Type = row.aaTest2Type;
      }
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let addFormParams = {};
          addFormParams.aaTestRemark = this.addForm.aaTestRemark;
          if (this.addForm.aaTestCreateTime) {
            addFormParams.aaTestCreateTime = this.addForm.aaTestCreateTime;
          }
          addFormParams.aaTestCardType = this.addForm.aaTestCardType;
          addFormParams.aaTestName = this.addForm.aaTestName;
          addFormParams.aaTestJe = this.addForm.aaTestJe;
          addFormParams.aaTestCity = this.addForm.aaTestCity;
          addFormParams.tableDataClist = this.tableDataC;
          this.$api
            .post("/api/biz/flow/aaTestAaTest2/doSaveMS", addFormParams)
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
                  message: "添加失败！",
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
          editFormParams.aaTestRemark = this.editForm.aaTestRemark;
          if (this.editForm.aaTestCreateTime) {
            editFormParams.aaTestCreateTime = this.editForm.aaTestCreateTime;
          }
          editFormParams.aaTestCardType = this.editForm.aaTestCardType;
          editFormParams.aaTestName = this.editForm.aaTestName;
          editFormParams.aaTestId = this.editForm.aaTestId;
          editFormParams.aaTestJe = this.editForm.aaTestJe;
          editFormParams.aaTestCity = this.editForm.aaTestCity;
          editFormParams.aaTest2Name = this.editForm.aaTest2Name;
          editFormParams.aaTest2Id = this.editForm.aaTest2Id;
          editFormParams.aaTest2ZId = this.editForm.aaTest2ZId;
          if (this.editForm.aaTest2CreateTime) {
            editFormParams.aaTest2CreateTime = this.editForm.aaTest2CreateTime;
          }
          editFormParams.aaTest2Type = this.editForm.aaTest2Type;
          this.$api
            .formPost("/api/biz/flow/aaTestAaTest2/doModById", editFormParams)
            .then(res => {
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
            .formPost("/api/biz/flow/aaTestAaTest2/doRmById", {
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
    }
  }
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
