<template>
  <div v-if="thisEvent" :style="{ 'background-image': `url(${thisEvent.coverImg})` }">
    <section class="bg-coverImg row align-items-center">
      <div class="col-4 bottom">
        <img :src="thisEvent.coverImg" alt='' class="img-fluid py-2">
        <img v-if="eventCancelled" src="https://cdntest.bridge909.org/images/image-2-600x288.png" alt=""
          class="img-fluid stack">
      </div>
      <div class="col-8 text-light">
        <section class="row">
          <div class="col-12 d-flex justify-content-between light-text-shadow">
            <div>
              <h4>{{ thisEvent.name }}</h4>
              <h6>{{ thisEvent.location }}</h6>
            </div>
            <div>
              <div v-if="eventCancelled && (thisEvent.creatorId == account.id)" class="text-end">
                <button class="btn btn-danger mdi mdi-dots-horizontal disabled" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
                </button>
              </div>
              <div v-else-if="(thisEvent.creatorId == account.id)" class="text-end">
                <button class="btn btn-secondary mdi mdi-dots-horizontal" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#eventEditModal">Edit
                      Event</a></li>
                  <li><a class="dropdown-item" @click="cancelEvent(thisEvent.id)">Cancel Event</a></li>
                </ul>
              </div>
              <h6 class="light-text-shadow">{{ new Date(thisEvent.startDate).toLocaleDateString() }}</h6>
            </div>
          </div>
          <div class="col-12 light-text-shadow">{{ thisEvent.description }}</div>
          <div class="col-12 d-flex justify-content-between py-3 light-text-shadow">
            <div class="col-4">{{ thisEvent.capacity }} Spots Left</div>
            <button v-if="eventCancelled" class="col-4 btn btn-danger disabled" @click="createTicket()">EVENT
              CANCELLED</button>
            <button v-else-if="!account.id" class="col-4 btn btn-warning disabled">SIGN IN TO ATTEND</button>
            <button v-else-if="attendingEvent" class="col-4 btn btn-danger"
              @click="removeTicket(attendingEvent.id)">CANCEL
              TICKET</button>
            <button v-else-if="!attendingEvent && thisEvent.capacity > 0" class="col-4 btn btn-warning"
              @click="createTicket()">ATTEND</button>
          </div>
        </section>
      </div>
    </section>
  </div>
  <!-- SECTION ATTENDING LIST -->
  <section class="row justify-content-center">
    <div class="col-10 text-ldark mt-2">
      <h6 v-if="tickets.length > 0">See who is attending</h6>
      <h6 v-else>Be the first to attend this event!</h6>
    </div>
    <div class="col-8 mb-4">
      <section class="row bg-ldark row-height">
        <div v-for="t in tickets" class="col-1">
          <img :src="t.profile.picture" :title="t.profile.name" class="avatar rounded-circle p-1">
        </div>
      </section>
    </div>
  </section>
  <!-- SECTION COMMENTS -->
  <section class="row justify-content-center">
    <div class="col-8 bg-ldark">
      <section class="row justify-content-center">
        <div class="col-10">
          <form v-if="account.id" @submit.prevent="postComment()">
            <textarea name="" id="" class="form-control my-2" placeholder="comments" v-model="editable.body"></textarea>
            <button class="btn btn-success">Post Comment</button>
          </form>
          <div v-else>
            <h5 class="text-center my-2 mb-4 text-black">Please sign in to post comments</h5>
          </div>
        </div>
      </section>
      <section class="row justify-content-center" v-if="(comments.length > 0)">
        <div v-for="c in comments" class="col-10 my-3">
          <CommentComponent :comment="c" />
        </div>
      </section>
      <section v-else class="row justify-content-center my-2">
        <div class="col-10">
          <p class="text-center text-black">There are no comments for this event yet</p>
        </div>
      </section>
    </div>
  </section>
  <ModalComponent id="eventEditModal">
    <EditEventForm />
  </ModalComponent>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import ModalComponent from "../components/ModalComponent.vue";
import EditEventForm from "../components/EditEventForm.vue";


export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId, editable.value);
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    async function getTicketsByEventId() {
      try {
        await ticketsService.getTicketsByEventId(route.params.eventId);
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getEventById();
      getCommentsByEventId();
      getTicketsByEventId();
    });
    return {
      editable,
      thisEvent: computed(() => AppState.activeEvent),
      coverImg: computed(() => AppState.activeEvent.coverImg),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      attendingEvent: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      eventCancelled: computed(() => AppState.activeEvent.isCanceled),
      tickets: computed(() => AppState.tickets),
      async postComment() {
        try {
          editable.value.eventId = route.params.eventId;
          await commentsService.postComment(editable.value);
          editable.value = {};
        }
        catch (error) {
          Pop.error(error.message);
        }
      },
      async createTicket() {
        try {
          await ticketsService.createTicket({ eventId: route.params.eventId });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async removeTicket(ticketId) {
        try {
          await ticketsService.removeTicket(ticketId);
        }
        catch (error) {
          Pop.error(error.message);
        }
      },
      async cancelEvent(eventId) {
        if (await Pop.confirm("Are you sure you want to cancel this event?")) {
          await eventsService.cancelEvent(eventId)
        }
      },
      async getTicketsByEventId() {
        try {
          await ticketsService.getTicketsByEventId(route.params.eventId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    };
  },
  components: { ModalComponent, EditEventForm }
};
</script>


<style lang="scss" scoped>
.bg-coverImg {
  background: rgba(1, 15, 19, 0.4);
  border: 1px solid #56C7FB;
  backdrop-filter: blur(12px);
  border-radius: 3px;

}

.bottom {
  position: relative;
}

.stack {
  position: absolute;
  left: 5px;
  top: 20px
}

.avatar {
  height: 10vh;
  width: 10vh
}

.row-height {
  height: 10vh;
}
</style>