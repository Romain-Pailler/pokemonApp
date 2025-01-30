<template>
    <div class="pokemon-container">
      <h1>Liste des Pokémons</h1>
      <input type="text" v-model="nomPokemon" placeholder="Recherchez votre pokemon favori !">
      <button @click="search">Chercher</button>
  
      <div class="pokemon-grid">
        <div class="pokemon-card" v-for="pokemon in pokemons" :key="pokemon.id">
          <Pokemon :pokemon="pokemon"/>
        </div>
      </div>
  
      <div class="navigation">
        <button v-if="endpoint.previous" @click="previous" class="nav-button">&lt;</button>
        <button v-if="endpoint.next" @click="next" class="nav-button">&gt;</button>
      </div>
    </div>
  </template>
  
  <script>
import { getPoke } from "@/services/httpClient";
import { pokemonsStore } from "@/stores/store";
import { mapActions } from "pinia";
import Pokemon from "./Pokemon.vue";

export default {
  components: {
    Pokemon
  },
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
    ...mapActions(pokemonsStore, ["addPoke"]),
    async fetchPokemonData(endpoint) {
      try {
        const store = pokemonsStore(); 
        // Vérifie si la recherche concerne un Pokémon unique ou une liste
        if (endpoint.startsWith("pokemon/")) {
          const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
          if (!response.ok) {
            throw new Error(`Erreur lors du chargement de ${endpoint}`);
          }
          const detailsPoke = await response.json();
          this.pokemons = [this.formatPokemonData(detailsPoke)];
          store.addPoke(this.pokemons);
        } else {
          this.endpoint = await getPoke(`${endpoint}`);
          this.pokemons = await Promise.all(
            this.endpoint.results.map(async (pokemon) => {
              const response = await fetch(pokemon.url);
              if (!response.ok) {
                throw new Error(`Erreur lors du chargement de ${pokemon.name}`);
              }
              const detailsPoke = await response.json();
              const pokemonFormated = this.formatPokemonData(detailsPoke)
              store.addPoke(pokemonFormated);
              return pokemonFormated;
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
        shiny_gif: detailsPoke.sprites.other.showdown.front_shiny,
        price: detailsPoke.base_experience,
        stats: detailsPoke.stats
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

<style scoped>
.pokemon-container {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px auto;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.nav-button {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background: #0056b3;
}
</style>