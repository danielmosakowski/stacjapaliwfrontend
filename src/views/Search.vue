<template>
  <div class="home-view">
    <h1>Mapa stacji paliw</h1>
    <div>
      <h2>Filtruj stacje:</h2>
      <!-- Filtr po marce -->
      <div>
        <label for="brand">Marka stacji:</label>
        <select v-model="selectedBrand" @change="filterStations">
          <option value="">Wybierz markę</option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </option>
        </select>
      </div>
      <!-- Filtr po rodzaju paliwa -->
      <div>
        <label for="fuelType">Rodzaj paliwa:</label>
        <select v-model="selectedFuelType" @change="filterStations">
          <option value="">Wybierz paliwo</option>
          <option v-for="fuel in fuelTypes" :key="fuel.id" :value="fuel.id">
            {{ fuel.name }}
          </option>
        </select>
      </div>
    </div>
    <div id="map" style="width: 100%; height: 500px; margin-top: 20px;"></div>
    <!-- Tabela z paliwami -->
    <div v-if="selectedStation" style="margin-top: 20px;">
      <h3>Ceny dla stacji: {{ selectedStation.name }} ({{ selectedStation.address }})</h3>
      <table border="1">
        <thead>
        <tr>
          <th>Rodzaj paliwa</th>
          <th>Cena</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="fuel in selectedStationFuelTypes" :key="fuel.id">
          <td>{{ fuel.fuelType.name }}</td>
          <td>{{ fuel.price }} PLN</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  data() {
    return {
      map: null,
      stations: [],
      brands: [],
      fuelTypes: [],
      selectedBrand: "",
      selectedFuelType: "",
      filteredStations: [],
      stationFuelTypes: [],
      selectedStation: null, // Wybrana stacja
      selectedStationFuelTypes: [], // Paliwa dostępne na wybranej stacji
    };
  },
  async created() {
    await this.fetchData();
    this.initMap();
  },
  methods: {
    async fetchData() {
      try {
        const stationsResponse = await fetch("http://localhost:8000/api/stations");
        const brandsResponse = await fetch("http://localhost:8000/api/brands");
        const fuelTypesResponse = await fetch("http://localhost:8000/api/fuel-types");
        const stationFuelTypesResponse = await fetch("http://localhost:8000/api/station-fuel-types");
        if (
            !stationsResponse.ok ||
            !brandsResponse.ok ||
            !fuelTypesResponse.ok ||
            !stationFuelTypesResponse.ok
        ) {
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
        alert("Nie udało się pobrać danych.");
      }
    },
    initMap() {
      this.map = L.map("map").setView([51.2070, 16.1551], 13); // Współrzędne centrum mapy
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
        // Kliknięcie na markerze
        marker.on("click", () => {
          this.selectedStation = station;
          this.loadStationFuelTypes(station.id);
        });
      });
    },
    async loadStationFuelTypes(stationId) {
      // Pobranie powiązań stacji z paliwami
      const fuelTypesForStation = this.stationFuelTypes.filter(
          (relation) => relation.station_id === stationId
      );
      // Pobranie danych o paliwach z `fuelTypes`
      const selectedFuelTypes = fuelTypesForStation.map((relation) => {
        const fuelType = this.fuelTypes.find((fuel) => fuel.id === relation.fuel_type_id);
        return { ...relation, fuelType };
      });
      // Pobieranie cen dla każdej stacji i rodzaju paliwa
      const pricesResponse = await fetch(
          `http://localhost:8000/api/station-prices?station_id=${stationId}&fuel_type_id=${selectedFuelTypes.map(fuel => fuel.fuelType.id).join(",")}`
      );
      if (pricesResponse.ok) {
        const prices = await pricesResponse.json();
        // Łączenie danych z cenami
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
      // Filtrowanie po marce
      if (this.selectedBrand) {
        filteredStations = filteredStations.filter(
            (station) => station.brand_id === parseInt(this.selectedBrand)
        );
      }
      // Filtrowanie po paliwie
      if (this.selectedFuelType) {
        const stationIdsWithFuelType = this.stationFuelTypes
            .filter((relation) => relation.fuel_type_id === parseInt(this.selectedFuelType))
            .map((relation) => relation.station_id);
        filteredStations = filteredStations.filter((station) =>
            stationIdsWithFuelType.includes(station.id)
        );
      }
      this.filteredStations = filteredStations;
      this.addStationsToMap(); // Dodaj przefiltrowane stacje do mapy
    },
  },
};
</script>
<style scoped>
.home-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
#map {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
</style>