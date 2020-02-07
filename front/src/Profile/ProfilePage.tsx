import React, {useState} from "react";
import {connect} from "react-redux";
import WithModal from "../Modals/Modal";

interface I_connectedProps {
    firstName: string | null
    email: string | null
}

const ProfilePage: React.FC<I_connectedProps> = (props: I_connectedProps) => {
    let [isModalOpened, setIsModalOpened] = useState(false);
    return (
        <div>
            {props.email ? <div>You are logged in {props.email}</div> : <div>You are not logged in, please log in!</div>}
            <button onClick={() => {setIsModalOpened(true)}}>openModal</button>
            <WithModal visible={isModalOpened} closeModal={() => {setIsModalOpened(false)}}>
                <h1>asd</h1>
            </WithModal>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        firstName: state.auth.userData.firstName,
        email: state.auth.userData.email
    }
};

export default connect(mapStateToProps,{})(ProfilePage);