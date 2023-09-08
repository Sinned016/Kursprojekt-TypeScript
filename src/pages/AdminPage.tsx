import React, { useEffect, useState } from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import Header from '../components/Header'
import AdminUsers from '../components/AdminUsers'
import AdminWorkouts from '../components/AdminWorkouts'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";


type AdminProps = {
    currentUser: UserInterface
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
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

export default function AdminPage({currentUser, setCurrentUser}: AdminProps) {
    const [users, setUsers] = useState(defaultUserValues)
    const [workouts, setWorkouts] = useState(defaultWorkoutValues)
    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate();

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
        <Header username={currentUser.name} setCurrentUser={setCurrentUser}/>

        <div className='workout-nav'>
            <button onClick={() => setToggle(false)} className={!toggle ? "active nav-btn" : "nav-btn"}>Users</button>
            <button onClick={() => setToggle(true)} className={toggle ? "active nav-btn" : "nav-btn"}>Workouts</button>
        </div>

        <div className='title-container'>
            <button onClick={() => navigate("/home")} className='goback-btn'><FontAwesomeIcon className='arrow-back' icon={faLeftLong}/></button>
            <h2 className='admin-title'>AdminPage {toggle ? "Workouts" : "Users"}</h2>
        </div>
        
        {!toggle && <AdminUsers users={users} setUsers={setUsers}/> }
        {toggle && <AdminWorkouts workouts={workouts} setWorkouts={setWorkouts}/>}


    </div>
  )
}
