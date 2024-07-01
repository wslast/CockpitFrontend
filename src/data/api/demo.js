import api from "../fetchType";
export default {
  getData(params) {
    return new Promise(resolve => {
      api.formPost("/api/log/collection/doGetList", params).then(res => {
        resolve(res);
      });
    });
  },
  deleteData(params) {
    return new Promise(resolve => {
      api.formPost("", params).then(res => {
        resolve(res);
      });
    });
  },
  editData(params) {
    return new Promise(resolve => {
      api.formPost("", params).then(res => {
        resolve(res);
      });
    });
  },
  addData(params) {
    return new Promise(resolve => {
      api.formPost("", params).then(res => {
        resolve(res);
      });
    });
  }
};
