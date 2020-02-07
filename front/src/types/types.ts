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
    firstName: string | null,
    password: string | null,
    isAdmin: boolean | null,
}
export interface I_userSessionData extends I_authUserData {
    token: string | null,
    tokenDeathTime: number | null,
    rememberMe: boolean | null,
    createdAt: string | null,
    updated: string | null
}
export type I_userTotalData = I_userSessionData & I_authUserData

export interface I_authState {
    userData: I_userTotalData
    events: Array<I_eventObject>
}

export interface I_registerData {
    email: string,
    password: string
}

export interface I_loginData extends I_registerData{
    rememberMe: boolean
}

