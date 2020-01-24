import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginUserThunk} from "../reducer/actions";
import style from "./forms/FormControl.module.css";
import {Link} from "react-router-dom";
import {email, minLength4, required} from "./forms/FormElements/validators";
import {getIsAuth} from "../reducer/selectors";
import {renderField} from "./forms/FormElements/FormsControls";

const LoginForm: React.FC = ({handleSubmit, pristine, submitting, error}: any) => {
    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
            <h2>Authorization page</h2>
            <div>
                <Field component={renderField}
                       label="Имя Пользователя"
                       name={"email"}
                       placeholder={"Email"}
                       type={"text"}
                       validate={[required, minLength4, email]}
                />
                <Field component={renderField}
                       label="Пароль"
                       name={"password"}
                       placeholder={"Password"}
                       type={"password"}
                       validate={[required, minLength4]}
                />
                <Field component={renderField}
                       label="Remember Me"
                       name={"rememberMe"}
                       type={"checkbox"}
                />
                <div>
                    <button disabled={submitting || pristine}>Sign In</button>
                </div>
            </div>
            {error && <span className={style.mainErrorMessage}>{error}</span>}
        </form>
    )
};

const LoginPage: React.FC = ({loginUserThunk}: any) => {

    const onSubmit = (formData: any) => {
        console.log(formData);
        loginUserThunk({email: formData.email, password: formData.password, rememberMe: formData.rememberMe = false})
    };

    return (
        <div className={style.container}>
            <LoginReduxForm onSubmit={onSubmit}/>
            <Link to={"/forgotPassword"}>
                <div className={style.item}>
                    Forgot your password?
                </div>
            </Link>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuth: getIsAuth(state)
    }
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export default connect(mapStateToProps, {loginUserThunk})(LoginPage);

