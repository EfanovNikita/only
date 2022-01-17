import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Form } from '../components/Form'

export function Login() {
    const [isSubmit, setIsSubmit] = useState(false);
    return (
        <>
        {isSubmit && <Navigate to="/profile" />}
        <Form setIsSubmit={setIsSubmit} />
        </>
    )
}