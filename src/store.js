/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomList: [],
    playermove: 'smile',
    playerscore: 0,
    dataUser: {}
  },
  mutations: {
    //siapin functio
    mutateRoom(state, roomArr) {
      state.roomList = roomArr
    },
    initialData(state, arrRoom) {
      state.roomList = arrRoom
    },
    changeMove(state, playermove) {
      state.playermove = playermove
    },
    changeScore(state, playerscore) {
      state.playerscore = playerscore
    },
    mutateDataUser(state, payload) {
      state.dataUser = payload
    }
  },
  actions: {
    createUser({ commit }, name) {
      
    },
    createRoom({ commit }, dataObj) {
      
    },
    getRoom({ commit }) {
      
    },
    changeMove({ commit }, playermove) {
      
    },
    changeScore({ commit }, playerscore) {
      
    },
    setUser({ commit }, payload) {
      
    }
  }
})
