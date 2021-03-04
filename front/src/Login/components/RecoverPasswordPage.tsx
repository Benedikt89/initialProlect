import React from "react";
import {connect} from "react-redux";
import {reduxForm, Field} from "redux-form";
import {recoverPassword} from "../reducer/actions";

const RecoverPasswordForm: React.FC = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                Введите Ваш email для восстановления доступа к аккаунту
                <Field component={"input"}
                       name={"email"}
                       placeholder={"Email"}
                       type={"text"}
                />
                <div>
                    <button>Send me a mail</button>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = (state: any) => {
    return {
    }
}

const RecoverPassword = ({recoverPassword}: any) => {
    const onSubmit = (dataForm: any) => {
        let message = recoverPassword(dataForm.email)
        alert(dataForm)
    }
    return <RecoverPasswordPage onSubmit={onSubmit}/>
}

const RecoverPasswordPage = reduxForm({form: 'recoverPasswordForm'})(RecoverPasswordForm)

export default connect(mapStateToProps,{recoverPassword})(RecoverPassword);