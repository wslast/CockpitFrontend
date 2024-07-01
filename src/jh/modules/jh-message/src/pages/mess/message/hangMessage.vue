<template>
  <div class="routerContent">
    <div class="card df p12">
      <div class="fg1"></div>
      <searchDialog
        v-model="ruleForm.title"
        placeholder="请输入消息标题"
        @resetForm="resetForm('ruleForm')"
        @searchData="submitForm('ruleForm')"
        :showForm.sync="formShow"
      >
        <el-form
          :style="style"
          :model="ruleForm"
          ref="ruleForm"
          label-position="top"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="消息标题">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="渠道">
            <el-select
              v-model="ruleForm.channel"
              style="width: 100%"
              :clearable="true"
            >
              <el-option label="站内" value="PM"></el-option>
              <el-option label="微信" value="WX"></el-option>
              <el-option label="手机短信" value="SMS"></el-option>
              <el-option label="APP" value="APP"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="ruleForm.createTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            ></el-date-picker>
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
              >查看</el-button
            ><el-button
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
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog
      title="消息详情"
      :visible.sync="dialogEditVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form
        model="editForm"
        ref="editForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="editForm.title" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
          <el-input
            v-model="editForm.channelString"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="消息内容" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10 }"
            v-model="editForm.content"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createUserName">
          <el-input
            v-model="editForm.createUserName"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="editForm.createTime" :readonly="true"></el-input>
        </el-form-item>

        <el-form-item label="发送次数" prop="sendCount">
          <el-input v-model="editForm.sendCount" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="最近一次发送时间" prop="lastSendTime">
          <el-input v-model="editForm.lastSendTime" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="第一次发送时间" prop="firstSendTime">
          <el-input
            v-model="editForm.firstSendTime"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="发送状态" prop="sendStatus">
          <el-input
            v-model="editForm.sendStatusString"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const defaultFormThead = [
  { key: "title", name: "消息标题", width: "150px" },
  { key: "content", name: "消息内容" },
  { key: "channelString", name: "渠道", width: "100px" },
  { key: "createTime", name: "消息创建时间", width: "150px" },
  { key: "sendCount", name: "发送次数", width: "100px" },
  { key: "lastSendTime", name: "最近一次发送时间", width: "150px" },
  { key: "firstSendTime", name: "第一次发送时间", width: "150px" }
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
      formLabelWidth: "130px",
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      ruleForm: {
        title: "",
        channel: "",
        sendStatus: "",
        createTime: []
      },
      style: {},
      editForm: {
        id: "",
        msgId: "",
        mouldId: "",
        tmplId: "",
        channel: "",
        account: "",
        title: "",
        content: "",
        params: "",
        status: "",
        createUserName: "",
        createTime: "",
        sendCount: 0,
        lastSendTime: null,
        firstSendTime: null,
        sendStatus: "",
        sendStatusString: "",
        channelString: ""
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
      let param = {};
      param.title = this.ruleForm.title;
      param.sendStatus = this.ruleForm.sendStatus;
      param.channel = this.ruleForm.channel;
      if (this.ruleForm.createTime && this.ruleForm.createTime.length == 2) {
        param.fromCreateTime = this.ruleForm.createTime[0];
        param.toCreateTime = this.ruleForm.createTime[1]; //this.formatDate(this.ruleForm.createTime[1],"yyyy-MM-dd");
      }
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
        ...param
      };
      this.$api.formPost("/api/msg/hang/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          load.close();
          this.tableData = res.retBody.list;
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
          if (this.tableData) {
            this.tableData.forEach(it => {
              if (it.createTime) {
                it.createTime = this.formatDate(
                  it.createTime,
                  "yyyy-MM-dd HH:mm:ss"
                );
              }
              if (it.lastSendTime)
                it.lastSendTime = this.formatDate(
                  it.lastSendTime,
                  "yyyy-MM-dd HH:mm:ss"
                );
              if (it.firstSendTime)
                it.firstSendTime = this.formatDate(
                  it.firstSendTime,
                  "yyyy-MM-dd HH:mm:ss"
                );
            });
          }
        }
      });
    },
    showEditDialog(index, row) {
      if (row.id) {
        this.editForm.id = row.id;
      } else {
        this.editForm.id = "";
      }
      if (row.channel) {
        this.editForm.channel = row.channel;
      } else {
        this.editForm.channel = "";
      }
      if (row.userId) {
        this.editForm.account = row.account;
      } else {
        this.editForm.account = "";
      }
      if (row.title) {
        this.editForm.title = row.title;
      } else {
        this.editForm.title = "";
      }
      if (row.params) {
        this.editForm.params = row.params;
      } else {
        this.editForm.params = "";
      }
      if (row.content) {
        this.editForm.content = row.content;
      } else {
        this.editForm.content = "";
      }

      if (row.msgId) {
        this.editForm.msgId = row.msgId;
      } else {
        this.editForm.msgId = "";
      }
      if (row.mouldId) {
        this.editForm.mouldId = row.mouldId;
      } else {
        this.editForm.mouldId = "";
      }
      if (row.tmplId) {
        this.editForm.tmplId = row.tmplId;
      } else {
        this.editForm.tmplId = "";
      }
      if (row.sendStatus) {
        this.editForm.sendStatus = row.sendStatus;
      } else {
        this.editForm.sendStatus = "";
      }
      this.editForm.sendCount = row.sendCount;
      this.editForm.lastSendTime = row.lastSendTime;
      this.editForm.firstSendTime = row.firstSendTime;
      this.editForm.sendStatus = row.sendStatus;
      this.editForm.sendStatusString = row.sendStatusString;
      this.editForm.channelString = row.channelString;
      this.editForm.createTime = row.createTime;
      this.editForm.createUserName = row.createUserName;

      this.dialogEditVisible = true;
    },

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .formPost("/api/msg/hang/doRmById", {
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
        title: "",
        channel: "",
        sendStatus: "",
        createTime: []
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
