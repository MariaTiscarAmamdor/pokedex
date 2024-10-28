<template>
  <!-- Mostrar las tarjetas de Pokémon favoritos -->
  <div v-if="favoritos.length > 0">
      <h2>Mis Pokémon Favoritos:</h2>
      <div class="favoritos-container">
        <CartaPokemon
          v-for="(fav, index) in favoritos"
          :key="fav.id"
          :nombre="fav.nombre"        
          :id="fav.id"               
          :imagen="fav.imagen"        
          :tipo="fav.tipo"             
          :habilidades="fav.habilidades">

          <template #actions>
            <button @click="eliminar(fav.id)">Eliminar de Favoritos</button>
          </template>
        </CartaPokemon>
      </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import CartaPokemon from './CartaPokemon.vue';

// Definimos las propiedades que recibe el componente
const props = defineProps({
  favoritos: {
    type: Array,
    required: true,
  },
});

// Emitimos evento para eliminar un Pokémon favorito
const emit = defineEmits(['eliminarDeFavoritos']);

const eliminar = (id) => {
  emit('eliminarDeFavoritos', id);
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}
.lista-favoritos {
  margin-top: 20px;
}

.pokemon-item {
  margin: 10px 0;
}
.favoritos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
button {
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #e53935;
}
</style>
