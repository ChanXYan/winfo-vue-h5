import service from '../service'
import { preUrl, msaUrl } from '../config'

export default {
  // 获取服务/外派机构详情
  queryServComp (data) {
    return service.msaGet(`${msaUrl}qry/queryServComp.action`, data)
  },
  // 获取培训机构详情
  trainProj (data) {
    return service.msaGet(`${msaUrl}qry/trainProj.action`, data)
  },
  // 获取服务/外派机构名称提示
  getDwTip (data) {
    return service.msaGet(`${msaUrl}pub/prompt!getDwTip.action`, data, {}, false)
  },
  // 机构查询-获取字典
  getOrgDict () {
    return service.get(`${preUrl}rest/basics-program/maritime/getOrgDict`)
  },
  // 服务/外派机构查询
  getServiceOrg (data) {
    return service.get(
      `${preUrl}rest/basics-program/maritime/getServiceOrg`,
      data
    )
  },
  // 体检机构查询
  getExaminationData (data) {
    return service.get(
      `${preUrl}rest/basics-program/maritime/getExaminationData`,
      data
    )
  },
  // 培训机构查询
  getTrain (data) {
    return service.get(`${preUrl}rest/basics-program/maritime/getTrain`, data)
  }
}
