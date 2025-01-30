<script>

import { cartStore, pokemonsStore } from "@/stores/store";
import { mapState } from "pinia";

export default {
    props:{
        pokemon:{
            type:Object,
            required:true
        }
    },
  computed: {
    ...mapState(cartStore, ['isInCart'])
  },
methods:{
    goToDetails(pokemonName) {
        this.$router.push({ name: 'Pokemon', params: { name: pokemonName } });
    },

    changeShiny(pokemon) {
        pokemon.isShiny = !pokemon.isShiny;
    },

    }
};
</script>

<template>
    <div>
     <img :src="pokemon.image_gif" :alt="pokemon.name" class="pokemon-image" @click="changeShiny(pokemon)" v-if="!pokemon.isShiny"/>
          <img :src="pokemon.shiny_gif" :alt="pokemon.name" class="pokemon-image" @click="changeShiny(pokemon)" v-if="pokemon.isShiny"/>
        
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
</template>
<style>
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
  </style>