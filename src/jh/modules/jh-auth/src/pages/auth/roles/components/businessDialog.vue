<!-- 多选业务弹窗 -->
<template>
    <BaseDialog
        title="选择业务"
        :visible="businessVisible"
        width="605px"
        @close="close">
        <template slot="body">
            <el-transfer
                filterable
                :filter-method="filterMethod"
                :titles="['所有业务', '选中业务']"
                filter-placeholder="请输入"
                v-model="selectedList"
                :props="propsTra"
                :data="businessList">
            </el-transfer>
        </template>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close" >取 消</el-button>
            <el-button type="primary" @click="confirm" >确 定</el-button>
        </span>
    </BaseDialog>
</template>

<script>
export default {
  name:'businessDialog',
  props: {
    businessVisible: {
        type: Boolean,
        default: () => false,
    },
    businessConfig: {
        type:Object,
        default: () => {},
    },
  },
  data () {
    return {
        businessList:[],//全部数据
        selectedList:[],//选中数据
        propsTra: {
            key: 'id',
            label: 'name'
        },
    };
  },

  created() {
      this.getAllData().then(this.getData());
  },

  methods: {
    filterMethod(query, item) {
        return item.name.indexOf(query) > -1;
    },
    //获取所有业务
    async getAllData() {
        this.$api.formPost("/api/major/busconfig/busFlowConf/doGetAllByType2",{}).then(res => {
            this.businessList = res.retBody;
        })
    },
    //获取角色业务
    getData() {
        this.$api.formPost("/api/major/busconfig/busFlowConfRole/getAllByRoleId",{roleId: this.businessConfig.id}).then(res => {
            this.selectedList = res.retBody.map(item => item.bfcId);
        })
    },
    //关闭弹窗
    close(){
        this.$emit("update:businessVisible",false);
    },
    //确定弹窗
    confirm(){
        let params = {
            roleId: this.businessConfig.id,
            list:[],
        };
        params.list = this.selectedList.map(item => {
            let obj = {
                bfcId: item,
                bfcName: "",
                roleId: this.businessConfig.id,
            }
            obj.bfcName = this.businessList.filter(bus => {return bus.id == item})[0].name;
            return obj;
        })
        this.$api.post("/api/major/busconfig/busFlowConfRole/doSaveBusFlowConfRoleList",params).then(res => {
            this.$message({
                message: "操作成功",
                type: "success",
            })
            this.close();
            this.$emit("onSuccess");
        })
    },
  }
}

</script>
<style lang='scss' scoped>
</style>