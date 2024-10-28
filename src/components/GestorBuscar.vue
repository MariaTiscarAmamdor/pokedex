<template>
  <slot>
    <BuscadorPor @buscar="buscarPokemon" />
    <div v-if="error" class="error">
      <p>No se encontró ningún Pokémon con esa búsqueda.</p>
    </div>

    <div v-else-if="pokemonSeleccionado" class="carta-buscada-container">
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
            class="btn-fav">
            Agrega a Favoritos
          </button>
        </template>
      </CartaPokemon>
    </div>

    <div v-else-if="pokemonsPorTipo.length > 0">
      <h2>Pokémon de tipo {{ tipoBuscado }}</h2>
      <ul class="pokemon-list">
        <li v-for="p in pokemonsPorTipo" :key="p.name">
          <button @click="seleccionarPokemon(p.name)">{{ p.name }}</button>
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

.carta-buscada-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.btn-fav {
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
   
  }
  
  .btn-fav:hover {
    background-color: #e53935;
  }

ul {
  list-style: none; 
}

ul li {
  background-color: #ffca28; 
  margin: 10px 0; 
  padding: 10px 15px; 
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s ease, background-color 0.3s ease;
}

ul li:hover {
  transform: translateY(-5px); 
  background-color: #f57c00; 
}
ul li button {
  margin: 0;
  font-size: 16px; 
  color: #333; 
  background-color: #f57c00; 
  font-weight: 600; 
  border: none;
}
</style>
