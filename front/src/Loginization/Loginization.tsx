import React from "react";
import {Field, reduxForm} from "redux-form";

const LoginizatinForm: React.FC = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={"input"}
                   name={"email"}
                   placeholder={"Email"}
                   type={"text"}
            />
            <Field component={"input"}
                   name={"password"}
                   placeholder={"Password"}
                   type={"password"}
            />
            <Field component={"input"}
                   name={"rememberMe"}
                   type={"checkbox"}
            />Remember Me
            <div>
                <button>Login</button>
            </div>
        </div>

    </form>
    )
}

const LoginPage: React.FC = () => {

    const onSubmit = (formData: any) => {
        debugger
        console.log("Data from 'login' form: "+formData)
    }

    return (<div>
        <Loginization onSubmit={onSubmit}/>
    </div>)

}
const Loginization = reduxForm({form: 'login'})(LoginizatinForm)
export default LoginPage;

