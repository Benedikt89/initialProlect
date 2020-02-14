import React from 'react';
import style from './FormControl.module.css';
import classNames from "classnames";

interface I_meta {
    touched: boolean,
    error: string | undefined,
    warning: string | undefined
}

export interface I_renderFieldProps {
    input: any
    label: string
    type: string
    meta: I_meta
}

export const renderField = ({input, label, type, meta: {touched, error, warning}}:I_renderFieldProps) => {
    let cx = classNames.bind(style);
    let classForField = cx(style.fieldWrapper, {
        success: touched && !error && !warning,
        error: error && touched,
    });

    return (
    <div>
        <label className={style.titleRequired}>{label}</label>
        <div className={classForField}>
            <input {...input} type={type}/>
            {touched &&
            ((error && <span className={style.errorMessage}>{error}</span>)
                || (warning && <span className={style.errorMessage}>{warning}</span>))}
        </div>
    </div>
)};



