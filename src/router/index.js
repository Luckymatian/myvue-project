import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import '@/assets/css/index.css'
import  Login  from '@/components/login/login.vue'
import  Home from  '@/components/pages/home.vue'
import  Users from  '@/components/pages/users/users.vue'
import  CeShi from '@/components/ceshi/ceshi.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ceshi',
      name: 'ceshi',
      component: CeShi
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      children:[
        {
          path:'/users',
          component:Users,
        }
      ]
        
    }
  ]
})
