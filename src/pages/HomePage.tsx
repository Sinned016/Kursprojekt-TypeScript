import React, { useEffect, useState } from 'react'
import { WorkoutInterface } from '../types/UserInterface'
import WorkoutElements from '../components/WorkoutElements'

const defaultWorkoutValues: WorkoutInterface[] = [{
    id: "",
    title: "",
    trainer: "",
    time: "",
    date: "",
    duration: 0,
}]

export default function HomePage() {
    const [workouts, setWorkouts] = useState(defaultWorkoutValues)

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

        {<WorkoutElements workouts={workouts}/>}

        <div className='workout-nav'>
            <button className='nav-btn'>Book Workouts</button>
            <button className='nav-btn'>My Workouts</button>
        </div>
        
    </div>
  )
}
