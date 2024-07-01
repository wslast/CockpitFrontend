<template>
  <el-select
    :clearable="myclearable"
    filterable
    v-model="myModel"
    :placeholder="placeholder"
    :loading="loading" 
     style="width:200px">
    <el-option
      v-for="item in options"
      :key="item.codeValue"
      :label="item.codeName"
      :value="item.codeValue">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'EnumSelector',
    props:{
      select:{
        type:Function,
      },
      placeholder:{
        type:String,
        required:true,
        default: '请选择'
      },
      code:{
        type:String,
        default:''
      },
      enabledState:{
        type:String,
        default:''
      },
      clearable:{
        type:String,
        default: "0"
      },
      value:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        options: [],
        list: [],
        loading: false,
        states:[],
        myModel: this.value,
        myclearable:true,
      }
    },
    mounted() {
      this.loadSource();
    },
    watch:{
      model(val){
        this.myModel = val;
      },
      myModel(val){
        this.setVal(val);
      }
    },
    methods: {
     
      loadSource: function() {
        if(this.clearable&&this.clearable=="1"){
          this.myclearable=true;
        }else{
          this.myclearable=false;
        }
        this.$api.formPost(  '/api/auth/sysCodeItem/doGetEnumList',{code:this.code,enabledState:this.enabledState}).then(res => {
          if (res.retHead.code == '0000000') {
            this.list = res.retBody;
              this.setVal(this.value);
          }
        });
      },
    setVal:function(val){
        let k = [];
        k = this.list.filter((item)=>{
          //筛选出匹配数据，是对应数据的整个对象
          let flag = false;
          for(let i = 0 ; i < val.length ; i ++){
            if(val == item.codeValue){
              flag = true;
              break;
            }
          }
          return flag;
        });
        let value="";
        if(k.length>0){
          value=k[0].codeValue;
        }
        this.options = this.list;
        this.$emit('input', value);
      }
    }
  }
</script>

<style scoped>

</style>
