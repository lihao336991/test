let axiosConfig = {
    // baseURL: 'http://wzbs-api.qeebu.cn',
    baseURL: '/',
    timeout: 6000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    maxContentLength: 5000
}
if (location.hostname == 'localhost') {
    axiosConfig.baseURL = 'http://localhost:3000';
} else {
    axiosConfig.baseURL = 'http://39.107.233.105:3000';
}
export default axiosConfig;