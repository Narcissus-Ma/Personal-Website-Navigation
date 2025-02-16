import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Index from './views/index.vue'
import About from './views/about.vue'

import './assets/css/fonts/linecons/css/linecons.css'
import './assets/css/fonts/fontawesome/css/font-awesome.min.css'
import './assets/css/bootstrap.css'
import './assets/css/xenon-core.css'
import './assets/css/xenon-components.css'
import './assets/css/xenon-skins.css'
import './assets/css/nav.css'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
  { path: '/manage', component: () => import('./views/manage.vue')}
]

const router = new VueRouter({
  routes,
  mode: 'hash', // 避免服务器端不兼容
  base: process.env.BASE_URL // 默认路径设置
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
