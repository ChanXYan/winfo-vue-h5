import Vue from 'vue'
import 'vant/lib/button/style'
import {
  Button, Toast, Dialog, Lazyload, Search, Calendar,
  Cell, CellGroup, Collapse, CollapseItem, Checkbox, CheckboxGroup, Picker, Popup, List,
  PullRefresh, DropdownMenu, DropdownItem, Tab, Tabs, Divider, RadioGroup, Radio,
  Field, Overlay, Icon
} from 'vant'

Vue.use(Button)
  .use(Icon)
  .use(Toast)
  .use(Dialog)
  .use(Search)
  .use(Calendar)
  .use(Cell)
  .use(List)
  .use(CellGroup)
  .use(Collapse)
  .use(CollapseItem)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Picker)
  .use(Popup)
  .use(PullRefresh)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Tab)
  .use(Tabs)
  .use(Divider)
  .use(Field)
  .use(Overlay)
  .use(Radio)
  .use(RadioGroup)
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
      msg && Toast.success({
        message: msg,
        duration
      })
      break
    case 'success':
      msg && Toast.success({
        message: msg,
        duration
      })
      break

    default:
      msg && Toast({
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
Vue.prototype.$loading = window.$loading = (duration = 0, forbidClick = false) => {
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
