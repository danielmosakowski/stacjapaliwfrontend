<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="card">
          <div class="card-header">
            Dashboard
          </div>
          <div class="card-body">
            <p v-if="user" class="card-text">You are logged in! {{user.data.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        user: null,
      };
    },

    mounted() {
      this.getUserDetails();
    },

    methods: {
      getUserDetails(){
        axios.get('http://localhost:8000/api/userprofile')
            .then(response =>{
              //console.log(response.data)
              this.user = response.data
        })
            .catch(error =>{

        })
      }
    },
  }

</script>