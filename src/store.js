/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/scripts/config.js'

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
      db
        .collection("Users")
        .add({
          name: name,
        })
        .then((docRef) => {
          console.log("Document successfully written with Id!", docRef.id);
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    createRoom({ commit }, dataObj) {
      db
        .collection("Rooms")
        .add({
          roomName: dataObj.roomName,
          capacity: dataObj.capacity,
          players: []
        })
        .then((docRef) => {
          console.log('success')
          return db
            .collection("Rooms")
            .get()
        })
        .then(snapshot => {
          let data = []
          snapshot.forEach(doc => {
            data.unshift({ id: doc.id, ...doc.data() })
          })
          commit('mutateRoom', data)
          // console.log(data, '=============================')
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    getRoom({ commit }) {
      db
        .collection("Rooms")
        .onSnapshot(function (querySnapshot) {
          const data = querySnapshot.docs.map(function (doc) {
            return { id: doc.data().id, ...doc.data() }
          })
          commit('initialData', data)
        })


    },
    changeMove({ commit }, playermove) {
      commit('changeMove', playermove)
    },
    changeScore({ commit }, playerscore) {
      commit('changeScore', playerscore)
    },
    setUser({ commit }, payload) {
      commit('mutateDataUser', payload)
    }
  }
})
