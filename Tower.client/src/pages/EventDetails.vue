<template>
  <div v-if="thisEvent" :style="{ 'background-image': `url(${thisEvent.coverImg})` }">
    <section class="bg-coverImg row align-items-center">
      <div class="col-4">
        <!-- TODO vbind alt text -->
        <img :src="thisEvent.coverImg" alt='' class="img-fluid py-2">
      </div>
      <div class="col-8 text-light">
        <section class="row">
          <div class="col-12 d-flex justify-content-between">
            <div>
              <h4>{{ thisEvent.name }}</h4>
              <h6>{{ thisEvent.location }}</h6>
            </div>
            <div>
              <h6>VIF EDIT POST GOES HERE</h6>
              <h6>{{ thisEvent.startDate }}</h6>
            </div>
          </div>
          <div class="col-12">{{ thisEvent.description }}</div>
          <div class="col-12 d-flex justify-content-between py-3">
            <div class="col-4">{{ thisEvent.capacity }} Spots Left</div>
            <button class="col-4 btn btn-warning">ATTEND</button>
          </div>
        </section>
      </div>
    </section>
  </div>
  <!-- SECTION ATTENDING LIST -->
  <section class="row">attending list goess here</section>
  <!-- SECTION COMMENTS -->
  <section class="row justify-content-center">
    <div class="col-8 bg-dark">
      <section class="row justify-content-center">
        <div class="col-10">
          <form v-if="account.id" @submit.prevent="postComment()">
            <textarea name="" id="" class="form-control my-2" placeholder="comments" v-model="editable.body"></textarea>
            <button class="btn btn-success">Post Comment</button>
          </form>
          <div v-else>
            <h5 class="text-center my-2">Please sign in to post comments</h5>
          </div>
        </div>
      </section>
      <section class="row" v-if="(comments.length > 0)">
        <div v-for="c in comments" class="col-10 my-3">
          <CommentComponent :comment="c" />
        </div>
      </section>
      <section v-else class="row justify-content-center my-2">
        <div class="col-10">
          <p class="text-center">There are no comments for this event yet</p>
        </div>
      </section>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";


export default {
  setup() {
    const editable = ref({})
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId, editable.value)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getEventById();
      getCommentsByEventId()
    });
    return {
      editable,
      thisEvent: computed(() => AppState.activeEvent),
      coverImg: computed(() => AppState.activeEvent.coverImg),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),

      async postComment() {
        try {
          editable.value.eventId = route.params.eventId
          await commentsService.postComment(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.bg-coverImg {
  background: rgba(1, 15, 19, 0.4);
  border: 1px solid #56C7FB;
  backdrop-filter: blur(12px);
  border-radius: 3px;

}
</style>