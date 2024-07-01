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
      <!-- <el-button  type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button> -->
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
        <el-form-item label="接收人姓名" prop="receiveName">
          <el-input
            v-model="ruleForm.receiveName"
            placeholder="请输入接收人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="阅读状态" prop="readState">
          <el-select v-model="ruleForm.readState" placeholder="请选择阅读状态">
            <el-option label="未读" value="0"></el-option>
            <el-option label="已读" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入消息标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input
            v-model="ruleForm.path"
            placeholder="请输入路由地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由参数" prop="query">
          <el-input
            v-model="ruleForm.query"
            placeholder="请输入路由参数"
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
              >{{ showBtnName(scope.row) }}</el-button
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
    <!-- --------------------------------------------------------编辑弹出框-------------------------->
    <el-dialog title="已收消息查看" :visible.sync="dialogEditVisible">
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
        <el-form-item
          label="接收人id"
          :label-width="formLabelWidth"
          prop="receiveId"
        >
          <el-input v-model="editForm.receiveId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="接收人姓名"
          :label-width="formLabelWidth"
          prop="receiveName"
        >
          <el-input
            v-model="editForm.receiveName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="创建时间"
          :label-width="formLabelWidth"
          prop="createTime"
        >
          <el-input v-model="editForm.createTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="读取时间"
          :label-width="formLabelWidth"
          prop="readTime"
        >
          <el-input v-model="editForm.readTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="阅读状态"
          :label-width="formLabelWidth"
          prop="readState"
        >
          <el-input
            v-model="editForm.readStateStr"
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
        <el-form-item
          label="路由地址"
          :label-width="formLabelWidth"
          prop="path"
        >
          <el-input v-model="editForm.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="路由参数"
          :label-width="formLabelWidth"
          prop="query"
        >
          <el-input v-model="editForm.query" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const readStateMap = {
  "0": "未读",
  "1": "已读"
};

const defaultFormThead = [
  { key: "typeName", name: "消息类型名称" },
  { key: "content", name: "消息内容" },
  { key: "receiveName", name: "接收人姓名" },
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
  {
    key: "readTime",
    name: "读取时间",
    formatter: row => {
      if (row.readTime) {
        return new Date(row.readTime).toLocaleString();
      }
      return "";
    }
  },
  {
    key: "readState",
    name: "阅读状态",
    formatter: row => {
      if (row.readState) {
        return readStateMap[row.readState];
      }
      return "";
    }
  },
  { key: "title", name: "消息标题" },
  { key: "path", name: "跳转路由" },
  { key: "query", name: "参数" }
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
        content: "",
        receiveId: "",
        receiveName: "",
        /**
         * 默认未读消息列表，
         * 需要查看已读消息的，
         * 进入查询表单，
         * 选择已读去查看
         */
        readState: "0",
        title: "",
        path: "",
        query: ""
      },

      dialogFormVisible: false,
      dialogEditVisible: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "100px",

      rules: {},
      form: {
        typeCode: "",
        typeName: "",
        content: "",
        receiveId: "",
        receiveName: "",
        readState: "",
        title: "",
        path: "",
        query: ""
      },
      editForm: {
        id: "",
        typeCode: "",
        typeName: "",
        content: "",
        receiveId: "",
        receiveName: "",
        createTime: "",
        readTime: "",
        readState: "",
        title: "",
        path: "",
        query: ""
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
        const tHeader = [
          "消息类型名称",
          "消息内容",
          "接收人姓名",
          "创建时间",
          "读取时间",
          "阅读状态",
          "消息标题",
          "跳转路由",
          "参数"
        ];
        const filterVal = [
          "typeName",
          "content",
          "receiveName",
          "createTime",
          "readTime",
          "readState",
          "title",
          "path",
          "query"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "消息接收列表"
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
          if (v[j] == "" || v[j] == undefined || v[j] == null) {
            return "";
          }
          if (j === "createTime" || j === "readTime") {
            return new Date(v[j]).toLocaleString();
          } else if (j === "readState") {
            if (v[j] == "0") {
              return "未读";
            } else {
              return "已读";
            }
          } else {
            return v[j];
          }
        })
      );
    },

    showBtnName(row) {
      let readState = row.readState;
      return readState && "1" == readState ? "查看" : "读取";
    },
    readStateName(row, column) {
      let readState = row.readState;
      return this.readStateMap[readState];
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
      debugger;
      if ("messSelf" == this.$route.name) {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let userId = user.id;
        this.ruleForm.receiveId = userId;
      }

      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };

      this.$api.formPost("/api/mess/receive/doGetList", params).then(res => {
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
      this.editForm.receiveId = row.receiveId;
      this.editForm.receiveName = row.receiveName;
      this.editForm.createTime = new Date(row.createTime).toLocaleString();
      this.editForm.readTime = new Date(row.readTime).toLocaleString();
      this.editForm.readState = row.readState;
      this.editForm.readStateStr = readStateMap[row.readState];
      this.editForm.title = row.title;
      this.editForm.path = row.path;
      this.editForm.query = row.query;
      this.dialogEditVisible = true;

      if (row.readState || "1" == row.readState) {
        // 消息记录变更为已读
        this.$api
          .formPost("/api/mess/receive/doModById", { id: row.id })
          .then(res => {
            if (res.retHead.code == "0000000") {
              this.setMessAmount();

              this.init();
            } else {
              this.$message.error(res.retHead.message);
            }
          });
      }
    },

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .formPost("/api/mess/receive/doRmById", {
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
    /**
     * 数据库读取登录用户的未读消息数
     * 赋值
     */
    setMessAmount() {
      // 取未读数量

      // 登录用户
      let user = JSON.parse(sessionStorage.getItem("user"));
      let userId = user.id;
      this.ruleForm.receiveId = userId;
      // 未读
      this.ruleForm.readState = "0";

      let params = {
        pageNum: this.currentPage,
        pageSize: 10000,
        ...this.ruleForm
      };

      this.$api.formPost("/api/mess/receive/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          // 显示消息的html结构变动，这里也要相应的变动
          document.getElementsByClassName(
            "iconxinxi"
          )[0].nextElementSibling.innerText = res.retBody.list.length;
        }
      });
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
.card .el-select {
  width: 160px;
}
</style>
