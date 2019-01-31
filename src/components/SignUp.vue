<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="box" id="sign-up-form">
            <p
              class="title has-text-centered is-game form-title">
              QAMIFIED
            </p>
            <p
              class="subtitle has-text-centered is-6 form-subtitle">
              Become an adventurer, no rupees needed.
            </p>
            <!-- STEP 1 -->
            <div v-if="step === 1">
              <b-field label="Email">
                <b-input
                  v-model="email"
                  placeholder="Enter your email address"
                  size="is-medium"
                  required>
                </b-input>
              </b-field>
              <b-field label="Username">
                <b-input
                  v-model="username"
                  placeholder="Enter your username"
                  size="is-medium"
                  required>
                </b-input>
              </b-field>
              <b-field label="Password">
                <b-input
                  v-model="password"
                  type="password"
                  placeholder="Enter your password"
                  size="is-medium"
                  password-reveal
                  required>
                </b-input>
              </b-field>
              <b-field>
                <button
                  class="button is-fullwidth is-medium is-game sign-up-nav"
                  @click.prevent="next">
                  NEXT
                </button>
              </b-field>
            </div>
            <!-- STEP 2 -->
            <div v-if="step === 2">
              <b-field label="First Name">
                <b-input
                  v-model="firstname"
                  placeholder="ex. John"
                  size="is-medium"
                  required>
                </b-input>
              </b-field>
              <b-field label="Last Name">
                <b-input
                  v-model="lastname"
                  placeholder="ex. Doe"
                  size="is-medium"
                  required>
                </b-input>
              </b-field>
              <div class="is-divider"></div>
              <b-field label="Institution">
                <b-input
                  type="text"
                  v-model="institution"
                  placeholder="ex. CAS, CEM, CEAT, CAFS, CFNR..."
                  size="is-medium"
                  required>
                </b-input>
              </b-field>
              <b-field>
                <button
                  v-if="!isLoading"
                  class="button is-fullwidth is-medium is-game sign-up-nav"
                  @click.prevent="validate">
                  SIGN UP
                </button>
                <button
                  v-if="isLoading"
                  class="button is-fullwidth is-medium is-game sign-up-nav"
                  @click.prevent="validate">
                  SIGN UP
                </button>
              </b-field>
              <b-field class="has-text-centered">
                <a
                  id="prev-nav"
                  @click="prev"
                > Go to back to previous step </a>
              </b-field>
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
      email: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      institution: '',
      step: 1,
      formOneClear: false,
      formTwoClear: false,
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'register/isLoading',
    }),
  },
  watch: {
    getUser(value) {
      if (value !== null) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    validate: function signUp() {
      if (this.firstname && this.lastname && this.institution) {
        this.formTwoClear = true;
      } else {
        // eslint-disable-next-line
          alert('Please fill the required fields before proceeding  ')
      }
      if (this.formOneClear && this.formTwoClear) {
        this.$store.dispatch('register/signUp', {

          email: this.email,
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          institution: this.institution,

        });
      } else {
        // eslint-disable-next-line
        console.log("RIP");
      }
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    },
    next: function next() {
      if (this.password.length >= 6) {
        if (this.email && this.username && this.password) {
          this.step += 1;
          this.formOneClear = true;
        } else {
          // eslint-disable-next-line
          alert('Please fill the required fields before proceeding  ')
        }
      } else {
        // eslint-disable-next-line
        alert('Password must be at least 6 characters')
      }
    },
    prev: function prev() {
      this.step -= 1;
    },
  },
};
</script>
<style scoped>
  .hero {
    background-image: url('../assets/sign_up_wallpaper.png');
  }
  #sign-up-form {
    padding: 40px !important;
    border: 1px solid #79C354;
  }
  .sign-up-nav {
    margin-top: 25px !important;
    color: #fafbfc !important;
    background-color: #F9C23E !important;
    font-size: 1.35rem;
    -webkit-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    -moz-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    border: none;
    border-style: none;
  }
  .sign-up-nav:active {
    background-color: #79C354 !important;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  #prev-nav {
    color: #79C354;
  }
  #prev-nav:hover {
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    color: #F9C23E;
    text-decoration: underline;
  }
</style>

