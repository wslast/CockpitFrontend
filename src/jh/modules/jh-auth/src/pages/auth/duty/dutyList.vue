<template>
  <div class="dutyList routerContent">
    <div class="card df p12">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <el-button @click="handleDownload" type="primary"
        >下载当前表格数据</el-button
      >
      <el-button type="primary" @click="batchDelete">批量删除</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.dutyName"
        placeholder="请输入职务名称"
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
          <div class="icon-arrow" v-if="folding">
            <i
              @click="offForm = !offForm"
              :title="offForm ? '展开表单' : '收起表单'"
              :class="offForm ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            ></i>
          </div>
          <el-form-item label="职务名称" prop="dutyName">
            <el-input v-model="ruleForm.dutyName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="dutyEnabledState">
            <el-select
              v-model="ruleForm.dutyEnabledState"
              style="width: 100%;"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in dutyEnabledState"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          type="index"
          width="60px"
          align="center"
          fixed="left"
          label="序号"
        ></el-table-column>
        <el-table-column
          v-for="(item, index) in allItemList"
          :key="index"
          :label="item.name"
          :prop="item.key"
          v-if="item.show"
        >
        </el-table-column>
        <el-table-column label="操作" width="80px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="showEditDialog(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pt10 pb10" style="text-align:center;">
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

    <el-dialog
      title="新增管理"
      width="600px"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="addForm" :rules="rules" label-width="auto">
        <el-form-item label="职务名称" prop="dutyName">
          <el-input v-model="form.dutyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="dutyEnabledState">
          <el-switch
            v-model="switchValue"
            active-text="启用"
            inactive-text="禁用"
            active-color="#13ce66"
            inactive-color="#ff4949"
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

    <el-dialog
      title="编辑管理"
      width="600px"
      :visible.sync="dialogEditVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="职务名称" prop="dutyName">
          <el-input v-model="editForm.dutyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="dutyEnabledState">
          <el-switch
            v-model="switchEditValue"
            active-text="启用"
            inactive-text="禁用"
            active-color="#13ce66"
            inactive-color="#ff4949"
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
import { export_json_to_excel } from "@/assets/js/Export2Excel.js";
const defaultFormThead = [
  { key: "dutyName", name: "职务名称", show: true },
  { key: "createOrganName", name: "创建机构", show: true },
  { key: "localOrgan", name: "是否本级", show: true },
  { key: "remark", name: "备注", show: true }
];
export default {
  components: {},
  data() {
    return {
      key: 1,
      showItemList: defaultFormThead,
      allItemList: defaultFormThead,
      checkAll: true,
      isIndeterminate: false,
      formShow: false,
      dutyEnabledState: [
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "禁用"
        }
      ],
      users: [],
      initZzjg: [],
      switchValue: "1",
      switchEditValue: 1,
      sysOrganList: [],
      userTableData: [],
      total1: 0,
      pageSize1: 20,
      currentPage1: 1,
      dialogAllUser: false,
      dutyId: "",
      dialogFormVisible: false,
      dialogEditVisible: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "80px",
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      ruleForm: {
        dutyName: "",
        remark: "",
        organRecurFlag: "0",
        dutyEnabledState: ""
      },
      style: {},
      rules: {
        dutyName: [
          { required: true, message: "请输入职务名称", trigger: "blur" }
        ]
      },
      form: {
        dutyName: "",
        remark: "",
        dutyEnabledState: ""
      },
      editForm: {
        id: "",
        dutyName: "",
        remark: "",
        dutyEnabledState: ""
      },
      selectRows: []
    };
  },
  mounted() {
    this.init();
    this.getusers();
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
            .formPost("/api/auth/sysDuty/doRmById", {
              id: this.selectRows
                .map(item => {
                  return item.id;
                })
                .join(",")
            })
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message({ message: "删除成功！", type: "success" });
                this.selectRows = [];
                this.$refs.dragTable.clearSelection();
                this.init();
              } else {
                this.$message({ message: "删除失败！", type: "error" });
              }
            });
        })
        .catch(() => {});
    },
    sizeChange1(n) {
      this.pageSize1 = n;
    },
    currentChange1(n) {
      this.currentPage1 = n;
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
      const tHeader = ["序号", "职务名称", "备注", "状态"];
      const filterVal = ["id", "dutyName", "remark", "dutyEnabledState"];
      const data = this.formatJson(filterVal, this.tableData);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "table-list-duty"
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
          } else {
            return v[j];
          }
        })
      );
    },

    getPremLevel(val) {
      this.sysOrganList = val;
    },
    getEditPremLevel(val) {
      this.sysOrganList = val;
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
      let load = this.$loading({
        target: this.$refs.dragTable.$el
      });
      this.formShow = false;
      this.$api.formPost("/api/auth/sysDuty/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          load.close();
          this.tableData = res.retBody.list.map(item => {
            item.localOrgan =
              item.localOrganFlag === "1" ? "本级机构" : "非本级机构";
            return item;
          });
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
        }
      });
    },
    showDialog() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    showEditDialog(index, row) {
      console.log(row);
      this.initZzjg = [];
      let list = row.sysDutyOrganList;
      for (let key in list) {
        this.initZzjg.push(list[key].organId);
      }
      this.editForm.id = row.id;
      this.editForm.dutyName = row.dutyName;
      this.editForm.remark = row.remark;
      this.switchEditValue = row.dutyEnabledState == "启用" ? 1 : 0;
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.form.sysOrganList = this.sysOrganList;
      this.form.dutyEnabledState = this.switchValue;
      delete this.form.sysOrganList;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$api
            .formPost("/api/auth/sysDuty/doSave", this.form)
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
          this.editForm.sysOrganList = this.sysOrganList;
          this.editForm.dutyEnabledState = this.switchEditValue;
          delete this.editForm.sysOrganList;
          this.$api
            .formPost("/api/auth/sysDuty/doModById", this.editForm)
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
    getusers() {
      let params = {};
      this.$api.formPost("/api/auth/sysuser/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          this.users = res.retBody.list;
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
.dutyList {
  display: flex;
  height: 100%;
  flex-direction: column;
  .tableContent {
    flex-grow: 1;
    overflow: auto;
  }
}
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
