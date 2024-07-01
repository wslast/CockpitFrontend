<template lang="html">
  <div :val="value_">
    <el-radio-group v-model="type">
      <div>
        <el-radio label="1" >每年</el-radio>
      </div>
      <div>
        <el-radio label="5" >不指定</el-radio>
      </div>      
      <div>
        <el-radio label="2" >周期</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <el-input-number  @change="type = '2'" :min="2000" v-model="cycle.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">至</span>
        <el-input-number  @change="type = '2'" :min="2000" v-model="cycle.end"></el-input-number>
        年
      </div>
      <div>
        <el-radio label="3" >指&emsp;定</el-radio>
        <el-input-number  @change="type = '3'" :min="2000" v-model="zhiding"></el-input-number>
      </div>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data () {
    let year = new Date().getFullYear()
    return {
      type: '5', // 类型
      cycle: { // 周期
        start: year,
        end: year
      },
      zhiding:year,
      appoint: [] // 指定
    }
  },
  computed: {
    value_ () {
      let result = []
      switch (this.type) {
        case '1': // 每年
          result.push('*')
          break
        case '2': // 年期
          result.push(`${this.cycle.start}-${this.cycle.end}`)
          break
          case '3': // 指定
          result.push(`${this.zhiding}`)
          break
        default: // 不指定
          result.push(' ')
          break
      };
      this.$emit('child-say', result.join(''))
      return result.join('')
    }
  },
  methods:{
    init(val) {
      if(val=='*'  || val=='0'){
        this.type='1';
      }else if(val=='?'|| val==''){
        this.type='5';
      }else if(val.indexOf('-')>=0){
        this.type='2';
        this.cycle.start=val.split('-')[0];
        this.cycle.end=val.split('-')[1];
      }else{
        this.type='3';
        this.zhiding=val;
      }      
    },
  }
}
</script>

<style lang="css" scoped>
.el-checkbox+.el-checkbox {
    margin-left: 10px;
}
</style>
