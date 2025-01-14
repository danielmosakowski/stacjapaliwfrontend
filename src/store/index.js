import { createStore} from 'vuex';
import axios from "axios";

export default createStore({

    state:{
        token: localStorage.getItem('token')||"",
        isAuthenticated: false,
        isAdmin: false,  //admin
    },

    mutations:{
        UpdateAuthenticationStatus(state, status){
            state.isAuthenticated = status;
        },
        UpdateAdminStatus(state, status) {
            state.isAdmin = status;
        },  //admin

        UpdateAuthStatus(state,status){
            state.isAuthenticated=status;
        },

        UpdateToken(state,token){
            state.token=token
            localStorage.setItem('token',token)
        },
        resetAuth(state){
            state.token = null;
            state.isAuthenticated=false;
            state.isAdmin=false;  //admin
        }

    },

    actions:{
        //check user state
        checkUserAuthenticationStatus({commit}){
            axios.get('http://localhost:8000/api/authenticated')
                .then(response =>{
                    console.log('Odpowiedź z API:', response.data);
                    commit('UpdateAuthenticationStatus', response.data.status);
                    commit('UpdateAdminStatus', response.data.is_admin); //admin

                })
                .catch(error =>{
                    console.log(error)
                })
        },

        setAuthStatus({commit}, status){
            commit('UpdateAuthStatus', status);

            console.log('status is' + status)

        },
        setAuthToken({commit},token){
            commit('UpdateToken', token)
        },
        logout({commit}){
            commit('resetAuth')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        }
    },

    getters:{
        authStatus: state => state.isAuthenticated,   //2 metoda
        adminStatus: state => state.isAdmin
    },



});