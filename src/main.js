import Vue from 'vue';
import io from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';

const socket = io('http://localhost:3000');

Vue.config.productionTip = false;

Vue.prototype.$socket = socket;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
