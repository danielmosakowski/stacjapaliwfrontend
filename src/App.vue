<template>
  <header>
    <div class="wrapper">
<<<<<<< HEAD
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">

          <RouterLink class="navbar-brand" to="/">wacha.pl</RouterLink>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

              <li class="nav-item">
<<<<<<< HEAD
                <RouterLink class="nav-link" to="/">Home</RouterLink>
=======
                <RouterLink class="nav-link active" to="/">Strona Główna</RouterLink>
>>>>>>> fd50df092c307e7dba8fdd550cb02ba9c0d64cd5
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">Lista Stacji</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/login">Logowanie</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/register">Rejestracja</RouterLink>
              </li>


            </ul>
            <form class="d-flex" role="search">
              <router-link v-if="isAuthenticated" to="/dashboard" class="btn btn-outline-success">Dashboard</router-link>
              <a v-if="isAuthenticated" @click="logout" class="btn btn-outline-danger">Logout</a>&nbsp;
              <router-link v-if="!isAuthenticated" to="/login" class="btn btn-outline-primary">Login</router-link>&nbsp;
              <router-link v-if="!isAuthenticated" to="/register" class="btn btn-outline-primary">Register</router-link>
            </form>
          </div>
        </div>
      </nav>



=======
      <nav class="navbar navbar-expand-custom navbar-mainbg">
        <RouterLink class="navbar-brand navbar-logo" to="/">
          <img src="@/assets/wacha.png" alt="Wacha Logo" class="navbar-logo-img" />
        </RouterLink>
        <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars text-white"></i>
        </button>
        <!-- Wyskakujące menu -->
        <div class="navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" active-class="active-link"><i class="fas fa-home"></i>Strona Główna</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/list-of-stations" active-class="active-link"><i class="fas fa-building"></i>Lista Stacji</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/search" active-class="active-link"><i class="fas fa-search"></i>Wyszukiwarka</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" v-if="!isAuthenticated" to="/login" active-class="active-link"><i class="fas fa-sign-in-alt"></i>Logowanie</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" v-if="!isAuthenticated" to="/register" active-class="active-link"><i class="fas fa-user-plus"></i>Rejestracja</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/contact" active-class="active-link"><i class="fas fa-phone"></i>Kontakt</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" active-class="active-link"><i class="fas fa-info-circle"></i>O nas</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" v-if="isAuthenticated" to="/dashboard" active-class="active-link"><i class="fas fa-columns"></i>Tablica</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" v-if="isAuthenticated && isAdmin" to="/admin" active-class="active-link"><i class="fas fa-cogs"></i>Admin</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-if="isAuthenticated" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
>>>>>>> dominikBranch
    </div>
  </header>

  <RouterView />

  <!-- Stopka -->
  <footer class="footer">
    <div class="footer-left">
      <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
    </div>
    <div class="footer-center">
      <img src="@/assets/wacha.png" alt="Wacha Logo" />
    </div>
    <div class="footer-right">
      <div>Wacha</div>
      <div>©2025 Wacha</div>
      <div>No Money, No Gas</div>
    </div>
  </footer>

</template>

<<<<<<< HEAD
<style >

</style>
<script>
import {mapGetters} from "vuex";
//import axios from "axios";
import axios from "./axios.js";

export default {

  mounted() {
    //console.log(this.authToken)
    //if(this.authToken){
    //  window.axios.defaults.headers.common['Authorization']=`Bearer ${this.authToken}`;
      //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
    //}
    this.$store.dispatch('checkUserAuthenticationStatus')
  },

  computed:{
    isAuthenticated(){
      return this.$store.state.isAuthenticated   // 1 metoda
      //return this.$store.getters.authStatus // 2 metoda
    },
    authToken(){
      return this.$store.state.token
    }

    //...mapGetters({  // 3 metoda
    //    isAuthenticated: "authStatus"
    //})
  },
  methods: {
    logout(){
      axios.post('http://localhost:8000/api/logout')
          .then(response=>{
            //console.log(response.data)
            this.$store.dispatch('logout')
            this.$router.push({
              name: 'login'
            })
          })
          .catch(error =>{
=======
<script>
import { mapGetters } from 'vuex'
import axios from './axios.js'

export default {
  mounted() {
    this.$store.dispatch('checkUserAuthenticationStatus')
  },

  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    isAdmin() {
      return this.$store.state.isAdmin
    }
  },

  methods: {
    logout() {
      axios.post('http://localhost:8000/api/logout')
          .then(response => {
            this.$store.dispatch('logout')
            this.$router.push({name: 'login'})
          })
          .catch(error => {
>>>>>>> dominikBranch
            console.log(error)
          })
    }
  }
}
</script>
