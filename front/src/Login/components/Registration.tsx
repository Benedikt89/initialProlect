import React from "react";
import RegisterUserForm from "./forms/RegisterForm";
import {I_registerData} from "../auth-types";
import {registerUser, registerWithAuth0} from "../reducer/actions";
import style from "./Registration.module.css";

import {connect} from "react-redux";

interface I_connectedProps {
    registerUser: (data: I_registerData) => void
    registerWithAuth0: () => void
}

const RegisterPage: React.FC<I_connectedProps> = ({registerUser}: I_connectedProps) => {
    const onUserSubmit = (formData: I_registerData) => {
        registerUser({email: formData.email, password: formData.password})
    };

    return (
        <div className={style.container}>
            <div>
                <h2>Please Register</h2>
                <RegisterUserForm onSubmit={onUserSubmit}/>
                <br/>
            </div>
        </div>
    )
};
//
// const OutSideRegister = () => {
//     const responseFacebook = (res: any) => {
//         let userIncomingFacebook = {
//             accessToken: res.accessToken,
//             data_access_expiration_time: res.data_access_expiration_time,
//             email: res.email,
//             expiresIn: res.expiresIn,
//             id: res.id,
//             name: res.name,
//             picture: {...res.picture},
//             signedRequest: res.signedRequest,
//             userID: res.userID
//         };
//         console.log(userIncomingFacebook);
//     };
//
//     const responseGoogle = (response: any) => {
//         console.log(response);
//     };
//     return (
//         <div>
//             <FacebookLogin
//                 appId={FACEBOOK_APP_ID} //APP ID
//                 fields="name,email,picture"
//                 callback={responseFacebook}
//             />
//
//             <br/>
//             <WithModal visible={false} closeModal={() => {
//                 alert('close')
//             }}>
//                 <GoogleLogin
//                     clientId={GOOGLE_CLIENT_ID} //CLIENT ID
//                     buttonText="LOGIN WITH GOOGLE"
//                     onSuccess={responseGoogle}
//                     onFailure={responseGoogle}
//                     cookiePolicy={'single_host_origin'}
//                 />
//                 <h2>THIS IS PROPS.CHILDREN</h2>
//             </WithModal>
//         </div>
//     )
// };

export default connect(null, {registerUser, registerWithAuth0})(RegisterPage);