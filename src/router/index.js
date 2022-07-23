import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import His from '@/views/His.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/his',
    name: 'His',
    component: His
  }
]

const router = new VueRouter({
  routes
})

export default router
