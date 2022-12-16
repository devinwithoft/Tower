<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <section class="row bg-dark justify-content-evenly rounded">
          <div @click="filterBy = ''" class="col-2 btn btn-outline-light my-1">ALL</div>
          <div @click="filterBy = 'concert'" class="col-2 btn btn-outline-light my-1">CONCERTS</div>
          <div @click="filterBy = 'convention'" class="col-2 btn btn-outline-light my-1">CONVENTIONS</div>
          <div @click="filterBy = 'digital'" class="col-2 btn btn-outline-light my-1">DIGITAL EVENTS</div>
          <div @click="filterBy = 'sport'" class="col-2 btn btn-outline-light my-1">SPORTS</div>
        </section>
      </div>
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
import { onMounted, computed, ref } from "vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from '../AppState.js';

export default {
  setup() {
    const filterBy = ref("")
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
      filterBy,
      events: computed(() => { if (filterBy.value == "") { return AppState.events; } else { return AppState.events.filter(e => e.type == filterBy.value); } })
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
