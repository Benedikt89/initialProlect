export interface I_loginInfo {
    email: string,
    password: string
}

export interface I_userFullInfoType extends I_loginInfo{
    id: string,
    photo?: string,
    birth_date?: Date | string,
    createdAt: Date | undefined,
    firstName?: string,
    lastName?: string,
}