
<template>
  <div class="container">

  </div>
</template>

<script>
import db from '@/scripts/config.js'

export default {
  name: 'Playgame',
  data: function () {
    return {
      player1name: 'Adit',
      player1move: this.$store.state.playermove,
      player1score: this.$store.state.playerscore,
      player2name: 'Player 2',
      player2move: 'hand-paper',
      player2score: 0
    }
  },
  methods: {

  },
  mounted () {
    this.getPlayer()
  },
  created () {
    (this.player1move = this.$store.state.playermove),
    (this.player1score = this.$store.state.playerscore)
  }
}
</script>

<style>
body,
footer {
  background-color: white;
}
</style>
