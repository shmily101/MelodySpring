import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/reset.css'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
