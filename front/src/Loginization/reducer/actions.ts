import {Dispatch} from "redux";
import {AppStateType} from "../../redux/store";
import {I_userSessionData} from "../../types/types";
import {authAPI} from "./api";

type GetStateType = () => AppStateType


export const LOGOUT_USER_SUCCESS = 'app/auth/LOGOUT_USER_SUCCESS';
export const SET_USER_DATA = 'app/auth/SET_USER_DATA'

export type I_authActions =
    I_userSessionDataAC | I_logoutUserSuccessAC

//interfaces
interface I_userSessionDataAC {
    type: typeof SET_USER_DATA,
    payload: I_userSessionData
}

interface I_logoutUserSuccessAC {
    type: typeof LOGOUT_USER_SUCCESS,
    payload: any                //// !!!
}



//Internal ACTIONS CREATORS

export const _setAuthUserData = (payload: I_userSessionData): I_userSessionDataAC => ({type: SET_USER_DATA, payload});

//EXTERNAL ACTIONS

export const loginUserThunk = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        authAPI.loginUser(email, password, rememberMe)
            .then((response:any) => {
                dispatch(_setAuthUserData(response))
            })
            .catch((err:any) => {
                console.log("actions.ts error: "+err)
            })
    }
}