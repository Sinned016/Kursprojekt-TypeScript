import React, { useState } from 'react'
import InputElements from '../components/InputElements'
import { Link, useNavigate } from 'react-router-dom'
import fetchOptions from '../service/fetchService'
import { LoginInterface } from '../types/UserInterface'


const defaultRegisterValues: LoginInterface = {
    name: "",
    password: ""
}

export default function RegisterPage() {
    const [registerValues, setRegisterValues] = useState(defaultRegisterValues)
    const navigate = useNavigate()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setRegisterValues((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          };
        });
    }

    async function handleRegisterClick() {
        const res = await fetch("/api/register", fetchOptions<LoginInterface>("POST", registerValues))
        console.log(res)

        if(res.status !== 400) {
            // const data = await res.json()
            alert("Successfully created account!")
            navigate("/")
        } else {
            alert("Please choose another username")
        }  
    }

  return (
    <div className='register-wrapper'>
        <h1 className='login-title'>Strong n' Epic</h1>
        <InputElements values={registerValues} handleClick={handleRegisterClick} handleChange={handleChange}/>

        <p className='link'>Already have an account? Login <Link to={"/"}>here</Link> </p>
    </div>
  )
}
