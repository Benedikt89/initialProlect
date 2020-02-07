import axios from "axios";
import {APIerrorLogger} from "../../utils/errorLogger";
import {I_loginData, I_registerData, I_userSessionData} from "../../types/types";

const instance = axios.create({
    // baseURL: "https://dry-forest-56016.herokuapp.com/auth"
    baseURL: "http://localhost:8000/api/users",
    withCredentials: true
});

export const authAPI = {
    async loginUser(data: I_loginData): Promise<I_userSessionData | any> {
        try {
            let response = await instance.post(`/login`, data);
            return new Promise(( resolve, reject ) => {
                resolve(response.data.userInfo)
            })
        } catch (err) {
            APIerrorLogger(err);
            throw err;
        }

    },

    async registerUser(data: I_registerData) {
        try {
            let res = await instance.post('/register', data);
            if (res.status >= 200 && res.status < 300) {
                debugger;
                return res.data;
            } else if (res.data.error) {
                return new Error(res.data.error);
            }
        } catch (err) {
            APIerrorLogger(err);
            throw new Error('unknown Error');
        }
    },
    async recoverPassword(email: string) {
        try
        {
            debugger;
            let response = await instance.post('/forgot', {email});
            debugger;
            return new Promise((resolve,reject)=>{
                resolve(response)
            })
        }
         catch (err) {
            APIerrorLogger(err);
            console.log("HERE:"+err);
            debugger
        }
    },
};