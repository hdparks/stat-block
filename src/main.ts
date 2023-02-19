import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* import font awesome icon component */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";

library.add(faCircle, faCircleRegular);
const app = createApp(App);

app.use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.component("FontAwesomeLayers", FontAwesomeLayers);
app.mount("#app");
