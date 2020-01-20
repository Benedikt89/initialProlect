import {I_authState} from "../../types/types";

let initialState: I_authState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userID,email,login, isAuth) => ({type: SET_USER_DATA, payload:{userID,email,login, isAuth}});

export const getUserDataOnProfilePage = () => {
    return (dispatch) => {
        authAPI.getUserProfilePageRequest()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserData(id, email, login, true))
                }
            });
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email,password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getUserDataOnProfilePage())
                }
            });
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData(null,null,null, false))
                }
            })
    }
}

export default authReducer;





