<template>
  <main>
    <div class="contenido">
        <slot>
            <GestorPokemon />
        </slot>
    </div>
  </main>
</template>

<script setup>
import GestorPokemon from "./GestorPokemon.vue";
</script>

<style scoped>
.contenido {
  background-color: #2b72b8;
  color: white;
  font-family: "Comic Sans MS", cursive, sans-serif; /* Fuente divertida */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
}
</style>
