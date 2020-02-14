import {I_contact} from "../contacts-types";

const APIURL = "http://localhost:3000";
const MAPURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

import axios, {AxiosResponse} from "axios";
import {I_registerData} from "../../Login/auth-types";
import {APIerrorLogger} from "../../utils/errorLogger";

export const GOOGLE_API_KEY = "your API key";

export const contactsRequests = {
    getContacts(): Promise<Array<I_contact> | never> {
        return  axios.get(`${APIURL}/contacts`)
            .then((res) => {
            return res.data;
        })
    },
    async addContact(data: I_registerData) {
        try {
            let res: AxiosResponse<any | { error: string } | any> = await axios.post(`${APIURL}/contacts`, data);
            return res.data;
        } catch (err) {
            APIerrorLogger(err);
            throw err
        }
    },
};

export const addContact = (data: I_contact) => axios.post(`${APIURL}/contacts`, data);

export const editContact = (data: I_contact) =>
    axios.put(`${APIURL}/contacts/${data.id}`, data);

export const deleteContact = (id: string) => axios.delete(`${APIURL}/contacts/${id}`);

export const getLatLng = (address: string) => {
    return axios.get(
        `${MAPURL}${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );
};