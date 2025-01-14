<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mt-5 offset-3">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">

            <ul v-for="error in errors">
              <li class="text-danger">{{ error }}</li>
            </ul>

            <!--<p class="text-success">{{successMsg}}</p>   -->

            <form @submit.prevent="login">

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" >
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" >
              </div>


              <button type="submit" class="btn btn-primary">login</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      email: '',
      password: '',
      is_admin: '',
      errors: [],
    }
  },
  methods: {
    login() {
      //alert('hello')

      //this.errors = '';
      this.clearMessage();

      axios.get('/sanctum/csrf-cookie').then(response => {

      axios.post('http://localhost:8000/api/login',{
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      }).then(response => {
        //console.log(response);
        //console.log(response.data)

        //dispatch authentication
        const status=true;
        const token=response.data.token
        console.log(response.data.token)

        this.$store.dispatch('setAuthToken',token)
        //this.$store.dispatch('checkUserAuthenticationStatus', status)
        this.$store.dispatch('setAuthStatus', status)



        this.$router.push({
          name: 'dashboard'
        })

        if (response.status == 201){
          //this.successMsg = response.data.message;
          console.log(response.data.message)
        }


      }).catch(error =>{

        if(error.response.status == 422){
          this.errors = Object.values(error.response.data.errors).flat()
        } else {
          this.errors=["Something went wrong"]
        }

      })

      });
    },

    clearMessage(){
      this.errors = '';
      this.successMsg='';
    }

  }
}
</script>