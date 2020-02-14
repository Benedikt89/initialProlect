import {I_contact, I_formContact} from "../contacts-types";
import axios, {AxiosResponse} from "axios";
import { APIerrorLogger } from "../../utils/errorLogger";
import {GOOGLE_API_KEY} from "../../loginConfig";

const APIURL = "http://localhost:8000/api/contacts/";
const MAPURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";


export const contactsRequests = {
    getContacts(): Promise<Array<I_contact> | never> {
        return  axios.get(`${APIURL}`)
            .then((res) => {
            return res.data;
        })
    },
    async addContact(data: I_formContact) {
        try {
            let res: AxiosResponse<any | { error: string } | any> = await axios.post(`${APIURL}/create`, data);
            return res.data;
        } catch (err) {
            debugger;
            APIerrorLogger(err);
            throw err
        }
    },
    editContact: (data: I_contact) =>
        axios.put(`${APIURL}`, data),
    deleteContact: (id: string) => axios.delete(`${APIURL}/delete/${id}`),
};

export const getLatLng = (address: string) => {
    return axios.get(
        `${MAPURL}${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );
};