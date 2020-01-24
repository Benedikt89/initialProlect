export interface I_appState {
    isFetching: boolean,
    error: null | string
}
export interface I_dataToStore {
    asd: any
}
export interface I_eventObject {
    name: I_eventType,
    status: boolean,
    message: string | null
}

export type I_eventType = 'AUTH_FETCHING' | 'AUTH_ERROR' | 'LOGIN_ERROR' | 'REGISTER_ERROR' | 'AUTH_SUCCESS'

export interface I_authUserData {
    _id: string | null,
    email: string | null,
    password: string | null,
    isAdmin: boolean | null,
    __v: number | null,
    token: string | null,
    tokenDeathTime: number | null,
    rememberMe: boolean | null
}
export interface I_authState {
    userData: I_userSessionData,
    events: Array<I_eventObject>
}
export interface I_userSessionData extends I_authUserData{
    name: string | null,
    rememberMe: boolean | null
    created: string | null,
    updated: string | null
}


export interface I_registerData {
    email: string, password: string
}

export interface I_loginData extends I_registerData{
    rememberMe: boolean
}

