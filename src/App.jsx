import React from "react"
import { Login } from "./pages/Login"

import style from './Index.module.css'
import { Route, Routes } from "react-router-dom"
import { Profile } from "./pages/Profile"

export function App() {
    return (
        <>
            <header><h1>ONLY.</h1></header>

            <div className={style.wrapped}>
                <Routes>
                    <Route path="/" element={
                        <Login />
                    } />
                    <Route path="/profile" element={
                        <Profile />
                    } />
                </Routes>
            </div>
        </>
    )
}