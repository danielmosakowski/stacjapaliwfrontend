<template>
  <div>
    <h1>Zarządzaj Stacjami</h1>

    <form @submit.prevent="addStation">
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

    <h2>Lista Stacji</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Marka</th>
          <th>Nazwa</th>
          <th>Adres</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in stations" :key="station.id">
          <td>{{ station.id }}</td>
          <td>{{ station.brand_name }}</td>
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
      this.newStation.longitude = this.newStation.longitude.replace(',', '.');
      this.newStation.latitude = this.newStation.latitude.replace(',', '.');
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
form {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select, button {
  margin-bottom: 15px;
  padding: 8px;
  width: 100%;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
