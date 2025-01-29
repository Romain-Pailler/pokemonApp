import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        count: 0, // Nombre total de Pokémon dans le panier
        pokemons: [], // Liste des Pokémon avec leur quantité
        orders: [] //historique des commandes
    }),
    actions: {
        addToCart(pokemon) {
            const existingPokemon = this.pokemons.find((p) => p.id === pokemon.id);
            if (existingPokemon) {
                existingPokemon.quantity++;
            } else {
                this.pokemons.push({ ...pokemon, quantity: 1 });
            }
            this.increment();
    },
        deleteToCart(pokemon) {
            const existingPokemon = this.pokemons.find((p) => p.id === pokemon.id);
            if (existingPokemon) {
                if (existingPokemon.quantity > 1) {
                    existingPokemon.quantity--;
                } else {
                    this.pokemons = this.pokemons.filter((p) => p.id !== pokemon.id); // Supprime complètement si quantité = 0
                }
            this.decrement();
            }
        },
        increment() {
            this.count++;
        },
        decrement() {
            if (this.count > 0) this.count--;
        },
        confirmOrder(){
            this.orders.push({
                id: Date.now(),
                items:[...this.pokemons],
                date: new Date().toLocaleTimeString()
            });
            this.pokemons = [];
            this.count = 0;
        }
    },
    getters: {
        allPrices() {
            return this.pokemons.reduce(
                (total, pokemon) => total + pokemon.base_experience * pokemon.quantity,0
            );
        },
        isInCart: (state) => (id) => {
            return state.pokemons.some((pokemon) => pokemon.id === id);
    }
    }
});
