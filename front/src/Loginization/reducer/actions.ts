import {Dispatch} from "redux";
import {AppStateType} from "../../redux/store";
import {I_registerData, I_authState, I_loginData} from "../../types/types";
import {authAPI} from "./api";
import {ThunkDispatch} from "redux-thunk";
import {_setError, _toggleIsFetching, I_appActions} from "../../App/reducer/actions";
import {FormAction, stopSubmit} from "redux-form";
import createAuth0Client from "@auth0/auth0-spa-js";
import config from "../../auth_config.json";

type GetStateType = () => AppStateType


export const LOGOUT_USER_SUCCESS = 'app/auth/LOGOUT_USER_SUCCESS';
export const SET_USER_DATA = 'app/auth/SET_USER_DATA';

export type I_authActions =
    I_userSessionDataAC | I_logoutUserSuccessAC

//interfaces
interface I_userSessionDataAC {
    type: typeof SET_USER_DATA,
    payload: I_authState
}

interface I_logoutUserSuccessAC {
    type: typeof LOGOUT_USER_SUCCESS
}


//Internal ACTIONS CREATORS

export const _setAuthUserData = (payload: any): I_userSessionDataAC => ({type: SET_USER_DATA, payload});
export const _logout = () => ({type: LOGOUT_USER_SUCCESS})


//EXTERNAL ACTIONS

export const loginUserThunk = (data: I_loginData) =>
    async (dispatch: ThunkDispatch<{}, {}, I_authActions | I_appActions | FormAction>, getState: GetStateType) => {
    try{
        console.log(data);
        let response = await authAPI.loginUser(data);
        if (response) {
            dispatch(_setAuthUserData(response));
        }
        debugger

    }
    catch (err) {
        debugger
        console.log("actions.ts error - " + err)
    }
    };


export const registerUser = (registerData: I_registerData) =>
    async (dispatch: ThunkDispatch<{}, {}, I_authActions | I_appActions | FormAction>, getState: GetStateType) => {
        try {
            dispatch(_toggleIsFetching(true));
            let res = await authAPI.registerUser(registerData);
            if (res.success) {
                dispatch(_setAuthUserData(res.addedUser));
            }
            dispatch(_toggleIsFetching(false));
        } catch (err) {
            console.log(err);
            //if its no data return
            if (err.response && err.response.config.url === "api.user.getstate" && err.response.status === 403) {
                dispatch(stopSubmit('registration', {_error: err.message}));
                dispatch(_toggleIsFetching(false));
                dispatch(_setError(null));
            } else {
                dispatch(_setError('network Problems'));
                dispatch(_toggleIsFetching(false));
            }
        }
    };

export const registerWithAuth0 = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_authActions | I_appActions | FormAction>, getState: GetStateType) => {
        try {
            dispatch(_toggleIsFetching(true));

            const initAuth0 = async () => {
                var initOptions = {
                    domain: config.domain,
                    client_id: config.clientId,
                    redirect_uri: window.location.origin
                };
                debugger;
                const auth0FromHook = await createAuth0Client(initOptions);
                console.log(auth0FromHook);

                if (window.location.search.includes("code=")) {
                    const { appState } = await auth0FromHook.handleRedirectCallback();
                    console.log(appState);
                }

                const isAuthenticated = await auth0FromHook.isAuthenticated();

                console.log(isAuthenticated);

                if (isAuthenticated) {
                    const user = await auth0FromHook.getUser();
                    console.log(user);
                }
            };
            initAuth0();

            dispatch(_toggleIsFetching(false));
        } catch (err) {
            console.log(err);
            //if its no data return
            dispatch(_setError('network Problems'));
            dispatch(_toggleIsFetching(false));
        }
    };
