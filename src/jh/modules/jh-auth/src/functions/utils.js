/*
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description:
 */
const zxcvbn = require('zxcvbn');
import config from '../config';
function deleteChildren(list) {
	for (const iterator of list) {
		if (iterator.children) {
			if (iterator.children.length > 0) {
				this.deleteChildren(iterator.children);
			} else {
				delete iterator.children;
			}
		}
	}
	return list;
}

/**
 * @description: 
  1 .非常容易猜测:保护免受受限的在线攻击。
  2 .不受限制的网络攻击。
  3 .安全不可猜测:从离线慢散列场景中适度保护。
  4 .非常难以猜测:强大的离线慢散列保护。
 * @param {*} pwd
 * @return {*}
 * @author: Junchi Zhao
 */
function validPwd(pwd) {
	let level = 1;
	if (config.pwdLevel <= 'NORMAL') {
		level = 1;
	} else if (config.pwdLevel === 'MIDDLE') {
		level = 2;
	} else if (config.pwdLevel >= 'COMPLEX') {
		level = 3;
	}
	console.log(zxcvbn(pwd).score);
	return zxcvbn(pwd).score < level;
}
export default {
	install(Vue, options) {
		Vue.prototype.deleteChildren = deleteChildren;
		Vue.prototype.$validPwd = validPwd;
	},
};
