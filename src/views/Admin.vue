<template>
  <div class="admin">
    <div class="content-wrapper">
      <h1 style="text-align: center;">Panel administratora</h1>
      <div class="button-container">
        <button @click="goToBrands">Zarządzaj markami stacji</button>
        <button @click="goToStations">Zarządzaj stacjami paliwowymi</button>
        <button @click="gotoAllUsers">Zarządzaj użytkownikami</button>
      </div>
      <h1>Lista zgłoszeń</h1>
      <p>Zaakceptowane zgłoszenia: {{ approvedCount }}</p>
      <p>Odrzucone zgłoszenia: {{ rejectedCount }}</p>
      <div class="table-wrapper">
        <table class="table">
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
            <td style="min-width: 300px;">{{ suggestion.station_address || 'Ładowanie...' }}</td>
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
    </div>
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

.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/tło5.jpg');
  background-size: cover;
  background-attachment: fixed; /* Unieruchamia tło */
  background-position: center;
}
.content-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 1600px; /* Zwiększenie maksymalnej szerokości dla większych tabel */
  width: 95%; /* Zapewnienie, że mieści się na ekranie */
  overflow-x: hidden; /* Usunięcie przewijania w poziomie */
}
.table-wrapper {
  width: 100%;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* Dodaje półprzezroczyste tło dla tabeli */
  border-radius: 10px;
  padding: 10px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
  table-layout: auto; /* Zapobiega rozciąganiu się kolumn */
}
.table th, .table td {
  padding: 8px;
  border: 1px solid #ddd;
  word-wrap: break-word; /* Zawijanie tekstu w komórkach */
  white-space: pre-wrap; /* Zawijanie długich linii */
  text-align: center;
}
.table th {
  background-color: #f4f4f4;
}

button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
  display: inline-block;
}

.button-container {
  display: flex;
  justify-content: center; /* Wyśrodkowuje przyciski poziomo */
  gap: 20px; /* Odstęp między przyciskami */
  flex-wrap: wrap; /* Pozwala na zawijanie przycisków na mniejsze ekrany */
  margin-top: 20px; /* Daje odstęp od góry */
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
