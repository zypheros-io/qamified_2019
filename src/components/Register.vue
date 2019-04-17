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
              <b-field label="Email address*">
                <b-input
                  v-model="user.email"
                  type="email"
                  placeholder="Email address"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field label="Username*" class="margin-top-1">
                <b-input
                  v-model="user.username"
                  type="text"
                  placeholder="Username"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field label="Password*" class="margin-top-1">
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
                  v-on:click.prevent="next"
                >
                  NEXT STEP&nbsp;<span class="mdi mdi-arrow-right-bold"></span>
                </button>
              </b-field>
            </div>
            <div v-else-if="step === 2" id="signup-part-two">
              <b-field label="First Name*">
                <b-input
                  v-model="user.firstname"
                  placeholder="First name"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field label="Last Name*" class="margin-top-1">
                <b-input
                  v-model="user.lastname"
                  placeholder="Last name"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <b-field></b-field>
              <b-field label="Institution*" class="margin-top-1">
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
                  v-on:click.prevent="validate"
                >
                  SUBMIT
                </button>
                <button
                  class="button is-medium is-fullwidth is-primary-text primary-btn is-loading"
                  v-else-if="loading"
                ></button>
              </b-field>
            </div>
            <div class="is-divider" data-content="OR"></div>
            <div class="has-text-centered is-secondary-text">
              Already have an account?
              <a class="is-anchor" v-on:click.prevent="goto('/signin')">
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
import { mapGetters, mapActions } from 'vuex';

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
    ...mapActions({
      register: 'register/signUp'
    }),
    validate: function signUp() {
      if (this.user.firstname && this.user.lastname && this.user.institution) {
        this.register(this.user);
      } else {
        this.$snackbar.open({
          message: 'Please fill in all the fields',
          type: 'is-danger'
        });
      }
    },
    next: function next() {
      if (this.user.password.length >= 6) {
        if (this.user.email && this.user.username && this.user.password) {
          this.step += 1;
          this.formOneClear = true;
        } else {
          this.$snackbar.open({
            message: 'Please fill in all fields',
            type: 'is-danger'
          });
        }
      } else {
        this.$snackbar.open({
          message: 'Password needs to be at least 6 characters long',
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
  height: 100vh !important;
  width: 100% !important;
  background: #eef7ed !important;
}
#signup-page .level,
#signup-page .level .level-item {
  height: inherit !important;
  width: 100% !important;
}
#signup-page .title {
  color: #17b79c !important;
  font-size: 2.8em !important;
  margin-bottom: 1.5rem !important;
}
#signup-page .subtitle {
  color: #303030 !important;
  font-size: 1.8em !important;
  margin-bottom: 1.5rem !important;
}
#signup-container {
  border: 2px solid #17b79c !important;
  opacity: 0 !important;
  padding: 2em !important;
  text-decoration: none !important;
  box-shadow: 1px !important;
  width: 450px !important;
  animation: formIn 0.5s ease-in-out 1s forwards !important;
}
#signup-copy {
  opacity: 0 !important;
  animation: slideIn 1s ease-in-out 0s forwards !important;
}
/* animations */
@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@-webkit-keyframes slideIn {
  from {
    -webkit-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0px);
    opacity: 1;
  }
}
@-moz-keyframes slideIn {
  from {
    -moz-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -moz-transform: translateY(0px);
    opacity: 1;
  }
}
@-o-keyframes slideIn {
  from {
    -o-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -o-transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes formIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
