
<template>
  <div class="container">
      <v-layout align-center justify-space-around row fill-height>
      <h1>{{player1name}}</h1>
      <h1>{{player2name}}</h1>
    </v-layout>
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
    getPlayer() {
      let roomId = this.$store.state.dataUser.room.id;
      db.collection("Rooms")
        .doc(`${roomId}`)
        .onSnapshot(doc => {
          console.log(doc.data());
          this.player1name = doc.data().players[0].name;
          this.player2name = doc.data().players[1].name;
        });
    },
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
