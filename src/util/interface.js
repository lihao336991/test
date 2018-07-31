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
                    Vue.prototype.axios.get(that.user.check).then(res => {
                        if (res.data.code == 200) {
                            console.log('已登录')
                        } else {
                            Vue.prototype.$message.error('登录异常，请重新登录')
                            router.push('/login')
                        }
                    }).catch((error) => {
                        if (error.response.status == 401) {
                            Vue.prototype.$message.error('登录异常，请重新登录')
                            router.push('/login')
                        }
                    })
                } else if (error.request.status == 422) {
                    Vue.prototype.$message.error('请将所需参数填写完整');
                } else {
                    Vue.prototype.$message.error('未知错误，请刷新重试');
                }
            })
        })
        return promise;
    }

}