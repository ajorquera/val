import 'vuetify/dist/vuetify.min.css';
import '@babel/polyfill';

import Vue from 'vue';
import VueVal from '../../plugins/vue-val-plugin';
import App from './App.vue';

import {
  Vuetify,
  VApp,
  VGrid,
  VTextField,
  VRadioGroup,
  VSlider
} from 'vuetify';

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VTextField,
    VRadioGroup,
    VSlider
  }
});

Vue.config.productionTip = false;
Vue.use(VueVal);

new Vue({
  render: h => h(App)
}).$mount('#app');
