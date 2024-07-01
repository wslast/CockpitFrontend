import api from "@/data/fetchType";
import store from "@/store";
import * as config from "@/config";
async function login(ticket, Vue) {
  return new Promise(resolve => {
    // let ticket = router.query && router.query.est;
    let params = {
      username: "0#0#" + ticket
    };
    api
      .formPost("/web/sysuser/login", params)
      .then(res => {
        if (res.retHead.code == "0000000" && res.retBody) {
          let user = JSON.stringify(res.retBody);
          sessionStorage.setItem("token", res.retBody.token);
          sessionStorage.setItem("user", user);
        }
        resolve(true);
      })
      .catch(e => {
        console.log(e);
      });
  });
}

//获取用户默认配置
async function getUserSetting() {
  return new Promise((resolve, reject) => {
    api
      .formPost("/api/auth/sysuserprofile/doGetUserIndiviality", {})
      .then(res => {
        if (res.retHead.code === "0000000") {
          store.commit("setSetting", res.retBody);
        } else {
          store.commit("setSetting", null);
        }
        resolve();
      });
  });
}
async function getUserCompressSetting() {
  return new Promise((resolve, reject) => {
    api
      .formPost(config.previewURL + "/api/file/upconfig/getImgConfig", {})
      .then(res => {
        if (res.retHead.code === "0000000") {
          store.commit("setUploadConfig", res.retBody);
        } else {
          store.commit("setUploadConfig", null);
        }
        resolve();
      })
      .catch(err => {
        resolve();
      });
  });
}

export default {
  login,
  getUserSetting,
  getUserCompressSetting
};
