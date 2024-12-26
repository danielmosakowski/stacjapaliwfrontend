import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '../views/Students/View.vue'
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

import store from "@/store/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
  ],

  linkActiveClass: 'active',


});

router.beforeEach((to, from, next)=>{
  const isAuthenticated = store.getters.authStatus
  if (to.meta.requiresAuth && !isAuthenticated){
    next('/login')
  }
  else if ((to.name==='login' || to.name==='register') && isAuthenticated){
    next('/dashboard')
  }
  else {
    next()
  }
});


export default router
