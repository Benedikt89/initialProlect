import React, {Component} from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {AppStateType} from "../redux/store";
import '../App.css';
import style from './Main.module.css';
import {fetchData} from "./reducer/api-actions";
import {getAppError, getIsFetching} from "./reducer/selectors";
//import {checkIsAuth, logIn, logOut} from "../authorisation/actions";
//import {getIsAuth} from "../authorisation/selectors";
//import LoginPage from "./Login/Login";
import Preloader from "./Common/Preloader";
import {connect} from "react-redux";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import Loginization from "../Loginization/Loginization";

interface I_props {
    title?: string
}

interface I_connectedProps {
    isAuth: boolean,
    error: string | null
    appError: string | null
    isFetching: boolean
}

interface I_dispatchedProps {
    fetchData: () => void
}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps, RouteComponentProps<{}> {
}

class Main extends Component<I_MainProps> {

    componentDidMount() {
    }
    componentDidUpdate(prevProps: Readonly<I_MainProps>, prevState: Readonly<{}>, snapshot?: any): void {
        //fetch after login
        if (this.props.isAuth !== prevProps.isAuth) {
            this.props.fetchData();
        }
    }

    render() {
        let {appError, isFetching, error} = this.props;
        return (
            <div>
                <Header alert={appError} isAuth={false} logOut={()=>{alert('logout')}}/>

                <div className={style.mainWrapper}>
                <h1>asd</h1>
                    <Switch>
                        <Route path="/catalog" component={Preloader}/>
{/*                        <Route path="*" render={() => <div>Error 404</div>}/>*/}
                        <Route path="/login" render={() => <Loginization />}/>
                    </Switch>
                </div>

                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): I_connectedProps => {
    return {
        isAuth: false,
        error: null,
        appError: getAppError(state),
        isFetching: getIsFetching(state),
    }
};

let ComposedComponent = connect(
    mapStateToProps, {fetchData}
    )(Main);

export default withRouter(ComposedComponent);