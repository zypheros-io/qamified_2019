<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <!-- Form container -->
        <div class="column is-4 is-offset-4">
          <div class="box" id="signup-form-container">
            <h3 class="subtitle has-text-primary has-text-centered">
              Become an adventurer today.
            </h3>
            <!-- Email address -->
            <b-field label="Email">
              <b-input
                      v-model="email"
                      type="email"
                      placeholder="johndoe@email.com"
                      required=""
                      rounded>
              </b-input>
            </b-field>
            <!-- Username -->
            <b-field label="Username">
              <b-input
                      v-model="username"
                      maxlength="20"
                      placeholder="johnnydoe"
                      required=""
                      rounded>
              </b-input>
            </b-field>
            <!-- First name -->
            <b-field label="First Name">
              <b-input
                      v-model="firstname"
                      placeholder="Johnny"
                      required=""
                      rounded>
              </b-input>
            </b-field>
            <!-- Last name -->
            <b-field label="Last Name">
              <b-input
                      v-model="lastname"
                      placeholder="Doe"
                      required=""
                      rounded>
              </b-input>
            </b-field>
            <!-- Institution -->
            <b-field label="Institution">
              <b-input
                      v-model="institution"
                      placeholder="e.g., CAS, CAFS, CEAT..."
                      required=""
                      rounded>
              </b-input>
            </b-field>
            <!-- Password -->
            <b-field label="Password">
              <b-input
                      v-model="password"
                      type="password"
                      placeholder="Minimum of 6 characters"
                      required="">
              </b-input>
            </b-field>
            <!-- Confirm password -->
            <b-field label="Confirm your password">
              <b-input
                      v-model="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      required=""
                      rounded>
              </b-input>
            </b-field>
            <button class="button is-block is-primary is-small is-fullwidth"
                    v-if="!isLoading"
                    v-on:click.prevent="signUp">
                    Start your journey
            </button>
            <button class="button is-loading is-primary is-small is-fullwidth"
                    v-if="isLoading">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      institution: '',
      confirmPassword: '',
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  watch: {
    getUser(value) {
      if (value !== null) {
        this.$router.push('/welcome');
      }
    },
  },
  methods: {
    signUp: function signUp() {
      // sign up if passwords matched
      if (this.password === this.confirmPassword) {
        this.$store.dispatch('signUp', {

          email: this.email,
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          institution: this.institution,

        });
      }
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
  #signup-form-container {
    border: solid 1px #8c67ef
  }
  .hero {
    background-color: #F5F5F5
  }
</style>

