<template>
  <main class="login-page">
    <div class="container">
      <h1>Logowanie</h1>

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

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = () => {
  console.log('Próba logowania:', { email: email.value, password: password.value });
  // Dodaj logikę logowania tutaj
};
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
  box-sizing: border-box; /* Dodane, aby zachować odstępy wewnętrzne */
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
</style>
