import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8085/api/'


Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        positions: []

    },
    getters: {
        loggedIn(state){
            return state.token !== null;
        }
    },
    actions: {
        login(context, credentials) {
            const url = '/authenticate?username=' + credentials.email + '&password=' + credentials.password
            return new Promise((resolve, reject) => {
                axios.get(url)
                    .then(response => {
                        const token = response.data
                        localStorage.setItem('access_token', token)
                        context.commit('login', token)
                        resolve(token);
                    }).catch(error =>{
                    reject(error);
                })
            });
        }
    },
    mutations: {
        login(state, token) {
            state.token = token;
        }
    }
})