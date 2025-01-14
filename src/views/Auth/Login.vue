<template>
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
      is_admin: '',
      errors: [],
    }
  },
  methods: {
    login() {
      //alert('hello')

      //this.errors = '';
      this.clearMessage();

      axios.get('/sanctum/csrf-cookie').then(response => {

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

      });
    },

    clearMessage(){
      this.errors = '';
      this.successMsg='';
    }

  }
}
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
