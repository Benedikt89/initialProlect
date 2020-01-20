import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from "redux-form";
import reducer from '../App/reducer/reducer'
import authReducer from "../Loginization/reducer/authReducer";

const rootReducer = combineReducers({
    reducer: reducer,
    form: formReducer,
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;