<template>
    <div v-if="pokemon" class="flex flex-col items-center p-6 bg-white rounded-xl shadow-md max-w-sm mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 capitalize">{{ pokemon.name }}</h1>
  
      <img :src="pokemon.image_default" :alt="pokemon.name" class="w-32 h-32 object-contain my-4" />
  
      <div class="flex space-x-2 my-2">
        <span 
          v-for="type in pokemon.types" 
          :key="type.type.name" 
          class="px-3 py-1 text-sm font-semibold text-white rounded-full"
          :style="{ backgroundColor: getTypeColor(type.type.name) }">
          {{ type.type.name }}
        </span>
      </div>
  
      <p class="text-gray-600 text-sm">Expérience : <span class="font-medium">{{ pokemon.price }}</span></p>
      <p class="text-gray-600 text-sm">Taille : <span class="font-medium">{{ pokemon.height }} cm</span></p>
      <p class="text-gray-600 text-sm">Poids : <span class="font-medium">{{ pokemon.weight }} kg</span></p>
      <p class="text-gray-600 text-sm">ID : <span class="font-medium">{{ pokemon.id }}</span></p>
  
      <!-- Statistiques en barres -->
      <div class="w-full mt-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Statistiques</h3>
        <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="mb-2">
          <div class="flex justify-between text-sm text-gray-700">
            <span class="capitalize">{{ stat.stat.name }}</span>
            <span class="font-medium">{{ stat.base_stat }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div 
              class="h-3 rounded-full transition-all"
              :style="{ width: (stat.base_stat / 200) * 100 + '%', backgroundColor: getStatColor(stat.base_stat) }">
            </div>
          </div>
        </div>
      </div>
  
      <div class="flex space-x-4 mt-6">
        <button @click="addToCart(pokemon)" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Ajouter au panier
        </button>
      </div>
    </div>
  
    <div v-else class="text-center py-6 text-gray-600">Chargement...</div>
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
        this.pokeStore.addPoke(this.pokemon);
      } catch (error) {
        console.error("Erreur lors de la récupération du Pokémon :", error);
      }
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(pokemonsStore, ['printPokes']),
  
    getTypeColor(type) {
      const colors = {
        normal: '#AAA67F',
        fighting: '#C12239',
        flying: '#A891EC',
        poison: '#A43E9E',
        ground: '#DEC16B',
        rock: '#B69E31',
        bug: '#A7B723',
        ghost: '#70559B',
        steel: '#B7B9D0',
        fire: '#F57D31',
        water: '#6493EB',
        grass: '#74CB48',
        electric: '#F9CF30',
        psychic: '#FB5584',
        ice: '#9AD6DF',
        dragon: '#7037FF',
        dark: '#75574C',
        fairy: '#E69EAC'
      };
      return colors[type] || '#A8A8A8';
    },
  
    getStatColor(value) {
      if (value >= 100) return '#16a34a'; // Vert foncé (très fort)
      if (value >= 80) return '#facc15'; // Jaune (moyen)
      return '#ef4444'; // Rouge (faible)
    }
  }
};
</script>
