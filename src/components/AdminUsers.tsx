import React, { useState } from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

type AdminUserProps = {
    users: UserInterface[]
    setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}

export default function AdminUsers({ users, setUsers}: AdminUserProps) {
    const [toggle, setToggle] = useState({})

    async function deleteUser(userId: string) {
        const BODY = { userId: userId }

        const res = await fetch("/api/users", fetchOptions("DELETE", BODY))
        const data = await res.json()

        setUsers(data.users)
    }

    function toggleUserWorkouts(array: WorkoutInterface[]) {
        const elements = array?.map((workout) => {
            return (
            <p>{workout.title} {workout.date}</p>
            )
        })
        if(elements.length > 0) {
            return elements
        } else {
            return <p>User has no booked workouts</p>
        }
    }

    //Special lösning
    function toggleFunction(id: string) {
        setToggle({
          ...toggle,
          [id]: !toggle[id as keyof typeof toggle],
        });
      }

    const userElements = users.map((user) => {
        return (
            <div className='card' key={user.id}>
                <h3>Username: {user.name}</h3>
                <p>Role: {user.role}</p>
                <p>ID: {user.id}</p>
                <div onClick={() => toggleFunction(user.id)}>
                    <span className='workouts-toggle'>
                        Workouts {toggle[user.id as keyof typeof toggle] 
                        ? (<span>&#8593;</span>) 
                        : (<span>&#8595;</span>)}</span>
                    {toggle[user.id as keyof typeof toggle] && toggleUserWorkouts(user.booked_workouts)}
                </div>

                <button onClick={() => deleteUser(user.id)} className='delete-btn red'>Delete user</button>
            </div>
        )
    })

  return (
    <div className='card-container'>
        {userElements}
    </div>
  )
}
