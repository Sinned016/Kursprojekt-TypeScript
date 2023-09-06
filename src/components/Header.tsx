import React from 'react'


type HeaderProps = {
    username: string
}

export default function Header({username}: HeaderProps) {

  return (
    <header className='home-header'>
        <h2 className='home-title'>Strong n' Epic</h2>
        <p>{username}</p>
    </header>
  )
}
