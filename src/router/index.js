import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import ListOfStations from "@/views/ListOfStations.vue";  // Komponent ListOfStations
import ContactView from "@/views/Contact.vue";  // Import komponentu Kontakt
import Dashboard from "@/views/Dashboard.vue";
import SuggestPriceForm from "@/views/SuggestPriceForm.vue";
import Admin from "@/views/Admin.vue";
import Search from "@/views/Search.vue";
import store from "@/store/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,  // Strona główna
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,  // Strona "O nas"
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,  // Strona rejestracji
    },
    {
      path: '/login',
      name: 'login',
      component: Login,  // Strona logowania
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
      path: '/list-of-stations',  // Strona "Lista Stacji"
      name: 'list-of-stations',
      component: ListOfStations,  // Komponent wyświetlający listę stacji
    },
    {
      path: '/contact',  // Strona Kontakt
      name: 'contact',
      component: ContactView,  // Komponent Kontakt
    },
    {
      path: "/suggest-price",
      name: "SuggestPriceForm",
      component: SuggestPriceForm,
      props: (route) => ({
        user_id: route.params.user_id,
        station_fuel_type_id: route.params.station_fuel_type_id,
      }),
      meta: {
        requiresAuth: true
      },
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

export default router;
