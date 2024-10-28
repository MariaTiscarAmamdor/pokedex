<template>
  <div class="layout">
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
.layout {
  width: 90%;
  margin: 0 auto;
  border: 5px solid red;
  border-radius: 23px;
}
</style>
