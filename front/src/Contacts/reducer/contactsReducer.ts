import {I_contactsActions, SET_CONTACTS} from './actions';

const initialState = {
    constacts: [],
};

const contactsReducer = (state = initialState, action: I_contactsActions) => {
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
