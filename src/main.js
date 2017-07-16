// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueAnalytics from 'vue-analytics';
import VueResource from 'vue-resource';
import infiniteScroll from 'vue-infinite-scroll';

import App from './App';
import router from './router';
import store from './store';

require('./assets/css/vue-material.css');
require('./assets/css/main.css');

const VueMaterial = require('vue-material');

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.use(infiniteScroll);
Vue.use(VueAnalytics, { id: 'UA-55363605-11' });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
