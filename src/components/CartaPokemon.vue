<template>
  <div class="bg-gradient-to-b from-amarillo3 to-blue-300 rounded-xl shadow-lg w-[220px] h-[300px] p-2 m-2 flex flex-col justify-between items-center text-center transition-transform duration-300 hover:-translate-y-2">
    <!-- Mostrar imagen del Pokémon o un placeholder si no existe -->
    <img :src="imagen" :alt="nombre" @error="imgError" class="w-30 h-auto object-contain m-0" />
    <h2 class="text-red-600 m-0 text-2xl font-bold">{{ capitalizarNombre(nombre) }}</h2>
    <p class="text-[1em] m-[2px] text-gray-800">
      <strong class="font-bold text-red-700">Habilidades: </strong> {{ habilidades }}
    </p>
    <p class="text-[1em] m-[2px] text-gray-800">
      <strong class="font-bold text-red-700">Tipo: </strong> {{ tipo }}
    </p>
    <!-- Slot para posibles acciones -->
    <slot name="actions"></slot>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

// Definir las propiedades que esperamos recibir en el componente
const props = defineProps({
  nombre: String,
  id: Number,
  imagen: String,
  tipo: String,
  habilidades: String,
});

// Ref para manejar un fallback de imagen
const defaultImage = ref("@/assets/placeholder.png"); // Añadir un placeholder de tu elección

// Función para manejar errores de imagen
const imgError = (event) => {
  event.target.src = defaultImage.value;
};
const capitalizarNombre = (nombre) => {
  if (!nombre) return '';
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};
</script>

<style scoped>

</style>
