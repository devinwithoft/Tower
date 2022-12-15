<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <section class="row bg-eventImg align-items-end">
      <div class="bg-blur text-light">


        <div class="col-12">

          <h6>
            {{ event.name }}
          </h6>
        </div>
        <div class="col-10 d-flex justify-content-between">
          {{ event.type }}
          {{ event.startDate }}
        </div>
        <p class="text-end">{{ event.capacity }} tickets left</p>
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

  // .no-pb {
  //   padding-bottom: 0 !important;
  // }
}
</style>