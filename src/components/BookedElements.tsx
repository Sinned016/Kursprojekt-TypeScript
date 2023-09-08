import React from 'react'
import { UserInterface } from '../types/UserInterface';
import fetchOptions from '../service/fetchService';

type BookedProps = {
    currentUser: UserInterface
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export default function BookedElements({currentUser, setCurrentUser}: BookedProps) {

    async function cancelWorkout(workoutId: string) {
        const BODY = {
            workoutId: workoutId,
            userId: currentUser.id
        }
        const res = await fetch("/api/users/booking", fetchOptions("DELETE", BODY))
        const data = await res.json()

        setCurrentUser({...currentUser, booked_workouts: data.user.booked_workouts })
    }

    const BookedElements = currentUser.booked_workouts?.map((workout) => {
        return (
            <div className='card' key={workout.id}>
                <h3>{workout.title}</h3>
                <p>Trainer: {workout.trainer}</p>
                <p>Date: {workout.date}</p>
                <p>Time: {workout.time}</p>
                <p>Duration: {workout.duration} min</p>
                <button onClick={() => cancelWorkout(workout.id)} className='delete-btn red'>Cancel workout</button>
            </div>
        )
    })

  return (
    <>
        <h2 className='page-title'>My Workouts</h2>

        <div className='card-container'>
            { currentUser.booked_workouts.length > 0 ? BookedElements : <h3 className='booked-status'>You have no booked Workouts</h3>}
        </div>
    </>
  )
}
