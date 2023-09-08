import React from 'react'
import { UserInterface } from '../types/UserInterface'
import { defaultUser } from "../App"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
    username: string
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
}



export default function Header({username, setCurrentUser}: HeaderProps) {
  const navigate = useNavigate()

  function logout() {
    setCurrentUser(defaultUser)
    navigate("/")
  }

  return (
    <header className='home-header'>
        <h2 className='home-title'>Strong n' Epic</h2>
        <div className='header-user-container'>
          <p>{username}</p>
          <button className='logout-btn' onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket}/></button>
        </div>

    </header>
  )
}
