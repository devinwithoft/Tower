<template>
  <section class="row align-items-center justify-content-center">
    <div class="col-2 ms-5">
      <img :src="comment.creator.picture" alt="User Image" class="rounded rounded-circle avatar">
    </div>
    <div class="col-8">
      <h5>{{ comment.creator.name }}</h5>
      {{ comment.body }}


    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.avatar {
  height: 10vh;
  width: 10vh
}
</style>