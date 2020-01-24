export interface I_loginInfo {
    email: string,
    password: string
}

export interface I_userFullInfoType {
    id: string,
    photo?: string,
    birth_date?: Date,
    createdAt?: Date,
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
}