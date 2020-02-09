import {Dispatch} from "redux";
import {AppActionsType, AppStateType} from "../../redux/store";
import {authAPI} from "./api";
import {ThunkDispatch} from "redux-thunk";
import { _setError, _toggleIsFetching } from "../../App/reducer/actions";
import { stopSubmit } from "redux-form";
import {I_authUserData, I_loginData, I_registerData} from "../../types/auth-types";
import {I_authToFrontUserData} from "../../../../core/users-types";
/*import createAuth0Client from "@auth0/auth0-spa-js";
import config from "../../auth_config.json";*/

type GetStateType = () => AppStateType

export const LOGOUT_USER_SUCCESS = 'app/auth/LOGOUT_USER_SUCCESS';
export const SET_USER_DATA = 'app/auth/SET_USER_DATA';

export type I_authActions =
    I_userSessionDataAC | I_logoutUserSuccessAC

//interfaces
interface I_userSessionDataAC {
    type: typeof SET_USER_DATA,
    payload: I_authUserData
}

interface I_logoutUserSuccessAC {
    type: typeof LOGOUT_USER_SUCCESS
}


//ACTIONS CREATORS
export const _setAuthUserData = (payload: I_authUserData): I_userSessionDataAC => ({ type: SET_USER_DATA, payload });
export const logOut = (): I_logoutUserSuccessAC => ({ type: LOGOUT_USER_SUCCESS });


//EXTERNAL ACTIONS
export const loginUserThunk = (data: I_loginData) =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
        try {
            let response:I_authToFrontUserData = await authAPI.loginUser(data);
            dispatch(_setAuthUserData(response));
        } catch (err) {
            console.log(JSON.parse(JSON.stringify(err)));
            //if its no data return
            if (err.response.status === 403 || err.response.status === 401) {
                dispatch(stopSubmit('login', {_error: err.response.data.message}));
                dispatch(_toggleIsFetching(false));
                dispatch(_setError(null));
            } else {
                dispatch(_setError('network Problems'));
                dispatch(_toggleIsFetching(false));
            }
        }
    };

export const registerUser = (registerData: I_registerData) =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
        try {
            let res = await authAPI.registerUser(registerData);
            if (res.success) {
                dispatch(_setAuthUserData(res.addedUser));
            }
            dispatch(_toggleIsFetching(false));
        } catch (err) {
            console.log(JSON.parse(JSON.stringify(err)));
            //if its no data return
            if (err.response && err.response.status === 409) {
                dispatch(stopSubmit('registration', {_error: err.response.data.message}));
                dispatch(_toggleIsFetching(false));
            } else {
                dispatch(stopSubmit('registration', {_error: 'network Problems'}));
                dispatch(_toggleIsFetching(false));
            }
        }
    };


export const recoverPassword = (email: string) =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
        try {
        debugger
            let result = await authAPI.recoverPassword(email);
        debugger
            return result
        } catch (err) {
        debugger
            console.log("recoverPassword error - " + err)
        }
    };

export const registerWithAuth0 = () =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
        try {
            dispatch(_toggleIsFetching(true));

            const initAuth0 = async () => {
                // var initOptions = {
                //     domain: config.domain,
                //     client_id: config.clientId,
                //     redirect_uri: window.location.origin
                // };
                // debugger;
                // const auth0FromHook = await createAuth0Client(initOptions);
                const auth0FromHook = 'asd';
                console.log(auth0FromHook);

                // if (window.location.search.includes("code=")) {
                //     const { appState } = await auth0FromHook.handleRedirectCallback();
                //     console.log(appState);
                // }
                //
                // const isAuthenticated = await auth0FromHook.isAuthenticated();
                //
                // console.log(isAuthenticated);
                //
                // if (isAuthenticated) {
                //     const user = await auth0FromHook.getUser();
                //     console.log(user);
                // }
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
