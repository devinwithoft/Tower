<template>

  <div class="modal-header">
    <h5 class="modal-title" id="eventModal">Create an event</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <form @submit.prevent="createEvent()">
      <label for="Name">Name</label>
      <input type="text" required class="form-control mb-3" id="Name" v-model="editable.name">

      <label for="Description">Description</label>
      <textarea type="text" required class="form-control mb-3" id="Description"
        v-model="editable.description"></textarea>

      <label for="floatingSelect">Category</label>
      <select class="form-select mb-3" id="floatingSelect" aria-label="Floating label select example"
        v-model="editable.type">
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="digital">Digital Event</option>
        <option value="sport">Sports</option>
      </select>

      <label for="Location">Location</label>
      <input type="text" required class="form-control mb-3" id="Location" v-model="editable.location">
      <label for="Capacity">Capacity</label>
      <input type="number" required class="form-control mb-3" id="title" placeholder="Max Capaity"
        v-model="editable.capacity">
      <label for="StartDate">Start Date</label>
      <input type="date" required class="form-control mb-3" id="Capacity" min="2022-12-15" v-model="editable.startDate">
      <label for="coverImg">Cover Image</label>
      <input type="url" required class="form-control mb-3" id="coverImg" v-model="editable.coverImg">
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    <button type="button" class="btn btn-primary" @click.prevent="createEvent()">Submit event</button>
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