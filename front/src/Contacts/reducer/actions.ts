import {I_contact, I_formContact} from "../contacts-types";
import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, AppStateType} from "../../redux/store";
import {contactsRequests} from "./requests";

export const SET_CONTACTS = 'SET_CONTACTS';

type GetStateType = () => AppStateType
interface I_setContacts {
    type: typeof SET_CONTACTS,
    payload: Array<I_contact>
}
export const setContacts = (contacts: Array<I_contact>):I_setContacts => {
    return {
        type: SET_CONTACTS,
        payload: contacts
    }
};

export const getContacts = () => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await contactsRequests.getContacts();
        dispatch(setContacts(response));
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const addContact = (data: I_formContact) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await contactsRequests.addContact(data);
        console.log(JSON.parse(JSON.stringify(response)));
        dispatch(getContacts);
    } catch (err) {
        debugger;
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const editContact = (data: I_contact) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await contactsRequests.editContact(data);
        console.log(JSON.parse(JSON.stringify(response)));
        dispatch(getContacts);
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const deleteContact = (id: string) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await contactsRequests.deleteContact(id);
        console.log(JSON.parse(JSON.stringify(response)));
        await dispatch(getContacts);
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export type I_contactsActions = I_setContacts