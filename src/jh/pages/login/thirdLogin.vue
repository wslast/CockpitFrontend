<template>
  <div></div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    this.getPermission();
  },
  methods: {
    /**
     * @description: 获取用户默认配置
     * @return {*}
     * @author: Junchi Zhao
     */
    getUserSetting() {
      this.$api
        .formPost("/api/auth/sysuserprofile/doGetUserIndiviality", {})
        .then(res => {
          if (res.retHead.code === "0000000") {
            this.$store.commit("setSetting", res.retBody);
          } else {
            this.$store.commit("setSetting", null);
          }
          this.goHome();
        });
    },
    /**
     * @description: 获取用户图片压缩默认配置
     * @return {*}
     * @author: Junchi Zhao
     */
    getUserCompressSetting() {
      this.$api
        .formPost(
          this.getGlobalConfig().previewURL + "/api/file/upconfig/getImgConfig",
          {}
        )
        .then(res => {
          if (res.retHead.code === "0000000") {
            this.$store.commit("setUploadConfig", res.retBody);
          } else {
            this.$store.commit("setUploadConfig", null);
          }
        });
    },
    /**
     * @description: 跳转首页
     * @return {*}
     * @author: Junchi Zhao
     */
    goHome() {
      this.$router.push("/");
    },
    /**
     * @description: 登陆
     * @return {*}
     * @author: Junchi Zhao
     */
    login() {
      //校验参数
      if (!this.$route.query.username && !this.$route.query.password) {
        this.$message.error("登录失败");
        return;
      }
      let params = {
        username: this.$route.query.username,
        password: this.$route.query.password
      };
      if (this.$store.state.settings.encryptType === "SM3") {
        params.password = this.$jhEncrypt.ctxToSM3(params.password);
      } else {
        params.password = this.$md5(params.password);
      }
      if (this.$jhEncrypt && this.$jhEncrypt.ctxToSM4) {
        params.username = this.$jhEncrypt.ctxToSM4(params.username);
        params.password = this.$jhEncrypt.ctxToSM4(params.password);
      }
      this.$api
        .formPost("/web/sysuser/login", params)
        .then(res => {
          if (res.retHead.code == "0000000" && res.retBody) {
            let user = JSON.stringify(res.retBody);
            sessionStorage.setItem("token", res.retBody.token);
            sessionStorage.setItem("user", user);
            this.getUserSetting();
            this.getUserCompressSetting();
          } else {
            this.$message.error(res.retHead.message);
          }
        })
        .catch(error => {
          this.$message.error("登录失败");
        });
    },
    /**
     * @description: 获取加密方式
     * @return {*}
     * @author: Junchi Zhao
     */
    getPermission() {
      this.$api.formPost("/captcha/encrypt/type", {}).then(res => {
        this.$store.commit("setEncryptType", res.retBody);
        this.login();
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
