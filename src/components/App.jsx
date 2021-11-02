import React from "react";
import s from './App.module.scss'
import {Link} from "react-router-dom";

export const App = () => {
    return (
        <div className={s.main}>
            <h3>hello React</h3>
            <Link to={'./qwe'}>
                qwe
            </Link>
        </div>
    )
}