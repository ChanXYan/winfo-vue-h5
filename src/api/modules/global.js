import service from '../service'
import { preUrl, msaUrl } from '../config'

export default {
  getUrlConfig (data) {
    return service.get(
      `${preUrl}sz/sz-mini-program/admin/createJsapiSignature`, data)
  },
  // 获取验证码图片
  getValidateImage () {
    return service.msaGet(
      `${preUrl}rest/basics-program/maritime/getValidateImage`, {}, {}, false, {
      'responseType': 'arraybuffer'
    })
  },
  // 获取初始化cookies信息
  scoreInit () {
    return service.msaGet(
      `${msaUrl}qry/scoreInit.action`, {}, {}, false)
  }

}
