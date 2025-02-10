<template>
  <nav class="relative">
    <div class="h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400"></div>
    
    <!-- Navbar -->
    <div class="bg-[#DC0A2D] backdrop-blur-sm bg-opacity-95">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo et Titre -->
          <router-link to="/home" class="flex items-center space-x-3 group">
            <div class="relative w-10 h-10">
              <div class="absolute inset-0 bg-white rounded-full transform transition-transform group-hover:scale-110">
                <img 
                  src="./assets/pokeball.png"
                  alt="Pokeball"
                  class="w-full h-full p-1.5 object-contain"
                />
              </div>
            </div>
            <span class="text-white font-bold text-xl tracking-tight">PokéShop</span>
          </router-link>

          <!-- Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <router-link 
              v-for="item in ['Home', 'Cart', 'History']" 
              :key="item"
              :to="'/' + item"
              class="px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ease-in-out
                    hover:bg-white/10 hover:scale-105 active:scale-95"
              :class="{ 'bg-white/20': $route.path.includes(item.toLowerCase()) }"
            >
              {{ item }}
            </router-link>
          </div>

          <!-- Panier -->
          <router-link 
            to="/cart" 
            class="relative group flex items-center justify-center w-12 h-12 rounded-full
                  transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            <ShoppingCartIcon class="w-6 h-6 text-white" />
            <div 
              v-if="cart.count > 0"
              class="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center
                    bg-yellow-400 text-[#DC0A2D] rounded-full text-sm font-bold
                    transform transition-transform group-hover:scale-110 shadow-lg"
            >
              {{ cart.count }}
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Ombre subtile -->
    <div class="absolute inset-x-0 bottom-0 h-px bg-white/10"></div>
  </nav>
  <RouterView />
</template>

<script setup>
import { cartStore } from "@/stores/store.js";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { RouterView } from "vue-router";

const cart = cartStore();
</script>