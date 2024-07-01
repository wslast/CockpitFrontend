<template>
  <div class>
    <div class="card tr mb2">
      <el-tooltip content="显示字段筛选" placement="bottom" effect="light">
        <el-popover placement="bottom" width="200" trigger="click">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="showItemList" @change="handleCheckedChange">
            <el-checkbox v-for="(item,key) in allItemList" :key="key" :label="item">{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <el-button slot="reference" icon="el-icon-menu" size="mini" type="primary" circle></el-button>
        </el-popover>
      </el-tooltip>
      <!-- <el-tooltip content="展开/收起表单" placement="bottom" effect="light">
        <el-button icon="el-icon-search" @click="formShow= !formShow" size="mini" type="primary" circle></el-button>
      </el-tooltip> -->
      <el-tooltip content="下载当前表格数据" placement="bottom" effect="light">
        <el-button icon="el-icon-download" @click="handleDownload" size="mini" type="primary" circle></el-button>
      </el-tooltip>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button>
    </div>
    <!-- <div class="card" v-show="formShow">
      <el-form size="mini" :style="style" :model="ruleForm" ref="ruleForm" inline label-width="100px" class="demo-ruleForm">
         <el-form-item label="脚本编号" >
          <el-input size="mini" disabled v-model="ruleForm.fdScriptId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <el-table stripe highlight-current-row ref="dragTable" :height="autoHeight" row-key="id" :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="60px" align="center" fixed="left" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip :formatter="item.formatter" v-for="(item,index) in allItemList" :key="index" :label="item.name" v-if="item.show">
        <template slot-scope="scope">
          <template v-if="!item.formatter">{{ scope.row[item.key] }}</template>
          <template v-else>
            <span v-text="item.formatter(scope.row, item)"></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="120px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="card tr">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[ 10, 20,30, 40]" :page-size="pageSize" background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- --------------------------------------------------------添加弹出框 -->
    <el-dialog title="添加参数配置" width="50%" :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="form" size="mini" label-width="80px" ref="addForm" :rules="rules" inline>
        <el-form-item label="脚本编号" prop="fdScriptId" :label-width="formLabelWidth">
          <el-input v-model="form.fdScriptId" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数编号" prop="scriptParamCode" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.scriptParamCode"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数名" prop="scriptParam" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.scriptParam"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数序号" prop="paramSort" :label-width="formLabelWidth">
          <el-input-number controls-position="right" v-model="form.paramSort" :min="1" :max="999" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="参数来源" prop="spSource" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.spSource">
            <el-option label="前端" value="1"></el-option>
            <el-option label="后端" value="2"></el-option>
            <el-option label="计算" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数类型" prop="spType" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.spType">
            <el-option label="String" value="1"></el-option>
            <el-option label="date" value="2"></el-option>
            <el-option label="int" value="3"></el-option>
            <el-option label="long" value="4"></el-option>
            <el-option label="short" value="5"></el-option>
            <el-option label="double" value="6"></el-option>
            <el-option label="float" value="7"></el-option>
            <el-option label="bigdecimal" value="8"></el-option>
            <el-option label="bytes" value="9"></el-option>
            <el-option label="timestamp" value="10"></el-option>
            <el-option label="其他" value="11"></el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item label="是否必填" prop="isRequired" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.isRequired" @change="editReqMsg">
            <el-option label="必填" value="1"></el-option>
            <el-option label="非必填" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提示信息" prop="requiredMsg" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.requiredMsg"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择控件" prop="chooseControl" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.chooseControl">
            <el-option label="输入框(字符串)" value="1"></el-option>
            <el-option label="输入框(数值[小数])" value="2"></el-option>
            <el-option label="输入框(数值[整数])" value="5"></el-option>
            <el-option label="日期控件" value="3"></el-option>
            <el-option label="枚举控件" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="枚举字" prop="enumWord" :label-width="formLabelWidth">
          <el-input controls-position="right" v-model="form.enumWord"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="EL表达式类型" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form.fdElType" clearable>
            <el-option label="EL" value="1"></el-option>
            <el-option label="SQL" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="EL表达式"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.fdElContent" style="width:500px" show-word-limit maxlength="1000"></el-input>
        </el-form-item>
        <el-form-item label="参数"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.fdElParam" placeholder="el表达式参数,多参数用‘,’隔开" style="width:500px" show-word-limit maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAdd()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------------------------------------------编辑弹出框 -->
    <el-dialog title="修改参数配置"  :visible.sync="dialogEditVisible" append-to-body>
      <el-form :model="editForm" size="mini" label-width="80px" ref="editForm" inline :rules="rules">
        <el-form-item label="脚本编号" prop="fdScriptId" :label-width="formLabelWidth">
          <el-input v-model="editForm.fdScriptId" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原参数编号" prop="scriptParamCode" :label-width="formLabelWidth">
          <el-input controls-position="right" disabled  v-model="editForm.scriptParamCode"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新参数编号" prop="newScriptParamCode" :label-width="formLabelWidth">
          <el-input controls-position="right"  v-model="editForm.newScriptParamCode"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数名"  prop="scriptParam" :label-width="formLabelWidth">
          <el-input controls-position="right"  v-model="editForm.scriptParam"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数序号"  prop="paramSort" :label-width="formLabelWidth">
          <el-input-number controls-position="right"  v-model="editForm.paramSort" :min="1" :max="999"  autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="参数来源" prop="spSource" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.spSource">
            <el-option label="前端" value="1"></el-option>
            <el-option label="后端" value="2"></el-option>
            <el-option label="计算" value="3"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="参数类型" prop="spType" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.spType">
           
            <el-option label="String" value="1"></el-option>
            <el-option label="date" value="2"></el-option>
            <el-option label="int" value="3"></el-option>
            <el-option label="long" value="4"></el-option>
            <el-option label="short" value="5"></el-option>
            <el-option label="double" value="6"></el-option>
            <el-option label="float" value="7"></el-option>
            <el-option label="bigdecimal" value="8"></el-option>
            <el-option label="bytes" value="9"></el-option>
            <el-option label="timestamp" value="10"></el-option>
            <el-option label="其他" value="11"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否必填" prop="isRequired" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.isRequired">
            <el-option label="必填" value="1"></el-option>
            <el-option label="非必填" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提示信息" prop="requiredMsg" :label-width="formLabelWidth">
          <el-input controls-position="right"  v-model="editForm.requiredMsg"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择控件" prop="chooseControl" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.chooseControl">
            <el-option label="输入框(字符串)" value="1"></el-option>
            <el-option label="输入框(数值[小数])" value="2"></el-option>
            <el-option label="输入框(数值[整数]]" value="5"></el-option>
            <el-option label="日期控件" value="3"></el-option>
            <el-option label="枚举控件" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="枚举字" prop="enumWord" :label-width="formLabelWidth">
          <el-input controls-position="right"  v-model="editForm.enumWord"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="EL表达式类型" :label-width="formLabelWidth">
          <el-select size="mini" v-model="editForm.fdElType" clearable>
            <el-option label="EL" value="1"></el-option>
            <el-option label="SQL" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="EL表达式"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editForm.fdElContent" style="width:500px" show-word-limit maxlength="1000"></el-input>
        </el-form-item>
        <el-form-item label="参数"  :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editForm.fdElParam" placeholder="el表达式参数,多参数用‘,’隔开" style="width:500px" show-word-limit maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogEditVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
    
   
  </div>
</template>
<script>
import Sortable from "sortablejs";
const defaultFormThead = [
  { key: "fdScriptId", name: "脚本编号", show: true },
  { key: "scriptParamCode", name: "参数编号", show: true },
  { key: "scriptParam", name: "参数名", show: true },
  { key: "paramSort", name: "参数序号", show: true },
  { key: "spSource", name: "参数来源", show: true ,
    formatter: row => {
          if (row.spSource == '1') {
            return "前端";
          }else if (row.spSource == '2') {
            return "后端";
          }else if (row.spSource == '3') {
            return "计算";
          }else  {
            return "";
          }
        } },
  { key: "spType", name: "参数类型", show: true,
    formatter: row => {
          if (row.spType == '1') {
            return "string";
          }else if(row.spType == '2'){
            return "date";
          }else if(row.spType == '3'){
            return "int";
          }else if(row.spType == '4'){
            return "long";
          }else if(row.spType == '5'){
            return "short";
          }else if(row.spType == '6'){
            return "double";
          }else if(row.spType == '7'){
            return "float";
          }else if(row.spType == '8'){
            return "bigdecima";
          }else if(row.spType == '9'){
            return "bytes";
          }else if(row.spType == '10'){
            return "timestamp";
          }else if(row.spType == '11'){
            return "其他";
          }else  {
            return "未知";
          }

        }  
  },
  { key: "isRequired", name: "是否必填", show: true,
    formatter: row => {
          if (row.isRequired == '1') {
            return "必填";
          }else if (row.isRequired == '0') {
            return "非必填";
          }else  {
            return "";
          }
        }  
  },
  { key: "requiredMsg", name: "提示信息", show: true },
  { key: "chooseControl", name: "选择控件", show: true,
    formatter: row => {
          if (row.chooseControl == '1') {
            return "输入框(字符串)";
          }else if (row.chooseControl == '2') {
            return "输入框(数值[小数])";
          }else if (row.chooseControl == '3') {
            return "日期控件";
          }else if (row.chooseControl == '4') {
            return "枚举控件";
          }else if(row.chooseControl == '5'){
             return "输入框(数值[整数])";
          }else  {
            return "";
          }
        }  
  },
  { key: "enumWord", name: "枚举字", show: true },
   { key: "fdElType", name: "EL表达式类型", show: true,
    formatter: row => {
          if (row.fdElType == '1') {
            return "EL";
          }else if (row.fdElType == '2') {
            return "SQL";
          }else  {
            return "";
          }
        }  
  },
  { key: "fdElContent", name: "EL表达式", show: true },
  { key: "fdElParam", name: "参数", show: true }
  
];
export default {
  props:{
      fdScriptId:{
          type:String,
          default:""
      }
  },
  data() {
    return {
      fullscreen: false,
      checkAll: true,
      isIndeterminate: false,
      sortable: null,
      allItemList: defaultFormThead,
      showItemList: defaultFormThead,
      formShow: false,
      roleId: "",
      key: 1,
      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogUser: false,
      dialogAllUser: false,
      offForm: true, //是否折叠
      folding: false, //表单是否超过一行
      formLabelWidth: "120px",
      tableData: [],
      tableData1: [],
      userTableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      total1: 0,
      pageSize1: 20,
      currentPage1: 1,
      ruleForm: {
        fdScriptId: "",
      },
      style: {},
      rules: {
        scriptParamCode: [
          { required: true, message: "请输入参数编号", trigger: "blur" }
        ],
        newScriptParamCode: [
          { required: true, message: "请输入新参数编号", trigger: "blur" }
        ],
        scriptParam: [
          { required: true, message: "请输入参数名", trigger: "blur" }
        ],
        fdScriptId: [
          { required: true, message: "请输入脚本编号", trigger: "blur" }
        ],
        spSource: [
          { required: true, message: "请选择参数来源", trigger: "change" }
        ],
        spType: [
          { required: true, message: "请选择参数类型", trigger: "change" }
        ],
        isRequired: [
          { required: true, message: "请选择是否必填", trigger: "change" }
        ],
        chooseControl: [
          { required: true, message: "请选择控件类型", trigger: "change" }
        ],
        paramSort: [
          { required: true, message: "请输入参数序号", trigger: "blur" }
        ]
      },
   
      form: {
        scriptParamCode:"",
        scriptParam: "",
        spSource: "",
        spType: "",
        fdElType:"",
        fdElContent:"",
        fdElParam:"",
        isRequired:"1",
        requiredMsg:"",
        enumWord:"",
        chooseControl:"1",
        paramSort:1
      },
      editForm: {
        scriptParamCode:"",
        scriptParam: "",
        spSource: "",
        spType: "",
        fdElType:"",
        fdElContent:"",
        fdElParam:"",
        isRequired:"1",
        requiredMsg:"",
        enumWord:"",
        chooseControl:"1",
        paramSort:1
      }
    };
  },

  mounted() {
    this.init();
  },
  computed: {
    autoHeight: function() {
      if (this.formShow) {
        return window.innerHeight - 230 - 55;
      } else {
        return window.innerHeight - 230;
      }
    }
  },
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
    editReqMsg(event){
      // console.log(event);
      // console.log(item);
      // if(event == '0'){
        
      // }
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
    /* handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "序号",
          "参数编号",
          "参数名",
          "参数序号",
          "脚本编号",
          "参数来源",
          "参数类型",
          "是否必填",
          "提示信息",
          "选择控件",
          "枚举字",
          "EL表达式类型",
          "EL表达式"
        ];
        const filterVal = [
          "id",
          "scriptParamCode",
          "scriptParam",
          "paramSort",
          "fdScriptId",
          "spSource",
          "spType",
          "isRequired",
          "requiredMsg",
          "chooseControl",
          "enumWord",
          "fdElType",
          "fdElContent"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list-param"
        });
        this.downloadLoading = false;
      });
    }, */
    formatJson(filterVal, jsonData) {
      let i = 0;
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "id") {
            i++;
            return i;
          } else if (j == "fdElType") {
            if (v[j] == '1') {
              return "EL";
            } else if (v[j] == '2') {
              return "SQL";
            }else {
              return "";
            }
          }else if (j == "spSource"){
            if (v[j] == '1') {
              return "前端";
            } else if (v[j] == '2') {
              return "后端";
            }else if (v[j] == '3') {
              return "计算";
            }else {
              return "";
            }
          } else if (j === "spType"){
             if (v[j] == '1') {
            return "string";
          }else if(v[j] == '2'){
            return "date";
          }else if(v[j] == '3'){
            return "int";
          }else if(v[j] == '4'){
            return "long";
          }else if(v[j] == '5'){
            return "short";
          }else if(v[j] == '6'){
            return "double";
          }else if(v[j]== '7'){
            return "float";
          }else if(v[j] == '8'){
            return "bigdecima";
          }else if(v[j]== '9'){
            return "bytes";
          }else if(v[j] == '10'){
            return "timestamp";
          }else if(v[j] == '11'){
            return "其他";
          }else  {
            return "未知";
          }
          } else if (j == "isRequired") {
            if (v[j] == '1') {
              return "必填";
            } else if (v[j] == '0') {
              return "非必填";
            }else {
              return "";
            }
          }else if (j == "chooseControl") {
            if (v[j] == '1') {
              return "输入框(字符串)";
            } else if (v[j] == '2') {
              return "输入框(数值[小数])";
            } else if (v[j] == '3') {
              return "日期控件";
            } else if (v[j] == '4') {
              return "枚举控件";
            }else if (v[j] == '5') {
              return "输入框(数值[整数])";
            } else {
              return "";
            }
          }else {
            return v[j];
          }
        })
      );
    },
    cancle() {
      this.dialogFormVisible = false;
      this.resetForm("addForm");
    },
   
    // showAssignUser(index, row) {},
    sizeChange(n) {
      this.pageSize = n;
      this.init();
    },
    currentChange(n) {
      this.currentPage = n;
      this.init();
    },
    init() {
     this.ruleForm.fdScriptId =this.fdScriptId;
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.ruleForm
      };
      this.$api.formPost("/api/dyncscript/scriptParam/doGetList", params).then(res => {
        if (res.retHead.code == "0000000") {
          this.tableData = res.retBody.list;
          this.total = res.retBody.total;
          this.currentPage = res.retBody.pageNum;
          // this.setSort();//可移动
        }
      });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);
        }
      });
    },
    showDialog() {
      this.dialogFormVisible = true;
      this.form.fdScriptId=this.fdScriptId;
    },
    showEditDialog(index, row) {
      this.dialogEditVisible = true;
      let id=row.scriptParamCode;
      this.$nextTick(()=>{
           this.editForm = JSON.parse(JSON.stringify(row));
          this.$set(this.editForm, 'newScriptParamCode',id);
          
      });
     
    },
    handleAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //是否必填
          let isRequired = this.form.isRequired;
          //提示信息
          let requiredMsg = this.form.requiredMsg; 
          if(isRequired == '1' && requiredMsg == ''){
            this.$message.error("该字段为必填项,必须输入提示信息,请完善表单!");
            return ;
          }
          //选择控件
          let chooseControl = this.form.chooseControl;
          //枚举字
          let enumWord = this.form.enumWord; 
          if(chooseControl == '4' && enumWord == ''){
            this.$message.error("控件类型为枚举控件时,必须输入枚举字,请完善表单!");
            return ;
          }
          //检验参数类型与控件(数值型:int long byte short 对应整数  double float bigdicimal对应小数)
          //参数类型
          let paramType = this.form.spType;
          if(chooseControl == '2' && (paramType != '6' && paramType != '7' && paramType != '8')){
            this.$message.error("控件类型为输入框(数值[小数])时,参数类型应为[double,float,bigdecimal]型,请修改后再提交!");
            return ;
          }
          if(chooseControl == '5' && (paramType != '3' && paramType != '4' && paramType != '5')){
            this.$message.error("控件类型为输入框(数值[整数])时,参数类型应为[int,long,short]型,请修改后再提交!");
            return ;
          }
          //如果选择控件为日期控件时,参数类型应为date timestamp型
          if(chooseControl == '3' && (paramType != '2' && paramType != '10' )){
            this.$message.error("控件类型为日期控件时,参数类型应为[date,timestamp]型,请修改后再提交!");
            return ;
          }
          
          this.$api
            .formPost("/api/dyncscript/scriptParam/doSave", this.form)
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.dialogFormVisible = false;
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
                this.init();
                this.resetForm("addForm");
              } else {
                this.dialogFormVisible = true;
                this.$message({
                  message: "添加失败：" + res.retHead.message,
                  type: "error"
                });
              }
            });
        } else {
          this.$message.error("请完善表单！");
        }
      });
    },
    handleEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let isRequired = this.editForm.isRequired;
          let requiredMsg = this.editForm.requiredMsg; 
          if(isRequired == '1' && requiredMsg == ''){
            this.$message.error("该字段为必填项,必须输入提示信息,请完善表单!");
            return ;
          }
          let chooseControl = this.editForm.chooseControl;
          let enumWord = this.editForm.enumWord; 
          if(chooseControl == '4' && enumWord == ''){
            this.$message.error("控件类型为枚举控件时,必须输入枚举字,请完善表单!");
            return ;
          }
          //检验参数类型与控件(数值型:int long byte short 对应整数  double float bigdicimal对应小数)
          //参数类型
          let paramType = this.editForm.spType;
          if(chooseControl == '2' && (paramType != '6' && paramType != '7' && paramType != '8')){
            this.$message.error("控件类型为输入框(数值[小数])时,参数类型应为[double,float,bigdecimal]型,请修改后再提交!");
            return ;
          }
          if(chooseControl == '5' && (paramType != '3' && paramType != '4' && paramType != '5')){
            this.$message.error("控件类型为输入框(数值[整数])时,参数类型应为[int,long,short]型,请修改后再提交!");
            return ;
          }
          //如果选择控件为日期控件时,参数类型应为date timestamp型
          if(chooseControl == '3' && (paramType != '2' && paramType != '10' )){
            this.$message.error("控件类型为日期控件时,参数类型应为[date,timestamp]型,请修改后再提交!");
            return ;
          }
          this.$api
            .formPost("/api/dyncscript/scriptParam/doModByFdScriptIdAndScriptParamCode", this.editForm)
            .then(res => {
              this.dialogEditVisible = false;
              if (res.retHead.code == "0000000") {
                this.$message.success("修改成功！");
                this.init();
              } else {
                this.$message.error("修改失败！"+res.retHead.message);
              }
            });
        } else {
          this.$message.error("请完善表单！");
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
            .formPost("/api/dyncscript/scriptParam/doRmByFdScriptIdAndScriptParamCode", {
              fdScriptId: row.fdScriptId,
              scriptParamCode: row.scriptParamCode
            })
            .then(res => {
              if (res.retHead.code == "0000000") {
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
                this.init();
              } else {
                this.$message({
                  message: "删除失败！"+res.retHead.message,
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
   
  },
  created() {}
};
</script>
<style lang='scss' scoped>
@import '@/assets/dialogCenter.scss';
// /deep/ .sortable-ghost  {
//   opacity: 0.8 !important;
//   color: #fff !important;
//   background: #42b983 !important;
// }
</style>