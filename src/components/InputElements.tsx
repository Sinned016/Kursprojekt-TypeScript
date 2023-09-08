import React from 'react'
import { LoginInterface } from '../types/UserInterface'
import { useLocation } from 'react-router-dom'

type InputElementsProps = {
    values: LoginInterface,
    handleClick: () => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function InputElements({values, handleClick, handleChange}: InputElementsProps) {
    //finding the pathname
    const location = useLocation()
    
  return (
    <div className='login-container'>
        <label htmlFor="username-field">Username</label>
        <input name="name" value={values.name} type="text" className='username-field' onChange={handleChange}/>

        <label htmlFor="password-field">Password</label>
        <input name="password" value={values.password} type="password" className='password-field' onChange={handleChange}/>

        <button className='login-btn' onClick={handleClick} type='submit'>{location.pathname === "/register" ? "Register" : "Login"}</button>
    </div>
  )
}
