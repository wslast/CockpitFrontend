<template>
  <div class="messSend">
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
        <el-form-item label="消息内容" prop="content">
          <el-input
            v-model="ruleForm.content"
            placeholder="请输入消息内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="接收人ID" prop="receiveIds">
          <el-input
            v-model="ruleForm.receiveIds"
            placeholder="请输入接收人ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="接收人姓名" prop="receiveNames">
          <el-input
            v-model="ruleForm.receiveNames"
            placeholder="请输入接收人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="消息标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入消息标题"
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
        >
          <template slot-scope="scope">
            <template v-if="item.formatter < 10 || !item.formatter">
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
              <el-tooltip
                effect="light"
                :content="item.formatter(scope.row, item)"
                :visible-arrow="false"
                placement="bottom"
              >
                <span>{{ item.formatter(scope.row, item) }}</span>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="showEditDialog(scope.$index, scope.row)"
              >查看</el-button
            >
            <!-- <el-button type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
          label="选择消息类型"
          :label-width="formLabelWidth"
          prop="typeCode"
        >
          <el-select
            v-model="form.typeCode"
            @change="getTypeName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeCodes"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="消息内容"
          :label-width="formLabelWidth"
          prop="content"
        >
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="接收人id" :label-width="formLabelWidth" prop="receiveIds">
          <el-input v-model="form.receiveIds" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item
          label="接收人姓名"
          :label-width="formLabelWidth"
          prop="receiveNames"
        >
          <el-input
            v-model="form.receiveNames"
            @focus="doFocus"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="消息标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
          <el-input v-model="form.state" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item
          label="跳转路由"
          :label-width="formLabelWidth"
          prop="path"
        >
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth" prop="query">
          <el-input v-model="form.query" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">发 送</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog title="已发送消息查看" :visible.sync="dialogEditVisible">
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item
          label="消息类型代码"
          :label-width="formLabelWidth"
          prop="typeCode"
        >
          <el-input v-model="editForm.typeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="消息类型名称"
          :label-width="formLabelWidth"
          prop="typeName"
        >
          <el-input v-model="editForm.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="消息内容"
          :label-width="formLabelWidth"
          prop="content"
        >
          <el-input v-model="editForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="接收人id" :label-width="formLabelWidth" prop="receiveIds">
            <el-input v-model="editForm.receiveIds" autocomplete="off"></el-input>
          </el-form-item> -->
        <el-form-item
          label="接收人姓名"
          :label-width="formLabelWidth"
          prop="receiveNames"
        >
          <el-input
            v-model="editForm.receiveNames"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="消息标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
          <el-input v-model="editForm.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="跳转路由"
          :label-width="formLabelWidth"
          prop="path"
        >
          <el-input v-model="editForm.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth" prop="query">
          <el-input v-model="editForm.query" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="handleEdit()">确 定</el-button> -->
      </div>
    </el-dialog>

    <!-- ------------------------------------弹出选择消息发送的对象--------------------->
    <el-dialog title="选择用户" :visible.sync="dialogUserVisible">
      <sysUser ref="sysUser" :parent.sync="myThis"></sysUser>
    </el-dialog>
  </div>
</template>

<script>
import sysUser from "./components/user.vue";
import { getLabelByCode } from "./components/function";

const defaultFormThead = [
  { key: "typeName", name: "消息类型名称" },
  { key: "content", name: "消息内容" },
  { key: "receiveNames", name: "接收人姓名" },
  {
    key: "createTime",
    name: "创建时间",
    formatter: row => {
      if (row.createTime) {
        return new Date(row.createTime).toLocaleString();
      }
      return "";
    }
  },
  { key: "title", name: "消息标题" },
  {
    key: "state",
    name: "状态",
    formatter: row => {
      return "已发送";
    }
  },
  { key: "path", name: "跳转路由" },
  { key: "query", name: "参数" }
];

export default {
  components: { sysUser },
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
        content: "",
        receiveIds: "",
        receiveNames: "",
        title: "",
        state: "",
        path: "",
        query: ""
      },

      myThis: this,

      typeCodes: [],

      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogUserVisible: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "100px",
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      style: {},
      rules: {},
      form: {
        typeCode: "",
        typeName: "",
        content: "",
        receiveIds: "",
        receiveNames: "",
        title: "",
        state: "",
        path: "",
        query: ""
      },
      editForm: {
        id: "",
        typeCode: "",
        typeName: "",
        content: "",
        receiveIds: "",
        receiveNames: "",
        createTime: "",
        title: "",
        state: "",
        path: "",
        query: ""
      }
    };
  },

  mounted() {
    this.init();
    this.getEnums();
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
          "消息类型名称",
          "消息内容",
          "接收人姓名",
          "创建时间",
          "消息标题",
          "消息标题",
          "跳转路由",
          "参数"
        ];
        const filterVal = [
          "typeName",
          "content",
          "receiveNames",
          "createTime",
          "title",
          "state",
          "path",
          "query"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "消息发送导出"
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

    getEnums() {
      this.$api.formPost("api/mess/type/doGetEnums", {}).then(res => {
        if (res.retHead.code == "0000000") {
          this.typeCodes = res.retBody;
        }
      });
    },
    doFocus() {
      this.dialogUserVisible = true;
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
      this.$api.formPost("/api/mess/send/doGetList", params).then(res => {
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
    showEditDialog(index, row) {
      this.editForm.id = row.id;
      this.editForm.typeCode = row.typeCode;
      this.editForm.typeName = row.typeName;
      this.editForm.content = row.content;
      this.editForm.receiveIds = row.receiveIds;
      this.editForm.receiveNames = row.receiveNames;
      this.editForm.createTime = new Date(row.createTime);
      this.editForm.title = row.title;
      this.editForm.state = "已发送";
      this.editForm.path = row.path;
      this.editForm.query = row.query;
      this.dialogEditVisible = true;
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$api.formPost("/api/mess/send/doSave", this.form).then(res => {
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
          this.$api.formPost("/api/mess/send/doModById", params).then(res => {
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
            .formPost("/api/mess/send/doRmById", {
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
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getTypeName(code) {
      this.form.typeName = getLabelByCode(code, this.typeCodes);
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.messSend {
  display: flex;
  height: 100%;
  flex-direction: column;
  .tableContent {
    flex-grow: 1;
    overflow: auto;
  }
}
.el-dialog__body .el-select {
  display: block;
}
</style>
