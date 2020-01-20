import React from 'react';
import style from './Header.module.css';

interface I_props {
    alert?: string | null
    isAuth: boolean
    logOut: () => void
}

function Header(props: I_props) {

    return (
        <header className={style.headerWrapper}>
            {props.isAuth && <div className={style.navContainer}>
                <div onClick={props.logOut}>
                    <div className={style.item}>
                        Exit
                    </div>
                </div>
                <div>
                    <div className={style.item} onClick={props.logOut}>
                        LogOut
                    </div>
                </div>
            </div>}
            {props.alert ? <span>{props.alert}</span> :
                <div className={style.inform}>
                    <span>Turns</span>
                </div>
            }
        </header>
    );
}

export default Header;
