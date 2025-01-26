<template>
  <div class="station-management">
    <h1>Zarządzaj Stacjami</h1>

    <form @submit.prevent="addStation" class="form-section">
      <label for="brand">Marka:</label>
      <select v-model="newStation.brand_id" id="brand" @change="updateName">
        <option value="" disabled>Wybierz markę</option>
        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
          {{ brand.name }}
        </option>
      </select>

      <label for="name">Nazwa Stacji:</label>
      <input v-model="newStation.name" id="name" type="text" placeholder="Nazwa stacji" disabled />

      <label for="address">Adres:</label>
      <input v-model="newStation.address" id="address" type="text" placeholder="Adres" required />

      <label for="longitude">Długość geograficzna:</label>
      <input v-model="newStation.longitude" id="longitude" type="text" placeholder="Długość geograficzna" required />

      <label for="latitude">Szerokość geograficzna:</label>
      <input v-model="newStation.latitude" id="latitude" type="text" placeholder="Szerokość geograficzna" required />

      <button type="submit">Dodaj Stację</button>
    </form>

    <h1>Lista Stacji</h1>
    <table class="station-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nazwa</th>
        <th>Adres</th>
        <th>Akcje</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="station in stations" :key="station.id">
        <td>{{ station.id }}</td>
        <td>{{ station.name }}</td>
        <td>{{ station.address }}</td>
        <td>
          <button @click="deleteStation(station.id)">Usuń</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      brands: [], // Lista marek
      stations: [], // Lista stacji
      newStation: {
        brand_id: null,
        name: "",
        address: "",
        longitude: "",
        latitude: "",
      },
    };
  },
  mounted() {
    this.fetchBrands();
    this.fetchStations();
  },
  methods: {
    sanitizeCoordinates() {
      this.newStation.longitude = this.newStation.longitude.replace(",", ".");
      this.newStation.latitude = this.newStation.latitude.replace(",", ".");
    },
    fetchBrands() {
      axios
          .get("http://localhost:8000/api/brands", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.brands = response.data;
          })
          .catch((error) => {
            console.error("Błąd przy pobieraniu marek:", error);
          });
    },
    fetchStations() {
      axios
          .get("http://localhost:8000/api/stations", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.stations = response.data;
          })
          .catch((error) => {
            console.error("Błąd przy pobieraniu stacji:", error);
          });
    },
    updateName() {
      const selectedBrand = this.brands.find(
          (brand) => brand.id === this.newStation.brand_id
      );
      if (selectedBrand) {
        this.newStation.name = selectedBrand.name;
      }
    },
    addStation() {
      this.sanitizeCoordinates();
      axios
          .post(
              "http://localhost:8000/api/stations",
              this.newStation,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
          )
          .then((response) => {
            this.stations.push(response.data);
            alert("Stacja została dodana!");
            this.newStation = {
              brand_id: null,
              name: "",
              address: "",
              longitude: "",
              latitude: "",
            };
          })
          .catch((error) => {
            console.error("Błąd podczas dodawania stacji:", error);
            alert("Dodawanie stacji nie powiodło się. Sprawdź dane wejściowe.");
          });
    },
    deleteStation(stationId) {
      axios
          .delete(`http://localhost:8000/api/stations/${stationId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.stations = this.stations.filter(
                (station) => station.id !== stationId
            );
            alert("Stacja została usunięta.");
          })
          .catch((error) => {
            console.error("Błąd podczas usuwania stacji:", error);
          });
    },
  },
};
</script>

<style scoped>
.station-management {
  background: url('@/assets/tło13.jpg') no-repeat center center;
  background-size: cover;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
}

.form-section {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: white;
}

input, select, button {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: none;
}

/* Przycisk "Dodaj Stację" */
button[type="submit"] {
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #218838;
}

/* Wszystkie inne przyciski */
button:not([type="submit"]) {
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:not([type="submit"]):hover {
  background-color: #a71d2a;
}

.station-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
}

.station-table th, .station-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center;
}

.station-table th {
  background-color: #343a40;
}

.station-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}

.station-table tr:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
