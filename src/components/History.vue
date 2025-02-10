<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h1 class="text-2xl font-bold text-gray-800">Historique des commandes</h1>
        
        <div v-if="orders.length === 0" class="text-gray-600 mt-4">
            <p>Aucune commande passée.</p>
        </div>
        
        <div v-else class="mt-4 space-y-4">
            <div v-for="order in orders" :key="order.id" class="border border-gray-200 p-4 rounded-lg shadow-sm">
                <p class="text-gray-700 font-semibold">Commande du {{ order.date }}</p>
                <p class="text-gray-600">Prix : <span class="font-bold">{{ order.price }}₽</span></p>
                <ul class="mt-2 text-gray-700">
                    <li v-for="pokemon in order.items" :key="pokemon.id" class="border-b last:border-none py-1">
                        {{ pokemon.name }} - {{ pokemon.quantity }}x ({{ pokemon.price * pokemon.quantity }}₽)
                    </li>
                </ul>
            </div>
        </div>
        
        <button @click="$router.push('/Home')" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
            Retour à l'accueil
        </button>
    </div>
</template>

<script>
import { cartStore } from '@/stores/store';
import { mapState } from 'pinia';

export default {
    computed: {
        ...mapState(cartStore, ['orders']),
    }
};
</script>
