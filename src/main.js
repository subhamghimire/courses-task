import Vue from "vue";
import { ToastPlugin, ModalPlugin, VBToggle } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";
import axios from "axios";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import Ripple from "vue-ripple-directive";

// Global Components
import "./global-components";

// 3rd party plugins
import "@/libs/portal-vue";
import "@/libs/toastification";

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(axios);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);
Vue.directive("b-toggle", VBToggle);
Vue.directive(Ripple);

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
