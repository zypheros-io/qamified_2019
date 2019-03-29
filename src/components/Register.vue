<template>
  <div id="signup-page">
    <!-- Pageloader -->
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    ></b-loading>
    <div class="level">
      <div class="level-item">
        <div>
          <div class="has-text-centered" id="signup-copy">
            <p class="title is-primary-text">Sign up</p>
            <p class="subtitle is-secondary-text">
              Become an adventurer, it's free!
            </p>
          </div>
          <div class="box" id="signup-container">
            <div v-if="step === 1" id="signup-part-one">
              <b-field label="Email address">
                <b-input
                  v-model="user.email"
                  type="text"
                  placeholder="Email address"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field label="Username" class="margin-top-1">
                <b-input
                  v-model="user.username"
                  type="text"
                  placeholder="Username"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field label="Password" class="margin-top-1">
                <b-input
                  v-model="user.password"
                  type="password"
                  placeholder="Password"
                  size="is-medium"
                  required
                  password-reveal
                ></b-input>
              </b-field>
              <b-field class="margin-top-1">
                <button
                  class="button is-medium is-fullwidth is-primary-text primary-btn"
                  @click.prevent="next"
                >
                  NEXT STEP&nbsp;<span class="mdi mdi-arrow-right-bold"></span>
                </button>
              </b-field>
            </div>
            <div v-else-if="step === 2" id="signup-part-two">
              <b-field label="First Name">
                <b-input
                  v-model="user.firstname"
                  placeholder="First name"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field label="Last Name" class="margin-top-1">
                <b-input
                  v-model="user.lastname"
                  placeholder="Last name"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field></b-field>
              <b-field label="Institution" class="margin-top-1">
                <b-input
                  v-model="user.institution"
                  placeholder="Institution ex. CAS, CEM, etc."
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field class="margin-top-1">
                <button
                  v-if="!loading"
                  class="button is-medium is-fullwidth is-primary-text primary-btn"
                  @click.prevent="validate"
                >
                  SUBMIT
                </button>
                <button
                  class="button is-medium is-fullwidth is-primary-text primary-btn is-loading"
                  v-if="loading"
                ></button>
              </b-field>
            </div>
            <div class="is-divider" data-content="OR"></div>
            <div class="has-text-centered is-secondary-text">
              Already have an account?
              <a class="is-anchor" @click.prevent="goto('/signin')">
                Sign in
              </a>
              instead
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignUp',
  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        institution: ''
      },
      step: 1,
      formOneClear: false,
      formTwoClear: false
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      loading: 'register/isLoading'
    })
  },
  watch: {
    getUser(value) {
      if (value !== null) this.$router.push('/feed');
    }
  },
  methods: {
    validate: function signUp() {
      if (this.user.firstname && this.user.lastname && this.user.institution) {
        this.$store.dispatch('register/signUp', this.user);
      } else {
        this.$toast.open({
          message: 'Please fill in the required fields',
          duration: 2000,
          type: 'is-error'
        });
      }
    },
    next: function next() {
      if (this.user.password.length >= 6) {
        if (this.user.email && this.user.username && this.user.password) {
          this.step += 1;
          this.formOneClear = true;
        } else {
          this.$toast.open({
            message: 'Please fill in the required fields',
            duration: 2000,
            type: 'is-error'
          });
        }
      } else {
        this.$toast.open({
          message: 'Passwords must be 6 characters long.',
          duration: 2000,
          type: 'is-danger'
        });
      }
    },
    prev: function prev() {
      this.step -= 1;
    },
    goto: function goto(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped>
#signup-page {
  height: 100vh;
  width: 100%;
  background: #f4f4f4 url('../assets/bg.svg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#signup-page .level,
#signup-page .level .level-item {
  height: inherit;
  width: 100%;
}
#signup-page .title {
  color: #b686fe;
  font-size: 2.8em;
  margin-bottom: 1.5rem;
}
#signup-page .subtitle {
  color: #898585;
  font-size: 1.8em;
  margin-bottom: 1.5rem;
}
#signup-container {
  padding: 2em;
  text-decoration: none;
  box-shadow: 1px;
  border: 1px solid #b686fe;
  width: 23vw;
}
</style>
