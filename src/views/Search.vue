<template>
  <div class="home-view">
    <div class="content-wrapper">
      <h1>Mapa stacji paliw</h1><br>
      <div class="filters">
        <div class="filter">
          <label for="brand">Marka stacji:</label>
          <select v-model="selectedBrand" @change="filterStations">
            <option value="">Wybierz markę</option>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>
        </div>
        <div class="filter">
          <label for="fuelType">Rodzaj paliwa:</label>
          <select v-model="selectedFuelType" @change="filterStations">
            <option value="">Wybierz paliwo</option>
            <option v-for="fuel in fuelTypes" :key="fuel.id" :value="fuel.id">
              {{ fuel.name }}
            </option>
          </select>
        </div>
      </div>
      <div id="map"></div>
      <div v-if="selectedStation" class="station-details">
        <h3>Ceny dla stacji: {{ selectedStation.name }} ({{ selectedStation.address }})</h3>
        <table class="price-table">
          <thead>
          <tr>
            <th>Rodzaj paliwa</th>
            <th>Cena</th>
            <th>Akcja</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="fuel in selectedStationFuelTypes" :key="fuel.id">
            <td>{{ fuel.fuelType.name }}</td>
            <td>{{ fuel.price }} PLN</td>
            <td>
              <button @click="redirectToSuggestionForm(fuel.id)">
                Zaproponuj cenę
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  data() {
    return {
      user: null,
      map: null,
      stations: [],
      brands: [],
      fuelTypes: [],
      selectedBrand: "",
      selectedFuelType: "",
      filteredStations: [],
      stationFuelTypes: [],
      selectedStation: null,
      selectedStationFuelTypes: [],
    };
  },
  async created() {
    await this.getUserDetails();
    await this.fetchData();
    this.initMap();
  },
  methods: {
    async getUserDetails() {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.ok) {
          this.user = await response.json();
        } else {
          throw new Error("Nie udało się pobrać danych użytkownika.");
        }
      } catch (error) {
        console.error("Błąd pobierania użytkownika:", error);
        this.user = null;
      }
    },
    redirectToSuggestionForm(stationFuelTypeId) {
      if (!this.user) {
        alert("Musisz być zalogowany, aby zaproponować cenę.");
        return;
      }

      this.$router.push({
        name: "SuggestPriceForm",
        params: {
          user_id: this.user.id,
          station_fuel_type_id: stationFuelTypeId,
        }
      });
    },
    async fetchData() {
      try {
        const stationsResponse = await fetch("http://localhost:8000/api/stations");
        const brandsResponse = await fetch("http://localhost:8000/api/brands");
        const fuelTypesResponse = await fetch("http://localhost:8000/api/fuel-types");
        const stationFuelTypesResponse = await fetch("http://localhost:8000/api/station-fuel-types");
        if (!stationsResponse.ok || !brandsResponse.ok || !fuelTypesResponse.ok || !stationFuelTypesResponse.ok) {
          throw new Error("Błąd podczas pobierania danych.");
        }
        this.stations = await stationsResponse.json();
        this.brands = await brandsResponse.json();
        this.fuelTypes = await fuelTypesResponse.json();
        this.stationFuelTypes = await stationFuelTypesResponse.json();
        this.filteredStations = this.stations;
        this.addStationsToMap();
      } catch (error) {
        console.error("Błąd:", error);
      }
    },
    initMap() {
      this.map = L.map("map").setView([51.2070, 16.1551], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    addStationsToMap() {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
      this.filteredStations.forEach((station) => {
        const marker = L.marker([station.latitude, station.longitude]).addTo(this.map);
        marker.bindPopup(`
          <strong>${station.name}</strong><br>
          ${station.address || "Adres nieznany"}
        `);
        marker.on("click", () => {
          this.selectedStation = station;
          this.loadStationFuelTypes(station.id);
        });
      });
    },
    async loadStationFuelTypes(stationId) {
      const fuelTypesForStation = this.stationFuelTypes.filter(
          (relation) => relation.station_id === stationId
      );
      const selectedFuelTypes = fuelTypesForStation.map((relation) => {
        const fuelType = this.fuelTypes.find((fuel) => fuel.id === relation.fuel_type_id);
        return { ...relation, fuelType };
      });
      const pricesResponse = await fetch(
          `http://localhost:8000/api/station-prices?station_id=${stationId}&fuel_type_id=${selectedFuelTypes.map(fuel => fuel.fuelType.id).join(",")}`
      );
      if (pricesResponse.ok) {
        const prices = await pricesResponse.json();
        this.selectedStationFuelTypes = selectedFuelTypes.map((fuelTypeData) => {
          const price = prices.find(
              (p) => p.station_fuel_type_id === fuelTypeData.id
          );
          return { ...fuelTypeData, price: price ? price.price : "Brak ceny" };
        });
      } else {
        console.error("Błąd podczas pobierania cen.");
      }
    },
    filterStations() {
      let filteredStations = this.stations;
      if (this.selectedBrand) {
        filteredStations = filteredStations.filter(
            (station) => station.brand_id === parseInt(this.selectedBrand)
        );
      }
      if (this.selectedFuelType) {
        const stationIdsWithFuelType = this.stationFuelTypes
            .filter((relation) => relation.fuel_type_id === parseInt(this.selectedFuelType))
            .map((relation) => relation.station_id);
        filteredStations = filteredStations.filter((station) =>
            stationIdsWithFuelType.includes(station.id)
        );
      }
      this.filteredStations = filteredStations;
      this.addStationsToMap();
    },
  },
};
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/tło5.jpg');
  background-size: cover;
  background-position: center;
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
}

#map {
  width: 100%;
  height: 500px;
  margin: 20px 0;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.filters {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.filter {
  flex: 1;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

label {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.station-details {
  margin-top: 20px;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  text-align: left;
}

.price-table th, .price-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.price-table th {
  background-color: #f0f0f0;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #808000;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #575705;
}
</style>
