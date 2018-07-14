import 'vuetify/src/stylus/app.styl'
import '@babel/polyfill';

import Vue from 'vue'
import VueVal from '../../plugins/vue-val-plugin'
import App from './App.vue'

import {
  Vuetify,
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    
  },
})

Vue.config.productionTip = false
Vue.use(VueVal)

new Vue({
  render: h => h(App)
}).$mount('#app')
