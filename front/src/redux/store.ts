import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {FormAction, reducer as formReducer} from "redux-form";
import reducer from '../App/reducer/reducer'
import authReducer from "../Loginization/reducer/authReducer";
import {I_appActions} from "../App/reducer/actions";
import {I_authActions} from "../Loginization/reducer/actions";

const rootReducer = combineReducers({
    reducer: reducer,
    form: formReducer,
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = I_authActions | I_appActions | FormAction;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;