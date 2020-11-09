
import Axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import router from '@/router'

import store from '@/store'
import { getToken } from 'network/cookies';
const request = Axios.create({
  // baseURL: 'http://49.232.1.162:9090',
  baseURL: 'http://127.0.0.1:9090',
  timeout: 50000
})

request.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    return config;
  },
  error => {
    return error
  }
)
request.interceptors.response.use(
  response => {
    // console.log(response);
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.msg
      })
      return Promise.reject("error")
    }
    return response.data;
  },
  error => {
    let code = 0
    try {
      code = error.response.status

      console.log(code);
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 5000
        })
        return Promise.reject(error)
      }
    }
    if (code) {
      if (code === 401) {
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // store.dispatch('LogOut').then(() => {
          //   location.reload() // 为了重新实例化vue-router对象 避免bug
          // })
          router.push({ path: '/login' })
        })
      } else if (code === 403) {
        router.push({ path: '/401' })
      } else {
        const errorMsg = error.response.data.message
        console.log(errorMsg);
        if (errorMsg !== undefined) {
          Notification.error({
            title: errorMsg,
            duration: 5000
          })
        }
      }
    } else {
      Notification.error({
        title: '接口请求失败',
        duration: 5000
      })
    }
    return Promise.reject(error)
  }
)


export default request

// export function request(config) {
//   const instance = Axios.create({
//     baseURL: 'http://127.0.0.1:9090',
//     timeout: 5000
//   })
//   return instance(config);

// }