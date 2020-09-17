import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8085/api/'


Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        stockList: [],
        token: localStorage.getItem('access_token') || null,
        positions: [],
        email:'',


    },

    getters: {
        getPositions(state){
            return state.positions;
        },
        loggedIn(state) {
            return state.token !== null && state.token !== "null";
        }
    },
    actions: {
        addPosition(context, position) {
            return new Promise((resolve, reject) => {
                axios.post('/user/addPosition', position, {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                    .then(response => {
                        context.commit('addPosition', position)
                        resolve(response);
                    }).catch(error => {
                    reject(error);
                })
            });
        },
        getUserData(context){
            return new Promise((resolve, reject) => {
                axios.get('/user/data', {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                    .then(response => {
                        const userData = response.data
                        context.commit('setUserData', userData)
                        resolve(response);
                    }).catch(error => {
                    reject(error);
                })
            });
        },
        getStockList(context) {
            return new Promise((resolve, reject) => {
                axios.get('/stocks/list', {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                    .then(response => {
                        const list = response.data
                        // eslint-disable-next-line
                        console.log(list);
                        localStorage.setItem('stock_list', list)
                        context.commit('setStockList', list)
                        resolve(list);
                    }).catch(error => {
                    reject(error);
                })
            });
        },

        login(context, credentials) {
            const url = '/authenticate?username=' + credentials.email + '&password=' + credentials.password
            return new Promise((resolve, reject) => {
                axios.get(url)
                    .then(response => {
                        const token = response.data
                        // eslint-disable-next-line
                        console.log(token);
                        localStorage.setItem('access_token', token)
                        context.commit('setToken', token)
                        resolve(token);
                    }).catch(error => {
                    reject(error);
                })
            });
        },
        logout(context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    // reset token in backend

                    // axios.get(url)
                    //     .then(response => {
                    //         const token = response.data
                    //         // eslint-disable-next-line
                    //         console.log(token);
                    //         localStorage.setItem('access_token', token)
                    //         context.commit('setToken', token)
                    //         resolve(token);
                    //     }).catch(error =>{
                    //     reject(error);
                    // })
                    localStorage.removeItem('access_token')
                    context.commit('destroyToken');
                    // eslint-disable-next-line
                    1 === 1 ? resolve() : reject();
                });
            }
        }
    },
    mutations: {
        addPosition(state, position) {
            state.positions.push(position);
        },
        setStockList(state, list) {
            state.stockList = list;
        },
        setToken(state, token) {
            state.token = token;
        },
        destroyToken(state) {
            state.token = null;
        },
        setUserData(state,userData){
            state.email = userData.username;
            state.positions = userData.positions;
        }
    }
})