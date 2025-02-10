<template>
  <div 
    class="group relative transform transition-all duration-300 hover:scale-105"
    @click="selectPokemon(pokemon)" 
  >
    <!-- Dégradé -->
    <div 
      :class="[
        'relative overflow-hidden rounded-xl p-4',
        'shadow-lg hover:shadow-xl transition-all duration-300'
      ]"
      :style="getDualTypeGradient(pokemon.types)"
    >
      <!-- Capturé -->
      <img 
        v-if="isInCart(pokemon.id)" 
        src="@/assets/pokeball.png" 
        alt="Déjà dans le panier" 
        class="absolute top-2 right-2 w-8 h-8 object-contain z-10"
      />

      <!-- Image -->
      <div class="relative flex justify-center mb-4 group">
        <img 
          :src="pokemon.isShiny ? pokemon.shiny_gif : pokemon.image_artwork" 
          :alt="pokemon.name" 
          @click.stop="changeShiny(pokemon)"
          class="w-32 h-32 object-contain cursor-pointer transform transition-transform duration-300 
                 group-hover:scale-110 drop-shadow-2xl"
        />
      </div>

      <div class="text-center">
        <h2 
          @click="goToDetails(pokemon)"
          class="text-xl font-bold mb-2 capitalize text-white cursor-pointer
                 hover:text-yellow-300 transition-colors duration-200"
        >
          {{ pokemon.name }}
        </h2>
        
        <div class="flex justify-center gap-2 mb-3">
          <span 
            v-for="type in pokemon.types" 
            :key="type.type.name"
            class="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white"
          >
            {{ type.type.name }}
          </span>
        </div>

        <p class="text-white/90 font-semibold">
          Prix : {{ pokemon.price }} <span class="text-yellow-300">₽</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore, pokemonsStore } from "@/stores/store";
import { mapState } from "pinia";

export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(cartStore, ['isInCart'])
  },
  methods: {
    goToDetails(pokemon) {
      this.selectPokemon(pokemon)
      this.$router.push({ name: 'Pokemon', params: { name: pokemon.name } });
    },
    changeShiny(pokemon) {
      pokemon.isShiny = !pokemon.isShiny;
    },
    selectPokemon(pokemon) {
      const store = pokemonsStore();
      store.addPoke(pokemon);
    },
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
      return colors[type] || '#A8A77A';
    },
    getDualTypeGradient(types) {
        const color1 = this.getTypeColor(types[0].type.name);
        const color2 = types.length > 1 ? this.getTypeColor(types[1]?.type.name) : '#FFFFFF';   
      return `background-image: linear-gradient(to bottom right, ${color1}, ${color2});`;
    }
  }
};
</script>
