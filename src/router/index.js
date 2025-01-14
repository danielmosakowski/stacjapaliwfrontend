import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/Check.vue'
import StudentView from '../views/Students/View.vue'
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Admin from "@/views/Admin.vue";
import Check from "@/views/Check.vue";
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
      path: '/check',
      name: 'check',
      component: Check,
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
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    }
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
