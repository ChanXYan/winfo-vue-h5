/**
 * localStorage 过期时间设置
 * 参考 https://www.cnblogs.com/ricolee/p/localstorage-expiretime.html
 *
 * 使用方法
 * global.ls = new Storage()
 * let {ls} = global
 * ls.set(key, value, ms) // 过期时间为毫秒单位   1000 * 3600 * 24（1天）//对象数组不需要JSON转换
 * ls.get(key) //对象数组不需要JSON转换
 *                                                               ;
 */
export default class Storage {
  constructor(props) {
    this.props = props || {}
    this.source = this.props.source || window.localStorage
    this.initRun()
  }
  initRun () {
    /*
     * set 存储方法
     * @ param {String}     key 键
     * @ param {String}     value 值，存储的值可能是数组/对象，不能直接存储，需要转换 JSON.stringify
     * @ param {String}     expired 过期时间，以分钟为单位
     */
    const reg = new RegExp('__expires__')
    let data = this.source
    let list = Object.keys(data)
    if (list.length > 0) {
      list.map((key) => {
        if (!reg.test(key)) {
          let now = Date.now()
          let expires = data[`${key}__expires__`] || Date.now + 1
          if (now >= expires) {
            this.remove(key)
          }
        }
        return key
      })
    }
  }

  // 默认12小时缓存
  set (key, value, expired = 1000 * 3600 * 12) {
    /*
     * set 存储方法
     * @ param {String}     key 键
     * @ param {String}     value 值，
     * @ param {String}     expired 过期时间，以毫秒为单位，非必须
     */
    let source = this.source
    source[key] = JSON.stringify(value)
    if (expired) {
      source[`${key}__expires__`] = Date.now() + expired
    }
    return value
  }

  get (key) {
    /*
     * get 获取方法
     * @ param {String}     key 键
     * @ param {String}     expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
     */
    const source = this.source,
      expired = source[`${key}__expires__`] || Date.now + 1
    const now = Date.now()

    if (now >= expired) {
      this.remove(key)
      return
    }
    const value = source[key] ? JSON.parse(source[key]) : source[key]
    return value
  }

  remove (key) {
    const data = this.source,
      value = data[key]
    delete data[key]
    delete data[`${key}__expires__`]
    return value
  }
}
