<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-10">
        <h1>TOWAH</h1>
        <section class="row">
          <div class="col-12">
            <router-view />
          </div>
        </section>
      </div>
      <div class="col-2">
        <Navbar />
      </div>
    </section>
  </div>


</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
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
