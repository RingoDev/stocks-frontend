import axios from 'axios'

if(process.env.NODE_ENV==="development")
    axios.defaults.baseURL = 'http://localhost:8085/api/'
else axios.defaults.baseURL = 'http://172.104.147.144:8085/api/'


export const userDataStore = {
    state: {
        email: '',
    },
    getters: {
        getEmail(state){
            return state.email;
        },
    },
    actions: {
        getUserData(context) {
            return new Promise((resolve, reject) => {
                axios.get('/user/data', {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootGetters.getToken
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
    },
    mutations: {
        setUserData(state, userData) {
            state.email = userData.username;
        }
    }
}