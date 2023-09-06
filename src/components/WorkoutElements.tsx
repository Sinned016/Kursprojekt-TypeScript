import React from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

type WorkoutProps = {
    workouts: WorkoutInterface[]
    currentUser: UserInterface
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export default function WorkoutElements({workouts, currentUser, setCurrentUser}: WorkoutProps) {

    async function bookWorkout(workoutId: string) {
        console.log(workoutId)
        console.log(currentUser.id)
        const BODY = {
            workoutId: workoutId,
            userId: currentUser.id
        }

        const res = await fetch("/api/users/booking", fetchOptions("POST", BODY))
        const data = await res.json()
        
        setCurrentUser({...currentUser, booked_workouts: data.user.booked_workouts })
    }


    const workoutElements = workouts.map((workout) => {
        return (
            <div className='card' key={workout.id}>
                <h2>{workout.title}</h2>
                <p>Trainer: {workout.trainer}</p>
                <p>Date: {workout.date}</p>
                <p>Time: {workout.time}</p>
                <p>Duration: {workout.duration} min</p>
                <button onClick={() => bookWorkout(workout.id)} className='book-workout-btn'>Book workout</button>
            </div>
        )
    })

  return (
    <>
        { workoutElements }
    </>
  )
}
