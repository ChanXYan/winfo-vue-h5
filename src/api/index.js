import global from './modules/global'
import checkReport from './modules/checkReport'
import securityInformation from './modules/securityInformation'

export default {
  ...global,
  ...checkReport,
  ...securityInformation
}
