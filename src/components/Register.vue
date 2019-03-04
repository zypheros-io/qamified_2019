<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <b-loading
          :is-full-page="isFullPage"
          :active.sync="isLoading"
          :can-cancel="false"
        ></b-loading>
        <div class="column is-4 is-offset-4">
          <div class="box bg-white" id="signup-container">
            <div class="has-text-centered">
              <img src="https://via.placeholder.com/350x65" />
            </div>
            <p
              class="subtitle has-text-centered is-6 is-secondary-text color-primary"
              style="font-weight: bold; margin-top: 10px; font-style: italic"
            >
              Become an adventurer now. Don't worry, it's free! Forever!
            </p>
            <div class="is-divider"></div>
            <div v-if="step === 1">
              <!-- First step -->
              <!-- Email -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="email"
                  type="text"
                  placeholder="Email"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Username -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Password -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  size="is-medium"
                  password-reveal
                  required
                ></b-input>
              </b-field>
              <!-- Proceed to next step -->
              <b-field class="margin-top-1">
                <button
                  class="button is-medium is-fullwidth is-primary-text main-btn"
                  @click.prevent="next"
                >
                  NEXT STEP
                </button>
              </b-field>
              <!-- end step 1 -->
            </div>
            <div v-else-if="step === 2">
              <!-- Second step -->
              <!-- First name -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="firstname"
                  placeholder="First Name"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Last name -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="lastname"
                  placeholder="Last Name"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- offset -->
              <b-field></b-field>
              <!-- Institution -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="institution"
                  placeholder="Institution ex. CAS, CEM, etc."
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field class="margin-top-1">
                <button
                  class="button is-medium is-fullwidth is-primary-text main-btn"
                  @click.prevent="validate"
                >
                  SIGN UP
                </button>
              </b-field>
              <div class="has-text-centered is-secondary">
                <p>
                  <a
                    @click.prevent="prev"
                    class="is-anchor"
                    style="font-size: 13px;"
                  >
                    Go back to previous step
                  </a>
                </p>
              </div>
            </div>
            <div class="is-divider" data-content="OR"></div>
            <div class="has-text-centered is-secondary-text">
              <p>
                Already an adventurer?
                <a class="is-anchor" @click.prevent="goto('/signin')">
                  Log in
                </a>
              </p>
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
      formTwoClear: false
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'register/isLoading'
    })
  },
  watch: {
    getUser(value) {
      if (value !== null) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    validate: function signUp() {
      if (this.firstname && this.lastname && this.institution) {
        this.formTwoClear = true;
      } else {
        // eslint-disable-next-line
        alert('Please fill the required fields before proceeding  ');
      }
      if (this.formOneClear && this.formTwoClear) {
        this.$store.dispatch('register/signUp', {
          email: this.email,
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          institution: this.institution
        });
      } else {
        // eslint-disable-next-line
        console.log('RIP');
      }
    },
    next: function next() {
      if (this.password.length >= 6) {
        if (this.email && this.username && this.password) {
          this.step += 1;
          this.formOneClear = true;
        } else {
          // eslint-disable-next-line
          alert('Please fill the required fields before proceeding  ');
        }
      } else {
        // eslint-disable-next-line
        alert('Password must be at least 6 characters');
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
.hero {
  background-image: url('../assets/bg.png');
}
#signup-container {
  padding: 40px;
  width: 450px !important;
  border: 15px solid #203d66;
  border-radius: 5px;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}
</style>
