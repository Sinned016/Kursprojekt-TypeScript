import React from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

type WorkoutProps = {
    workouts: WorkoutInterface[]
    currentUser: UserInterface
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export default function WorkoutElements({workouts, currentUser, setCurrentUser}: WorkoutProps) : JSX.Element {

    async function bookWorkout(workoutId: string): Promise<void> {
        console.log(workoutId)
        console.log(currentUser.id)
        const BODY = {
            workoutId: workoutId,
            userId: currentUser.id
        }

        const res = await fetch("/api/users/booking", fetchOptions("POST", BODY))
        const data = await res.json()
        
        setCurrentUser({...currentUser, booked_workouts: data.user.booked_workouts })
        alert(`Successfully booked workout`)
    }

    function checkIfBooked(obj: WorkoutInterface): boolean {
        const isBooked = currentUser.booked_workouts.some((workout) =>
        // Compare the properties you want to check for equality here
        workout.id === obj.id && workout.title === obj.title
        );

        return isBooked
    } 

    const workoutElements: JSX.Element[] = workouts.map((workout) => {
        return (
            <div className='card' key={workout.id}>
                <div className='card-header'>
                    <h3>{workout.title}</h3>
                    {checkIfBooked(workout) && <p className='booked-status'>Booked</p>}
                </div>

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

        <div className='card-container'>
        { workoutElements }
        </div> 
    </>
  )
}
