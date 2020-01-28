import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import ExSelect from '@/components/ExSelect'

Vue.config.productionTip = false
Vue.component(ExSelect.name, ExSelect)

new Vue({
  render: h => h(App),
}).$mount('#app')
