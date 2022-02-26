import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Bingo from '@/views/Bingo.vue'
import LoadBingo from '@/views/LoadBingo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bingo',
    name: 'Bingo',
    component: Bingo
  },
  {
    path: '/load',
    name: 'LoadBingo',
    component: LoadBingo
  }
]

const router = new VueRouter({
  routes
})

export default router
