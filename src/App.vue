<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>


    <div class="wrapper">
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



    </div>
  </header>

  <RouterView />
</template>

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
            console.log(error)
          })
    }
  }
}
</script>
