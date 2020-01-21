import axios from "axios";
import {APIerrorLogger} from "../../utils/errorLogger";
import {I_loginData, I_registerData} from "../../types/types";

const instance = axios.create({
    baseURL: "https://dry-forest-56016.herokuapp.com/auth"
    /*withCredentials: true*/
});

export const authAPI = {
    async loginUser(data: I_loginData) {
        try {
            debugger
            let response = await instance.post(`/login`, data)
            debugger
            return response.data
        } catch (err) {
            debugger;
            APIerrorLogger(err);
        }

    },
    async registerUser(data: I_registerData) {
        try {
            let res = await instance.post('/register', data);
            if (res.status >= 200 && res.status < 300) {
                debugger
                return res.data;
            } else if (res.data.error) {
                return new Error(res.data.error);
            }
        } catch (err) {
            APIerrorLogger(err);
            throw new Error('unknown Error');
        }
    },
};