<template>
  <div class="container-fluid">
    <section class="row">
      <div v-if="event" class="col-12">

        HEY SQUAD
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() =)
    return {}
  }
};
</script>


<style lang="scss" scoped>

</style>