import Vue from 'vue'
import 'vant/lib/button/style'
import {
  Button, Toast, Dialog, Lazyload, Search, Calendar,
  Cell, CellGroup, Collapse, CollapseItem
} from 'vant'

Vue.use(Button)
  .use(Toast)
  .use(Dialog)
  .use(Search)
  .use(Calendar)
  .use(Cell)
  .use(CellGroup)
  .use(Collapse)
  .use(CollapseItem)
  .use(Lazyload, {
    lazyComponent: true
  })

// 将所有 loading Toast 设置为背景不可点击
Toast.setDefaultOptions('loading', { forbidClick: true })

/**
 * 显示toast
 * @param {*} msg
 * @param {*} status
 * @param {*} duration
 * @param {*} icon
 */
// duration = 0 持续展示
Vue.prototype.toast = (msg = '', status = '', duration = 2000, icon = '') => {
  switch (status) {
    case 'loading':
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '倒计时 3 秒'
      })
      break
    case 'fail':
      Toast.success({
        message: msg,
        duration
      })
      break
    case 'success':
      Toast.success({
        message: msg,
        duration
      })
      break

    default:
      Toast({
        message: msg,
        icon: icon,
        duration
      })
  }
}

/**
 * 显示loading
 * @param {*}} duration
 * @param {*} forbidClick
 */
Vue.prototype.loading = window.loading = (duration = 0, forbidClick = false) => {
  Toast.loading({
    duration: duration, // 持续展示 toast
    forbidClick,
    message: '加载中...'
  })
}

/**
 * 隐藏toast
 */
Vue.prototype.hideToast = window.hideToast = () => {
  Toast.clear()
}
