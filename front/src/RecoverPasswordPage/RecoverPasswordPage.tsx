import React from "react";
import {connect} from "react-redux";
import {reduxForm, Field} from "redux-form";
import {compose} from "redux";

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

const RecoverPasswordPage = reduxForm({form: 'recoverPasswordForm'})(RecoverPasswordForm)


export default connect(mapStateToProps,{})(RecoverPasswordPage);