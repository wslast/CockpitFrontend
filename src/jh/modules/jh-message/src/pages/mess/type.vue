<template>
  <div class="messType routerContent">
    <div class="card form df">
      <el-button type="primary" @click="showDialog">添加</el-button>
      <el-button @click="handleDownload" type="primary"
        >下载当前表格数据</el-button
      >
      <el-button type="primary" @click="submitForm('ruleForm')">刷新</el-button>
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.typeCode"
        placeholder="请输入消息类型代码"
        :hideInput="true"
        @resetForm="resetForm('searchForm')"
        @searchData="init"
        :showForm.sync="formShow"
      >
        <el-form
          :style="style"
          :model="ruleForm"
          ref="ruleForm"
          inline
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="消息类型代码" prop="typeCode">
            <el-input
              v-model="ruleForm.typeCode"
              placeholder="请输入消息类型代码"
            ></el-input>
          </el-form-item>
          <el-form-item label="消息类型名称" prop="typeName">
            <el-input
              v-model="ruleForm.typeName"
              placeholder="请输入消息类型名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="消息类型描述" prop="remark">
            <el-input
              v-model="ruleForm.remark"
              placeholder="消息类型描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="df jce" slot="footer">
          <el-button @click="resetForm('searchForm')">重置</el-button>
          <el-button type="primary" @click="init">查询</el-button>
        </div>
      </searchDialog>
    </div>

    <!-- 查询表单 -->

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
        >
          <template slot-scope="scope">
            <template v-if="!item.formatter"
              ><span>{{ scope.row[item.key] }}</span></template
            >
            <template v-else>
              <span v-text="item.formatter(scope.row, item)"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="170px"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="showEditDialog(scope.$index, scope.row)"
              >编辑</el-button
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
    <div class="card" style="text-align:center;">
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
    <el-dialog title="新增消息类型" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm" :rules="rules">
        <el-form-item
          label="消息类型代码"
          :label-width="formLabelWidth"
          prop="typeCode"
        >
          <el-input v-model="form.typeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="消息类型名称"
          :label-width="formLabelWidth"
          prop="typeName"
        >
          <el-input v-model="form.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="消息类型描述" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog title="新增消息类型" :visible.sync="dialogEditVisible">
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item
          label="消息类型代码"
          :label-width="formLabelWidth"
          prop="typeCode"
        >
          <el-input
            v-model="editForm.typeCode"
            @input="change($event)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="消息类型名称"
          :label-width="formLabelWidth"
          prop="typeName"
        >
          <el-input
            v-model="editForm.typeName"
            @input="change($event)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="消息类型描述" :label-width="formLabelWidth">
          <el-input
            v-model="editForm.remark"
            @input="change($event)"
            autocomplete="off"
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
  { key: "typeCode", name: "消息类型代码" },
  { key: "typeName", name: "消息类型名称" },
  { key: "remark", name: "消息类型描述" }
];

export default {
  components: {},
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
        typeCode: "",
        typeName: "",
        remark: ""
      },

      dialogFormVisible: false,
      dialogEditVisible: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "100px",

      rules: {},
      form: {
        typeCode: "",
        typeName: ""
      },
      editForm: {
        id: "",
        typeCode: "",
        typeName: ""
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
        console.log(excel);
        const tHeader = ["消息类型代码", "消息类型名称", "消息类型描述"];
        const filterVal = ["typeCode", "typeName", "remark"];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "消息类型"
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

    change(v) {
      this.$forceUpdate();
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

      let load = null;
      this.$nextTick(() => {
        load = this.$loading({
          target: this.$refs.dragTable.$el
        });
      });
      this.formShow = false;
      this.$api.formPost("/api/mess/type/doGetList", params).then(res => {
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
      this.form = {};
    },
    showEditDialog(index, row) {
      this.editForm = {};
      this.editForm.id = row.id;
      this.editForm.typeCode = row.typeCode;
      this.editForm.typeName = row.typeName;
      this.editForm.remark = row.remark;
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$api.formPost("/api/mess/type/doSave", this.form).then(res => {
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
          let params = this.editForm;
          this.$api.formPost("/api/mess/type/doModById", params).then(res => {
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
            .formPost("/api/mess/type/doRmById", {
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
      this.init();
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.messType {
  display: flex;
  height: 100%;
  flex-direction: column;
  .tableContent {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
