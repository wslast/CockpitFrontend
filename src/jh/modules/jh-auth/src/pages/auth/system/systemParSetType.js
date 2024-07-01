import Sortable from "sortablejs";
export default {
    name: "Index",
    data() {
        return {
            flg:false,
            oldList:[],
            newList:[],
            sortable: null,
            allItemList:[],
          showItemList:[],
            formShow: false,
            searchForm: {
              code: '',
              codeName: '',
              codeType:'',
            },
            sysCode:{
                code:"",
                codeName:"",
                codeEnabledState:"1",
                remark:"",
                ordinal:"",
                codeType:"1"
            },
            rules: {
                code: [
                  { required: true, message: '请输入参数类型编号', trigger: 'blur' },
                  { pattern: /^[0-9a-zA-Z]*[a-zA-Z_]+[0-9a-zA-Z]*$/, message: '输入的内容只能由数字、字母以及下划线组成，不能全为数字', trigger: 'blur' }
                  
                ],
                codeName: [
                    { required: true, message: '请输入参数类型名称', trigger: 'blur' }
                ]
              },
            ids: [],
            tableData: [],
            parSetList:[],
            pager: {
                page: 0,
                size: 20,
                total: 0
            },
            adddialogFormVisible:false,
            dialogFormVisible: false,
            viewHide: false,
            editCode: false,
            dialogTitle: '新增参数类型',
            codeType:[
                { "label": "固有", "value": "1" },
                { "label": "自定义", "value": "2" },
            ],
        }
    },
    computed: {
        height() {
            return `calc(100vh - 300px)`;
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        close(){
            this.addhandleFormClose();
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
                const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                this.newList.splice(evt.newIndex, 0, tempIndex)
                
              }
            });
          },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        //取消修改
        cancal(row){
            row.edit=false;
        },
  
        //参数增加一行
    parSetAddRow() {
        if(this.flg){
            this.$message({
                type: "error",
                message: "有未保存的数据，请先保存！"
              });
              return false;
        }
        var list = {
            id:'',
            sysCodeId:this.sysCode.id,
            enabledState:"1",
            edit:true,
            add:true
        };
        this.parSetList.unshift(list);
        this.flg=true;
      },
       // 获取参数类型列表
    async getparSetList() {
        let params = {
            page: 1,
            size: 99999,
            sysCodeId:this.sysCode.id
        };
 
        this.$api.formPost( '/api/auth/sysCodeItem/doGetList', params).then(res => {
            if (res.retHead.code === '0000000') {
                this.parSetList = res.retBody.list;
                this.oldList = this.parSetList.map(v => v.ordinal)
                this.newList = this.oldList.slice()
                this.$nextTick(() => {
                    this.setSort()
                  })
            }
        });
      
    },
       //参数删除一行
       parSetDelete(index, row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if(row.id){
                let params={id:row.id};
               this.$api
              .formPost(  "/api/auth/sysCodeItem/doRmById",params )
              .then(res => {
                if (res.retHead.code == "0000000") {
                  this.$message({
                    type: "success",
                    message: "删除成功"
                  });
                 this.parSetList.splice(index, 1);
                } else {
                  this.$message({
                    type: "error",
                    message: res.retHead.message
                  });
                }
              });
            }else{
              this.parSetList.splice(index, 1);
              this.flg=false;
            }
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
        
        
      },
        //保存参数
        parSetSave(row,index){
            if(!row.codeName){
                this.$message({
                    type: 'error',
                    message: '参数名称不能为空!'
                });
                return false;
            }
            if(!row.codeValue){
                this.$message({
                    type: 'error',
                    message: '参数值不能为空!'
                });
                return false;
            }
            
            this.$api.formPost('/api/auth/sysCodeItem/doSave', row).then(res => {
                if (res.retHead.code == '0000000') {
                   this.getparSetList();
                   this.flg=false;
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                }else {
                    this.$message({
                        type: 'error',
                        message: res.retHead.message
                    });
                }
            });
        },
        //参数设置
        show:function(item){
            this.sysCode=JSON.parse(JSON.stringify(item));
            this.adddialogFormVisible=true;
            this.getparSetList();
        },
        //增加参数
        addParset:function(){
            this.adddialogFormVisible=true;
        },

        addhandleFormClose:function(){
            this.sysCode={
                code:"",
                codeName:"",
                codeEnabledState:"1",
                remark:"",
                ordinal:"",
                codeType:"1"
            };
            this.adddialogFormVisible=false;
        },
        // 关闭弹窗
        handleFormClose: function () {
            this.searchForm = {
                startTime: '',
                endTime: ''
            };
            this.sysCode={
                code:"",
                codeName:"",
                codeEnabledState:"1",
                remark:""
            };

            this.viewHide = false;
            this.editCode = false;
            this.dialogTitle = '新增参数类型';
            this.dialogFormVisible = false;
        },
        
        // 修改
        edit: function (item) {

            this.dialogTitle = '修改参数类型';
            this.dialogFormVisible = true;
            this.editCode = false;
            this.sysCode = JSON.parse(JSON.stringify(item));
        },
       
        // 删除
        deleteBatch: function () {
            if (this.ids.length > 0) {
                this.delete();
            } else {
              this.$message({
                type: 'warning',
                message: '请先选择数据!'
              });
            }

        },
        delete: function () {
            let str="";
            for(let i=0;i<this.ids.length;i++){
                str=str+this.ids[i].id+","
            }
            let params={
                ids:str
            };
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.formPost( '/api/auth/sysCode/doRmByIds',params).then(res => {
                    if (res.retHead.code == '0000000') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.retHead.message
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 保存
        doSave: function () {
            this.$refs.sysCode.validate((valid) => {
                if (valid) {
                    this.$api.formPost(   '/api/auth/sysCode/doSave', this.sysCode).then(res => {
                        if (res.retHead.code == '0000000') {
                            this.handleFormClose();
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                            this.getList();
                        }else{
                            this.handleFormClose();
                            this.$message({
                                type: 'error',
                                message: res.retHead.message
                            });
                            
                        }
                    });
                } else {
                  return false;
                }
              });
           
           
        },
        // 获取参数类型列表
        getList: function () {
            let params = {
                page: this.pager.page === 0 ? this.pager.page : this.pager.page - 1,
                size: this.pager.size,
            };
            if(this.searchForm.code){
                params.code=this.searchForm.code;
            }
            if(this.searchForm.codeName){
                params.codeName=this.searchForm.codeName;
            }
            if(this.searchForm.codeType){
                params.codeType=this.searchForm.codeType;
            }
            this.$api.formPost( '/api/auth/sysCode/doGetList', params).then(res => {
                if (res.retHead.code === '0000000') {
                    console.log(res);
                    this.tableData = res.retBody.list;
                    this.pager.total = res.retBody.total;
                }
            });
          
        },
        handleSelectionChange: function (val) {
            this.ids = val;
        },
        
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pager.size = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pager.page = val;
      },
      saveAll(){
        if(this.flg){
            this.$message({
                type: "error",
                message: "有未保存的数据，请先保存！"
              });
              return false;
        }
        for(var i=0;i<this.parSetList.length;i++){
                for(var j=0;j<this.newList.length;j++){
                    if(this.parSetList[i].ordinal==this.newList[j]){
                        this.parSetList[i].ordinal=this.oldList[j];
                        break;
                    }
                }
            }
            this.$api.post( '/api/basfun/syscode/item/doModBatchById', this.parSetList).then(res => {
                if (res.retHead.code == '0000000') {
                    this.handleFormClose();
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.getList();
                }else{
                    this.handleFormClose();
                    this.$message({
                        type: 'error',
                        message: res.retHead.message
                    });
                    
                }
            });
      }      
    }
}
