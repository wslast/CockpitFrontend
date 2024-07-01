<template>
  <div class="simpleTable">
    <div class="logoTable df fdc" style="margin-left: 23px;margin-top: 32px;margin-right: 23px">
      <kb style="height:75px" class="df fg1"></kb>
      <div style="height:0px" class="h0 fg1"></div>
    </div>
    <div class=" df">
      <div class="leftTable">
        <div class="tableTop contentTable1 bgi df fdc">
          <div class="title">实缴账户走势分析</div>
          <sjzhzs class="fg1"></sjzhzs>
        </div>
        <div class="tableGap contentTable2 bgi df fdc" >
          <div class="title">缴存基数分析</div>
          <jcjs class="fg1"></jcjs>
        </div>
        <div class="tableGap contentTable3 bgi df fdc" style="height: 290px;margin-top: 10px;">
          <div class="title">缴存人群分析</div>
          <jcrq class="fg1"></jcrq>
        </div>
      </div>
      <div class="fg1 centerTable">
        <div class="centerTable2  df fdc">
          <tqzs class="fg1"></tqzs>
        </div>
        <div class="bottomTable2 df">
          <div class="leftBottomTable fg1 bgi df fdc">
            <div class="title" style="line-height: 36px">缴存方式占比分析</div>
            <tsqk class="fg1"></tsqk>
          </div>
          <div class="rightBottomTable fg1 bgi df fdc">
            <div class="title" style="line-height: 36px" >销户人群分析</div>
            <xhrq class="fg1"></xhrq>
          </div>
        </div>
      </div>
      <div class="rightTable">
        <div class="tableTop contentTable1 bgi df fdc">
          <div class="title">停缴分析</div>
          <tj class="fg1"></tj>
        </div>
        <div class="tableGap contentTable2 bgi df fdc">
          <div class="title">开户与销户分析</div>
          <khxh class="fg1"></khxh>
        </div>
        <div class="tableGap contentTable3 bgi df fdc">
          <div class="title">缴存年龄段分析</div>
          <jcnl class="fg1"></jcnl>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
export default {
    components: {
        sjzhzs: () => import('./components/sjzhzs.vue'),
        jcjs: () => import('./components/jcjs.vue'),
        jcrq: () => import('./components/jcrq.vue'),
        sjzhglb: () => import('./components/sjzhglb.vue'),
        tsqk: () => import('./components/tsqk.vue'),
        xhrq: () => import('./components/xhrq.vue'),
        tj: () => import('./components/tj.vue'),
        khxh: () => import('./components/khxh.vue'),
        jcnl: () => import('./components/jcnl.vue'),
        kb: () => import('./components/kb.vue'),
      tqzs: () => import('./components/tqzs.vue'),
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeDestroy() {},
    methods: {},
};
</script>
<style scoped lang="scss">
.fdc {
    flex-direction: column;
}
.simpleTable {
    color: white;
}
.leftTable {
    margin-left: 24px;
    width: 477.005px;
}
.rightTable {
    margin-right: 24px;
    width: 477.005px;
}
.centerTable {
    margin: 0px 18.01px;
    width: 881.971px;
    .logoTable {
        height: 80.006px;
        margin-top: 44.006px;
    }
    .centerTable2 {
        height: 500px;
        margin-top: 32.006px;
    }
    .bottomTable2 {
        height: 350px;
        margin-top: 32.006px;
        .leftBottomTable {
            width: 0px;
        }
        .rightBottomTable {
            width: 0px;
            margin-left: 20.006px;
        }
    }
}
.title {
    height: 39.994px;
    text-indent: 48px;
    line-height: 32.994px;
    background-image: linear-gradient(to right, #00c0ff, #43f0ff, 50%, #00c0ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 22.003px;
    font-weight: 900;
    font-family: MicrosoftYaHei;
}
.centerTitle {
    font-size: 22.003px;
    font-weight: bolder;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    text-indent: 87.994px;
}
.contentTable1 {
    width: 476.006px;
    height: 250px;
}

.contentTable2 {
    width: 476.006px;
    height: 260px;
}

.contentTable3{
    width: 476.006px;
    height: 290px;
}

.tableTop {
    margin-top: 19px;
}
.tableGap {
    margin-top: 20px;
}
.bgi {
    background-image: url('../../../assets/images/dp/jc-old/kuang_2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgsjdw {
    background-image: url('../../../assets/images/dp/jc-old/icon_sjdw.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgsjrs {
    background-image: url('../../../assets/images/dp/jc-old/icon_sjrs.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bgup {
    background-image: url('../../../assets/images/dp/jc-old/icon_up.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.bgdown {
    background-image: url('../../../assets/images/dp/jc-old/icon_down.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.logoTextStyle1 {
    height: 24px;
    text-align: left;
    font-size: 1.25vw;
    line-height: 24px;
}
.logoTextStyle2 {
    height: 0px;
    text-align: center;
    color: #ffffff;
    font-size: 15.994px;
    line-height: 15.994px;
}
</style>
