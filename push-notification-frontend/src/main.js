import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.prototype.$axios = axios
Vue.prototype.$config = {
  host: 'https://us-central1-helpful-weft-224923.cloudfunctions.net/pushNotifier'
}
