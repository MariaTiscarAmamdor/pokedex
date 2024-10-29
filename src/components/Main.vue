<template>
  <main>
    <div class="bg-blue-800  text-white font-comic w-full flex flex-col items-center justify-center mx-auto text-center">
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
</style>
