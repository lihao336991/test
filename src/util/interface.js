import Vue from 'vue'
import axios from 'axios'
import AxiosConfig from './axios-config'
import Element from 'element-ui'
import qs from 'qs'
import router from '@/router'

Vue.use(Element)

var AxiosSND = axios.create(AxiosConfig)
AxiosSND.defaults.withCredentials = true;
Object.defineProperties(Vue.prototype, {
    axios: {
        get() {
            return AxiosSND
        }
    },
    $http: {
        get() {
            return AxiosSND
        }
    }
})

export default {
    //接口配置
    //用户
    task: {
        list: '/task',
    },
    users: {
        list: "/users"
    },
    test: {
        list: "/test"
    },
    //方法封装
    //获得数据
    getData: function(type, url, params) {
        var that = this
        if (!params) {
            params = {};
        }
        let axios;
        if ('get' == type) {
            axios = AxiosSND.get(url, {
                params: params
            })
        } else if ('post' == type) {
            axios = AxiosSND.post(url, qs.stringify(params));
        }
        let promise = new Promise((resolve, reject) => {
            axios.then(response => {
                if (200 == response.status) {
                    resolve(response);
                } else if (403 == response.status) {
                    Vue.prototype.$message.error('未知错误')
                } else if (500 == response.status) {
                    Vue.prototype.$message.error('未知错误')
                } else {
                    Vue.prototype.$message.error('未知错误')
                }
            }).catch((error) => {
                if (error.response.status == 401) {
                    Vue.prototype.$message.error('登录超时，请重新登录！');
                    router.push('/')
                        // Vue.prototype.axios.get(that.user.check).then(res => {
                        //     if (res.data.code == 200) {
                        //         console.log('已登录')
                        //     } else {
                        //         Vue.prototype.$message.error('登录异常，请重新登录！');
                        //         router.push('/login')
                        //     }
                        // }).catch((error) => {
                        //     if (error.response.status == 401) {
                        //         Vue.prototype.$message.error('登录异常，请重新登录！');
                        //         router.push('/login')
                        //     }
                        // })
                } else if (error.request) {
                    Vue.prototype.$message.error('网络异常，请检查您的网络并刷新重试！');
                } else {
                    Vue.prototype.$message.error('未知错误，请刷新重试！');
                }
            })
        })
        return promise;
    },
    //时间戳，在需要时间转换的时候可以直接调用
    getTime: function(time) {
        var newDate = new Date();
        newDate.setTime(time * 1000);
        Date.prototype.format = function(format) {
            var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes()
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
            }
            return format;
        }
        return newDate.format('yyyy-MM-dd hh:mm')
    },
    //时间戳，在需要时间转换的时候可以直接调用 'yyyy-MM-dd hh:mm:ss'
    getSeconds: function(time) {
        var newDate = new Date();
        newDate.setTime(time * 1000);
        Date.prototype.format = function(format) {
            var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds()
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
            }
            return format;
        }
        return newDate.format('yyyy-MM-dd hh:mm:ss')
    },
    getDateTime: function(time, formatType) {
        var newDate = new Date();
        newDate.setTime(time * 1000);
        Date.prototype.format = function(format) {
            var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes()
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
            }
            return format;
        }
        let formatStr = formatType ? formatType : 'yyyy-MM-dd';
        return newDate.format(formatStr);
    },
    GetQueryUrl: (name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return "";
        }
    },
    setCookie: function(name, val, days) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + days)
        document.cookie = name + "=" + escape(val) + ((days == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    getCookie: function(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    deleteRepetionChar: function(arr) {
        //先判断输入进来的是数组对象还是字符串
        if (typeof arr == "object") {
            var arr = arr;
        } else if (typeof arr == "string") {
            //字符串转为数组
            var arr = arr.split(",")
        }
        //存放不相同的数据
        var box = []; //存放去重数据
        var thisArr; //当前的值arr[i]
        //遍历数组
        for (var i = 0; i < arr.length; i++) {
            thisArr = arr[i]
                //定义一个旗子，检查是不是有重复的字符
            var flag = true;
            //遍历存放数据盒子，检查是否等于当前元素
            for (var j = 0; j < box.length; j++) {
                //如果值存在
                if (box[j] == thisArr) {
                    flag = false;
                    break; //结束for循环
                }
            }
            if (flag == false) {
                //continue返回执行函数而不压入数组
                continue;
            }
            box.push(thisArr);
        }
        return box
    },
    cloneObj: function(obj) {
        let str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for (let i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    },

}