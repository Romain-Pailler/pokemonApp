<template>
    <div v-if="pokemon">
    <h1>{{ pokemonName }}</h1>
    <div class="pokemon-card">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-image"/>
      <h2>{{ pokemon.name }}</h2>
      <p>Prix : {{ pokemon.base_experience }}</p>
        <div v-for="type in pokemon.types">{{type.type.name}}</div>
        <p> taille : {{pokemon.height}} cm</p>
        <p>poids : {{pokemon.weight}} cm</p>
        <p>id {{pokemon.id}}</p>
        <div v-for="stat in pokemon.stats">{{stat.stat.name}} = {{stat.base_stat}}</div>
    </div>
</div>
</template>
<script>
import { getPoke } from '@/services/httpClient';


export default {
    data(){
        return{
            pokemonName: this.$route.params.name,
            pokemon: undefined,

        }
    },
    async mounted(){
        this.pokemon = await getPoke(`pokemon/${this.pokemonName}`);
    }
}
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