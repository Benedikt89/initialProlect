import React from "react";
import {Field, reduxForm} from "redux-form";

const LoginisatinForm: React.FC = () => {
    return (<form>
        <div>
            <Field component={"input"}
                   name={"login"}
                   placeholder={"Login"}
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

    </form>)
}

const Loginization = reduxForm({form: 'login'})(LoginisatinForm)
export default Loginization;

