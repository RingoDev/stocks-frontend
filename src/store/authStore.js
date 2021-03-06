import axios from "axios";

if (process.env.NODE_ENV === "development")
    axios.defaults.baseURL = 'http://localhost:8080/api/'
else axios.defaults.baseURL = 'https://www.ringodev.xyz:8443/api/'

export const authStore = {
    state: {
        stockList: [],
        token: localStorage.getItem('access_token') || null,
    },

    getters: {
        getToken(state) {
            return state.token
        },
        loggedIn(state) {
            return state.token !== null && state.token !== "null";
        }
    },
    actions: {
        register(context, credentials) {
            const url = '/signup';
            return new Promise((resolve, reject) => {
                axios.post(url,credentials).then(r => resolve(r)).catch(e => reject(e));
            });
        },
        login(context, credentials) {
            const url = '/authenticate'
            return new Promise((resolve, reject) => {
                axios.post(url,credentials)
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
        setToken(state, token) {
            state.token = token;
        },
        destroyToken(state) {
            state.token = null;
        },

    }

}