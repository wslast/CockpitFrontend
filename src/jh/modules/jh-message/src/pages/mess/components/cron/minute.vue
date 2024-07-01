<!-- 分钟 -->
<template lang="html">
  <div :val="value_">
      <el-radio-group v-model="type">
      <div>
        <el-radio label="1" >每分</el-radio>
      </div>
      <div>
        <el-radio label="2" >周期</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <el-input-number  @change="type = '2'" :max="59" :min="1" v-model="cycle.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">至</span>
        <el-input-number  @change="type = '2'" :max="59" :min="1" v-model="cycle.end"></el-input-number>
        分
      </div>
      <div>
        <el-radio label="3" >循环</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <el-input-number  @change="type = '3'" :max="59" :min="0" v-model="loop.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">分开始，每</span>
        <el-input-number  @change="type = '3'" :max="59" :min="0" v-model="loop.end"></el-input-number>
        分执行一次
      </div>  
      <div>
      <el-radio label="4" >指定</el-radio>
      <el-checkbox-group @change="type = '4'" v-model="appoint">
        <div v-for="i in 6" :key="i" style="margin-left: 10px; line-height: 25px;">
          <el-checkbox v-for="j in 10" :key="j" :label="(i - 1) + '' + (j - 1)"></el-checkbox >
        </div>
      </el-checkbox-group >
      </div> 
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: '1', // 类型
      cycle: { // 周期
        start: 0,
        end: 0
      },
      loop: { // 循环
        start: 0,
        end: 0
      },
      week: { // 指定周
        start: 0,
        end: 0
      },
      appoint: [] // 指定
    }
  },
  computed: {
    value_ () {
      let result = []
      switch (this.type) {
        case '1': // 每分
          result.push('*')
          break
        case '2': // 周期
          result.push(`${this.cycle.start}-${this.cycle.end}`)
          break
        case '3': // 循环
          result.push(`${this.loop.start}/${this.loop.end}`)
          break
        case '4': // 指定
          result.push(this.appoint.join(',') ? this.appoint.join(',') : '?')
          break
        default: // 默认
          result.push('?')
          break
      };
      this.$emit('child-say',result.join(''));
      return result.join('')
    }
  },
  methods:{
    init(val) {
      if(val=='*' || val=='' || val=='0'){
        this.type='1';
        this.cycle.start=0;
        this.cycle.end=0;
        this.loop.start=0;
        this.loop.end=0;
        this.appoint=[];
        //console.log(1);
      }else if(val.indexOf('-')>=0){
        this.type='2';
        this.cycle.start=val.split('-')[0];
        this.cycle.end=val.split('-')[1];
        this.loop.start=0;
        this.loop.end=0;
        this.appoint=[];
        //console.log(2);
      }else if(val.indexOf('/')>=0){
        this.type='3';
        this.cycle.start=0;
        this.cycle.end=0;
        this.loop.start=val.split('/')[0];
        this.loop.end=val.split('/')[1];
        this.appoint=[];
        //console.log(3);
      }else{
        this.type='4';
        this.cycle.start=0;
        this.cycle.end=0;
        this.loop.start=0;
        this.loop.end=0;
        this.appoint=[];
        let larray = val.split(',');
        larray.forEach(e => {
          this.appoint.push(e);
        });
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
