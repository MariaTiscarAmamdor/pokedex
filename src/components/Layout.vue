<template>
  <div class="w-[90%] mx-auto border-4 border-red-500 rounded-xl">
    <slot name="header">
      <Header />
    </slot>
    <slot>
      <Main />
    </slot>
    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Main from "./Main.vue";
</script>

<style scoped>

</style>
