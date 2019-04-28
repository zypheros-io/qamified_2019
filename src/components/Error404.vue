<template>
  <div class="error-container">
    <h1>ERROR 404</h1>
    <router-link :to="'/board'">go back to board</router-link>
  </div>
</template>

<style>
.error-container {
  height: 100vh !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
h1 {
  font-size: 50px !important;
}
</style>
