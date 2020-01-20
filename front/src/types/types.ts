export interface I_appState {
    isFetching: boolean,
    error: null | string,
}
export interface I_dataToStore {
    asd: any
}
export interface I_authState {
    userID: string | number | null
    email: string | null,
    login: string | null,
    isAuth: boolean
}