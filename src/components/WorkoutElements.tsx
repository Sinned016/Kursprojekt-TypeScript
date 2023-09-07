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
        console.log(data)
        
        setCurrentUser({...currentUser, booked_workouts: data.user.booked_workouts })
        alert(`Successfully booked workout`)
    }

    function checkIfBooked(obj: WorkoutInterface){
        const isBooked = currentUser.booked_workouts.some((workout) =>
        // Compare the properties you want to check for equality here
        workout.id === obj.id && workout.title === obj.title
        );

        return isBooked
    } 

    const workoutElements = workouts.map((workout) => {
        return (
            <div className='card' key={workout.id}>
                {checkIfBooked(workout) && <p className='booked-status'>Booked</p>}
                <h2>{workout.title}</h2>
                <p>Trainer: {workout.trainer}</p>
                <p>Date: {workout.date}</p>
                <p>Time: {workout.time}</p>
                <p>Duration: {workout.duration} min</p>
                <button disabled={checkIfBooked(workout)} onClick={() => bookWorkout(workout.id)} className='book-workout-btn'>Book workout</button>
            </div>
        )
    })

  return (
    <>
        <h2 className='page-title'>Book Workouts</h2>
        { workoutElements }
    </>
  )
}
