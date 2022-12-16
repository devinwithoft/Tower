<template>
  <div class="container-fluid bg-tower-dark">
    <section class="row">
      <div class="col-11">
        <router-link :to="{ name: 'Home' }">
          <h1 class="text-light">Tower</h1>
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

  <ModalComponent id="CreateEventForm">
    <CreateEventForm />
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateEventForm from "./components/CreateEventForm.vue"
import EventForm from "./components/ModalComponent.vue"
import NavComponent from "./components/NavComponent.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { NavComponent, EventForm, CreateEventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.bg-tower-dark {
  background-color: #2A2D3A;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.text-ldark {
  color: #7981A6;
}

.bg-ldark {
  background: #474C61;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
}



.text-shadow {
  text-shadow: 1px 1px 1px black;

  * {
    filter: drop-shadow(2px 1px 4px #0e0d0d1f);
  }
}

.light-text-shadow {
  text-shadow: 1px 1px 1px rgb(58, 58, 58);

  * {
    filter: drop-shadow(1px 1px 4px #0e0d0d1f);
  }
}
</style>
