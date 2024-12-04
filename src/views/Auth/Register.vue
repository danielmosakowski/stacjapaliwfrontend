<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mt-5 offset-3">
        <div class="card">
          <div class="card-header">
            Register
          </div>
          <div class="card-body">

            <ul v-for="error in errors">
              <li class="text-danger">{{ error }}</li>
            </ul>



            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" v-model="name" class="form-control" id="name" >
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" >
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" >
              </div>
              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input type="password" v-model="confirmed_password" class="form-control" id="confirmed_password" >
              </div>


              <button type="submit" class="btn btn-primary">Register</button>
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
        name: '',
        email: '',
        password: '',
        confirmed_password: '',
        errors: [],
        successMsg: '',
      }
    },
    methods: {
      register() {
        //alert('hello')

        //this.errors = '';
        this.clearMessage();

        if(this.password !== this.confirmed_password){
          this.errors = ['Your passwords does not match'];
          return;
        }
        axios.post('http://localhost:8000/api/register',{
          name: this.name,
          email: this.email,
          password: this.password,
        }).then(response => {
          console.log(response);
        }).catch(error =>{
           this.errors = Object.values(error.response.data.errors).flat()
        })
      },

      clearMessage(){
        this.errors = '';
      }

    }
  }
</script>