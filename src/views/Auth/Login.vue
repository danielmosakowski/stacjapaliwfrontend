<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mt-5 offset-3">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">
            <form>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
              </div>





              <button type="submit" class="btn btn-primary">Login</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>