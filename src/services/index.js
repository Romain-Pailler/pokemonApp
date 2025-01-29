import Cart from '@/components/Cart.vue';
import Confirmation from '@/components/Confirmation.vue';
import History from '@/components/History.vue';
import Home from '@/components/Home.vue';
import PokemonDetails from '@/components/PokemonDetails.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {path:'/Home',name: 'Home',component: Home},
    {path:'/Pokemon/:name',name: 'Pokemon', component: PokemonDetails},
    {path:'/Cart',name: 'Cart',component: Cart},
    { path:'/Confirmation', component: Confirmation },
    { path:'/History', component: History },
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router