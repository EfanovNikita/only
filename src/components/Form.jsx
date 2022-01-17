import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import style from './Form.module.css';

export function Form({ setIsSubmit }) {
    const [isErrResponse, setIsErrResponse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit, getValues } = useForm({ mode: 'onBlur' });
    const onSubmit = data => {
        setIsLoading(true);
        if (data.login === 'steve.jobs@example.com' && data.password === 'password') {
            getValues('checkbox') && localStorage.setItem('password', getValues('password'));
            setIsSubmit(true);
        } else {
            setIsErrResponse(true)
        }
        setTimeout(() => setIsLoading(false), 2000);
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {isErrResponse && <div className={`${style.inputBlock} ${style.errMsg}`}><div>!</div>Пользователя {getValues("login")} не существует</div>}
            <label>
                <p>Логин</p>
                <input {...register('login', { required: true })} className={`${style.inputBlock} ${errors.login && style.errInput}`} />
            </label>
            {errors.login && <span className={style.errText}>Обязательное поле</span>}
            <label>
                <p>Пароль</p>
                <input {...register('password', { required: true })}
                    className={`${style.inputBlock} ${errors.password && style.errInput}`}
                    type="password"
                    defaultValue={localStorage.getItem('password')} />
            </label>
            {errors.password && <span className={style.errText}>Обязательное поле</span>}
            <label className={style.chkBox}>
                <input {...register('checkbox')} className={style.chkInput} type="checkbox" />
                <span>Запомнить пароль</span>
            </label>
            <input className={`${style.inputBlock} ${style.btnSubmit}`} type="submit" value="Войти" disabled={isLoading} />
        </form>
    )
}