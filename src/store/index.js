/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);
// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    questions: [
      // Question 1
      {
        id: 'sdadasdasdasdadasfasczx',
        category: 'Web Development',
        time_posted: '2019',
        description: 'What is web development?',
        author: 'Kenichii Ana',
        username: 'kenichiiana',
        user_id: 'asdfamdascaxkzcm',
        is_answered: false,
        is_duplicate: false,
        title: 'This is too hard',
        upvote: [],
      },
      {
        id: 'dasdasdsadasddasczxczxcz',
        category: 'Web Development',
        time_posted: '1998',
        description: 'Is it possible to create my SP in 5 months?',
        author: 'Kenichii Ana',
        username: 'kenichiiana',
        user_id: 'asdfamdascaxkzcm',
        is_answered: false,
        is_duplicate: false,
        title: 'I need help',
        upvote: [],
      },
      {
        id: 'zxczvzxvzvzxvzczx',
        category: 'Web Development',
        time_posted: '2006',
        description: 'Will you be able to graduate?',
        author: 'Kenichii Ana',
        username: 'kenichiiana',
        user_id: 'asdfamdascaxkzcm',
        is_answered: false,
        is_duplicate: false,
        title: 'Let me graduate',
        upvote: [],
      },
    ],
    user: null,
    isLoading: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    signUp({ commit }, payload) {
      commit('setLoading', true);
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          const newUser = {
            _id: user.user.uid,
            email: payload.email,
            username: payload.username,
            firstname: payload.firstname,
            lastname: payload.lastname,
            institution: payload.institution,
            is_banned: false,
            description: '',
            level: 1,
            experience: 0,
            level_exp: 10,
            rank: 'Beginner',
          };
          const updates = {}
          updates['/user/' + newUser._id] = newUser;

          firebase.database()
            .ref()
            .update(updates)
            .then(() => {
              commit('setUser', newUser);
              commit('setLoading', false);
            }).catch(
              (error) => {
                // eslint-disable-next-line
                console.log(error);
              }
            )
        },
      ).catch(
        (error) => {
          commit('setLoading', false);
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/email-already-in-use') {
            alert('Email is already in use, please use another email.');
          } else if (errorCode === 'auth/invalid-email') {
            alert('The email you entered is invalid, please try again.');

          } else if (errorCode === 'auth/weak-password') {
            alert('Please use a password that contains at least 6 characters.');
          } else {
            alert(errorMessage)
          }
        },
      );
    },
    loginViaEmail( { commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          const newUser = {
            id: user.uid,
          };
          commit('setUser', newUser);
        },
      ).catch(
        (error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Incorrect password, please try again.');
          } else if (errorCode === 'auth/invalid-email') {
            alert('The email you entered is invalid, please try again.');

          } else if (errorCode === 'auth/user-not-found') {
            alert('The user is not in the database, please try again');
          } else {
            alert(errorMessage)
          }
        },
      );
    },
    loginViaUsername( { commit }, payload) {
      // login via username here
    },
    loginMethod({ commit, dispatch }, payload) {
      var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (reg.test(payload.email)) {
        this.dispatch('loginViaEmail', payload);
      } else {
        this.dispatch('loginViaUsername', payload);
      }
    },
    relog({ commit }, payload) {
      // automatically relogs the user into the platform
      commit('setUser', {
        id: payload.uid,
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
  getters: {
    loadQuestions(state) {
      // returns all questions sorted
      return state.questions.sort((questionOne, questionTwo) => {
        return questionOne.time_posted > questionTwo.time_posted;
      })
    },
    getQuestionById(state) {
      return (questionId) => {
        return state.questions.find((question) => {
          return question.id === questionId;
        })
      }
    },
    getUser(state) {
      return state.user;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
});
