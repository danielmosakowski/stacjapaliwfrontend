import { createStore} from 'vuex';
import axios from "axios";

export default createStore({

    state:{
        token: localStorage.getItem('token')||"",
<<<<<<< HEAD
        isAuthenticated: false
=======
        isAuthenticated: false,
        isAdmin: false,  //admin
>>>>>>> dominikBranch
    },

    mutations:{
        UpdateAuthenticationStatus(state, status){
            state.isAuthenticated = status;
        },
<<<<<<< HEAD
=======
        UpdateAdminStatus(state, status) {
            state.isAdmin = status;
        },  //admin
>>>>>>> dominikBranch

        UpdateAuthStatus(state,status){
            state.isAuthenticated=status;
        },

        UpdateToken(state,token){
            state.token=token
            localStorage.setItem('token',token)
        },
        resetAuth(state){
<<<<<<< HEAD
            state.token = null
            state.isAuthenticated=false
=======
            state.token = null;
            state.isAuthenticated=false;
            state.isAdmin=false;  //admin
>>>>>>> dominikBranch
        }

    },

    actions:{
        //check user state
        checkUserAuthenticationStatus({commit}){
            axios.get('http://localhost:8000/api/authenticated')
                .then(response =>{
<<<<<<< HEAD
                    console.log(response)
                    commit('UpdateAuthenticationStatus', response.data.status)
                })
                .catch(error =>{
                    console.log(error)
            })
        },
=======
                    console.log('Odpowiedź z API:', response.data);
                    commit('UpdateAuthenticationStatus', response.data.status);
                    commit('UpdateAdminStatus', response.data.is_admin); //admin

                })
                .catch(error =>{
                    console.log(error)
                })
        },

>>>>>>> dominikBranch
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
<<<<<<< HEAD
        authStatus: state => state.isAuthenticated   //2 metoda

=======
        authStatus: state => state.isAuthenticated,   //2 metoda
        adminStatus: state => state.isAdmin
>>>>>>> dominikBranch
    },



});