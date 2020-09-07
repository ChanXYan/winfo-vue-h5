import service from '../service'
import { preUrl, msaUrl } from '../config'

export default {
  getUrlConfig (data) {
    return service.get(
      `${preUrl}sz-mini-program/admin/createJsapiSignature`, data)
  },
  // 获取验证码图片
  getValidateImage () {
    return service.get(
      `${msaUrl}getValidateImage.action`, {}, {}, true, {
      'responseType': 'arraybuffer'
    })
  }

}
