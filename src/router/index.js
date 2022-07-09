import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Load from '@/views/Load.vue'
import Sushida from '@/views/Sushida.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sushida',
    name: 'Sushida',
    component: Sushida
  },
  {
    path: '/load',
    name: 'Load',
    component: Load
  }
]

const router = new VueRouter({
  routes
})

export default router
