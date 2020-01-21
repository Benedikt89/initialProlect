import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginUserThunk} from "./reducer/actions";
import style from "./components/forms/FormControl.module.css";
import {Link} from "react-router-dom";
import {email, minLength4, required} from "./components/forms/FormElements/validators";

const LoginizationForm: React.FC = (props: any) => {
    return (
        <form className={style.formControl} onSubmit={props.handleSubmit}>
            <h2>Authorization page</h2>
        <div>
            Имя пользователя
            <Field component={"input"}
                   name={"email"}
                   placeholder={"Email"}
                   type={"text"}
                   validate={[required, minLength4, email]}
            />
            Пароль
            <Field component={"input"}
                   name={"password"}
                   placeholder={"Password"}
                   type={"password"}
                   validate={[required, minLength4]}
            />
            <Field component={"input"}
                   name={"rememberMe"}
                   type={"checkbox"}
            />Remember Me
            <div>
                <button>Sign In</button>
            </div>
        </div>
            <Link to={"/forgotPassword"}>
                <div className={style.item}>
                    Forgot your password?
                </div>
            </Link>
    </form>
    )
}

const Loginization: React.FC = ({loginUserThunk}:any) => {

    const onSubmit = (formData: any) => {
        console.log(formData)
        loginUserThunk({email: formData.email, password: formData.password, rememberMe: formData.rememberMe = false})
    }

    return (<div className={style.container} >
        <LoginPage onSubmit={onSubmit}/>
    </div>)
}

const LoginPage = reduxForm({form: 'login'})(LoginizationForm)

export default connect(null,{loginUserThunk})(Loginization);

