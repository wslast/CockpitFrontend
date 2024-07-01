<!-- 消息通知 -->
<template>
  <div>
    <el-tooltip effect="light" content="消息" placement="bottom">
      <el-badge :value="records" class="item">
        <i class="el-icon-message" @click="showMyMessage"></i>
      </el-badge>
    </el-tooltip>
    <!-- <el-button type="primary"  style="float:right;" @click="test">测试按钮</el-button> -->
    <messageDialog
      :messageDialogVisible.sync="messageDialogVisible"
      v-if="messageDialogVisible"
      :messageDialogConfig="messageDialogConfig"
    />
  </div>
</template>
<script>
import config from '../../config.js';
export default {
  name: 'notification',
  components: {
    messageDialog: (resolve) => resolve(require('./messageDialog')),
  },

  data() {
    return {
      options: {
        //配置项
      },
      ws: null,
      readyState: 3, //默认连接关闭
      userId: JSON.parse(sessionStorage.user).id,
      retryTimes: 0, //尝试3次后不在尝试
      records: 0, //消息数
      messageDialogVisible: false,
      messageDialogConfig: { title: '我的消息' },
      messageStack: [], //消息栈
      showMC: config.showMessageCount,
    };
  },

  created() {
    this.initWebSocket();
    this.reciveMessage();
  },
  beforeDestroy() {
    //组件销毁时关闭连接
    if (this.ws) {
      this.ws.close();
    }
  },
  methods: {
    showMyMessage() {
      //this.messageDialogVisible = true;
      this.$router.push({
        path: '/mess/messMessage',
      });
    },
    reciveMessage() {
      let param = {};
      param.userId = this.userId;
      this.$api
        .formPost('/api/msg/pm/getUnreadMessCount', param)
        .then((res) => {
          this.records = res.retBody;
        });
    },
    //初始化WebSocket
    initWebSocket() {
      console.log(config.baseURL);
      let port = null;
      let domain = null;
      if (config.baseURL.indexOf(':') > -1) {
        const urlArr = config.baseURL.split(':');
        domain = urlArr[1].substr(2);
        port = urlArr[2].replace(/\//g, '');
      } else {
        domain = config.baseURL;
      }
      if ('WebSocket' in window) {
        let wsUrl = '';
        if (port) {
          wsUrl =
            'ws://' +
            domain +
            ':' +
            port +
            '/wsocket/webSocketServer?userId=' +
            this.userId;
        } else {
          wsUrl =
            'ws://' + domain + '/wsocket/webSocketServer?userId=' + this.userId;
        }
        this.ws = new WebSocket(wsUrl);
      } else if ('MozWebSocket' in window) {
        this.ws = new MozWebSocket(
          'ws://' +
            domain +
            '/wsocket/webSocketServer?userId=' +
            this.userId +
            ''
        );
      } else {
        this.ws = new SockJS(
          'http://' +
            domain +
            '/sockjs/wsocket/webSocketServer?userId=' +
            this.userId +
            ''
        );
      }
      this.ws.onopen = this.wsOpen;
      this.ws.onmessage = this.wsMessage;
      this.ws.onclose = this.wsClose;
      this.ws.onerror = this.wsError;
    },
    //打开连接
    wsOpen(e) {
      if (this.ws.readyState) {
        //0 - 表示连接尚未建立。1 - 表示连接已建立，可以进行通信。2 - 表示连接正在进行关闭。3 - 表示连接已经关闭或者连接不能打开。
        console.log(
          '用户userId：' +
            this.userId +
            '连接成功,连接的ws地址：' +
            config.baseURL.split(':')[1].substr(2)
        );
      }
    },
    //接受数据
    wsMessage(e) {
      console.log(e);
      this.fetchMessage(e);
    },
    //关闭
    wsClose() {
      console.log('WebSocket已经关闭');
    },
    //连接错误
    wsError() {
      // 一秒后尝试重连
      console.log('WebSocket连接失败');
      if (this.retryTimes > 3) {
        this.$message.warning('webSocket连接失败');
        return;
      }
      setTimeout(() => {
        console.log('尝试重连');
        this.retryTimes++;
        this.initWebSocket();
      }, 1000);
    },
    //获取数据
    fetchMessage(e) {
      let param = {};
      if (e.data) {
        // console.log(JSON.parse(e.data));
        param = JSON.parse(e.data);
      }
      let that = this;
      if (param && param.retBody) {
        if (param.retBody.data) {
          this.$notify({
            title: param.retBody.data.title,
            message: param.retBody.data.content,
            position: 'bottom-right',
            onClick() {
              that.confirmMessage(param);
            },
            onClose() {
              that.closeMessage(param);
            },
            duration: 0,
          });
        }

        this.records = param.retBody.records === 0 ? '' : param.retBody.records;
      }
    },
    //确认消息
    confirmMessage(param) {
      console.log('确认消息');
      if (param.retBody && param.retBody.data.businessurl) {
        this.$router.push(param.data.businessurl);
      }
      this.setRead(param);
    },
    //关闭消息
    closeMessage(param) {
      if (param.retBody && param.retBody.data.businessurl) {
        this.$router.push(param.data.businessurl);
      }
      this.setRead(param);
    },
    //设置已读
    setRead(param) {
      let params = {};
      params.ids = param.retBody.data.id;
      params.userId = param.retBody.data.userId;
      this.$api.formPost('/api/msg/pm/updateReadStatus', params);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-badge {
  line-height: 0px;
}
/deep/ .el-badge__content.is-fixed {
  font-size: 10px;
  height: 15px;
  line-height: 15px;
  padding: 0 4px;
  top: -5px;
}
.el-icon-message {
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
}
</style>
