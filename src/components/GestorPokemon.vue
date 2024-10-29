<template>
  <div>
    <GestorBuscar @addToFav="agregarAFavoritos" />

    <!-- Mostrar mensaje en pantalla cuando añadimos o eliminamos de favoritos -->
    <div v-if="mensaje" class="text-[3rem] text-amarillo2">{{ mensaje }}</div>

    <!-- Componente para mostrar y gestionar favoritos -->
    <ListaFavPokemon
      v-if="favoritos.length > 0"
      :favoritos="favoritos"
      @eliminarDeFavoritos="eliminarDeFavoritos"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import GestorBuscar from "./GestorBuscar.vue";
import ListaFavPokemon from "./ListaFavPokemon.vue";

const favoritos = ref([]); // Array para almacenar favoritos
const mensaje = ref(""); // Estado para almacenar el mensaje

const capitalizarNombre = (nombre) => {
  if (!nombre) return '';
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};

const agregarAFavoritos = (pokemon) => {
  const existe = favoritos.value.find((fav) => fav.id === pokemon.id);
  if (!existe) {
    // Asegúrate de que aquí se pasan todos los datos que necesitas
    favoritos.value.push({
      id: pokemon.id,
      nombre: pokemon.nombre,
      imagen: pokemon.imagen,
      tipo: pokemon.tipo,
      habilidades: pokemon.habilidades,
    });
    mensaje.value = `¡ El pokémon ${capitalizarNombre(pokemon.nombre)} agregado a favoritos!`;
    setTimeout(() => {
      mensaje.value = "";
    }, 3000);
  } else {
    mensaje.value = `El pokémon ${capitalizarNombre(pokemon.nombre)}  ya está en favoritos.`;
    setTimeout(() => {
      mensaje.value = "";
    }, 3000);
  }
};

// Función para eliminar un Pokémon de la lista de favoritos
const eliminarDeFavoritos = (id) => {
  const pokemonEliminado = favoritos.value.find((fav) => fav.id === id);
  if (pokemonEliminado) {
    // Eliminar el Pokémon de la lista de favoritos
    favoritos.value = favoritos.value.filter((fav) => fav.id !== id);
    // Mostrar mensaje de eliminación
    mensaje.value = `El pokémon ${capitalizarNombre(pokemonEliminado.nombre)} eliminado de favoritos.`;
    setTimeout(() => {
      mensaje.value = "";
    }, 3000);
  }
};
</script>

<style scoped>
/* .favoritos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
} */
</style>
