<template>
    <div class="pokemon-container">
      <h1>Liste des Pokémons</h1>
      <input type="text" v-model="nomPokemon" placeholder="Recherchez votre pokemon favori !">
      <button @click="search">Chercher</button>
  
      <div class="pokemon-grid">
        <div class="pokemon-card" v-for="pokemon in pokemons" :key="pokemon.id">
          <!-- Conteneur de l'image principale -->
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" @click="changeShiny(pokemon)" v-if="!pokemon.isShiny"/>
          <img :src="pokemon.shiny" :alt="pokemon.name" class="pokemon-image" @click="changeShiny(pokemon)" v-if="pokemon.isShiny"/>
        
          <!-- Image "pokeball" affichée en haut à droite si dans le panier -->
          <img 
            v-if="isInCart(pokemon.id)" 
            src="@/assets/pokeball.png" 
            alt="Déjà dans le panier" 
            class="pokemon-icon" 
          />
        
          <!-- Informations de la carte -->
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
import { useCounterStore } from "@/stores/store";
import { mapState } from "pinia";
  
  export default {
    data() {
      return {
        pokemons: [],
        endpoint: {},
        nomPokemon: '',
      };
    },
    async mounted() {
      await this.fetchPokemons('pokemon');
    },
    computed:{
      ...mapState(useCounterStore,['isInCart'])
    },
    methods: {
        async fetchPokemons(endpoint) {
        try {
            this.endpoint = await getPoke(`${endpoint}`);
            this.pokemons = await Promise.all(
            this.endpoint.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                if (!response.ok) {
                throw new Error(`Erreur lors du chargement de ${pokemon.name}`);
                }
                const detailsPoke = await response.json();
                return {
                id: detailsPoke.id,
                name: detailsPoke.name,
                image: detailsPoke.sprites.other.showdown.front_default,
                isShiny: false,
                shiny:detailsPoke.sprites.other.showdown.front_shiny,
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
                image: this.endpoint.sprites.other.showdown.front_default,
                isShiny: false,
                shiny:this.endpoint.sprites.other.showdown.front_shiny,
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
        changeShiny(pokemon){
          pokemon.isShiny = !pokemon.isShiny;
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

.pokemon-card {
  position: relative; /* Positionnement parent pour icône */
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Assure que tout reste dans la carte */
}

.pokemon-image {
  max-width: 100px;
  margin-bottom: 10px;
}

.pokemon-icon {
  position: absolute; /* Position absolue par rapport au parent */
  top: 10px; /* Décalage par rapport au haut */
  right: 10px; /* Décalage par rapport à la droite */
  width: 30px;
  height: 30px;
  object-fit: contain;
  z-index: 10; /* Assure que l'icône est visible au-dessus de tout */
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