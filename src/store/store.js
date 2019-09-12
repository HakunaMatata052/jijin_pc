import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      user_id: ""
    },
    buy:{},
    buysuccess:{}
  },
  mutations: {},
  actions: {}
});
