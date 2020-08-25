import service from '../service'
import { baseUrl } from '../config'

export default {
  // fsc
  flagStateControlQuery (data) {
    return service.get(
      `${baseUrl}/sz-mini-program/nationReport/flagStateControlQuery`, data
    )
  },
  // 现场监督
  siteSupervisionQuery (data) {
    return service.get(`${baseUrl}/sz-mini-program/nationReport/siteSupervisionQuery`, data)
  },
  // 历史记录
  searchHistory () {
    console.log(777)
    return service.get(`/api/sz-mini-program/nationReport/searchHistory`)
  },
  // 删除历史记录
  deleteHistory () {
    return service.delete(`${baseUrl}/sz-mini-program/report/deleteHistory`)
  },
  test () {
    return service.get('http://192.168.1.192:2228/nav/getNavigationalElementSimpleList?typeId=253&typePid=14')
  }
}
