import axios from "axios";
import {APIerrorLogger} from "../../utils/errorLogger";

const instance = axios.create({
    baseURL: "http://localhost:8421/",
    withCredentials: true
});

export const gameDataApi = {
    fetchData () {
        return instance.get('api.user.getstate')
            .then(res => {
                return res.data
            })
            .catch((err)=> {
                APIerrorLogger(err);
                if (err.response.status === 500) {
                    return null;
                } else {
                    throw err;
                }
            })
    }
};