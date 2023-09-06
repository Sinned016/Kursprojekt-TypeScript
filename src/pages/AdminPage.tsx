import React, { useEffect, useState } from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import Header from '../components/Header'
import AdminUsers from '../components/AdminUsers'

type AdminProps = {
    currentUser: UserInterface
}

const defaultUserValues: UserInterface[] = [{
    id: "string",
    name: "string",
    password: "",
    role: "USER",
    booked_workouts: [],
}]

const defaultWorkoutValues: WorkoutInterface[] = [{
    id: "",
    title: "",
    trainer: "",
    time: "",
    date: "",
    duration: 0,
}]

export default function AdminPage({currentUser}: AdminProps) {
    const [users, setUsers] = useState(defaultUserValues)
    const [workouts, setWorkouts] = useState(defaultWorkoutValues)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetch("/api/users")
            .then(res => res.json())
            .then(data => setUsers(data.users))

        fetch("/api/workouts")
            .then(res => res.json())
            .then(data => setWorkouts(data.workouts))
    }, [])

  return (
    <div className='admin-wrapper'>
        <Header username={currentUser.name}/>

        <h2 className='admin-title'>Admin Page</h2>

        {!toggle && <AdminUsers currentUser={currentUser} users={users}/> }

        <div className='workout-nav'>
            <button onClick={() => setToggle(false)} className={!toggle ? "active nav-btn" : "nav-btn"}>Users</button>
            <button onClick={() => setToggle(true)} className={toggle ? "active nav-btn" : "nav-btn"}>Workouts</button>
        </div>
    </div>
  )
}
