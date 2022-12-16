<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <section class="row align-items-end p-2">
      <div class="bg-blur text-light text-shadow bg-eventImg d-flex align-items-end rounded">
        <div class="bg-blur row">

          <div class="col-12 ">
            <h6>
              {{ event.name }}
            </h6>
          </div>
          <div class="col-12 d-flex justify-content-between">
            <p v-if="event.type == 'concert'">Concert</p>
            <p v-else-if="event.type == 'convention'">Convention</p>
            <p v-else-if="event.type == 'sport'">Sports</p>
            <p v-else-if="event.type == 'digital'">Digital Event</p>
            <p>{{ new Date(event.startDate).toLocaleDateString() }}</p>
          </div>
          <div v-if="event.isCanceled" class="col-12 bg-cancelled text-center">
            <h5>Event Cancelled</h5>
          </div>
          <div v-else-if="event.capacity <= 0" class="col-12 bg-cancelled text-center">
            <h5>Event Full</h5>
          </div>
          <p v-else class="text-end">{{ event.capacity }} tickets left</p>
        </div>
      </div>
    </section>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    return {
      coverImg: computed(() => `url(${props.event.coverImg})`),
    }
  }
};
</script>


<style lang="scss" scoped>
.bg-eventImg {
  background-image: v-bind(coverImg);
  height: 40vh;
  width: 100%;
  background-position: center;
  background-size: cover;

  .bg-blur {
    background: rgba(204, 243, 253, 0.2);
    border: 1px solid #56C7FB;
    backdrop-filter: blur(10px);
    border-radius: 3px;
  }

  .bg-cancelled {
    background: rgb(138, 28, 14);
  }

  // .no-pb {
  //   padding-bottom: 0 !important;
  // }
}
</style>