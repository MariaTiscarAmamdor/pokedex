<template>
  <div class="buscador">
    <label for="buscadorPokemon">Busca Pokemon por nombre, Id o tipo</label>
    <!-- keyup.enter permite que el usuario pueda realizar la búsqueda tanto haciendo 
         clic en el botón como presionando la tecla Enter. -->
    <div class="grupo-busca">
      <input
        v-model="buscaConsulta"
        @keyup.enter="emitirBusqueda"
        @input="clearError"
        type="text"
        id="buscadorPokemon"
        placeholder="Ejemplo: Pikachu, 1, fire..."
      />
      <button @click="emitirBusqueda" class="btn-buscar">
        <img src="@/assets/buscar.png" alt="Buscar" />
      </button>
    </div>

    <!-- Mostrar un mensaje de error si no hay texto en el input -->
    <p v-if="error" class="error">
      Por favor, introduce un valor en la búsqueda.
    </p>
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
.buscador {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-align: center;
  width: 100%;
  margin: 3%;
}

label {
  font-size: 2rem;
}
.grupo-busca {
  display: flex;
  flex-direction: row;
}

input {
  width: 100%;
  margin: auto;
  padding: 1rem;
  background-color: #f6f6aa;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.btn-buscar {
  padding: 10px 20px;
  margin-left: 3%;
  font-size: 16px;
  border-radius: 5px;
  background-color: #f9a825;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-buscar:hover {
  background-color: #ffca28;
}
/* Ajustes responsivos */
@media (max-width: 768px) {
  input {
    width: 90%;
  }

  button {
    width: 50px;
  }
}

.error {
  color: red;
  font-size: 1rem;
}
</style>
