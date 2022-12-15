<template>
  <div class="container-fluid">
    <section class="row">
      <!-- TODO search buttons -->
      <div class="col-12">
        <section class="row">
          <div class="col-3 mb-2" v-for="e in events">
            <EventComponent class="rounded" :event="e" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from '../AppState.js';

export default {
  setup() {

    async function getEvents() {
      try {
        await eventsService.getAll()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

// .eventCard {
//   height: 20vh;
//   width: 20vw;
// }
</style>
