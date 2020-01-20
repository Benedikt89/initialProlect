import React from "react";
import RegisterUserForm from "./forms/RegisterForm";
import {I_registerData} from "../../types/types";
import {connect} from "react-redux";
import {registerUser} from "../reducer/actions";
import style from "./Registration.module.css";

interface I_connectedProps {
    registerUser: (data: I_registerData) => void
}

const RegisterPage: React.FC<I_connectedProps> = ({registerUser}: I_connectedProps) => {
    const onUserSubmit = (formData: any) => {
        registerUser({email: formData.email, password: formData.password})
    };

    return (
        <div className={style.container}>
            <h2>Please Register</h2>
            <RegisterUserForm onSubmit={onUserSubmit}/>
        </div>
    )
};

export default connect(null, {registerUser})(RegisterPage);