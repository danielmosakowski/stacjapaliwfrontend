<template>
  <main class="fuel-price-suggestion-page">
    <div class="form-container">
      <h1>Wprowadź sugestię ceny paliwa</h1><br>

      <!-- Komunikaty o błędach -->
      <ul v-if="errors.length">
        <li v-for="error in errors" :key="error" class="text-danger">
          {{ error }}
        </li>
      </ul>

      <!-- Nagłówek z nazwą użytkownika, stacji i rodzaju paliwa -->
      <p v-if="user && stationDetails" class="lead">
        Nazwa użytkownika: {{ user.data.name }}<br /><br>
        Formularz propozycji cen dla stacji: {{ stationDetails.name }}<br /><br>
        Rodzaj paliwa: {{ stationDetails.fuelTypeName }}<br><br>
      </p>

      <!-- Formularz -->
      <form @submit.prevent="submitSuggestion">
        <div class="form-group" hidden>
          <label for="user_id">ID Użytkownika</label>
          <input
              type="number"
              v-model="user_id"
              id="user_id"
              readonly
          />
        </div>

        <div class="form-group">
          <label for="suggested_price">Sugerowana Cena</label>
          <input
              type="text"
              v-model="suggested_price"
              id="suggested_price"
              placeholder="Podaj cenę paliwa (np. 5.11)"
              required
              @input="formatPrice"
          />
        </div>

        <div class="form-group">
          <label for="photo">Zdjęcie</label>
          <input
              type="file"
              @change="handleFileUpload"
              id="photo"
              required
          />
        </div>

        <div class="form-group">
          <label for="price_date">Data Ceny</label>
          <input
              type="date"
              v-model="price_date"
              id="price_date"
              required
          />
        </div>

        <div class="form-group" hidden>
          <label for="station_fuel_type_id">ID Typu Paliwa</label>
          <input
              type="number"
              v-model="station_fuel_type_id"
              id="station_fuel_type_id"
              readonly
          />
        </div>

        <button type="submit">Wyślij sugestię</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user_id: null,
      suggested_price: '',
      photo: null,
      price_date: '',
      station_fuel_type_id: null,
      errors: [],
      user: null,
      stationDetails: null,
    };
  },
  created() {
    const pathParts = window.location.pathname.split('/');
    this.user_id = pathParts[2];
    this.station_fuel_type_id = pathParts[3];

    this.getUserDetails();
    this.getStationDetails();
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.photo = file;
      }
    },

    formatPrice() {
      this.suggested_price = this.suggested_price.replace(',', '.');
    },

    submitSuggestion() {
      this.errors = [];

      if (!this.suggested_price || isNaN(this.suggested_price)) {
        this.errors.push('Cena musi być liczbą w formacie np. 5.11.');
        return;
      }

      if (!this.price_date) {
        this.errors.push('Wprowadź datę ceny.');
        return;
      }

      const formData = new FormData();
      formData.append('user_id', this.user_id);
      formData.append('suggested_price', this.suggested_price);
      formData.append('photo', this.photo);
      formData.append('price_date', this.price_date);
      formData.append('station_fuel_type_id', this.station_fuel_type_id);

      axios
          .post('http://localhost:8000/api/fuel-price-suggestions', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then(() => {
            alert('Sugestia została wysłana!');
            this.resetForm();
          })
          .catch((error) => {
            console.error('Błąd podczas wysyłania sugestii:', error);
            if (error.response && error.response.data.errors) {
              this.errors = Object.values(error.response.data.errors).flat();
            } else {
              this.errors.push('Wystąpił błąd podczas wysyłania sugestii.');
            }
          });
    },

    resetForm() {
      this.suggested_price = '';
      this.photo = null;
      this.price_date = '';
    },

    getUserDetails() {
      axios
          .get('http://localhost:8000/api/userprofile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.error('Błąd pobierania danych użytkownika:', error);
          });
    },

    getStationDetails() {
      axios
          .get(`http://localhost:8000/api/station-fuel-types/${this.station_fuel_type_id}`)
          .then((response) => {
            const {station_id, fuel_type_id} = response.data;
            this.fetchStationDetails(station_id, fuel_type_id);
          })
          .catch((error) => {
            console.error('Błąd pobierania danych Station Fuel Type:', error);
          });
    },

    fetchStationDetails(station_id, fuel_type_id) {
      axios
          .get(`http://localhost:8000/api/stations/${station_id}`)
          .then((response) => {
            this.stationDetails = {
              name: response.data.name,
              fuelTypeName: '',
            };
            this.fetchFuelTypeDetails(fuel_type_id);
          })
          .catch((error) => {
            console.error('Błąd pobierania danych stacji:', error);
          });
    },

    fetchFuelTypeDetails(fuel_type_id) {
      axios
          .get(`http://localhost:8000/api/fuel-types/${fuel_type_id}`)
          .then((response) => {
            if (this.stationDetails) {
              this.stationDetails.fuelTypeName = response.data.name;
            }
          })
          .catch((error) => {
            console.error('Błąd pobierania danych typu paliwa:', error);
          });
    },
  },
};
</script>

<style scoped>
.fuel-price-suggestion-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/tło5.jpg');
  background-size: cover;
  background-position: center;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
input[type="file"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #808000;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #575705;
}

.text-danger {
  color: red;
}

.hidden {
  display: none;
}
</style>
