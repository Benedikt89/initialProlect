import {I_contactsActions, SET_CONTACTS} from './actions';
import {I_contact} from "../contacts-types";

interface I_contactsState {
    constacts:Array<I_contact>
}
const initialState:I_contactsState = {
    constacts: [
        {
            id: 'asdasd3w2effq2343qr',
            firstName: 'asda',
            lastName: 'sss',
            address: 'Minsk',
            city: 'Minsk',
            region: 'Minsk',
            country: 'Belarus',
            postalCode: '220111',
            phone: '123123123',
            email: '123123@tut.by',
            age: +'22'
        }
    ],
};

const contactsReducer = (state:I_contactsState = initialState, action: I_contactsActions) => {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                constacts: JSON.parse(JSON.stringify(action.payload))
            };
        default:
            return state
    }
};

export default contactsReducer;
