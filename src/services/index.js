import Home from '@/components/Home.vue';
import { compile } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {path:'/Home',name: "Home",component: Home},
    {path:'/Pokemon',name: "Pokemon", component: Pokemon}
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router