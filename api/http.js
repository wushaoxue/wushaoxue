// 导入axios
import axios from 'axios'
// 设置基地址
const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})
// 暴露出去
export default http;

// 封装login 请求
export const login = ({ username, password }) => {
    return http.post("login", {
        username,
        password,
    })
}

// 请求拦截
http.interceptors.request.use(function (config) {

    // 发送请求前调用（发送请求做一些事）
    // 把你所有的请求拦下来
    // 拦下来给你加一个请求头，请求头的内容是token
    config.headers.Authorization = window.localStorage.getItem('token')
    // window.console.log('我调用了', config)
    return config;

}, function (error) {

    //发生错误的回调函数
    return Promise.reject(error);
});

//  封装 menus 请求
export const menus = () => {
    return http.get('menus', {
        // 要拿到token

    })
}


// 用户列表请求
export const users = ({ query, pagenum, pagesize }) => {
        return http.get('users',{
            // 如果 要求 提要的参数不是在网址 那第二个参数就要写params里

           params:{
            query, 
            pagenum, 
            pagesize,
           }
        })
}
// 增加用户请求
export const  adduser =({username,password,email,mobile})=>{
    return http.post('users',{
        username,
        password,
        email,
        mobile,
    })
} 