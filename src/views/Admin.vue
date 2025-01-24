<template>
  <div>
    <h1>Panel administratora</h1>
    <button @click="goToBrands">Zarządzaj markami stacji</button>
    <button @click="goToStations">Zarządzaj stacjami paliwowymi</button>
    <button @click="gotoAllUsers">Zarządzaj użytkownikami</button>
    <h1>Lista zgłoszeń</h1>
    <p>Zaakceptowane zgłoszenia: {{ approvedCount }}</p>
    <p>Odrzucone zgłoszenia: {{ rejectedCount }}</p>
    <table>
      <thead>
      <tr>
        <th scope="col">ID Zgłoszenia</th>
        <th scope="col">Nazwa użytkownika</th>
        <th scope="col">Cena sugerowana</th>
        <th scope="col">Nazwa Stacji</th>
        <th scope="col">Adres Stacji</th>
        <th scope="col">Rodzaj Paliwa</th>
        <th scope="col">Ścieżka zdjęcia</th>
        <th scope="col">Data</th>
        <th scope="col">Status zatwierdzenia</th>
        <th scope="col">Akcja</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="suggestion in suggestions" :key="suggestion.id">
        <td>{{ suggestion.id }}</td>
        <td>{{ suggestion.user ? suggestion.user.name : 'Brak danych' }}</td>
        <td>{{ suggestion.suggested_price }}</td>
        <td>{{ suggestion.station_name || 'Ładowanie...' }}</td>
        <td>{{ suggestion.station_address || 'Ładowanie...' }}</td>
        <td>{{ suggestion.fuel_type_name || 'Ładowanie...' }}</td>
        <td>
          <a v-if="suggestion.photo_path" :href="`http://localhost:8000/storage/${suggestion.photo_path}`" target="_blank">
            Zobacz zdjęcie
          </a>
          <span v-else>Brak zdjęcia</span>
        </td>
        <td>{{ suggestion.price_date }}</td>
        <td>{{ suggestion.approved ? 'Zatwierdzone' : 'Oczekuje' }}</td>
        <td>
          <button v-if="!suggestion.approved" @click="approveSuggestion(suggestion.id)">
            Zatwierdź
          </button>
          <button v-if="!suggestion.approved" class="reject" @click="rejectSuggestion(suggestion.id)">
          Odrzuć
          </button>
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
      suggestions: [], // Lista zgłoszeń
      approvedCount: 0, // Licznik zaakceptowanych zgłoszeń
      rejectedCount: 0, // Licznik odrzuconych zgłoszeń
    };
  },

  mounted() {
    this.fetchSuggestions(); // Pobranie zgłoszeń przy załadowaniu komponentu
  },

  methods: {
    goToBrands() {
      this.$router.push("/admin/brands");
    },
    goToStations() {
      this.$router.push("/admin/stations");
    },
    gotoAllUsers() {
      this.$router.push("/admin/all-users");
    },
    // Pobieranie listy zgłoszeń
    fetchSuggestions() {
      axios
        .get("http://localhost:8000/api/fuel-price-suggestions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.suggestions = response.data; // Zapisanie zgłoszeń
          console.log("Sugestie cen:", this.suggestions);

          // Ustawienie liczby zaakceptowanych zgłoszeń
          this.approvedCount = this.suggestions.filter(
            (suggestion) => suggestion.approved === 1
          ).length;
          this.rejectedCount = this.suggestions.filter(
            (suggestion) => suggestion.approved === 0 && suggestion.rejected
          ).length;

          // Pobieranie szczegółów stacji i paliw
          this.suggestions.forEach((suggestion) => {
            if (suggestion.station_fuel_type_id) {
              this.fetchStationFuelTypeDetails(suggestion);
            }
          });
        })
        .catch((error) => {
          console.error("Błąd pobierania zgłoszeń:", error);
        });
    },

    // odrzucanie zgłoszenia
    rejectSuggestion(suggestionId) {
      axios
        .delete(`http://localhost:8000/api/fuel-price-suggestions/${suggestionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          // Po odrzuceniu usuń zgłoszenie z listy i zwiększ licznik odrzuconych
          this.suggestions = this.suggestions.filter(
            (suggestion) => suggestion.id !== suggestionId
          );
          this.rejectedCount++;
        })
        .catch((error) => {
          console.error("Błąd przy odrzucaniu propozycji:", error.response);
        });
    },

    // Pobieranie szczegółów użytkownika po user_id
    fetchUserDetails(suggestion) {
      axios
        .get(`http://localhost:8000/api/users/${suggestion.user_id}`)
        .then((response) => {
          console.log("Dane użytkownika:", response.data);  // Logowanie odpowiedzi API
          this.$set(suggestion, 'user', response.data);  // Zapewnia reaktywność
        })
        .catch((error) => {
          console.error("Błąd pobierania danych użytkownika:", error);
        });
},

    // Pobieranie szczegółów Station Fuel Type
    fetchStationFuelTypeDetails(suggestion) {
      axios
        .get(`http://localhost:8000/api/station-fuel-types/${suggestion.station_fuel_type_id}`)
        .then((response) => {
          console.log("Station Fuel Type details:", response.data);
          const { station_id, fuel_type_id } = response.data;

          // Pobieranie danych stacji i rodzaju paliwa
          this.fetchStationDetails(station_id, fuel_type_id, suggestion);
        })
        .catch((error) => {
          console.error("Błąd pobierania danych Station Fuel Type:", error);
        });
    },

    // Pobieranie szczegółów stacji i rodzaju paliwa
    fetchStationDetails(station_id, fuel_type_id, suggestion) {
      // Pobranie danych stacji
      axios
        .get(`http://localhost:8000/api/stations/${station_id}`)
        .then((response) => {
          suggestion.station_name = response.data.name; // Zapisanie nazwy stacji
          suggestion.station_address = response.data.address; // Zapisanie adresu stacji
        })
        .catch((error) => {
          console.error("Błąd pobierania danych stacji:", error);
        });

      // Pobranie danych rodzaju paliwa
      axios
        .get(`http://localhost:8000/api/fuel-types/${fuel_type_id}`)
        .then((response) => {
          suggestion.fuel_type_name = response.data.name; // Zapisanie nazwy paliwa
        })
        .catch((error) => {
          console.error("Błąd pobierania danych rodzaju paliwa:", error);
        });
    },

    // Funkcja do zatwierdzania propozycji
    approveSuggestion(suggestionId) {
    axios
        .put(
            `http://localhost:8000/api/fuel-price-suggestions/${suggestionId}`,
            { approved: 1 },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
        .then(() => {
            // Po zatwierdzeniu odśwież listę zgłoszeń
            this.fetchSuggestions();

            // Zwiększ licznik zaakceptowanych zgłoszeń
            this.approvedCount++;
        })
        .catch((error) => {
            console.error("Błąd przy zatwierdzaniu propozycji:", error.response);
            // Pokazujemy pełny błąd z odpowiedzi serwera
        });
    },

  },
};
</script>

<style scoped>
/* Style dla tabeli */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

button {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: darkgreen;
}

button.reject {
  background-color: red;
}

button.reject:hover {
  background-color: darkred;
}

</style>
