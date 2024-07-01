/*
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description:
 */

const setConfig = (e) => {
	return e;
};
const config = setConfig({
	baseURL: '',
	uploadURL: '',
	logURL: '',
	wsURL: '',
	isOpenWs: '',
	showMessageCount: '',
	previewURL: '',
	pwdLevel: 'NORMAL',
});
export function resetConfig(e) {
	const newConfig = setConfig(e);
	config.baseURL = newConfig.baseURL ? newConfig.baseURL : window.location.host;
	config.uploadURL = newConfig.uploadURL
		? newConfig.uploadURL
		: window.location.host;
	config.logURL = newConfig.logURL ? newConfig.logURL : window.location.host;
	config.wsURL = newConfig.wsURL ? newConfig.wsURL : window.location.host;
	config.isOpenWs = newConfig.isOpenWs
		? newConfig.isOpenWs
		: window.location.host;
	config.showMessageCount = newConfig.showMessageCount
		? newConfig.showMessageCount
		: window.location.host;
	config.previewURL = newConfig.previewURL
		? newConfig.previewURL
		: window.location.host;
}
export default config;
