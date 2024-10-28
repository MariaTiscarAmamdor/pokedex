<template>
  <div class="cartaPokemon">
    <!-- Mostrar imagen del Pokémon o un placeholder si no existe -->
    <img :src="imagen" :alt="nombre" @error="imgError" />
    <h2>{{ nombre }}</h2>
    <p><strong>Habilidades: </strong> {{ habilidades }}</p>
    <p><strong>Tipo: </strong> {{ tipo }}</p>
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
</script>

<style scoped>
/* Estilos de las tarjetas de Pokémon */
.cartaPokemon {
  background-color: #ffcb05;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 220px; 
  height: 300px; 
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease; /* Animación suave al pasar el mouse */
}

.cartaPokemon:hover {
  transform: translateY(
    -7px
  ); /* Eleva la tarjeta ligeramente al pasar el mouse */
}

img {
  width: 120px;
  height: auto;
  margin: 0;
  object-fit: contain; /* Mantiene las proporciones de la imagen */
}
h2 {
  margin: 0;
  color: red;
}
p {
  font-size: 1.2em;
  margin: 2px 0;
  color: #333;
}
strong{
  font-weight: 1000;
  color: rgb(150, 9, 9);
}
</style>
