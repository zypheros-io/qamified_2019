<template>
  <div>
    <button v-on:click.prevent="signOut">logout</button>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  methods: {
    signOut: function signOut() {
      this.$store.dispatch('logout');
      this.$router.push('/signin');
    },
  },
};
</script>

