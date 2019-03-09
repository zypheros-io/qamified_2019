<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <b-loading
          :is-full-page="true"
          :active.sync="loading"
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
                  v-model="user.email"
                  type="text"
                  placeholder="Email"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Username -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="user.username"
                  type="text"
                  placeholder="Username"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Password -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="user.password"
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
                  v-model="user.firstname"
                  placeholder="First Name"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Last name -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="user.lastname"
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
                  v-model="user.institution"
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
      user: 'user/getUser',
      loading: 'register/isLoading'
    })
  },
  watch: {
    user(value) {
      if (value !== null) this.$router.push('/');
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
