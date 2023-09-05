import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import fetchOptions from "../service/fetchService"
import { LoginInterface, UserInterface } from "../types/UserInterface"
 


const defaultLoginValues: LoginInterface = {
    username: "",
    password: ""
}

type UserProps = {
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export default function LoginPage(props: UserProps) {
    const [LoginValues, setLoginValues] = useState(defaultLoginValues)
    const navigate = useNavigate()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setLoginValues((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          };
        });
    }

    async function handleLoginClick() {
        const res = await fetch("/api/login", fetchOptions<LoginInterface>("PUT", LoginValues))

        if(res.status !== 400) {
            const data = await res.json()
            props.setCurrentUser(data)
            navigate("/home")
        } else {
            alert("Login failed")
        }  
    }

  return (
    <div className='login-wrapper'>
        
        <h1 className='login-title'>Strong n' Epic</h1>
        <div className='login-container'>
            <label htmlFor="username-field">Username</label>
            <input name="username" value={LoginValues.username} type="text" className='username-field' onChange={handleChange}/>

            <label htmlFor="password-field">Password</label>
            <input name="password" value={LoginValues.password} type="password" className='password-field' onChange={handleChange}/>

            <button className='login-btn' onClick={handleLoginClick} type='submit'>Login</button>
        </div>

        <p className='link'>Already have an account? Sign up <Link to={"/register"}>here</Link> </p>
    </div>
  )
}