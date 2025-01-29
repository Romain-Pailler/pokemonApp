<template>
    <div class="confirmation-container">
        <h1>Confirmation de commande</h1>
        <div v-if="pokemons.length === 0">
            <p>Votre panier est vide.</p>
        </div>
        <div v-else>
            <ul>
                <li v-for="pokemon in pokemons" :key="pokemon.id">
                    {{ pokemon.name }} - {{ pokemon.quantity }}x ({{ pokemon.base_experience * pokemon.quantity }}€)
                </li>
            </ul>
            <p>Total : {{ allPrices }}€</p>
            <button @click="modalConfirmOrder">Valider la commande</button>
            <button @click="$router.push('/Cart')">Retour</button>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store';
import { mapActions, mapState } from 'pinia';

export default {
    computed: {
        ...mapState(useCounterStore, ['pokemons', 'allPrices']),
    },
    methods: {
        ...mapActions(useCounterStore, ['confirmOrder']),
        modalConfirmOrder() {
            if (confirm("Êtes-vous sûr de vouloir valider votre commande ?")) {
                this.confirmOrder();
                alert("Commande validée !");
                this.$router.push('/History'); // Redirection vers l'historique
            }
        }
    }
};
</script>

<style scoped>
.confirmation-container {
    text-align: center;
}
</style>
