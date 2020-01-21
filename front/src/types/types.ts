export interface I_appState {
    isFetching: boolean,
    error: null | string,
}
export interface I_dataToStore {
    asd: any
}
export interface I_authState {
    _id: string | null,
    email: string | null,
    password: string | null,
    isAdmin: boolean | null,
    __v: number | null,
    token: string | null,
    tokenDeathTime: number | null,
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

