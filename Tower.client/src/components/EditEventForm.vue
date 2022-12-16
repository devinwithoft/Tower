<template>

  <div class="modal-header">
    <h5 class="modal-title" id="editEventModal">Edit an event</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <form @submit.prevent="createEvent()">
      <label for="Name">Name</label>
      <input type="text" required class="form-control mb-3" id="Name" v-model="eventEdit.name"
        :placeholder="thisEvent.name">

      <label for="Description">Description</label>
      <textarea type="text" required class="form-control mb-3" id="Description" v-model="eventEdit.description"
        :placeholder="thisEvent.description"></textarea>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    <button type="button" class="btn btn-primary" @click.prevent="editEvent(thisEvent.id)">Submit edits</button>
  </div>
</template>


<script>
import { computed, reactive, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { Modal } from 'bootstrap';
import { AppState } from "../AppState.js";
export default {
  setup() {
    onMounted(() => { eventEdit.value = AppState.activeEvent });
    const eventEdit = ref({})
    const route = useRouter()
    return {
      eventEdit,
      thisEvent: computed(() => AppState.activeEvent),
      async editEvent(eventId) {
        try {
          await eventsService.editEvent(eventId, eventEdit.value)
          eventEdit.value = {}
          Modal.getOrCreateInstance('#eventEditModal').hide()
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