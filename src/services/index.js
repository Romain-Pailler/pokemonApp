import Cart from '@/components/Cart.vue';
import Home from '@/components/Home.vue';
import PokemonDetails from '@/components/PokemonDetails.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {path:'/Home',name: 'Home',component: Home},
    {path:'/Pokemon/:name',name: 'Pokemon', component: PokemonDetails},
    {path:'/Cart',name: 'Cart',component: Cart}
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router