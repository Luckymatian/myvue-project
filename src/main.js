// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from '../node_modules/element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from '../node_modules/axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 统一设置请求路径
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
// 挂在到vue原型中
Vue.prototype.$http=axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
