<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h1 class="text-2xl font-bold text-gray-800">Mon panier</h1>
        
        <div v-if="count > 0" class="mt-4">
            <p class="text-gray-700">Nombre de Pokémon : <span class="font-semibold">{{ count }}</span></p>
            <p class="text-gray-700">Prix total : <span class="font-bold">{{ allPrices }} ₽</span></p>
            
            <div v-for="pokemon in pokemons" :key="pokemon.id" class="flex items-center gap-4 border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50 mt-2">
                <img :src="pokemon.image_gif" :alt="pokemon.name" class="w-12 h-12" />
                <div class="flex-1 text-left">
                    <p class="text-gray-800 font-semibold">{{ pokemon.name }}</p>
                    <p class="text-gray-600">Prix : {{ pokemon.price }} ₽</p>
                    <p class="text-gray-600">Quantité : {{ pokemon.quantity }}</p>
                </div>
                <div class="flex space-x-2">
                    <button @click="deleteToCart(pokemon)" class="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition">➖</button>
                    <button @click="addToCart(pokemon)" class="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition">➕</button>
                </div>
            </div>
            
            <button @click="$router.push('/Confirmation')" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                Valider mon panier
            </button>
        </div>
        
        <div v-else class="text-gray-600 mt-4">
            Le panier est vide
        </div>
    </div>
</template>

<script>
import { cartStore } from "@/stores/store";
import { mapActions, mapState } from "pinia";

export default {
    computed: {
        ...mapState(cartStore, ["count", "pokemons", "allPrices"]),
    },
    methods: {
        ...mapActions(cartStore, ["addToCart", "deleteToCart"]),
    },
};
</script>
