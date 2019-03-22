<template>
  <div
    class="modal fade"
    id="join-room"
    tabindex="-1"
    role="dialog"
    aria-labelledby="add-task-label"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title" id="add-task-label">User Info</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="text-left">
            <div class="form-group">
              <label for="name">Username</label>
              <input v-model="username" type="text" class="form-control" placeholder="Your username" id="name">
            </div>
          </form>
        
          <button v-on:click.prevent="enteringPlayer" type="submit" class="btn btn-primary">Enter Room</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      username: ''
    }
  },
  sockets: {
    enterRoom(data) {
      this.$store.dispatch('currentRoom', data)
      $('#join-room').modal('toggle');
      this.$router.push({
        path: "/game"
      })
    },
    newJoin(newUser) {
      this.$store.dispatch('newJoin', newUser)
    }
  },
  methods: {
    enteringPlayer() {
      this.$socket.emit('enterRoom', {
        roomName: this.$store.state.roomName,
        username: this.username
      })
    }
  }
};
</script>



