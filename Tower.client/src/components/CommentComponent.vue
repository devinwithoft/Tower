<template>
  <section class="row align-items-start justify-content-center">
    <div class="col-2" :class="(comment.creator.id == account.id) && 'ms-5'">
      <img :src="comment.creator.picture" alt="User Image" class="rounded rounded-circle avatar">
    </div>
    <div class="col-8">
      <h5>{{ comment.creator.name }}</h5>
      {{ comment.body }}
    </div>
    <div v-if="comment.creator.id == account.id" @click="deleteComment(comment.id)"
      class="col-1 mdi mdi-delete btn btn-outline-danger" title="Delete your comment"></div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteComment(commentId) {
        if (await Pop.confirm("Delete your comment?")) {
          await commentsService.deleteComment(commentId)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.avatar {
  height: 10vh;
  width: 10vh
}
</style>