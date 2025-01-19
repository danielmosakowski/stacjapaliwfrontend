<template>
  <div>
    <h1>Zaproponuj cenę</h1>
    <form @submit.prevent="submitSuggestion">
      <div>
        <label for="suggested_price">Proponowana cena:</label>
        <input v-model="form.suggested_price" type="number" step="0.01" id="suggested_price" required />
      </div>
      <div>
        <label for="photo">Dodaj zdjęcie:</label>
        <input type="file" @change="handleFileUpload" id="photo" />
      </div>
      <button type="submit">Wyślij</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user_id: { type: Number, required: true },
    station_fuel_type_id: { type: Number, required: true },
  },
  data() {
    return {
      form: {
        suggested_price: null,
        photo: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitSuggestion() {
      try {
        const formData = new FormData();
        formData.append("user_id", this.user_id);
        formData.append("station_fuel_type_id", this.station_fuel_type_id);
        formData.append("suggested_price", this.form.suggested_price);
        if (this.form.photo) {
          formData.append("photo", this.form.photo);
        }

        const response = await fetch("http://localhost:8000/api/fuel-price-suggestions", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Błąd podczas wysyłania propozycji.");
        }

        alert("Propozycja została wysłana pomyślnie!");
        this.$router.push("/"); // Powrót na stronę główną
      } catch (error) {
        console.error("Błąd:", error);
        alert("Wystąpił błąd. Spróbuj ponownie.");
      }
    },
  },
};
</script>