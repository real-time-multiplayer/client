import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roomList: [],
    roomName: '',
    currentJoint: '',
    currentUsers: []
  },
  mutations: {
    mutateRoom(state, roomObj) {
      state.roomList.push(roomObj);
    },

    mutatefetchRoom(state, roomArr) {
      state.roomList = roomArr
    },

    mutateRoomName(state, roomName) {
      state.roomName = roomName
    },

    mutateCurrRoom(state, data) {
      state.currentJoint = data.roomName,
      state.currentUsers = data.currUsers
    },

    mutateCurrUsers(state, newJoin) {
      state.currentUsers.push(newJoin)
    }
  },
  actions: {
    createRoom({ commit }, dataObj) {
      commit('mutateRoom', dataObj)
    },

    fetchRoom({ commit }, dataArr) {
      commit('mutatefetchRoom', dataArr)
    },

    changeSelectedRoom({ commit }, roomName) {
      commit('mutateRoomName', roomName)
    },

    currentRoom({ commit }, data) {
      commit('mutateCurrRoom', data)
    },

    newJoin({ commit }, newJoin) {
      commit('mutateCurrUsers', newJoin)
    }
  },
});
