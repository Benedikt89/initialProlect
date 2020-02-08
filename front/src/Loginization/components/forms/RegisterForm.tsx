import React from "react";
import style from './FormControl.module.css';
import {Field, reduxForm} from "redux-form";
import {renderField} from "./FormElements/FormsControls";
import {email, minLength4, required} from "./FormElements/validators";
import {I_registerData} from "../../../types/auth-types";

const RegisterUserForm = ({handleSubmit, pristine, submitting, error}: any) => {

    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
            <Field name="email"
                   type="text"
                   component={renderField}
                   label="Имя Пользователя"
                   validate={[required, minLength4, email]}
            />
            <Field name="password"
                   type="password"
                   component={renderField}
                   label="Пароль"
                   validate={[required, minLength4]}
            />
            {error && <span className={style.mainErrorMessage}>{error}</span>}

            <button type="submit" disabled={pristine || submitting}>Sign Up</button>
        </form>
    )
};
export default reduxForm<I_registerData>({form: 'registration'})(RegisterUserForm)