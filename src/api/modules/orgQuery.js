import service from '../service'
import { msaUrl, preUrl } from '../config'

export default {
  // 获取机构详情
  queryServComp (data) {
    return service.msaGet(
      `${msaUrl}queryServComp.action`, data)
  },
  // 机构查询-获取字典
  getOrgDict () {
    return service.get(`${preUrl}rest/basics-program/maritime/getOrgDict`)
  },
  // 服务/外派机构查询
  getServiceOrg (data) {
    return service.get(`${preUrl}rest/basics-program/maritime/getServiceOrg`, data)
  },
  // 体检机构查询
  getExaminationData (data) {
    return service.get(`${preUrl}rest/basics-program/maritime/getExaminationData`, data)
  },
  // 培训机构查询
  getTrain (data) {
    return service.get(`${preUrl}rest/basics-program/maritime/getTrain`, data)
  },
}
