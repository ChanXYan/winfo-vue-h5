/* eslint-disable*/
import axios from 'axios'
import { Toast } from 'vant'
import { baseUrl } from './config'

let alertInstance = null

axios.defaults.timeout = 10000 //普遍接口超时时间 设置为10s

axios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = window.ls.get('token')
      ? 'Bearer ' + window.ls.get('token')
      : ''


    if (config.headers['delToken']) {
      delete config.headers['Authorization']
      delete config.headers['delToken']
    }

    if ((config.method === 'get' || config.method === 'delete') && config.loading) {
      console.log(Toast)
      // loading()
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
    // debugger
    loaded()
    let res = {
      code: 500,
      msg: '服务器异常'
    }
    if (error.message === 'timeout of 10000ms exceeded') {
      res = {
        code: status,
        msg: '请求超时，请稍后再试！'
      }
    }

    if (error.response) {
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
    loading()
    return config
  },
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => {
    loaded()
    return response.data
  },
  (error) => {
    loaded()
    return {
      code: 500,
      msg: '请求超时'
    }
    Promise.reject(error)
  }
)
// 注： duration = 0 时，onClose 无效，toast 不会消失；隐藏 toast 需要手动调用 hide
function loading (msg = '加载中', duration = 0, onClose, mask = true) {
  Toast.loading(msg, duration, onClose, false)
}

function loaded () {
  Toast.hide()
}

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
