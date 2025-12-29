import { createRouter, createWebHistory } from "vue-router";
// Import your Todos component
import HomeView from "@/views/HomeView.vue";
import UserView from "@/views/UserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/detailTodos",
      name: "detail",
      component: UserView,
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
