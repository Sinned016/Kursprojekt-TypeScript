import React, { useEffect, useState } from 'react'
import { UserInterface } from '../types/UserInterface'

type AdminProps = {
    currentUser: UserInterface
    users: UserInterface[]
}

export default function AdminUsers({currentUser, users}: AdminProps) {


    function deleteUser(Id: string) {
        if(currentUser.role === "ADMIN") {
            console.log("Deleted user " + Id)
        }
    }

    const userElements = users.map((user) => {
        return (
            <div className='card' key={user.id}>
                <h3>{user.name}</h3>
                <p>Role: {user.role}</p>
                <p>ID: {user.id}</p>
                <button onClick={() => deleteUser(user.id)} className='delete-btn red'>Delete user</button>
            </div>
        )
    })

  return (
    <div>
        {userElements}
    </div>
  )
}
