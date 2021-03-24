import axios from 'axios';

const instanceConfig = {
    baseURL: '',
    withCredentials: true,
};
if (typeof ( window ) === 'undefined') {
    instanceConfig.headers = {Connection: 'keep-alive'};
}

const instance = axios.create(instanceConfig);
instance.defaults.withCredentials = true;
let cancel;
const pending = {};

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 发起请求时，取消掉当前正在进行的相同请求
        if (pending[config.url]) {
            pending[config.url]('操作取消');
            pending[config.url] = cancel;
        } else {
            pending[config.url] = cancel;
        }
        // 转变数据格式
        if (config.headers['Content-Type'] && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.transformRequest = (data) => {
                const str = [];
                Object.keys(data).forEach(key => str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`));
                return str.join('&');
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
// 响应拦截器即异常处理
instance.interceptors.response.use((res) => {
    return res.data;
});
export default instance;

