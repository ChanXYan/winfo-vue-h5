import service from '../service'
import { preUrl } from '../config'

export default {
  getUrlConfig (data) {
    return service.get(
      `${preUrl}sz-mini-program/admin/createJsapiSignature`, data)
  },

}
