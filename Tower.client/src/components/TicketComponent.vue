<template>
  <div class="container-fluid">
    <section class="row card-height bg-dark">
      <div class="col-5"><img :src="ticket.event.coverImg" alt="" class="img-fluid img-height"></div>
      <div class="col-5 mt-2" @click="router.push(`events/${ticket.event.id}`)">
        <h4>{{ ticket.event.name }}</h4>
        <h5>{{ ticket.event.location }}</h5>
        <h6>{{ new Date(ticket.event.startDate).toLocaleDateString() }}</h6>
      </div>
      <div class="div col-2">
        <button v-if="!ticket.event.eventCanceled" class="btn btn-danger mt-6" @click="removeTicket(ticket.id)">CANCEL
          TICKET</button>
        <button v-else-if="!ticket.event.eventCanceled" class="btn btn-danger mt-6 disabled">EVENT IS CANCELLED</button>

      </div>
    </section>
  </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";
export default {
  props: { ticket: { type: Object, required: true } },
  setup(props) {
    return {
      async removeTicket(ticketId) {
        try {
          await ticketsService.removeTicket(ticketId);
          Pop.toast("Ticket removed, you can get another ticket from the Event Page")
        }
        catch (error) {
          Pop.error(error.message);
        }
      }
    }
  },
}
</script>


<style lang="scss" scoped>
.mt-6 {
  margin-top: 23vh;
}

.card-height {
  height: 35vh;
}

.img-height {
  height: 35vh;
}
</style>