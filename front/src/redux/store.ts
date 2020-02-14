import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {FormAction, reducer as formReducer} from "redux-form";
import reducer from '../App/reducer/reducer'
import authReducer from "../Login/reducer/authReducer";
import {I_appActions} from "../App/reducer/actions";
import {I_authActions} from "../Login/reducer/actions";
import contactsReducer from "../Contacts/reducer/contactsReducer";
import {I_contactsActions} from "../Contacts/reducer/actions";

const rootReducer = combineReducers({
    reducer: reducer,
    contacts: contactsReducer,
    form: formReducer,
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = I_authActions | I_appActions | FormAction | I_contactsActions;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;