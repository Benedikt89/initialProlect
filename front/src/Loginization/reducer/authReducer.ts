import {I_authState, I_eventObject} from "../../types/types";

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
    events: [
        {
            name: 'AUTH_FETCHING',
            status: false,
            message: null
        },
        {
            name: 'AUTH_SUCCESS',
            status: false,
            message: null
        },
        {
            name: 'AUTH_ERROR',
            status: false,
            message: null
        },
    ]
};

const authReducer = (state: I_authState = initialState, action: I_authActions) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userData: {...state.userData, ...action.payload},
                events: state.events.map(( e:I_eventObject) => { if (e.message === 'AUTH_FETCHING') {
                    return {...e, status: false, message: null}
                } else
                    return e
                })
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
};


export default authReducer;





