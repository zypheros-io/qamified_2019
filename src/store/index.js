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
          commit('setLoading', false);
          const newUser = {
            id: user.user.uid,
          };
          commit('setUser', newUser);
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
    signIn({ commit }, payload) {
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
