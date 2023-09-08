import { useState } from "react"
import fetchOptions from '../service/fetchService';
import { WorkoutInterface } from '../types/UserInterface'

type AdminWorkoutProps = {
  workouts: WorkoutInterface[]
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutInterface[]>>;
}

const defaultValue: WorkoutInterface = {
  id: "",
  title: "",
  trainer: "",
  date: "",
  time: "",
  duration: 60
}

export default function AdminWorkouts({workouts, setWorkouts}: AdminWorkoutProps) {
  const [toggle, setToggle] = useState(false)
  const [inputValues, setInputValues] = useState(defaultValue)

  //saving input values when adding a new card or editing a card
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInputValues((previnputValues) => {
      return {
        ...previnputValues,
        [name]: value,
      };
    });
  }

  async function deleteWorkout(workoutId: string) {
    const BODY = {
      workoutId: workoutId
    }
    const res = await fetch("/api/workouts", fetchOptions("DELETE", BODY))
    const data = await res.json()
    setWorkouts(data.workouts)
    alert("Workout successfully deleted!")
    setInputValues(defaultValue)
    setToggle(false)
  }

  async function addWorkout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const res = await fetch("/api/workouts", fetchOptions("POST", inputValues))
    const data = await res.json()

    setWorkouts(data.workouts)
    alert("New workout successfully added!")
    setInputValues(defaultValue)
  }

  //Edit workout
  function editWorkout(workout: WorkoutInterface) {
    setInputValues(workout)
    setToggle(true)
  }

  function closeAddEditWorkout() {
    setToggle(false)
    setInputValues(defaultValue)
  }

  //JSX BELOW
  const addWorkoutElement: JSX.Element = (
    <form onSubmit={(event) => addWorkout(event)} className="new-workout-card">
      <div className="new-workout-header">
        <h2>{inputValues.id === "" ? "Add new Workout" : "Edit Workout"}</h2>
        <p onClick={closeAddEditWorkout} className="x-icon">&#10006;</p>
      </div>
      <input required type="text" placeholder="Title" name="title" value={inputValues.title} onChange={handleChange} />
      <input required type="text" placeholder="Trainer" name="trainer" value={inputValues.trainer} onChange={handleChange} />
      <div className="date-time-div">
        <input required type="date" placeholder="Date" name="date" value={inputValues.date} onChange={handleChange} />
        <input required type="time" placeholder="Time" name="time" value={inputValues.time} onChange={handleChange} />
      </div>
      <input required type="number" placeholder="Duration(min)" name="duration" value={inputValues.duration} onChange={handleChange} />
      <button className="add-workout-btn" type="submit">{inputValues.id === "" ? "Add workout" : "Save changes"}</button>
      {inputValues.id !== "" ? <button type="button" onClick={() => deleteWorkout(inputValues.id)} className="add-workout-btn red">Delete workout</button> : ""}
    </form>
  )

  const workoutElements = workouts.map((workout) => {
    return (
        <div className='card' key={workout.id}>
            <div className="card-header">
            <h3>{workout.title}</h3>
            <button onClick={() => editWorkout(workout)} className='edit-btn'>&#9881;</button>
            </div>
            
            <p>Trainer: {workout.trainer}</p>
            <p>Date: {workout.date}</p>
            <p>Time: {workout.time}</p>
            <p>Duration: {workout.duration} min</p>
        </div>
    )
  })

  return (
    <div>
      <div className="flex-center">
        <button className="toggle-new-workout-btn" onClick={() => setToggle(true)}>Add new workout</button>
      </div>
      
      {toggle && addWorkoutElement}

      <div className='card-container'>
        {workoutElements}
      </div>
    </div>
  )
}
