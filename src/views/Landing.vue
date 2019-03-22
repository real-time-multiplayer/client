<template>
  <div>
    <transition name="fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>
  </div>
</template>
<script>
import CreateRoom from "@/components/CreateRoom.vue";

import { mapState } from "vuex";
export default {
  name: "Landing",
  components: {
    CreateRoom
  },
  data() {
    return {
      view: "CreateRoom"
    };
  },
  sockets: {
    fetchRoom(data) {
      this.$store.dispatch('fetchRoom', data.roomList);
    },
  },
};
</script>
<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

