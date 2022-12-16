<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-11">
        <router-link :to="{ name: 'Home' }">
          <h1>TOWAH</h1>
        </router-link>
        <section class="row">
          <div class="col-12">
            <router-view />
          </div>
        </section>
      </div>
      <div class="col-1">
        <NavComponent class="sticky-top" />
      </div>
    </section>
  </div>

  <EventForm />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import EventForm from "./components/EventForm.vue"
import NavComponent from "./components/NavComponent.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { NavComponent, EventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
