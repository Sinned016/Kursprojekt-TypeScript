import React from 'react'
import { WorkoutInterface } from '../types/UserInterface'

type WorkoutProps = {
    workouts: WorkoutInterface[]
}

export default function WorkoutElements(props: WorkoutProps) {

    const workoutElements = props.workouts.map((workout) => {
        return (
            <div className='card' key={workout.id}>
                <h2>{workout.title}</h2>
                <p>Trainer: {workout.trainer}</p>
                <p>Date: {workout.date}</p>
                <p>Time: {workout.time}</p>
                <p>Duration: {workout.duration} min</p>
                <button className='book-workout-btn'>Book workout</button>
            </div>
        )
    })

  return (
    <>
        { workoutElements }
    </>
  )
}
