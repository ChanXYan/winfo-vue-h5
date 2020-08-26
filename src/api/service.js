/* eslint-disable*/
import axios from 'axios'
import { baseUrl } from './config'

let alertInstance = null

axios.defaults.timeout = 5000 //普遍接口超时时间 设置为10s

axios.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = window.ls.get('token')
    //   ? 'Bearer ' + window.ls.get('token')
    //   : ''


    if (config.headers['delToken']) {
      delete config.headers['Authorization']
      delete config.headers['delToken']
    }

    if ((config.method === 'get' || config.method === 'delete') && config.loading) {


      window.loading && window.loading()
    }

    if (config.method === 'post') {
      config[0] && window.loading && window.loading()
    }

    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
    console.log(1, response)
    window.hideToast && window.hideToast()
    let msg = ''
    switch (response.data.code) {
      case 0:
        // msg = '没有查询到数据'
        break
      case 500:
        msg = '服务器异常'
        break
      case 200:
        //操作成功
        break
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '权限不足'
        break
      case 404:
        msg = '参数检验失败'

      default:
    }

    return response.data
  },
  (error) => {
    console.log(999, error, error.response, error.message,)
    // debugger
    window.hideToast && window.hideToast()
    let res = {
      code: 500,
      msg: '服务器异常'
    }
    if (error.message === `timeout of ${axios.defaults.timeout}ms exceeded`) {
      res = {
        code: 500,
        msg: '请求超时，请稍后再试！'
      }
      return res
    }

    if (error.response && error.response.status) {
      let status = error.response.status
      switch (status) {
        case 401:
          break
        default:
      }
    }
    return res
  }
)

//上传服务
let instance = axios.create({
  baseUrl,
  timeout: 60000,
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=----WebKitFormBoundaryqymdQPknOGjgKCJp'
  }
})

instance.interceptors.request.use(
  (config) => {

    window.loading && window.loading()
    return config
  },
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => {
    window.hideToast && window.hideToast()
    return response.data
  },
  (error) => {
    window.hideToast && window.hideToast()
    return {
      code: 500,
      msg: '请求超时'
    }
    Promise.reject(error)
  }
)

function toAuth (msg) {
  alertInstance = Alert(msg, '前往授权', [
    { text: '取消', onPress: () => alertInstance.close(), style: 'default' },
    { text: '确定', onPress: () => toWeapp() }
  ])
}

function toWeapp () {
  // 清除首页跳转的传参
  // debugger

  window.wx && window.wx.miniProgram.navigateTo({ url: '/pages/login/login' })
}

export default {
  get (url, params = {}, headers = {}, loading = true, config = {}) {
    return axios.get(url, {
      params,
      headers,
      loading,
      ...config
    })
  },
  post (url, params = {}, headers = {}, loading = true) {
    return axios.post(url, params, loading)
  },
  delete (url, params = {}, headers = {}, loading = true) {
    return axios.delete(url, {
      params,
      headers,
      loading,
    })
  },
  filePost (url, params = {}, headers = {}, loading = true) {
    return instance.post(url, params)
  }
}
