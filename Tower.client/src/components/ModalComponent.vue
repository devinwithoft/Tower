<template>
  <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { Modal } from 'bootstrap';
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createEvent() {
        try {
          const event = await eventsService.createEvent(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#eventModal').hide()
          router.push({ name: 'Event', params: { eventId: event.id } })
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>