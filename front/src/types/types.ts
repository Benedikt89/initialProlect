export interface I_appState {
    isFetching: boolean,
    error: null | string,
}
export interface I_dataToStore {
    asd: any
}
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
    userData: I_authUserData,
    isFetching: boolean,
    error: string | null,
}
export interface I_userSessionData extends I_authState{
    name: string | null,
}

export interface I_registerData {
    email: string, password: string
}

