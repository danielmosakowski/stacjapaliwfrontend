<template>
  <main class="login-page">
    <div class="container">
      <div class="form-section">
        <h1>Logowanie</h1>

        <ul v-if="errors.length">
          <li v-for="error in errors" :key="error" class="text-danger">
            {{ error }}
          </li>
        </ul>

        <!-- Formularz logowania -->
        <form @submit.prevent="login">
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
      this.clearMessage();

      axios.get('/sanctum/csrf-cookie').then(response => {

        axios.post('http://localhost:8000/api/login',{
          email: this.email,
          password: this.password,
          is_admin: this.is_admin,
        }).then(response => {
          const status=true;
          const token=response.data.token;
          console.log(response.data.token);

          this.$store.dispatch('setAuthToken',token);
          this.$store.dispatch('setAuthStatus', status);

          this.$router.push({
            name: 'dashboard'
          });

          if (response.status == 201){
            console.log(response.data.message);
          }

        }).catch(error =>{
          if(error.response.status == 422){
            this.errors = Object.values(error.response.data.errors).flat();
          } else {
            this.errors=["Something went wrong"];
          }
        });

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
  display: flex; /* Flexbox dla centrowania */
  justify-content: center; /* Centrowanie poziome */
  align-items: center; /* Centrowanie pionowe */
  min-height: 100vh; /* Wysokość na pełny ekran */
  background-image: url('@/assets/tło18.jpg'); /* Tło strony */
  background-size: cover; /* Dopasowanie tła */
  background-position: center; /* Pozycjonowanie tła */
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
  background-color: #fff; /* Tło formularza */
  padding: 20px; /* Odstępy wewnętrzne */
  border-radius: 8px; /* Zaokrąglenie rogów */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Cień */
  width: 800px; /* Stała szerokość formularza */
  max-width: 100%; /* Zapobiega przekroczeniu szerokości na małych ekranach */
  margin: auto; /* Centrowanie poziome */
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
