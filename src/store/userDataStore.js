import axios from 'axios'

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