const SM3 = require('sm-crypto').sm3;
const SM4 = require('sm-crypto').sm4;
const CryptoJS = require('crypto-js');
import pluginConfig from '../config';
const TRANSFER_ENCRYPT_TYPE_DES = 'DES';
const TRANSFER_ENCRYPT_TYPE_SM4 = 'SM4';
const PASSWORD_ENCRYPT_TYPE_MD5 = 'MD5';
const PASSWORD_ENCRYPT_TYPE_SM3 = 'SM3';
class jhEncrypt {
	constructor(config) {
		this.SM4Key = config.SM4Key;
		this.tripleDESKey = config.tripleDESKey;
		this.transferEncrypt = pluginConfig.transferEncryptType;
		this.passwordEncrypt = pluginConfig.pwdEncryptType;
	}
	encryptType() {
		let self = this;
		return {
			passwordEncrypt: self.passwordEncrypt,
			transferEncrypt: self.transferEncrypt,
		};
	}
	//传输加密
	transferInfoEncrypt(message) {
		let self = this;
		console.log(self.transferEncrypt);
		if (self.transferEncrypt === TRANSFER_ENCRYPT_TYPE_DES) {
			return self.ctxTo3DES(message);
		} else if (self.transferEncrypt === TRANSFER_ENCRYPT_TYPE_SM4) {
			return self.ctxToSM4(message);
		} else {
			return self.ctxToSM4(message);
		}
	}
	//密码加密
	pwdInfoEncrypt(message) {
		let self = this;
		console.log(self.passwordEncrypt);
		if (self.passwordEncrypt === PASSWORD_ENCRYPT_TYPE_SM3) {
			return self.ctxToSM3(message);
		} else if (self.passwordEncrypt === PASSWORD_ENCRYPT_TYPE_MD5) {
			return self.ctxToMD5(message);
		} else {
			return self.ctxToMD5(message);
		}
	}
	ctxTo3DES(message) {
		let self = this;
		return CryptoJS.format.Hex.stringify(
			CryptoJS.TripleDES.encrypt(
				message,
				CryptoJS.enc.Utf8.parse(self.tripleDESKey),
				{
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7,
				}
			)
		);
	}
	ctxFrom3DES(message) {
		let self = this;
		return CryptoJS.enc.Utf8.stringify(
			CryptoJS.TripleDES.decrypt(
				CryptoJS.format.Hex.parse(message),
				CryptoJS.enc.Utf8.parse(self.tripleDESKey),
				{
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7,
				}
			)
		);
	}
	ctxToMD5(message) {
		return CryptoJS.MD5(message).toString();
	}
	ctxToSM3(ctx) {
		let result = SM3(ctx);
		return result;
	}
	ctxToSM4(ctx, config) {
		let self = this;
		if (config) {
			return SM4.encrypt(ctx, self.str2hex(self.SM4Key), config);
		} else {
			return SM4.encrypt(ctx, self.str2hex(self.SM4Key));
		}
	}
	ctxFromSM4(ctx, config) {
		let self = this;
		if (config) {
			return SM4.decrypt(ctx, self.str2hex(self.SM4Key), config);
		} else {
			return SM4.decrypt(ctx, self.str2hex(self.SM4Key));
		}
	}
	str2hex(str) {
		if (str === '') {
			return '';
		}
		var arr = [];
		for (var i = 0; i < str.length; i++) {
			arr.push(str.charCodeAt(i).toString(16));
		}
		return arr.join('');
	}
}
export function init(config) {
	if (!config) {
		throw new Error('未设置必填参数');
	}
	return new jhEncrypt(config);
}
