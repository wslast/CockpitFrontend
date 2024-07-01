/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
const isCard =[
    
    {
        key: '身份证',
        value: '身份证',
        reg: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
    },
    { 
        key: "护照", 
        value: "护照",
        reg: ''
    },
    { 
        key: "其他", 
        value: "其他",
        reg: ''
    },
]
const isEmail = (rule,value,callback) => {
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!value) {
        callback();
    }else if(!regEmail.test(value)) {
        callback(new Error("格式错误"));
    }else {
        callback();
    }
}
const isPhone = (rule,value,callback) => {
    let regPhone =  /^(?:(?:\+|00)86)?1\d{10}$/
    if(!value) {
        callback();
    }else if(!regPhone.test(value)) {
        callback(new Error("格式错误"));
    }else {
        callback();
    }
}
const isUCcode = (rule,value,callback) => {
    let regUCcode = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/
    if(!value) {
        callback();
    }else if(!regUCcode.test(value)) {
        callback(new Error("格式错误"));
    }else {
        callback();
    }
}
const isPostCode = (rule,value,callback) => {
    let regPostCode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
    if(!value) {
        callback();
    }else if(!regPostCode.test(value)) {
        callback(new Error("格式错误"));
    }else {
        callback();
    }
}
export default {
    isCard: isCard,
    isEmail: isEmail,
    isPhone: isPhone,
    isUCcode: isUCcode,
    isPostCode: isPostCode
}