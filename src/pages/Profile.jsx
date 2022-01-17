import React from 'react';
import { Link } from 'react-router-dom';

import style from './Profile.module.css';

export function Profile() {
    return (
        <div className={style.profile}>
            <p className={style.helloText}>Здравствуйте, <b>steve.jobs@example.com</b></p>
            <Link to="/"><button>Выйти</button></Link>
        </div>
    )
}