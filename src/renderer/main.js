import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'
import IviewUI from 'view-design'
import * as api from './api/request'
import { sync } from 'vuex-router-sync'
import './utils/log'
import './styles'

sync(store, router)
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(IviewUI, {
  transfer: true,
  modal: {
    maskClosable: false
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
