import service from '../service'
import { msaUrl, preUrl } from '../config'

export default {
  // 获取机构详情
  queryServComp (data) {
    return service.msaGet(
      `${msaUrl}queryServComp.action`, data)
  },
  // 服务/外派机构查询
  getServiceOrg (data) {
    return service.get(`${preUrl}basics-program/maritime/getServiceOrg`, data)
  },
}
