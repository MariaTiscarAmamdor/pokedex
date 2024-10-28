<template>
  <slot>
    <BuscadorPor @buscar="buscarPokemon" />
    <div v-if="error" class="text-red-600 text-center my-4">
      <p>No se encontró ningún Pokémon con esa búsqueda.</p>
    </div>

    <div v-else-if="pokemonSeleccionado" class="carta-buscada-container flex flex-wrap justify-center gap-5">
      <CartaPokemon
        :nombre="pokemonSeleccionado.nombre"
        :id="pokemonSeleccionado.id"
        :imagen="pokemonSeleccionado.imagen"
        :tipo="pokemonSeleccionado.tipo"
        :habilidades="pokemonSeleccionado.habilidades">
        <!-- Slot para botón de agregar a favoritos -->
        <template #actions>
          <button
            :pokemon="pokemon"
            @click="agregarAFavoritos(pokemonSeleccionado)"
            class="btn-fav mt-2 bg-red-500 text-white border-none py-1 px-3 rounded-md cursor-pointer hover:bg-red-600 transition-colors">
            Agrega a Favoritos
          </button>
        </template>
      </CartaPokemon>
    </div>

    <div v-else-if="pokemonsPorTipo.length > 0">
      <h2 class="text-2xl font-bold text-center mb-4">Los Pokémons de tipo {{ tipoBuscado }} encontrados son:</h2>
      <ul class="pokemon-list list-none mx-auto  max-w-xl">
        <li v-for="p in pokemonsPorTipo" :key="p.name" class="bg-yellow-400 my-2 py-2 px-3 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:bg-orange-600">
          <button @click="seleccionarPokemon(p.name)" class="text-base font-semibold text-gray-900 bg-transparent text-left">
            {{ p.name }}
          </button>
        </li>
      </ul>
    </div>
  </slot>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import BuscadorPor from "./BuscadorPor.vue";
import CartaPokemon from "./CartaPokemon.vue";

// Estado reactivo para manejar la información del Pokémon
const pokemonSeleccionado = ref(null);
const error = ref(false);
const pokemonsPorTipo = ref([]);
const tipoBuscado = ref("");

const emit = defineEmits(["addToFav"]);

// Función para buscar Pokémon por nombre/ID o tipo
const buscarPokemon = async (consulta) => {
  error.value = false;
  pokemonSeleccionado.value = null;
  pokemonsPorTipo.value = [];
  tipoBuscado.value = "";

  const urlPorTipo = `https://pokeapi.co/api/v2/type/${consulta.toLowerCase()}/`;
  const urlPorNombre = `https://pokeapi.co/api/v2/pokemon/${consulta.toLowerCase()}/`;

  try {
    const response = await Promise.any([
      fetch(urlPorTipo).then((res) => {
        if (!res.ok) throw new Error("No se encontró el tipo");
        console.log("Respuesto por tipo", res);
        return res.json();
      }),
      fetch(urlPorNombre).then((res) => {
        if (!res.ok) throw new Error("No se encontró el Pokémon");
        return res.json();
      }),
    ]);

    if (response.pokemon) {
      pokemonsPorTipo.value = response.pokemon.map((p) => p.pokemon);
      tipoBuscado.value = consulta; //para actualizar el valor de tipoBUscado
      console.log("Tipo buscado", tipoBuscado, "consulta", consulta);
    } else {
      procesarDatosPokemon(response);
    }
  } catch (err) {
    error.value = true;
  }
};

// Función auxiliar para obtener detalles del Pokémon
const obtenerDetallesPokemon = async (nombre) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se encontró el Pokémon");
    const data = await response.json();
    procesarDatosPokemon(data);
  } catch (err) {
    error.value = true;
  }
};

// Función para procesar los datos y guardarlos en el estado
const procesarDatosPokemon = (data) => {
  pokemonSeleccionado.value = {
    nombre: data.name,
    id: data.id,
    imagen: data.sprites.front_default,
    tipo: data.types.map((t) => t.type.name).join(", "),
    habilidades: data.abilities.map((a) => a.ability.name).join(", "),
  };
};

// Función para seleccionar un Pokémon de la lista
const seleccionarPokemon = async (nombre) => {
  await obtenerDetallesPokemon(nombre);
};

const agregarAFavoritos = (pokemonData) => {
  // Emite el evento al componente principal GestorPokemon
  emit("addToFav", pokemonData);
  // Limpiar la tarjeta del Pokémon seleccionado después de añadirlo a favoritos
  pokemonSeleccionado.value = null;
  // Limpiar la lista de Pokémon por tipo
  pokemonsPorTipo.value = [];
};
</script>

<style scoped>

</style>
