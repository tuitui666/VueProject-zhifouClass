import axios from "axios";
import { ElMessage } from "element-plus";
import { ca } from "element-plus/es/locale";
// 创建axios实例
const instance = axios.create({
    // 接口
    baseURL:'/api',
    // 超时时间
    timeout: 50000,

});
// 亲求拦截
instance.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token')
        if(token){
            config.jeaders['token'] = token
        }
        return config;
    },
    error => {

    }
);

// 相应拦截
instance.interceptors.request.use(
    res => {
        return res;
    },
    error => {
        if(error && error.response){
            const status = error.response.status
            switch(status){
                case 400:
                case 401:
                case 403:
                case 404:
                case 408:    
                    ElMessage.error("网络超时");
                    break;
                case 505:
                    ElMessage.error("HTTP版本不支持该请求");
                    break;
                default:
                    ElMessage.error("请求失败");
            }
        }else{
            if(JSON.stringify(error).includes("timeout")) {
                ElMessage.error("服务器响应超时，请刷新页面");
            }
            ElMessage.error("连接服务器失败");
        }
        return Promise.reject(error);
    }
);
// 导出axios实例
export default instance;