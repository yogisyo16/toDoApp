import { createRouter, createWebHistory } from 'vue-router'
// Import your Todos component
import Todos from '../components/Todos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Tell the router to show the Todos component at this path
      component: Todos
    }
    // You can add more routes here later
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router