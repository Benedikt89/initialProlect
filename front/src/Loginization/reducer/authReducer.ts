import {I_authState} from "../../types/types";

import {I_authActions, SET_USER_DATA} from "./actions";

let initialState: I_authState = {

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

}

const authReducer = (state: I_authState = initialState, action: I_authActions) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}


export default authReducer;





