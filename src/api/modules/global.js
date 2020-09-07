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
      `${msaUrl}getValidateImage.action`, {}, {}, false, {
      'responseType': 'arraybuffer'
    })
  }

}
