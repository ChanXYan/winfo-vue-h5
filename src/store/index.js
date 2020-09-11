import Vue from "vue";
import Vuex from "vuex";

const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 根据相对路径替换正则即可
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[moduleName] = modulesFiles(modulePath).default
  return modules
}, {})


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...modules
  }
});
