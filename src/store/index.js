import { createStore } from 'vuex';
import axios from "axios";

export default createStore({

    state: {
        token: localStorage.getItem('token') || "",
        isAuthenticated: false,
        isAdmin: false, // Status admina
    },

    mutations: {
        UpdateAuthenticationStatus(state, status) {
            state.isAuthenticated = status;
        },
        UpdateAdminStatus(state, status) {
            state.isAdmin = status; // Aktualizacja statusu admina
        },
        UpdateToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        resetAuth(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.isAdmin = false; // Resetowanie statusu admina
        }
    },

    actions: {
        // Sprawdzenie statusu uwierzytelnienia użytkownika
        checkUserAuthenticationStatus({ commit }) {
            axios.get('http://localhost:8000/api/authenticated')
                .then(response => {
                    console.log('Odpowiedź z API:', response.data);
                    commit('UpdateAuthenticationStatus', response.data.status);
                    commit('UpdateAdminStatus', response.data.is_admin); // Aktualizacja statusu admina
                })
                .catch(error => {
                    console.log(error);
                });
        },

        setAuthStatus({ commit }, status) {
            commit('UpdateAuthenticationStatus', status);
            console.log('Status uwierzytelnienia: ' + status);
        },
        setAuthToken({ commit }, token) {
            commit('UpdateToken', token);
        },
        logout({ commit }) {
            commit('resetAuth');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    },

    getters: {
        authStatus: state => state.isAuthenticated, // Status uwierzytelnienia
        adminStatus: state => state.isAdmin // Status admina
    },
});
