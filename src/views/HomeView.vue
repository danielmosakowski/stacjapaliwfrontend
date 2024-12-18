<template>
  <div class="home-view">
    <h1>Dodaj cenę paliwa</h1>
    <form @submit.prevent="submitForm">
      <!-- Rodzaj paliwa -->
      <div>
        <label for="fuelType">Rodzaj paliwa:</label>
        <select v-model="formData.fuelType" id="fuelType" required>
          <option value="">Wybierz rodzaj paliwa</option>
          <option value="petrol">Benzyna</option>
          <option value="diesel">Diesel</option>
          <option value="lpg">LPG</option>
        </select>
      </div>

      <!-- Cena -->
      <div>
        <label for="price">Cena (zł):</label>
        <input
          type="number"
          step="0.01"
          v-model="formData.price"
          id="price"
          placeholder="np. 6.50"
          required
          @input="validatePrice"
        />
        <span v-if="priceError" class="error">Cena nie może być ujemna.</span>
      </div>

      <!-- Zdjęcie potwierdzające cenę -->
      <div>
        <label for="photo">Zdjęcie potwierdzające cenę:</label>
        <input type="file" @change="handleFileUpload" id="photo" required />
      </div>

      <!-- Lokacja stacji -->
      <div>
        <label for="location">Lokacja stacji:</label>
        <input
          type="text"
          v-model="formData.location"
          id="location"
          placeholder="np. Legnica, ul. Lotnicza 1 lub współrzędne"
          required
        />
      </div>

      <!-- Przycisk wysyłania -->
      <button type="submit" :disabled="priceError">Wyślij</button>
    </form>

    <!-- Dodanie sekcji mapy -->
    <div>
      <h2>Mapa stacji:</h2>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  data() {
    return {
      formData: {
        fuelType: '',
        price: '',
        photo: null,
        location: '' // Możliwość ręcznego wpisania lub uzupełnienia po kliknięciu na mapę
      },
      priceError: false,
      map: null,
      marker: null, // Przechowuje znacznik na mapie
    };
  },
  methods: {
    handleFileUpload(event) {
      this.formData.photo = event.target.files[0];
    },
    validatePrice() {
      this.priceError = this.formData.price < 0;
    },
    async submitForm() {
      if (this.priceError) return;

      const formData = new FormData();
      formData.append('fuelType', this.formData.fuelType);
      formData.append('price', this.formData.price);
      formData.append('photo', this.formData.photo);
      formData.append('location', this.formData.location);

      try {
        const response = await fetch('https://your-backend-api.com/api/fuel-prices', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Formularz został wysłany pomyślnie!');
          this.resetForm();
        } else {
          alert('Wystąpił błąd podczas wysyłania formularza.');
        }
      } catch (error) {
        console.error('Błąd:', error);
        alert('Nie udało się połączyć z serwerem.');
      }
    },
    resetForm() {
      this.formData = {
        fuelType: '',
        price: '',
        photo: null,
        location: ''
      };
    },
    initMap() {
      // Inicjalizacja mapy
      this.map = L.map("map").setView([51.2070, 16.1551], 13); // Legnica

      // Dodanie warstwy kafelków
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Obsługa kliknięcia na mapie
      this.map.on("click", (event) => {
        const { lat, lng } = event.latlng;

        // Aktualizacja współrzędnych w formularzu
        this.formData.location = `${lat}, ${lng}`;

        // Dodanie lub aktualizacja markera
        if (this.marker) {
          this.marker.setLatLng([lat, lng]);
        } else {
          this.marker = L.marker([lat, lng]).addTo(this.map);
        }
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
.home-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
form div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input, select, button {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.error {
  color: red;
  font-size: 14px;
}
#map {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}
</style>
