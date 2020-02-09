import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginUserThunk} from "../reducer/actions";
import style from "./forms/FormElements/FormControl.module.css";
import {Link} from "react-router-dom";
import {email, minLength4, required} from "./forms/FormElements/validators";
import {getIsAuth} from "../reducer/selectors";
import {renderField} from "./forms/FormElements/FormsControls";
import {I_loginData} from "../../types/auth-types";

const LoginForm:React.FC<InjectedFormProps<I_loginData>> = (props) => {
    let {handleSubmit, pristine, submitting, error} = props;
    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
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
            <h2>Authorization page</h2>
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

const LoginReduxForm = reduxForm<I_loginData>({form: 'login'})(LoginForm);

export default connect(mapStateToProps, {loginUserThunk})(LoginPage);

