<template>
  <div>
    <Canvas />
  </div>
</template>

<script>
// @ is an alias to /src
import Canvas from '@/components/Canvas.vue';
import Scoreboard from '@/components/Scoreboard.vue';

export default {
  name: 'home',
  components: {
    Canvas,
    Scoreboard
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
};
</script>
