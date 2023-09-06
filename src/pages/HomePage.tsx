import React, { useEffect, useState } from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import WorkoutElements from '../components/WorkoutElements'
import BookedElements from '../components/BookedElements'

const defaultWorkoutValues: WorkoutInterface[] = [{
    id: "",
    title: "",
    trainer: "",
    time: "",
    date: "",
    duration: 0,
}]

type currentUserProps = {
    currentUser: UserInterface;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export default function HomePage({currentUser, setCurrentUser}: currentUserProps) {
    const [workouts, setWorkouts] = useState(defaultWorkoutValues)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetch("/api/workouts")
            .then(res => res.json())
            .then(json => setWorkouts(json.workouts))
    }, [])


  return (
    <div className='home-wrapper'>

        <header className='home-header'>
            <h1 className='home-title'>Workouts</h1>
            <p>Username</p>
        </header>

        {!toggle && <WorkoutElements workouts={workouts} currentUser={currentUser} setCurrentUser={setCurrentUser} /> }
        {toggle && <BookedElements currentUser={currentUser} setCurrentUser={setCurrentUser} /> }

        <div className='workout-nav'>
            <button onClick={() => setToggle(false)} className={!toggle ? "active nav-btn" : "nav-btn"}>Book Workouts</button>
            <button onClick={() => setToggle(true)} className={toggle ? "active nav-btn" : "nav-btn"}>My Workouts</button>
        </div>
        
    </div>
  )
}
