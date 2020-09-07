import global from './modules/global'
import checkReport from './modules/checkReport'
import securityInformation from './modules/securityInformation'
import orgQuery from './modules/orgQuery'
import qualifyQuery from './modules/qualifyQuery'

export default {
  ...global,
  ...checkReport,
  ...securityInformation,
  ...orgQuery,
  ...qualifyQuery
}
