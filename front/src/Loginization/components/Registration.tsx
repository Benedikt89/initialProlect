import React from "react";
import RegisterUserForm from "./forms/RegisterForm";
import {I_registerData} from "../../types/types";
import {connect} from "react-redux";
import {registerUser, registerWithAuth0} from "../reducer/actions";
import style from "./Registration.module.css";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


import {FACEBOOK_APP_ID, GOOGLE_CLIENT_ID} from '../../loginConfig';

interface I_connectedProps {
    registerUser: (data: I_registerData) => void
    registerWithAuth0: () => void
}

const RegisterPage: React.FC<I_connectedProps> = ({registerUser, registerWithAuth0}: I_connectedProps) => {
    const onUserSubmit = (formData: any) => {
        registerUser({email: formData.email, password: formData.password})
    };
    const responseFacebook = (res:any) => {
        let userIncomingFacebook = {
            accessToken: res.accessToken,
            data_access_expiration_time: res.data_access_expiration_time,
            email: res.email,
            expiresIn: res.expiresIn,
            id: res.id,
            name: res.name,
            picture: {...res.picture},
            signedRequest: res.signedRequest,
            userID: res.userID
        };
        console.log(userIncomingFacebook);
    };

    const responseGoogle = (response:any) => {
        console.log(response);
    };
    let error = null;

    return (

        <div className={style.container}>
            {!error? <div>
                <h2>Please Register</h2>
                <RegisterUserForm onSubmit={onUserSubmit}/>

                <br />

                <FacebookLogin
                    appId={FACEBOOK_APP_ID} //APP ID
                    fields="name,email,picture"
                    callback={responseFacebook}
                />

                <br />

                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID} //CLIENT ID
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

            </div> : <span>{error}</span>}

        </div>
    )
};

export default connect(null, {registerUser, registerWithAuth0})(RegisterPage);