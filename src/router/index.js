import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import StudentView from '../views/Students/View.vue';
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import ListOfStations from "@/views/ListOfStations.vue";  // Komponent ListOfStations
import ContactView from "@/views/Contact.vue";  // Import komponentu Kontakt

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
      path: '/students',
      name: 'students',
      component: StudentView,  // Strona studentów
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
      path: '/list-of-stations',  // Strona "Lista Stacji"
      name: 'list-of-stations',
      component: ListOfStations,  // Komponent wyświetlający listę stacji
    },
    {
      path: '/contact',  // Strona Kontakt
      name: 'contact',
      component: ContactView,  // Komponent Kontakt
    },
  ],
});

export default router;
