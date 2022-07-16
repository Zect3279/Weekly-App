import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Load from '@/views/Load.vue'
import Share from '@/views/Share.vue'
import GetLink from '@/views/GetLink.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },
  {
    path: '/get',
    name: 'GetLink',
    component: GetLink
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
