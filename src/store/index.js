import Vue from 'vue'
import Vuex from 'vuex'
import {authStore} from '@/store/authStore'
import {stockStore} from "@/store/stockStore";
import {userDataStore} from "@/store/userDataStore";


Vue.use(Vuex)


export const store = new Vuex.Store({
    modules: {
        auth: authStore,
        stock: stockStore,
        userData: userDataStore
    }
})