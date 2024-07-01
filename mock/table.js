/*
 * @Author: Junchi Zhao
 * @LastEditors: 王硕
 * @Description:
 */
const Mock = require("mockjs");
const variable = require("./variable.js");
const fk = require("./fk");
const zjld = require("./zjld");
const sy = require("./sy");
const dk = require("./dk");
const tq = require("./tq");
const jc = require("./jc");
const dw = require("./dw");
const gr = require("./gr");

const data = Mock.mock({
  "list|30": [
    {
      id: "@id",
      name: "@sentence(10, 20)",
      "status|1": ["published", "draft", "deleted"],
      author: "name",
      display_time: "@datetime",
      pageviews: "@integer(300, 5000)"
    }
  ]
});

const idList = [...sy, ...fk, ...zjld, ...dk, ...tq, ...jc, ...dw, ...gr];
module.exports = [
  {
    url: "/api/dyncscript/scriptRule/query",
    type: "post",
    response: config => {

      const dataListConfig = idList.filter(item => {
        if (item.id === config.scriptId) {
          return item;
        }
      })[0]
      const valueKey = dataListConfig.value.hasOwnProperty("retList") ? "retList" : "list"
      const dataList = dataListConfig.value[valueKey];
      return {
        retHead: {
          bak: "",
          code: "0000000",
          extMess: null,
          message: "执行成功"
        },
        retBody: {
          endRow: 2,
          hasNextPage: false,
          hasPreviousPage: false,
          isFirstPage: true,
          isLastPage: true,
          navigateFirstPage: 1,
          navigateLastPage: 1,
          navigatePages: 8,
          navigatepageNums: [1],
          [valueKey]: dataList,
          nextPage: 0,
          pageNum: 1,
          pageSize: 20,
          pages: 1,
          prePage: 0,
          size: 2,
          startRow: 1,
          total: dataList.length
        }
      };
    }
  }
];
