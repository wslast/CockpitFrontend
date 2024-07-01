<template>
  <div class="login">
    <div class="content">
      <div class="bg"></div>
      <div class="df aic jcc form">
        <div class="fg1">
          <div class="title">{{ projectName }}</div>
          <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            class="loginForm is-success"
          >
            <el-form-item prop="username" class="mb36">
              <el-input
                @keyup.enter.native="submitForm('loginForm')"
                v-model="loginForm.username"
                class="pctw100 input"
                placeholder="账号"
              >
                <i slot="prefix" class="iconfont iconuser-fill"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password" class="mb36">
              <el-input
                @keyup.enter.native="submitForm('loginForm')"
                :type="passwordType"
                class="pctw100 input"
                v-model="loginForm.password"
                placeholder="密码"
              >
                <i slot="prefix" class="iconfont iconlock-fill"></i>
                <i
                  slot="suffix"
                  @click="showPwd"
                  :class="
                    passwordType == 'password'
                      ? 'iconfont iconeyeslash-fill'
                      : 'iconfont iconeye-fill'
                  "
                ></i>
              </el-input>
            </el-form-item>

            <div class="btns">
              <el-button
                class="loginBtn"
                type="primary"
                :loading="btnload"
                @click="submitForm('loginForm')"
                >登 录</el-button
              >
            </div>
            <!--fixme-->
            <div class="btns" style="padding-top: 20px">
              <el-button
                class="loginBtn"
                type="primary"
                @click="fakeLogin"
                >演示登录</el-button
              >
            </div>
            <!--fixme-end-->
          </el-form>
        </div>
      </div>
    </div>
    <jigsaw
      ref="captcha"
      v-if="show"
      :show="show"
      @close="show = false"
      :router="'/'"
      :loginForm="loginForm"
      :register="() => {}"
      :login="validPwd"
    ></jigsaw>
  </div>
</template>
<script>
import { projectName } from "@/config";
export default {
  components: {},
  data() {
    return {
      show: false, //是否显示验证码组件
      isVerifiCode: false, //是否开启验证码校验
      passwordType: "password",
      projectName: projectName,
      btnload: false,
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getPermission();
  },
  methods: {
    fakeLogin(){
      sessionStorage.setItem("token", "res.retBody.token");
      this.$router.push("/highScreen/jc");
    },
    //督促更新密码
    promptPwd() {
      this.$api
        .formPost("/api/auth/sysuser/promptUpdatePassword", {})
        .then(res => {
          res.retBody && this.$message.success(res.retBody);
        });
    },
    //获取用户默认配置
    async getUserSetting() {
      return new Promise((resolve, reject) => {
        this.$api
          .formPost("/api/auth/sysuserprofile/doGetUserIndiviality", {})
          .then(res => {
            if (res.retHead.code === "0000000") {
              this.$store.commit("setSetting", res.retBody);
            } else {
              this.$store.commit("setSetting", null);
            }
            resolve();
          });
      });
    },
    //获取用户图片压缩默认配置
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
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$jhEncrypt) {
            this.loginForm.commitPwd = this.$jhEncrypt.pwdInfoEncrypt(
              this.loginForm.password
            );
          }
          if (this.isVerifiCode) {
            this.show = true;
          } else {
            let params = {
              username: this.loginForm.username,
              password: this.loginForm.commitPwd
            };
            this.login(params);
          }
        } else {
          return false;
        }
      });
    },
    login(params) {
      if (this.$jhEncrypt) {
        params.username = this.$jhEncrypt.transferInfoEncrypt(params.username);
        params.password = this.$jhEncrypt.transferInfoEncrypt(params.password);
      }
      console.log(params.password);
      this.$api
        .formPost("/web/sysuser/login", params)
        .then(res => {
          this.btnload = false;
          if (res.retHead.code == "0000000" && res.retBody) {
            let user = JSON.stringify(res.retBody);
            sessionStorage.setItem("token", res.retBody.token);
            sessionStorage.setItem("user", user);
            this.validPwd();
          } else {
            this.$message.error(res.retHead.message);
          }
        })
        .catch(error => {
          this.btnload = false;
        });
    },
    //简单密码提示
    async editPwd() {
      await this.getUserSetting();
      this.$confirm("您的密码强度较低,是否前往修改密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.promptPwd();
          this.$router.push("/user/mod-user?type=2");
        })
        .catch(() => {
          this.promptPwd();
          this.$router.push("/");
        });
    },
    //验证码校验
    async validPwd() {
      this.show = false;
      this.getUserCompressSetting();
      await this.getUserSetting();
      if (this.isVerifiCode) {
        if (this.$validPwd(this.loginForm.password)) {
          this.editPwd();
        } else {
          this.promptPwd();
          this.$message.success("登录成功！");
          this.$router.push("/");
        }
      } else {
        if (this.$validPwd(this.loginForm.password)) {
          this.editPwd();
        } else {
          this.promptPwd();
          this.$message.success("登录成功！");
          this.$router.push("/");
        }
      }
    },
    //检查是否需要验证码
    getPermission() {
      this.$api.formPost("/captcha/status", {}).then(
        res => {
          if (res.retHead.code === "0801001") {
            this.isVerifiCode = false;
          } else if (res.retHead.code === "0000000") {
            this.isVerifiCode = res.retBody;
          }
        },
        err => {
          this.isVerifiCode = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item__content .el-input {
    width: 100% !important;
  }
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  background: url("../../../assets/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  align-items: center;
  justify-content: center;
  .content {
    height: 68vh;
    width: 75vw;
    background: #fff;
    border-radius: 20px;
    display: flex;
    .bg {
      width: 40vw;
      height: 100%;
      background: url("../../../assets/images/ssd.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-radius: 20px 0px 0px 20px;
    }
    .form {
      width: 35vw;
      height: 100%;
      padding: 0px 3vw;
      .title {
        font-size: 36px;
        margin-bottom: 40px;
        text-align: center;
      }
      .savePwd {
        margin-bottom: 40px;
        margin-left: 5px;
      }
    }
  }
}
.mb36 {
  margin-bottom: 36px;
}
/deep/ .loginForm .el-form-item__content {
  margin-right: 0px !important;
}
/deep/ .el-form-item {
  margin-bottom: 22px !important;
}
/deep/ .input .el-input__inner {
  height: 48px;
  line-height: 48px;
  border-radius: 32px;
  padding-left: 45px;
  font-size: 18px;
}
/deep/ .input .el-input__prefix {
  display: flex;
  align-items: center;
  margin-left: 8px;
}
/deep/ .input .el-input__suffix {
  display: flex;
  align-items: center;
  margin-right: 8px;
}
/deep/ .loginBtn {
  height: 48px;
  font-size: 24px !important;
  width: 100%;
  border-radius: 32px;
}
/deep/ .el-checkbox__label {
  font-size: 18px;
}
/deep/ .el-input input:-webkit-autofill::first-line {
  font-size: 24px;
}
</style>
