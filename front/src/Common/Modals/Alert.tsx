import React, {useState} from "react";
import classNames from "classnames";
import "./Modals.container.scss";


export const ErrorMessage:React.FC = () => {
    let [shown, setShown] = useState(false);
    let cx = classNames;
    let classForField = cx('container', {
        "alert-is-shown": shown
    });
    return (
        <div style = {{
            position: 'fixed',
            top: `${-50}px`,
            left: 'calc(50vw - 50px)',
            width: '100px',
            height: '50px',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'red',
            zIndex: 21,
        }}>
            <div className={classForField}>
                asd
            </div>
        </div>
    )
};