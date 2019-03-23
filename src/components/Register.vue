<template>
  <div class="bg-white" id="signup_page">
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    ></b-loading>
    <div class="columns">
      <div class="column">
        <div class="level">
          <div class="level-item">
            <div class="has-text-centered">
              <span
                class="color-primary"
                style="font-weight: bold; font-size: 5rem;"
              >
                QAmifi<span style="color: #ff9a44;">ED</span>
              </span>
              <div class="is-divider"></div>
              <p class="title is-3 is-primary-text color-primary">
                Become an adventurer now. It's free!
              </p>
              <div class="box" id="signup_container">
                <div v-if="step === 1">
                  <!-- Email -->
                  <b-field class="margin-top-1">
                    <b-input
                      v-model="user.email"
                      type="text"
                      placeholder="Email address"
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
                  <b-field class="margin-top-1">
                    <button
                      class="button is-medium is-fullwidth is-primary-text main-btn"
                      @click.prevent="next"
                    >
                      <span class="mdi mdi-arrow-right-bold"></span>
                    </button>
                  </b-field>
                </div>
                <div v-else-if="step === 2">
                  <!-- First Name -->
                  <b-field class="margin-top-1">
                    <b-input
                      v-model="user.firstname"
                      placeholder="First name"
                      size="is-medium"
                      required
                    ></b-input>
                  </b-field>
                  <!-- Last Name -->
                  <b-field class="margin-top-1">
                    <b-input
                      v-model="user.lastname"
                      placeholder="Last name"
                      size="is-medium"
                      required
                    ></b-input>
                  </b-field>
                  <!-- ghost -->
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
                  <div class="has-text-centered is-secondary-text">
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
                <div class="is-divider" date-content="OR"></div>
                <div class="has-text-centered is-secondary-text">
                  <p style="font-size: 1.3rem;">
                    Oh, you're already an adventurer?
                    <a class="is-anchor" @click.prevent="goto('/signin')">
                      Login
                    </a>
                    instead.
                  </p>
                </div>
              </div>
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
#signup_page {
  height: 100vh;
  width: 100%;
}
#signup_page .columns,
#signup_page .columns .column {
  height: inherit;
  width: 100%;
}
.level,
.level-item {
  height: inherit;
  width: 100%;
}
#signup_container {
  width: 550px;
  padding: 40px;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}
</style>
