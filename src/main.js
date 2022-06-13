import Vue from "vue";
import App from "./App.vue";

import "@fortawesome/fontawesome-free/css/all.css";
import Vue2Filters from "vue2-filters";
import VueHtmlToPaper from "vue-html-to-paper";

Vue.config.productionTip = false;
Vue.use(Vue2Filters);

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css",
    process.env.BASE_URL + "print.css"
  ]
};

Vue.use(VueHtmlToPaper, options);


new Vue({
  render: h => h(App)
}).$mount("#app");
