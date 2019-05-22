import Vue from "vue";
import App from "./App.vue";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Vue2Filters from "vue2-filters";

Vue.config.productionTip = false;
Vue.use(Vue2Filters);

new Vue({
  render: h => h(App)
}).$mount("#app");
