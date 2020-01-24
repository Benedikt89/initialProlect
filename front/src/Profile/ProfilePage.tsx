import React from "react";
import {connect} from "react-redux";

const ProfilePage: React.FC = (props: any) => {
    return (
        <div>
            {props.name ? <div>You are logged in {props.name}</div> : <div>You are not logged in, please log in!</div>}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        name: state.auth.userData.name
    }
}

export default connect(mapStateToProps,{})(ProfilePage);