<template>
  <v-app>
    <v-layout align-start justify-center row fill-height>
      <!-- <CreateRoom></CreateRoom>
      <RoomList></RoomList>-->
      <Canvas/>
    </v-layout>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Canvas from '@/components/Canvas.vue';
import Scoreboard from '@/components/Scoreboard.vue';

export default {
  name: "home",
  components: {
    Canvas,
    Scoreboard
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
