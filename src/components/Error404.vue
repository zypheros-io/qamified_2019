<template>
  <div class="error-container">
    <h1>ERROR 404</h1>
    <router-link :to="'/board'">go back to board</router-link>
  </div>
</template>

<style>
.error-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 50px;
}
</style>
