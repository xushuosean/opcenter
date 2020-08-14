import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@assets/scss/index.scss'
import { appContext } from '@/config/service.config'
import registerComponents from '@/packages/index.js'
import enumPlugin from '@plugins/enum-plugin.js'

Vue.use(enumPlugin)
Vue.prototype.$appContext = appContext
Vue.use(ElementUI)
Vue.config.productionTip = false
// 注册全局组件
registerComponents(Vue)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
