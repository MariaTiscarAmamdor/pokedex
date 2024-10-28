<template>
  <footer class="footer">
    <p>@ 2024 Busca tus Pokemons</p>
  </footer>
</template>
<style scoped>
.footer {
  background-color: yellow;
  color: red;
  font-family: "Comic Sans MS", cursive, sans-serif;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 5px solid red;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: 768px) {
  .footer {
    width: 100%;
    height: 8vh; /* Ajuste para pantallas pequeñas */
  }
}
</style>
