<template>
  <div class="home-view">
    <h1 class="main-header">Dodaj cenę paliwa</h1>
    <form @submit.prevent="submitForm" class="form-section">
      <!-- Rodzaj paliwa -->
      <div class="form-group">
        <label for="fuelType">Rodzaj paliwa:</label>
        <select v-model="formData.fuelType" id="fuelType" required>
          <option value="">Wybierz rodzaj paliwa</option>
          <option value="petrol">Benzyna</option>
          <option value="diesel">Diesel</option>
          <option value="lpg">LPG</option>
        </select>
      </div>

      <!-- Cena -->
      <div class="form-group">
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
      <div class="form-group">
        <label for="photo">Zdjęcie potwierdzające cenę:</label>
        <input type="file" @change="handleFileUpload" id="photo" required />
      </div>

      <!-- Lokacja stacji -->
      <div class="form-group">
        <label for="location">Lokacja stacji:</label>
        <input
            type="text"
            v-model="formData.location"
            id="location"
            placeholder="Wybierz stację z mapy"
            readonly
            required
        />
      </div>

      <!-- Przycisk wysyłania -->
      <button type="submit" :disabled="!formData.location || priceError">Wyślij</button>
    </form>

    <!-- Sekcja mapy -->
    <div>
      <h2 class="main-header">Mapa stacji</h2>
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
        location: '', // Format: "latitude,longitude"
      },
      priceError: false,
      map: null,
      stations: [
        { name: "Orlen", lat: 51.2094, lng: 16.1309, address: "Chojnowska 154, Legnica" },
        { name: "Shell", lat: 51.1917, lng: 16.1276, address: "Złotoryjska 172, Legnica" },
        { name: "Orlen", lat: 51.1777, lng: 16.1581, address: "Jaworzyńska 238, Legnica" },
        { name: "MOL", lat: 51.1784, lng: 16.1567, address: "Nowodworska 30A, Legnica" },
        { name: "Auchan", lat: 51.1841, lng: 16.1685, address: "Roberta Schumana 11, Legnica" },
        { name: "Circle K", lat: 51.2049, lng: 16.1581, address: "Gwarna Muzealna, Legnica" },
        { name: "Orlen", lat: 51.2141, lng: 16.1631, address: "Władysława Łokietka 9, Legnica" },
        { name: "AMIC", lat: 51.2121, lng: 16.1672, address: "Pocztowa 2, Legnica" },
        { name: "Orlen", lat: 51.2069, lng: 16.1816, address: "Gwiezdna 10, Legnica" },
        { name: "BP", lat: 51.2094, lng: 16.1861, address: "Wrocławska 151, Legnica" },
        { name: "Shell", lat: 51.2043, lng: 16.1917, address: "aleja Piłsudskiego 11, Legnica" },
        { name: "Orlen", lat: 51.2108, lng: 16.2014, address: "Spokojna 59, Legnica" },
        { name: "Merkury", lat: 51.2175, lng: 16.1581, address: "Słubicka 4a, Legnica" },
        { name: "LOTOS", lat: 51.2276, lng: 16.1642, address: "Poznańska 44, Legnica" },
      ],
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
      formData.append('location', this.formData.location); // Przechowuje współrzędne

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
        location: '',
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

      // Dodanie markerów dla stacji paliw
      this.stations.forEach((station) => {
        const marker = L.marker([station.lat, station.lng]).addTo(this.map);
        marker.bindPopup(`
          <strong>${station.name}</strong><br>
          ${station.address || "Adres nieznany"}
        `);

        // Możliwość wybrania stacji przez kliknięcie na marker
        marker.on("click", () => {
          this.formData.location = `${station.lat},${station.lng}`; // Współrzędne stacji
        });
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

input, select, button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #333;
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

/* Stylizacja nagłówków */
.main-header {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
