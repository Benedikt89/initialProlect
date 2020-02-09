import React from "react";
import style from './FormElements/FormControl.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {renderField} from "./FormElements/FormsControls";
import {email, minLength4, required} from "./FormElements/validators";
import { I_registerData} from "../../../types/auth-types";

const RegisterUserForm:React.FC<InjectedFormProps<I_registerData>> = (props) => {
    let {handleSubmit, pristine, submitting, error} = props;
    console.log(error);
    return (
        <form className={style.formWrapper} onSubmit={handleSubmit}>
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
            <div>
                <span style={{color: 'red'}}>{error}</span>
            </div>

            <button type="submit" disabled={pristine || submitting}>Sign Up</button>
        </form>
    )
};
export default reduxForm<I_registerData>({form: 'registration'})(RegisterUserForm)