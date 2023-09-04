import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

interface LoginInterface {
    username: string;
    password: string;
}

const defaultValues: LoginInterface = {
    username: "",
    password: ""
}

export default function LoginPage() {
    const [LoginValues, setLoginValues] = useState(defaultValues)

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

        const fetchOptions = {
            method: "PUT",
            body: JSON.stringify(LoginValues),
            headers: {
                "Content-Type": "application/json",
              }
        }

        const res = await fetch("/api/login", fetchOptions)

        if(res.status !== 400) {
            const data = await res.json()
            console.log(data)
            
        } else {
            alert("Login failed")
        }  
    }

  return (
    <div className='login-wrapper'>
        
        <h1 className='login-title'>Strong n' Epic</h1>
        <div className='login-container'>
            <label htmlFor="username-field">Användarnamn</label>
            <input name="username" value={LoginValues.username} type="text" className='username-field' onChange={handleChange}/>

            <label htmlFor="password-field">Lösenord</label>
            <input name="password" value={LoginValues.password} type="password" className='password-field' onChange={handleChange}/>

            <button className='login-btn' onClick={handleLoginClick} type='submit'>Logga in</button>
        </div>

        <p>Har du inte ett konto? Skapa här</p>
    </div>
  )
}
