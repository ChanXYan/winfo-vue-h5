import service from '../service'
import { preUrl } from '../config'


export default {
  // 航行公共 picker
  queryOrg (data) {
    return service.get(`${preUrl}sz/sz-mini-program/sailNotice/queryOrg`, data)
  },
  //航行分页
  sailNoticeQueryAll (data) {
    return service.get(`${preUrl}sz/sz-mini-program/sailNotice/queryAll`, data)
  },
  // 天气picker 
  queryWeatherArea () {
    return service.get(`${preUrl}sz/sz-mini-program/chinaSea/queryWeatherArea`)
  },
  // 天气分页
  queryWeather (data) {
    return service.get(`${preUrl}sz/sz-mini-program//chinaSea/queryWeather`, data)
  }
}
