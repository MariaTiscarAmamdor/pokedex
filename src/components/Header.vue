<template>
  <header class="header">
    <img src="@/assets/pokemon-23.svg" alt="Logo pokemon">
    <h1>Busca tus Pokemon favoritos</h1>
  </header>
</template>

<style scoped>
.header {
  background-color: yellow;
  color: red;
  font-family: "Comic Sans MS", cursive, sans-serif; /* Fuente divertida */
  width: 100%;
  height: 20vh; /* Altura responsiva */
  display: flex;
  flex-direction: row; 
  flex-wrap: wrap; 
  align-content: center;
  border-bottom: 5px solid red;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 0 auto;
  text-align: center;
}
h1{
  font-size: 2.5rem;

}
img{
  width: 20%;
  height: auto;
  padding: 0 10%;
}

@media (max-width: 768px) {
  .header {
    width: 100%;
    height: 15vh; 
    display: flex;
  flex-direction: column; 
  align-items:center

  }
  h1{
  font-size: 1rem;
}

}
</style>
