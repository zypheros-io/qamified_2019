<template>
  <div class="container has-text-centered">
    <div>
      <router-link :to="'/board'" class="is-primary-text is-anchor">
        Go back to board
      </router-link>
    </div>
    <br />
    <div>
      <figure class="image">
        <img src="../assets/404.png" alt="Error 404" />
      </figure>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding-top: 75px !important;
  width: 100%;
}
</style>
