import { createRouter, createWebHashHistory } from "vue-router";
import { createApp, isProxy } from "vue";
import "./style.css";
import App from "./App.vue";
import Contactbook from "./views/Contactbook.vue";
import Person from "./views/Person.vue";

const routes = [
  { path: "/", component: Contactbook },
  { path: "/person/:id", component: Person, props: true },
];
const app = createApp(App);

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

app.use(router).mount("#app");
