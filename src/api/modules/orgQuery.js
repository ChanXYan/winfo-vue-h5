import service from '../service'
import { msaUrl } from '../config'

export default {
  // 获取机构详情
  queryServComp (data) {
    return service.msaGet(
      `${msaUrl}queryServComp.action`, data)
  },

}
