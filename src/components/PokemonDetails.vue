<template>
    <div v-if="pokemon">
        <h1>{{ pokemon.name }}</h1>
        <div class="pokemon-card">
            <img :src="pokemon.image_gif" :alt="pokemon.name" class="pokemon-image"/>
            <h2>{{ pokemon.name }}</h2>
            <p>{{ pokemon.base_experience }}</p>
            <div v-for="type in pokemon.types" :key="type.type.name">{{ type.type.name }}</div>
            <p> Taille : {{ pokemon.height }} cm</p>
            <p> Poids : {{ pokemon.weight }} kg</p>
            <p> ID : {{ pokemon.id }}</p>
            <div v-for="stat in pokemon.stats" :key="stat.stat.name">{{ stat.stat.name }} = {{ stat.base_stat }}</div>
            <button @click="addToCart(pokemon)"> Ajouter dans le panier</button>
            <button @click="printPokes()"> Afficher le cache</button>
        </div>
    </div>
    <div v-else>
        <p>Chargement...</p>
    </div>
</template>

<script>
import { getPoke } from '@/services/httpClient';
import { cartStore, pokemonsStore } from '@/stores/store';
import { mapActions } from 'pinia';

export default {
    data() {
        return {
            pokemonName: this.$route.params.name,
            pokemon: null,  
            cartStore: cartStore(),
            pokeStore: pokemonsStore(),  
        };
    },
    async mounted() {
        this.pokemon = this.pokeStore.getPoke(this.pokemonName);

        if (!this.pokemon) {
            try {

                const response = await getPoke(`pokemon/${this.pokemonName}`);
                if (!response.ok) throw new Error("Pokémon introuvable");

                const data = await response.json();
                this.pokemon = data;
                this.pokeStore.addPoke(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du Pokémon :", error);
            }
        }
    },
    methods: {
        ...mapActions(cartStore, ['addToCart']),
        ...mapActions(pokemonsStore, ['printPokes']),
    }
};
</script>

<style scoped>
.pokemon-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pokemon-image {
  max-width: 100px;
  margin-bottom: 10px;
}
</style>
