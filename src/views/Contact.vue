<template>
  <main class="contact-us">
    <div class="container">
      <!-- Kontener dla opisów kontaktowych z półprzezroczystym tłem -->
      <div class="contact-container">
        <h1>Kontakt</h1> <!-- Przeniesiony do kontenera -->
        <!-- Informacje kontaktowe -->
        <p class="description">
          Jeśli masz jakiekolwiek pytania, skontaktuj się z nami!<br> Chętnie pomożemy i odpowiemy na Twoje wątpliwości.
        </p>

        <div class="contact-info">
          <div class="contact-item">
            <h3>Odwiedź naszą uczelnię</h3>
            <a class="external-link" href="https://www.collegiumwitelona.pl/" target="_blank" rel="noopener noreferrer">
              Collegium Witelona
            </a>
          </div>
          <div class="contact-item">
            <h3>Adres</h3>
            <p>Collegium Witelona, ul. Sejmowa 5A, 59-220 Legnica</p>
          </div>
          <div class="contact-item">
            <h3>Email</h3>
            <p>kontakt@nwacha.pl</p>
          </div>
          <div class="contact-item">
            <h3>Telefon</h3>
            <p>+48 123 456 789</p>
          </div>
        </div>
      </div>

      <hr class="divider"> <!-- Dodana kreska -->

      <div class="form-section">
        <h2>Formularz kontaktowy</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Imię i nazwisko</label>
            <input type="text" id="name" v-model="formData.name" placeholder="Wpisz swoje imię i nazwisko" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email" placeholder="Wpisz swój email" required />
          </div>
          <div class="form-group">
            <label for="message">Wiadomość</label>
            <textarea id="message" v-model="formData.message" placeholder="Napisz swoją wiadomość" required></textarea>
          </div>
          <button type="submit">Wyślij</button>
        </form>
      </div>
    </div>
  </main>
</template>



<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  console.log('Form submitted:', formData.value);
  // Możesz dodać tutaj logikę do wysyłania formularza
};
</script>

<style scoped>
.contact-us {
  padding: 20px;
  background-image: url('@/assets/tło4.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.contact-container {
  background-color: rgba(0, 0, 0, 0.5); /* Ciemne tło, półprzezroczyste */
  padding: 40px;
  border-radius: 8px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 800px; /* Zmieniona szerokość na tę samą co formularz */
  margin-left: auto;
  margin-right: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #fff; /* Zmienione na biały */
}

.description {
  font-size: 18px;
  text-align: center;
  margin: 20px 0;
  color: #fff; /* Zmienione na biały */
}

.external-link {
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
}

.external-link a {
  color: #007bff; /* Zmienione na niebieski */
  text-decoration: none;
}

.external-link a:hover {
  text-decoration: underline;
}

.contact-info {
  margin-top: 40px;
  text-align: center;
  color: #fff;
}

.contact-item {
  margin-bottom: 20px;
}

.contact-item h3 {
  color: #fff; /* Zmienione na biały */
}

.divider {
  border: 0;
  border-top: 2px solid black;
  margin: 40px 0;
}

.form-section {
  margin-top: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.form-section h2 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: Arial, sans-serif;
}

textarea {
  height: 150px;
}

button {
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: #333;
}


</style>
