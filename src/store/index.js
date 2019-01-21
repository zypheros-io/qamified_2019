/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import moment from 'moment';

Vue.use(Vuex);
Vue.use(moment);
// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    questions: [
      // Question 1
      {
        id: 'sdadasdasdasdadasfasczx',
        title: 'This is too hard',
        description: 'What is web development?',
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
    },
    createPost(state, payload) {
      state.questions.push(payload);
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
            .then(
              () => {
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
      commit('setLoading', true);
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          const newUser = {
            id: user.uid,
          };
          commit('setUser', newUser);
          commit('setLoading', false);
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
      commit('setLoading', true);
      // login via username here
      firebase.database()
        .ref('user')
        .orderByChild('username')
        .equalTo(payload.email)
        .limitToFirst(1)
        .once('value', user => {
          // check if array is empty 
          if(user !== undefined && user !== null) {
            // set retrieved user as matching user
            let matchingUser;
            user.forEach(
              (u) => {
                matchingUser = u.val();
              }
            )
            firebase.auth()
              .signInAndRetrieveDataWithEmailAndPassword(matchingUser.email, payload.password)
              .then(
                (user) => {
                  // set user in store to current user
                  commit('setUser', user);
                  commit('setLoading', false);
                }
              ).catch(
                (error) => {
                  // eslint-disable-next-line
                  console.log(error);
                }
              ) 
          } else {
            // if user with 'username' not found
            // alert uer
            commit('setLoading', false);
            alert('User does not exist.');
          }
        });
    },
    loginMethod({ commit, dispatch }, payload) {
      var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (reg.test(payload.email)) {
        this.dispatch('loginViaEmail', payload);
      } else {
        this.dispatch('loginViaUsername', payload);
      }
    },
    postQuest({ commit }, payload) {
      commit('setLoading', true);
      // eslint-disable-next-line
      console.log("Hello 1")
      const quest = {
        id: '',
        title: payload.title,
        description: payload.desc,
      };
      // get key of the new quest
      const newKey = firebase.database().ref().child('quest').push().key;
      // update quest object's key
      quest.id = newKey;
      const updates = {};
      updates['/quest/' + quest.id] = quest;

      // update database
      firebase.database()
        .ref()
        .update(updates)
        .then(
          () => {
            // eslint-disable-next-line
            console.log("Hello")
            commit('setLoading', false);
            commit('createPost', quest)
        }).catch(
          (error) => {
            // eslint-disable-next-line
            console.log(error);
            commit('setLoading', false);
          }
        )

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
