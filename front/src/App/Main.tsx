import React, {Component} from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {AppStateType} from "../redux/store";
import '../App.css';
import style from './Main.module.css';
import {fetchData} from "./reducer/api-actions";
import {getAppError, getIsFetching} from "./reducer/selectors";
import Preloader from "./Common/Preloader";
import {connect} from "react-redux";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router";
import Loginization from "../Loginization/Loginization";
import RegisterPage from "../Loginization/components/Registration";

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
        let {appError, isFetching} = this.props;
        return (
            <div>
                <Header alert={appError} isAuth={false} logOut={()=>{alert('logout')}}/>

                <div className={style.mainWrapper}>
                    { isFetching ?
                            <Preloader />
                    :
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Redirect to={"/register"}/>}/>
                            <Route path="/login" render={() => <Loginization/>}/>
                            <Route path="/register" render={() => <RegisterPage />}/>
                            <Route path="*" render={() => <div>Error 404</div>}/>
                        </Switch>
                    }
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