<template>
<<<<<<< HEAD
  <div class="container">
    <div class="row">
      <div class="col-6 mt-5 offset-3">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">

            <ul v-for="error in errors">
              <li class="text-danger">{{ error }}</li>
            </ul>

            <!--<p class="text-success">{{successMsg}}</p>   -->

            <form @submit.prevent="login">

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" >
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" >
              </div>


              <button type="submit" class="btn btn-primary">login</button>
            </form>

          </div>
=======
  <main class="login-page">
    <div class="container">
      <h1>Logowanie</h1>

      <ul v-if="errors.length">
        <li v-for="error in errors" :key="error" class="text-danger">
          {{ error }}
        </li>
      </ul>

      <!-- Formularz logowania -->
      <form @submit.prevent="login" class="form-section">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              type="email"
              v-model="email"
              id="email"
              placeholder="Email@domain.pl"
              required />
>>>>>>> dominikBranch
        </div>

        <div class="form-group">
          <label for="password">Hasło</label>
          <input
              type="password"
              v-model="password"
              id="password"
              placeholder="Podaj hasło"
              required />
        </div>

        <button type="submit">Zaloguj</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      email: '',
      password: '',
<<<<<<< HEAD
=======
      is_admin: '',
>>>>>>> dominikBranch
      errors: [],
    }
  },
  methods: {
    login() {
      //alert('hello')

      //this.errors = '';
      this.clearMessage();

      axios.get('/sanctum/csrf-cookie').then(response => {

<<<<<<< HEAD
      axios.post('http://localhost:8000/api/login',{
        email: this.email,
        password: this.password,
      }).then(response => {
        //console.log(response);
        //console.log(response.data)

        //dispatch authentication
        const status=true;
        const token=response.data.token
        console.log(response.data.token)

        this.$store.dispatch('setAuthToken',token)
        //this.$store.dispatch('checkUserAuthenticationStatus', status)
        this.$store.dispatch('setAuthStatus', status)



        this.$router.push({
          name: 'dashboard'
        })

        if (response.status == 201){
          //this.successMsg = response.data.message;
          console.log(response.data.message)
        }


      }).catch(error =>{

        if(error.response.status == 422){
          this.errors = Object.values(error.response.data.errors).flat()
        } else {
          this.errors=["Something went wrong"]
        }

      })

=======
        axios.post('http://localhost:8000/api/login',{
          email: this.email,
          password: this.password,
          is_admin: this.is_admin,
        }).then(response => {
          //console.log(response);
          //console.log(response.data)

          //dispatch authentication
          const status=true;
          const token=response.data.token
          console.log(response.data.token)

          this.$store.dispatch('setAuthToken',token)
          //this.$store.dispatch('checkUserAuthenticationStatus', status)
          this.$store.dispatch('setAuthStatus', status)



          this.$router.push({
            name: 'dashboard'
          })

          if (response.status == 201){
            //this.successMsg = response.data.message;
            console.log(response.data.message)
          }


        }).catch(error =>{

          if(error.response.status == 422){
            this.errors = Object.values(error.response.data.errors).flat()
          } else {
            this.errors=["Something went wrong"]
          }

        })

>>>>>>> dominikBranch
      });
    },

    clearMessage(){
      this.errors = '';
      this.successMsg='';
    }

  }
}
<<<<<<< HEAD
</script>
=======
</script>

<style scoped>
.login-page {
  padding: 20px;
  background-color: #f4f4f4;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #333;
}

.text-danger {
  color: red;
}
</style>
>>>>>>> dominikBranch
