<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">--game_name--</div>
          <div class="card-body">
            <h5 class="card-title">Please Enter Room Name</h5>
            <form v-on:submit.prevent="createRoom">
              <div class="form-group">
                <input v-model="roomData.roomName" type="text" class="form-control" placeholder="Room Name">
              </div>
              <div class="form-group">
                <input v-model="roomData.capacity" type="Number" class="form-control" placeholder="0">
              </div>
              <button type="submit" class="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Room</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Room Name</th>
                  <th>Capacity</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(room, index) in roomList" v-bind:key="index">
                  <th>{{index + 1}}</th>
                  <th>{{room.roomName}}</th>
                  <th>{{room.capacity}}</th>
                  <th><button
                    v-on:click="changeSelectedRoom(room.roomName)"
                    type="button"
                    class="btn btn-primary my-2 my-sm-0"
                    data-toggle="modal"
                    data-target="#join-room"
                  >Join Room</button></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <CreateUser />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CreateUser from "@/components/CreateUser.vue";
export default {
  name: "CreateRoom",
  components: {
    CreateUser
  },
  sockets: {
    createRoom(roomObj) {
      this.$store.dispatch('createRoom', roomObj);
      this.roomData.roomName = '';
      this.roomData.capacity = 1;
      this.users = []
    }
  },
  data() {
    return {
      roomData: {
        roomName: '',
        capacity: 1,
        users: [],
        gameState: {
          players: {},
          coins: [],
          isPlaying: false
        }
      },
    };
  },
  computed: {
    roomList () {
      return this.$store.state.roomList;
    }
  },
  methods: {
    createRoom() {
      this.$socket.emit('createRoom', this.roomData);
    },
    changeSelectedRoom(roomName) {
      this.$store.dispatch('changeSelectedRoom', roomName)
    }
  },
};
</script>
<style>
.full-height {
    height: 100vh;
  }
</style>
