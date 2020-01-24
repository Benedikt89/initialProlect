import React from 'react';
import style from './Header.module.css';
import {Link} from "react-router-dom";

interface I_props {
    alert?: string | null
    isAuth: boolean
    logOut: () => void
}

function Header(props: I_props) {

    return (
        <header className={style.headerWrapper}>
            <div className={style.navContainer}>
                {}
                <Link to={"/login"}>
                    <div className={style.item}>
                        LogIn
                    </div>
                </Link>
                <div>
                    <div className={style.item} onClick={props.logOut}>
                        LogOut
                    </div>
                </div>
                <Link to={"/profile"}>
                    <div className={style.item}>
                        Profile
                    </div>
                </Link>
                <Link to={"/register"}>
                    <div className={style.item} >
                        Register
                    </div>
                </Link>
            </div>
            {props.alert ? <span>{props.alert}</span> :
                <div className={style.inform}>
                    <span>Login modules Project</span>
                </div>
            }
        </header>
    );
}

export default Header;
