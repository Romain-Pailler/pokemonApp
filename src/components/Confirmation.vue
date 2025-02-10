<template>
    <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-10">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Confirmation de commande</h1>
        
        <div v-if="pokemons.length === 0" class="text-gray-600 text-center">
            <p>Votre panier est vide.</p>
        </div>
        
        <div v-else class="w-full">
            <ul class="w-full mb-4">
                <li v-for="pokemon in pokemons" :key="pokemon.id" class="flex justify-between p-2 border-b border-gray-300">
                    <span class="capitalize font-medium">{{ pokemon.name }}</span>
                    <span>{{ pokemon.quantity }}x ({{ pokemon.price * pokemon.quantity }}₽)</span>
                </li>
            </ul>
            
            <p class="text-lg font-semibold text-gray-700 text-right">Total : {{ allPrices }}₽</p>
            
            <div class="flex space-x-4 mt-6">
                <button @click="modalConfirmOrder" 
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                    Valider la commande
                </button>
                <button @click="$router.push('/Cart')" 
                        class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400">
                    Retour
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { cartStore } from '@/stores/store';
import { mapActions, mapState } from 'pinia';

export default {
    computed: {
        ...mapState(cartStore, ['pokemons', 'allPrices']),
    },
    methods: {
        ...mapActions(cartStore, ['confirmOrder']),
        modalConfirmOrder() {
            if (confirm("Êtes-vous sûr de vouloir valider votre commande ?")) {
                this.confirmOrder();
                alert("Commande validée !");
                this.$router.push('/History');
            }
        }
    }
};
</script>
