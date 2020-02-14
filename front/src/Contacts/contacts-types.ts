
export interface I_contact extends I_formContact{
    id: string
}

export interface I_formContact {
    firstName:string,
    lastName: string,
    address: string,
    city: string,
    region: string,
    country: string,
    postalCode: string,
    phone: string,
    email: string,
    age: number
}