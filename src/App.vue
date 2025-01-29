<script setup>
import { RouterLink, useRouter } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/Home">Home</RouterLink>
    <RouterLink to="/Cart">Cart</RouterLink>
    <RouterLink to="/History">History</RouterLink>
  </nav>
  <RouterView />
</template>

