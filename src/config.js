/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
export const projectName = '公积金管理驾驶舱';
export const baseURL = process.env.baseURL
    ? process.env.baseURL
    : window.location.origin;
export const uploadURL = process.env.uploadURL
    ? process.env.uploadURL
    : window.location.origin;
export const logURL = process.env.logURL
    ? process.env.logURL
    : window.location.origin;
export const wsURL = process.env.wsURL
    ? process.env.wsURL
    : window.location.origin;
export const isOpenWs = true; //是否开启websocket
export const showMessageCount = 2; //设置消息展示数量
export const previewURL = process.env.previewURL; //预览服务地址
export const isWaterMark = true;
export const pwdEncryptType = 'SM3';
export const transferEncryptType = 'SM4';
// 开启Mock.js
export const isMock = true;
export function getGlobalConfig() {
    return {
        baseURL: baseURL,
        uploadURL: uploadURL,
        logURL: logURL,
        wsURL: wsURL,
        isOpenWs: isOpenWs,
        showMessageCount: showMessageCount,
        previewURL: previewURL,
        isWaterMark: isWaterMark,
        pwdEncryptType: pwdEncryptType,
        transferEncryptType: transferEncryptType,
        isMock: isMock,
    };
}
