<template>
  <div class="buscador flex flex-col justify-center items-center text-white font-comic text-center  mx-[3%] mt-2 mb-4">
    <label for="buscadorPokemon" class="text-2xl">Busca Pokémon por nombre, Id o tipo</label>
    <div class="grupo-busca flex flex-col md:flex-row  mt-4"> 
      <input
        v-model="buscaConsulta"
        @keyup.enter="emitirBusqueda"
        @input="clearError"
        type="text"
        id="buscadorPokemon"
        placeholder="Ejemplo: Pikachu, 1, fire..."
        class=" p-2 md:p-4 bg-[#f6f6aa] border border-gray-300 rounded-md text-base" />
      <button
        @click="emitirBusqueda"
        class="btn-buscar mt-2 md:mt-0 md:ml-[3%] px-2 md:px-4 py-2 rounded-md bg-[#f9a825] hover:bg-[#ffca28] transition duration-300" >
        <img src="@/assets/buscar.png" alt="Buscar" class="w-4 h-auto md:w-5" /> 
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-base mt-2">Por favor, introduce un valor en la búsqueda.</p>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

// Variable para capturar el valor del input
const buscaConsulta = ref("");

// Variable para manejar el mensaje de error
const error = ref(false);

// Emitir evento al componente padre
const emit = defineEmits(["buscar"]);

// Función que emite el valor del input cuando se produce el evento clic
const emitirBusqueda = () => {
  if (buscaConsulta.value.trim() === "") {
    // Si el input está vacío, muestra el mensaje de error
    error.value = true;
  } else {
    emit("buscar", buscaConsulta.value.trim());
    buscaConsulta.value = ""; // Limpiar el input
    error.value = false; // Resetear el error si había
  }
};

// Limpiar el error cuando el usuario ingresa texto
const clearError = () => {
  if (error.value) error.value = false;
};
</script>

<style scoped>

</style>
