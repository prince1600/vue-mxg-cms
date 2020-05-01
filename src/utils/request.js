import axios from 'axios'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
//封装axios，实现附加功能
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
})
// 添加拦截器
const loading = {
  loadingInstance: null,
  open: function(){
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service(
        {
          target: '.main',
          background: 'rgba(0,0,0,0.1)'
        }
      )
    }
  },
  close: function(){
    this.loadingInstance.close()
    this.loadingInstance = null
  }
}
//请求拦截器
request.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    loading.open()
    return config;
  }, error => {
    // 对请求错误做些什么
    loading.close()
    return Promise.reject(error);
  });
//响应拦截器
request.interceptors.response.use(response => {
    // 对响应数据做点什么
    loading.close()
    if (response.data.code !== 2000) {
      Message.warning(response.data.message || '响应异常')
    }
    return response;
  }, error => {
    // 对响应错误做点什么
    Message.error('服务器异常')
    loading.close()
    return Promise.reject(error);
  });

// 导出自定义对象
export default request