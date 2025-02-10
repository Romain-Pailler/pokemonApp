<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Liste des Pokémons</h1>

    <!-- Barre de recherche -->
    <div class="flex gap-4 justify-center mb-8">
      <input 
        type="text" 
        v-model="nomPokemon" 
        placeholder="Recherchez votre pokemon favori !" 
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full max-w-md"
      >
      <button 
        @click="search"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 active:bg-blue-700"
      >
        Chercher
      </button>
    </div>

    <!-- Grille -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
      <div v-for="pokemon in pokemons" :key="pokemon.id">
        <Pokemon :pokemon="pokemon"/>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-center items-center gap-4 mt-8">
      <button 
        v-if="endpoint.previous" 
        @click="previous"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 active:bg-blue-700"
      >
        &lt;
      </button>
      <button 
        v-if="endpoint.next" 
        @click="next"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 active:bg-blue-700"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import { getPoke } from "@/services/httpClient";
import Pokemon from "./Pokemon.vue";

export default {
  components: { Pokemon },
  data() {
    return {
      pokemons: [],
      endpoint: {},
      nomPokemon: '',
    };
  },
  async mounted() {
    await this.fetchPokemonData('pokemon');
  },
  methods: {
    async fetchPokemonData(endpoint) {
      try {
        if (endpoint.startsWith("pokemon/")) {
          const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
          if (!response.ok) throw new Error(`Erreur lors du chargement de ${endpoint}`);

          const detailsPoke = await response.json();
          this.pokemons = [this.formatPokemonData(detailsPoke)];
        } else {
          this.endpoint = await getPoke(`${endpoint}`);
          this.pokemons = await Promise.all(
            this.endpoint.results.map(async (pokemon) => {
              const response = await fetch(pokemon.url);
              if (!response.ok) throw new Error(`Erreur lors du chargement de ${pokemon.name}`);

              const detailsPoke = await response.json();
              return this.formatPokemonData(detailsPoke);
            })
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      }
    },

    formatPokemonData(detailsPoke) {
      return {
        id: detailsPoke.id,
        name: detailsPoke.name,
        image_gif: detailsPoke.sprites.other.showdown.front_default,
        image_artwork: detailsPoke.sprites.other.dream_world.front_default,
        image_default: detailsPoke.sprites.front_default,
        isShiny: false,
        shiny_gif: detailsPoke.sprites.other.home.front_shiny,
        price: detailsPoke.base_experience,
        stats: detailsPoke.stats,
        height: detailsPoke.height,
        weight: detailsPoke.weight,
        types: detailsPoke.types,
        allSprites: detailsPoke.sprites
      };
    },

    async next() {
      if (this.endpoint.next) {
        const nextEndpoint = this.endpoint.next.replace("https://pokeapi.co/api/v2/", "");
        await this.fetchPokemonData(nextEndpoint);
      }
    },

    async previous() {
      if (this.endpoint.previous) {
        const prevEndpoint = this.endpoint.previous.replace("https://pokeapi.co/api/v2/", "");
        await this.fetchPokemonData(prevEndpoint);
      }
    },

    async search() {
      if (this.nomPokemon) {
        await this.fetchPokemonData(`pokemon/${this.nomPokemon.toLowerCase()}`);
      } else {
        await this.fetchPokemonData("pokemon");
      }
    }
  },
};
</script>
