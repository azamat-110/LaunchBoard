import { createRouter, createWebHashHistory } from 'vue-router';
import LaunchPage from "@/pages/LaunchPage.vue";
import AboutPage from "@/pages/AboutPage.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/launches'},
    { path: '/launches', component: LaunchPage },
    { path: '/about', component: AboutPage },
  ],
});

export default router;
