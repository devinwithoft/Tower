<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-12 mt-5 mb-3">
        <h2>
          UPCOMING EVENTS
        </h2>
      </div>
      <div v-if="accountTickets.length > 0" v-for="a in accountTickets" class="col-10 py-3">
        <TicketComponent :ticket="a" />
      </div>
      <div v-else class="col-12 mt-2">
        <h3>You are currently not attending any events, go to an event page to join an event.</h3>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    async function getAccountTickets() {
      try {
        await accountService.getAccountTickets()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => { getAccountTickets() })
    return {
      account: computed(() => AppState.account),
      accountTickets: computed(() => AppState.accountTickets)
    }
  }
}
</script>

<style>
img {
  max-width: 100px;
}
</style>
