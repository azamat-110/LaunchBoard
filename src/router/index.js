import {createRouter, createWebHistory} from 'vue-router'
import LaunchPage from "@/pages/LaunchPage.vue";
import AboutPage from "@/pages/AboutPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', redirect: '/launches'},
        {path: '/launches', component: LaunchPage},
        {path: '/about', component: AboutPage},
    ],
});

export default router;
