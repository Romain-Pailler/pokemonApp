<template>
    <h1>Mon panier</h1>
    <div v-if="count > 0">
        <p>Nombre de Pokémon : {{ count }}</p>
        <p>Prix total : {{ allPrices }} €</p>
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="cart-item">
            <p>
                <img :src="pokemon.image_gif" :alt="pokemon.name" class="cart-image" />
                <strong>{{ pokemon.name }}</strong> - Prix : {{ pokemon.price }} €
            </p>
            <p>Quantité : {{ pokemon.quantity }}</p>
            <button @click="deleteToCart(pokemon)">➖</button>
            <button @click="addToCart(pokemon)">➕</button>
        </div>
        <button @click="$router.push('/Confirmation')">Valider mon panier</button>
    </div>
    <div v-else>
        Le panier est vide
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
<style scoped>
    .cart-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #f9f9f9;
    }
    .cart-image {
        width: 50px;
        height: 50px;
    }
</style>  