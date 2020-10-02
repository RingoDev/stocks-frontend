import axios from "axios";


export const stockStore = {
    state: {
        stockList: [],
        featuredStocks: [],
        validDates: [],
        monthHistories: [],
        // wont be reset on reloading stockdata
        localPositions: []
    },


    actions: {
        addPosition(context, position) {
            return new Promise((resolve, reject) => {
                axios.post('/user/addPosition', position, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootGetters.getToken
                    }
                })
                    // eslint-disable-next-line
                    .then(response => {
                        axios.get('/user/stock', {
                            headers: {
                                'Authorization': 'Bearer ' + context.rootGetters.getToken
                            }
                        })
                            .then(response => {
                                const stockData = response.data
                                context.commit('setUserStockData', stockData)
                                resolve(response);
                            }).catch(error => {
                            reject(error);
                        })

                    }).catch(error => {
                    reject(error);
                })
            });
        },
        removePosition(context, id) {
            // remove immediately to reload page faster
            const pos = context.getters.getLocalPositions
            for (let i = 0; i < pos.length; i++) {
                if (pos[i].id === id) {
                    pos.splice(i, 1);
                    break;
                }
            }
            context.commit("setLocalPositions", pos);
            return new Promise((resolve, reject) => {
                axios.post('/user/removePosition', {id: id}, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootGetters.getToken
                    }
                })
                    // eslint-disable-next-line
                    .then(response => {
                        axios.get('/user/stock', {
                            headers: {
                                'Authorization': 'Bearer ' + context.rootGetters.getToken
                            }
                        })
                            .then(response => {
                                const stockData = response.data
                                context.commit('setUserStockData', stockData)
                                resolve(response);
                            }).catch(error => {
                            reject(error);
                        })

                    }).catch(error => {
                    reject(error);
                })
            });
        },
        getStockData(context) {
            return new Promise((resolve, reject) => {
                axios.get('/user/stock', {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootGetters.getToken
                    }
                })
                    .then(response => {
                        const stockData = response.data
                        context.commit('setUserStockData', stockData)
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
                        'Authorization': 'Bearer ' + context.rootGetters.getToken
                    }
                })
                    .then(response => {
                        const list = response.data
                        context.commit('setStockList', list)
                        resolve(list);
                    }).catch(error => {
                    reject(error);
                })
            });
        },
        setPositionChecked(context, id) {
            const positions = context.getters.getLocalPositions
            for (let i = 0; i < positions.length; i++) {
                if (positions[i].id === id) {
                    positions[i].checked = !positions[i].checked;
                    context.commit('setLocalPositions', positions);
                    return
                }
            }
        },
    },
    getters: {

        getStockList(state) {
            return state.stockList;
        },
        getLocalPositions(state) {
            return state.localPositions;
        },
        getValidDates(state) {
            return state.validDates;
        },
    },

    mutations: {
        setLocalPositions(state, localPositions) {
            state.localPositions = localPositions
        },
        setStockList(state, list) {
            state.stockList = list;
        },
        setUserStockData(state, stockData) {
            // copying monthdata
            //state.positions = JSON.parse(JSON.stringify(stockData.monthHistories))
            state.localPositions = stockData.positions
            state.validDates = stockData.validDates;
        }
    }

}