/*
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description:
 */
import { init } from './functions/encrypt';
import { resetConfig } from './config'; //全局环境变量
// Declare install function executed by Vue.use()
export function install(Vue, config, getGlobalConfig) {
	if (install.installed) return;
	install.installed = true;
	resetConfig(getGlobalConfig());
	if (config) {
		Vue.prototype.$jhEncrypt = init(config);
	}
}
// To allow use as module (npm/webpack/etc.) export component
export default {
	install,
};
