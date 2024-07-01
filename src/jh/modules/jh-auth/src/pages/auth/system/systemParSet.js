
export default {
    name: "Index",
    data() {
        return {
            searchForm: {
              code: '',
              codeName: '',
              sysCodeId:''
            },
            sysCodes:[],
            sysCodeItem:{
                code:"",
                codeName:"",
                codeValue:"",
                sysCodeId:""
            },
            rules: {
                code: [
                  { required: true, message: '请输入参数编号', trigger: 'blur' }
                ],
                codeName: [
                    { required: true, message: '请输入参数名称', trigger: 'blur' }
                ],
                codeValue: [
                    { required: true, message: '请输入参数值', trigger: 'blur' }
                ],
                sysCodeId: [
                    { required: true, message: '请选择参数类型', trigger: 'change' }
                ]
              },
            ids: [],
            tableData: [],
            pager: {
                page: 0,
                size: 20,
                total: 0
            },
            dialogFormVisible: false,
            viewHide: false,
            editCode: false,
            dialogTitle: '新增参数类型',
        }
    },
    computed: {
        height() {
            return `calc(100vh - 350px)`;
        }
    },
    mounted() {
        this.getsysCodes();
        this.getList();
    },
    methods: {
       
        // 关闭弹窗
        handleFormClose: function () {
            this.sysCodeItem={
                code:"",
                codeName:"",
                codeValue:"",
                sysCodeId:""
            };

            this.viewHide = false;
            this.editCode = false;
            this.dialogTitle = '新增参数';
            this.dialogFormVisible = false;
        },
        
        // 修改
        edit: function (item) {

            this.dialogTitle = '修改参数';
            this.dialogFormVisible = true;
            this.editCode = false;
            this.sysCodeItem = JSON.parse(JSON.stringify(item)) ;
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
            this.$refs.sysCodeItem.validate((valid) => {
                if (valid) {
                    this.$api.formPost(   '/api/auth/sysCodeItem/doSave', this.sysCodeItem).then(res => {
                        if (res.retHead.code == '0000000') {
                            this.handleFormClose();
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                            this.getList();
                        }else {
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
        //获取参数类型列表
        getsysCodes:function(){
            let params={};
            this.$api.formPost( '/api/auth/sysCode/doGetAll', params).then(res => {
                if (res.retHead.code === '0000000') {
                    this.sysCodes = res.retBody;
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
            if(this.searchForm.sysCodeId){
                params.sysCodeId=this.searchForm.sysCodeId;
            }
            this.$api.formPost( '/api/auth/sysCodeItem/doGetList', params).then(res => {
                if (res.retHead.code === '0000000') {
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
      }      
    }
}
