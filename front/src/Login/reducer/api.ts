import axios, {AxiosResponse} from "axios";
import {APIerrorLogger} from "../../utils/errorLogger";
import {I_loginData, I_registerData} from "../auth-types";
import {I_authToFrontUserData} from "../../types/users-types";

const instance = axios.create({
    // baseURL: "https://dry-forest-56016.herokuapp.com/auth"
    baseURL: "http://localhost:8000/api/users",
    withCredentials: true
});

interface I_serverResponse {
    message: string,
    userInfo?: I_authToFrontUserData
}

export const authAPI = {
    async loginUser(data: I_loginData): Promise<I_authToFrontUserData | never> {
        try {
            let response = await instance.post(`/login`, data);
            return new Promise((resolve, reject) => {
                resolve(response.data.userInfo)
            })
        } catch (err) {
            APIerrorLogger(err);
            throw err;
        }
    },

    async registerUser(data: I_registerData) {
        try {
            let res: AxiosResponse<I_serverResponse | { error: string } | any> = await instance.post('/register', data);
            return res.data;
        } catch (err) {
            APIerrorLogger(err);
            throw err
        }
    },
    async recoverPassword(email: string) {
        try {
        debugger;
            let response = await instance.post('/forgot', {email});
        debugger;
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (err) {
            APIerrorLogger(err);
            console.log("HERE:" + err);
        debugger
        }
    },
};