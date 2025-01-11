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
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errors = ref([]);

    const login = async () => {
      errors.value = [];
      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        const response = await axios.post('http://localhost:8000/api/login', {
          email: email.value,
          password: password.value
        });

        const token = response.data.token;
        localStorage.setItem('authToken', token);
        alert('Zalogowano pomyślnie!');

      } catch (error) {
        if (error.response && error.response.status === 422) {
          errors.value = Object.values(error.response.data.errors).flat();
        } else {
          errors.value = ['Wystąpił błąd podczas logowania.'];
        }
      }
    };

    return {
      email,
      password,
      errors,
      login
    };
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
