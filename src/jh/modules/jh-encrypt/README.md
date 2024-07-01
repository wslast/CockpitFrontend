# 国密算法

## js文件引入

```

    <script src="./lib/jh-encrypt.js"></script>
    <script>
        var encrypt = jhEncrypt.init({
            SM4Key: "jhkj@123pass#678"
        })
        console.log(encrypt);
        console.log("账号传输加密：admin", encrypt.ctxToSM4("admin"));
        console.log("密码加密：123456", encrypt.ctxToSM3("123456"));
        console.log("密码加密后再次传输加密：123456", encrypt.ctxToSM4(encrypt.ctxToSM3("123456")));
    </script>
```

## npm方式引入

安装插件

```
npm install jh-encrypt  --save  --registry http://116.62.38.68:4873/
```

main.js中引入

```
import jhEncrypt from "jh-encrypt";
Vue.use(jhEncrypt, {
  SM4Key: "jhkj@123pass#678", //sm4加密密钥
  tripleDESKey: "jhkj@123pass#67801234567"
});
```

调用

```
//获取当前加密类型
console.log(this.$jhEncrypt.encryptType())
//传输加密
console.log(this.$jhEncrypt.transferInfoEncrypt('admin'))
//密码加密
console.log(this.$jhEncrypt.pwdInfoEncrypt('123456'))
//sm3加密
console.log(this.$jhEncrypt.ctxToSM3("123456"));
//md5加密
console.log(this.$jhEncrypt.ctxToMD5("123456"));
//sm4加解密
console.log(this.$jhEncrypt.ctxToSM4("admin"));
console.log(this.$jhEncrypt.ctxFromSM4(this.$jhEncrypt.ctxToSM4("admin")));
//3des加解密
console.log(this.$jhEncrypt.ctxTo3DES("admin"));
console.log(this.$jhEncrypt.ctxFrom3DES(this.$jhEncrypt.ctxTo3DES("admin")));
```

|  版本   | 说明  | 对应后端版本 |
|  ---  | ---  | --- |
| 1.10.0  | 1.国密SM3 SM4 | 1.10.0 |
| 1.10.1  | 1.lib文件兼容ie8 | 1.10.0 |
| 1.10.2  | 1.lib文件兼容ie8 | 1.10.0 |
| 111.0.0  | 1.增加3des传输加密方式 2.调整代码结构 | 1.11.5 |
| 111.0.1  | 1.加密类型直接从主项目获取 | 1.11.5 |
