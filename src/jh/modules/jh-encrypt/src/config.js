/*
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description:
 */

const setConfig = (e) => {
	return e;
};
const config = setConfig({
	pwdEncryptType: 'SM3',
	transferEncryptType: 'SM4',
});
export function resetConfig(e) {
	const newConfig = setConfig(e);
	config.pwdEncryptType = newConfig.pwdEncryptType
		? newConfig.pwdEncryptType
		: 'SM3';
	config.transferEncryptType = newConfig.transferEncryptType
		? newConfig.transferEncryptType
		: 'SM4';
}
export default config;
