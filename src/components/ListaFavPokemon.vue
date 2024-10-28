<template>
  <!-- Mostrar las tarjetas de Pokémon favoritos -->
  <div v-if="favoritos.length > 0">
    <h2 class="text-xl font-bold mb-2">Mis Pokémon Favoritos:</h2>
    <div class="flex flex-wrap justify-center gap-5">
      <CartaPokemon
        v-for="(fav, index) in favoritos"
        :key="fav.id"
        :nombre="fav.nombre"        
        :id="fav.id"               
        :imagen="fav.imagen"        
        :tipo="fav.tipo"             
        :habilidades="fav.habilidades">

        <template #actions>
          <button @click="eliminar(fav.id)" class="mt-2 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-300">
            Eliminar de Favoritos
          </button>
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

</style>
