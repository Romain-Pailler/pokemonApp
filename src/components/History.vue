<template>
    <div class="history-container">
        <h1>Historique des commandes</h1>
        <div v-if="orders.length === 0">
            <p>Aucune commande passée.</p>
        </div>
        <div v-else>
            <div v-for="order in orders" :key="order.id" class="order-card">
                <p>Commande du {{ order.date }}</p>
                <p> Prix {{order.price}}</p>
                <ul>
                    <li v-for="pokemon in order.items" :key="pokemon.id">
                        {{ pokemon.name }} - {{ pokemon.quantity }}x ({{ pokemon.base_experience * pokemon.quantity }}€)
                    </li>
                </ul>
            </div>
        </div>
        <button @click="$router.push('/Home')">Retour à l'accueil</button>
    </div>
</template>

<script>
import { cartStore } from '@/stores/store';
import { mapState } from 'pinia';

export default {
    computed: {
        ...mapState(cartStore, ['orders']),
    }
};
</script>

<style scoped>
.history-container {
    text-align: center;
}
.order-card {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px;
}
</style>
