const env = process.env.NODE_ENV // 'development' production

const apiUrlObj = {
  development: 'https://shjgfw.sz.msa.gov.cn/sz',
  production: 'https://shjgfw.sz.msa.gov.cn/sz'
}

const baseUrl = apiUrlObj[env]

const downloadUrl =
  'https://shjgfw.sz.msa.gov.cn/sz/service-ftp/ftp/downLoad?fileUuid='
const viewUrl = 'https://shjgfw.sz.msa.gov.cn/sz/service-ftp/ftp/view?fileUuid='

export { baseUrl, downloadUrl, viewUrl }
