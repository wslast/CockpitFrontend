/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // baseURL: '"http://200.200.221.246:7403"',//中心室内
  // baseURL: '"http://10.13.58.20:7403"',//中心机房
  baseURL: '"http://127.0.0.1:7403"',//打包
  // baseURL: '"http://172.16.77.64:7403"', // 服务器地址
  // uploadURL: '"http://192.168.70.174:7404"', //文件服务地址
  // previewURL: '"http://192.168.70.174:7404"', //文件服务地址
  uploadURL: '"http://115.233.221.131:27404"', //文件服务地址
  previewURL: '"http://115.233.221.131:27404"', //文件服务地址
  wsURL: '"http://115.233.221.131:25203"'
});
