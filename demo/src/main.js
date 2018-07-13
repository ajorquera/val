import Vue from 'vue'
import VueVal from '../../plugins/vue-val-plugin'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueVal)

new Vue({
  render: h => h(App)
}).$mount('#app')
