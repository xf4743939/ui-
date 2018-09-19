/* 删除左右两端的空格 */
function trim(str) {
    //去除空格制表符
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

/* 
@ es6 数组去重
*/
function repeat(arr) {
    let set = new Set();
    let arr = Array.from(new Set(arr))
    return arr;
}

/*
  js 去重 
 */
function unique(arr) {
    let res = [];
    let json = {};
    for (let i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1
        }
    }
    return res
}

/*
 * 判断是否是微信浏览器
 * @return （boolen） 
 */
function isWeoXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    }
    return false;
}

/*
 * 获取时间格式 月天时分
 */
function getTimeFormat(time) {
    let date = new Date(parseInt(time) * 1000);
    let month, day, hour, min;
    parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
    date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
    date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
    date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
    return [month, day].join('-') + '  ' + hour + ':' + min
}

/* 
  获取时间格式 如 2018-08-28
*/
function getTimeFormatYMD(time) {
    var date = new Date(parseInt(time) * 1000);
    var year, month, day;
    year = date.getFullYear();
    parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
    date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
    return [year, month, day].join('-')
}
/* 
  获取时间格式 如 2018-09-21 15:12:30
*/
function getTimeFormatAll(time) {
    var date = new Date(parseInt(time) * 1000);
    var year, month, day, hour, min, second;
    year = date.getFullYear();
    parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
    date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
    date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
    date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
    date.getSeconds() < 10 ? second = '0' + date.getSeconds() : second = date.getSeconds();

    return [year, month, day].join('-') + '  ' + hour + ':' + min + ':' + second
}

/* 
  验证身份证号码
  @param el 号码输入input
  @returns (boolean)
*/
function checkCardNo(value) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value)
}

/* 
  浏览器的判断
*/
function parseUA() {
    var u = navigator.userAgent;
    var u2 = navigator.userAgent.toLowerCase();
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        //IE内核
        presto: u.indexOf('Presto') > -1,
        //opera内核
        webKit: u.indexOf('AppleWebKit') > -1,
        //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1,
        //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,
        //是否iPad
        webApp: u.indexOf('Safari') == -1,
        //是否web应该程序，没有头部与底部
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) == "micromessenger",
        ali: u.indexOf('AliApp') > -1,
    };
}
var ua = parseUA();
if (!ua.mobile) {
    location.href = './pc.html';
}



/*
rem 移动端适配 
 */
var rem = {
    baseRem: 40,
    // 基准字号，按照iphone6应该为20，此处扩大2倍，便于计算
    baseWidth: 750,
    // 基准尺寸宽，此处是按照ihpone6的尺寸
    rootEle: document.getElementsByTagName("html")[0],
    initHandle: function () {
        this.setRemHandle();
        this.resizeHandle();
    },
    setRemHandle: function () {
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        this.rootEle.style.fontSize = clientWidth * this.baseRem / this.baseWidth + "px";
    },
    resizeHandle: function () {
        var that = this;
        window.addEventListener("resize",
            function () {
                setTimeout(function () {
                        that.setRemHandle();
                    },
                    300);
            });
    }
};
rem.initHandle();