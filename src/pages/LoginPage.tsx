import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import fetchOptions from "../service/fetchService"
import { LoginInterface, UserInterface } from "../types/UserInterface"
import InputElements from '../components/InputElements'
 


const defaultLoginValues: LoginInterface = {
    name: "",
    password: ""
}

type UserProps = {
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
    errorMsg?: string;
}

export default function LoginPage(props: UserProps): JSX.Element {
    const [LoginValues, setLoginValues] = useState(defaultLoginValues)
    const navigate = useNavigate()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;

        setLoginValues((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          };
        });
    }

    async function handleLoginClick(): Promise<void> {
        const res = await fetch("/api/login", fetchOptions<LoginInterface>("PUT", LoginValues))

        if(res.status !== 400) {
            const data = await res.json()
            props.setCurrentUser(data.user)
            navigate("/home")
        } else {
            alert("Login failed")
        }  
    }

  return (
    <div className='login-wrapper'>
        
        <h1 className='login-title'>Strong n' Epic</h1>
        <InputElements values={LoginValues} handleClick={handleLoginClick} handleChange={handleChange}/>

        {props.errorMsg && <p className='error-msg'>{props.errorMsg}</p>}

        <p className='link'>Don't have an account? Sign up <Link to={"/register"}>here</Link> </p>
    </div>
  )
}