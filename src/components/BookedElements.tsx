import React, { useState } from 'react'
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
                <h2>{workout.title}</h2>
                <p>Trainer: {workout.trainer}</p>
                <p>Date: {workout.date}</p>
                <p>Time: {workout.time}</p>
                <p>Duration: {workout.duration} min</p>
                <button onClick={() => cancelWorkout(workout.id)} className='book-workout-btn'>Cancel Workout</button>
            </div>
        )
    })

  return (
    <div>
        { BookedElements }
    </div>
  )
}
