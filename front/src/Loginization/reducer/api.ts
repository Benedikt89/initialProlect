import axios from "axios";
import {APIerrorLogger} from "../../utils/errorLogger";
import {I_registerData} from "../../types/types";

const instance = axios.create({
    baseURL: "https://dry-forest-56016.herokuapp.com/auth",
    withCredentials: true
});

export let responseType: any;

export const authAPI = {
    loginUser(email: string, password: string, rememberMe: boolean)  {
        return instance
            .post(`/login`,{email, password, rememberMe })
            .then((response: any) => {
                responseType = typeof response
                return response
            })
            .catch((err:any)=> {
                APIerrorLogger(err);
                if (err.response.status === 500) {
                    return null;
                } else {
                    throw err;
                }
            })
    },
    async registerUser (data: I_registerData) {
        try {
            let res = await instance.post('/register', data);
            if (res.status >= 200 && res.status < 300) {
                return res.data;
            } else if (res.data.error) {
                return  new Error(res.data.error);
            }
        } catch (err) {
            APIerrorLogger(err);
            throw new Error('unknown Error');
        }
    },
};