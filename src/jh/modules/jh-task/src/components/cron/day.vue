<template lang="html">
  <div :val="value_">
    <el-radio-group v-model="type">
      <div>
        <el-radio label="1" >每日</el-radio>
      </div>
      <div>
        <el-radio label="5" >不指定</el-radio>
      </div>
      <div>
        <el-radio label="2" >周&emsp;期</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <el-input-number  @change="type = '2'" :max="31" :min="1" v-model="cycle.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">至</span>
        <el-input-number  @change="type = '2'" :max="31" :min="1" v-model="cycle.end"></el-input-number>
      </div>
      <div>
        <el-radio label="3" >循&emsp;环</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <el-input-number  @change="type = '3'" :max="59" :min="0" v-model="loop.start"></el-input-number>
        <span style="margin-left: 5px; margin-right: 5px;">开始，每</span>
        <el-input-number  @change="type = '3'" :max="59" :min="0" v-model="loop.end"></el-input-number>
        执行一次
      </div>  
      <div>
        <el-radio label="8">工作日</el-radio>
        <span style="margin-left: 10px; margin-right: 5px;">本月</span>
        <el-input-number  @change="type = '8'" v-model="work" :min="1" :max="7" ></el-input-number>
      号，最近的工作日
      </div>
      <div>
        <el-radio label="6">本月最后一天</el-radio>
      </div>
      <div>
      <el-radio label="4" >指定</el-radio>
      <el-checkbox-group @change="type = '4'" v-model="appoint">
        <span v-for="i in 4" :key="i" style="margin-right: 30px; line-height: 25px;">
          <el-checkbox v-for="j in 10" v-if="parseInt((i - 1) + '' + (j - 1)) < dayCount && !(i === 1 && j === 1)" :key="j" :label="(i - 1) + '' + (j - 1)"></el-checkbox >
        </span>
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
        start: 1,
        end: 31
      },
      week: { // 指定周
        start: 0,
        end: 0
      },
      work: 0,
      last: 0,
      appoint: [], // 指定
      //dayCount:''
    }
  },
  computed: {
    value_ () {
      let result = []
      switch (this.type) {
        case '1': // 每秒
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
        case '6': // 最后
          result.push(`${this.last === 0 ? '' : this.last}L`)
          break
        case '7': // 指定周
          result.push(`${this.week.start}#${this.week.end}`)
          break
        case '8': // 工作日
          result.push(`${this.work}W`)
          break
        default: // 不指定
          result.push('?')
          break
      };
      this.$emit('child-say', result.join(''))
      return result.join('')
    },
    dayCount(){
      let date = new Date();
      let [year,month] = [date.getFullYear(),date.getMonth() + 1];
      return (new Date(year,month,0)).getDate() + 1
    }
  },
  methods:{
    init(val) {
      if(val=='*' || val=='' || val=='0'){
        this.type='1';
        this.cycle.start=1;
        this.cycle.end=31;
        this.loop.start=0;
        this.loop.end=0;
        this.last=0;
        this.work=1;
        this.appoint=[];
      }else if(val=='?'){
        this.type='5';
        this.cycle.start=1;
        this.cycle.end=31;
        this.loop.start=0;
        this.loop.end=0;
        this.last=0;
        this.work=1;
        this.appoint=[];
      }else if(val=='L'){
        this.type='6';
        this.cycle.start=1;
        this.cycle.end=31;
        this.loop.start=0;
        this.loop.end=0;
        this.last=1;
        this.work=1;
        this.appoint=[];
      }else if(val.indexOf('W')>=0){
        this.type='8';
        this.cycle.start=1;
        this.cycle.end=31;
        this.loop.start=0;
        this.loop.end=0;
        this.last=0;
        this.work=val.split('W')[0];
        this.appoint=[];
      }else if(val.indexOf('-')>=0){
        this.type='2';
        this.cycle.start=val.split('-')[0];
        this.cycle.end=val.split('-')[1];
        this.loop.start=0;
        this.loop.end=0;
        this.last=0;
        this.work=1;
        this.appoint=[];
      }else if(val.indexOf('/')>=0){
        this.type='3';
        this.cycle.start=1;
        this.cycle.end=31;
        this.loop.start=val.split('/')[0];
        this.loop.end=val.split('/')[1];
        this.appoint=[];
        this.last=0;
        this.work=1;
      }else{
        this.type='4';
        this.cycle.start=1;
        this.cycle.end=31;
        this.loop.start=0;
        this.loop.end=0;
        this.last=0;
        this.work=1;
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
