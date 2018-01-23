import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import MainPage from '@/components/MainPage/index.vue'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    }
  ]
})
