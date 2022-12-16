<template>
  <section class="row bg-dark sidebar justify-content-center">
    <div v-if="user.isAuthenticated">
      <div class="col-12 mt-5"><img :src="account.picture" alt="User's Picture" class="img-fluid border border-light">
      </div>
      <router-link class="col-10" :to="{ name: 'Home' }">
        <h5 class="my-3 text-center text-primary">Home</h5>
      </router-link>
      <router-link class="col-10" :to="{ name: 'Account' }">
        <h5 class="my-3 text-primary text-center">
          Account
        </h5>
      </router-link>
      <button class="col-12 my-2 btn btn-success" data-bs-toggle="modal" data-bs-target="#eventModal">New Event</button>
      <button @click="logout()" class="col-12 btn btn-outline-success my-2">Logout</button>
    </div>
    <div v-else>
      <button class="col-12 btn btn-success mt-5" @click="login()">Login</button>
      <router-link class="col-10" :to="{ name: 'Home' }">
        <h6 class="my-4 text-center text-primary">Home</h6>
      </router-link>
    </div>
  </section>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}


</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.sidebar {
  height: 100vh;
}
</style>


