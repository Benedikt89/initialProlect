import {I_authState} from "../../types/types";

import {I_authActions, LOGOUT_USER_SUCCESS, SET_USER_DATA} from "./actions";

let initialState: I_authState = {
    userData: {
        _id: null,
        email: null,
        password: null,
        isAdmin: null,
        __v: null,
        token: null,
        tokenDeathTime: null,
        rememberMe: null,
        name: null,
        created: null,
        updated: null
    },
    isFetchingAuth: false,
    errorAuth: null,
    isAuth: false
}

const authReducer = (state: I_authState = initialState, action: I_authActions) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userData: {...action.payload},
                isAuth: true
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                userData: {
                    _id: null,
                    email: null,
                    password: null,
                    isAdmin: null,
                    __v: null,
                    token: null,
                    tokenDeathTime: null,
                    rememberMe: null,
                    name: null,
                    created: null,
                    updated: null
                },
                isFetchingAuth: false,
                errorAuth: null,
                isAuth: false
            }
        }
        default:
            return state;
    }
}


export default authReducer;





