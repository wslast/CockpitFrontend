/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
const Mock = require("mockjs");
const { param2Obj } = require("./utils");

const table = require("./table");

const mocks = [...table];

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        // https://expressjs.com/en/4x/api.html#req
        // console.log(calcParams(body));
        result = respond(calcParams(body));
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }
  function calcParams(opt) {
    if (!opt) return {};
    let result = opt.split("&").reduce((acc, cur) => {
      if (cur && cur.indexOf("=") > -1) {
        acc[cur.split("=")[0]] = cur.split("=")[1];
      }
      return acc;
    }, {});
    return result;
  }
  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || "get",
      XHR2ExpressReqWrap(i.response)
    );
  }
}

module.exports = {
  mocks,
  mockXHR
};
