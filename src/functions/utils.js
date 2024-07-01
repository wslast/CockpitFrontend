/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:
 */
//防抖
function debounce(func, delay, immediate) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        if (immediate) {
            let doNow = !timer;
            timer = setTimeout(function() {
                timer = null;
            }, delay);
            if (doNow) {
                func.apply(context, args);
            }
        } else {
            timer = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        }
    };
}
//节流
function throttle(func, delay) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    };
}

//将对象中数字类型转string
function resetNumberToString(data) {
    if (!data) {
        return {};
    }
    if (Object.prototype.toString.call(data) === '[object Object]') {
        for (let key in data) {
            if (
                Object.prototype.toString.call(data[key]) === '[object Number]'
            ) {
                data[key] = data[key].toString();
            } else {
                this.resetNumberToString(data[key]);
            }
        }
    } else if (Object.prototype.toString.call(data) === '[object Array]') {
        for (let iterator of data) {
            if (
                Object.prototype.toString.call(iterator) === '[object Object]'
            ) {
                this.resetNumberToString(iterator);
            }
        }
    }
    return data;
}

//保留小数点位的0
function setNumberZero(value, size) {
    if (typeof value === 'number') {
        return value.toFixed(size);
    } else {
        return null;
    }
}

function padDate(va) {
    va = va < 10 ? '0' + va : va;
    return va;
}
function changeInput(va) {
    if (!va) {
        return;
    }
    var obj = document.getElementsByTagName(va);
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            if (
                obj[i].getAttribute('type') == 'text' &&
                !obj[i].getAttribute('placeholder')
            ) {
                obj[i].setAttribute('placeholder', '请输入');
            }
        }
    }
    return true;
}

function formatDate(date, format) {
    if (date == null || date == '') {
        return;
    } else {
        var date1 = new Date(date);
        let h =
            date1.getHours() < 10 ? '0' + date1.getHours() : date1.getHours();
        let m =
            date1.getMinutes() < 10
                ? '0' + date1.getMinutes()
                : date1.getMinutes();
        let s =
            date1.getSeconds() < 10
                ? '0' + date1.getSeconds()
                : date1.getSeconds();
        if (format == 'yyyy-MM-dd' || format == 'yyyy-mm-dd') {
            return (
                date1.getFullYear() +
                '-' +
                this.padDate(date1.getMonth() + 1) +
                '-' +
                this.padDate(date1.getDate())
            );
        }
        if (format == 'yyyymmdd' || format == 'yyyyMMdd') {
            return (
                date1.getFullYear() +
                this.padDate(date1.getMonth() + 1) +
                this.padDate(date1.getDate())
            );
        }
        if (format == 'yyyymm' || format == 'yyyyMM') {
            return date1.getFullYear() + this.padDate(date1.getMonth() + 1);
        }
        if (
            format == 'yyyy-MM-dd HH:mm:ss' ||
            format == 'yyyy-mm-dd hh:mm:ss'
        ) {
            return (
                date1.getFullYear() +
                '-' +
                this.padDate(date1.getMonth() + 1) +
                '-' +
                this.padDate(date1.getDate()) +
                ' ' +
                h +
                ':' +
                m +
                ':' +
                s
            );
        }
        if (format == 'yyyyMMddHHmmss' || format == 'yyyy-mm-dd hh:mm:ss') {
            return (
                date1.getFullYear() +
                '' +
                this.padDate(date1.getMonth() + 1) +
                '' +
                this.padDate(date1.getDate()) +
                '' +
                h +
                '' +
                m +
                '' +
                s
            );
        }
        return date1;
    }
}

function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
}

function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
}

function isNumber(value) {
    return Object.prototype.toString.call(value) === '[object Number]';
}
//打开pageoffice
function openWindowModeless(url, windowStyle, callback) {
    window.callback = callback;
    POBrowser.openWindowModeless(url, windowStyle, 'POBrowser');
}
//相对窗口给长度
function getFontSize(val) {
    var oWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
    return Number(val.toFixed(0));
    // return Number(((val * oWidth) / 1920).toFixed(0));
}
export default {
    install(Vue, options) {
        Vue.prototype.throttle = throttle;
        Vue.prototype.debounce = debounce;
        Vue.prototype.resetNumberToString = resetNumberToString;
        Vue.prototype.setNumberZero = setNumberZero;
        Vue.prototype.padDate = padDate;
        Vue.prototype.changeInput = changeInput;
        Vue.prototype.formatDate = formatDate;
        Vue.prototype.isObject = isObject;
        Vue.prototype.isArray = isArray;
        Vue.prototype.isString = isString;
        Vue.prototype.isBoolean = isBoolean;
        Vue.prototype.isNumber = isNumber;
        Vue.prototype.openWindowModeless = openWindowModeless;
        Vue.prototype.getFontSize = getFontSize;
    },
    isArray,
};
