import service from '../service'
import { preUrl } from '../config'


export default {
  // fsc
  flagStateControlQuery (data) {
    return service.get(
      `${preUrl}sz-mini-program/nationReport/flagStateControlQuery`, data
    )
  },
  // 现场监督
  siteSupervisionQuery (data) {
    return service.get(`${preUrl}sz-mini-program/nationReport/siteSupervisionQuery`, data)
  },
  // 历史记录
  searchHistory () {
    return service.get(`${preUrl}sz-mini-program/nationReport/searchHistory`)
  },
  // 删除历史记录
  deleteHistory () {
    return service.delete(`${preUrl}sz-mini-program/report/deleteHistory`)
  },
  // test () {
  //   return service.get(`${preUrl}/yyy/users`)
  // }
}
