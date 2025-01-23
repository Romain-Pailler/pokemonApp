<template>
    <div class="pokemon-container">
      <h1>Liste des Pokémons</h1>
      <input type="text" v-model="nomPokemon" placeholder="Recherchez votre pokemon favori !">
      <button @click="search">Chercher</button>
  
      <div class="pokemon-grid">
        <div class="pokemon-card" v-for="pokemon in pokemons" :key="pokemon.id">
            <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image"/>
          <h2 @click="goToDetails(pokemon.name)">{{ pokemon.name }}</h2>
          <p>Prix : {{ pokemon.price }}</p>
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
  
  export default {
    data() {
      return {
        pokemons: [],
        endpoint: {},
        nomPokemon: ''
      };
    },
    async mounted() {
      await this.fetchPokemons('pokemon');
    },
    methods: {
        async fetchPokemons(endpoint) {
        try {
          // Récupérer les données de l'API principale
            this.endpoint = await getPoke(`${endpoint}`);
          // Charger les détails des Pokémon en parallèle
            this.pokemons = await Promise.all(
            this.endpoint.results.map(async (pokemon) => {
              // Récupérer les détails de chaque Pokémon
                const response = await fetch(pokemon.url);
                if (!response.ok) {
                throw new Error(`Erreur lors du chargement de ${pokemon.name}`);
                }
                const detailsPoke = await response.json();
                return {
                id: detailsPoke.id,
                name: detailsPoke.name,
                image: detailsPoke.sprites.front_default,
                price: detailsPoke.base_experience,
                };
            })
            );
        } catch (error) {
            console.error("Erreur lors de la récupération des Pokémon :", error);
        }
        },
        async next() {
            if (this.endpoint.next) {
            const nextEndpoint = this.endpoint.next.replace("https://pokeapi.co/api/v2/", "");
            await this.fetchPokemons(nextEndpoint);
        }
        },
        async previous() {
        if (this.endpoint.previous) {
            const prevEndpoint = this.endpoint.previous.replace("https://pokeapi.co/api/v2/", "");
            await this.fetchPokemons(prevEndpoint);
                }
            },
        async search(){
            if (this.nomPokemon) {
                await this.fetchOnePokemon(`pokemon/${this.nomPokemon}`);
            }else{
                await this.fetchPokemons("pokemon");
            }
            
        },
        async fetchOnePokemon(endpoint){
            try {
                this.endpoint = await getPoke(endpoint);
                this.pokemons = [
                {
                id: this.endpoint.id,
                name: this.endpoint.name,
                image: this.endpoint.sprites.front_default,
                price: this.endpoint.base_experience,
                },
          ];
            } catch (error) {
                console.error(error);
            }
        },
        goToDetails(pokemonName) {
          this.$router.push({name:'Pokemon',params: { name: pokemonName } });
        },
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