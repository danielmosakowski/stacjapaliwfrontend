<template>
  <main class="register-page">
    <div class="container">
      <h1>Rejestracja</h1>

      <!-- Komunikaty o błędach -->
      <ul v-if="errors.length">
        <li v-for="error in errors" :key="error" class="text-danger">
          {{ error }}
        </li>
      </ul>

      <!-- Formularz rejestracji -->
      <form @submit.prevent="register" class="form-section">
        <div class="form-group">
          <label for="name">Imię i nazwisko</label>
          <input type="text" v-model="name" id="name" placeholder="Jan Kowalski" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" placeholder="Email@domain.pl" required />
        </div>

        <div class="form-group">
          <label for="password">Hasło</label>
          <input type="password" v-model="password" id="password" placeholder="Podaj hasło" required />
        </div>

        <div class="form-group">
          <label for="confirmed_password">Potwierdź hasło</label>
          <input type="password" v-model="confirmed_password" id="confirmed_password" placeholder="Powtórz hasło" required />
        </div>

        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmed_password: "",
      errors: [],
    };
  },
  methods: {
    register() {
      this.errors = [];

      if (this.password !== this.confirmed_password) {
        this.errors.push("Hasła się nie zgadzają");
        return;
      }

      axios
          .post("http://localhost:8000/api/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then(() => {
            alert("Rejestracja zakończona sukcesem!");
            // Czyszczenie formularza
            this.name = "";
            this.email = "";
            this.password = "";
            this.confirmed_password = "";
          })
          .catch((error) => {
            this.errors = Object.values(error.response.data.errors).flat();
          });
    },
  },
};
</script>

<style scoped>
.register-page {
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
