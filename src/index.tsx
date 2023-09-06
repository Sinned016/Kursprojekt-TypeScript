import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Server, Response } from "miragejs"
import { nanoid } from 'nanoid';
import { UserInterface, WorkoutInterface } from './types/UserInterface';

let userArray: UserInterface[] = [
  { 
    id: nanoid(),
    name: "Dennis",
    password: "123",
    role: "ADMIN",
    booked_workouts: [],
  },
  { 
    id: nanoid(),
    name: "Felix",
    password: "123",
    role: "USER",
    booked_workouts: [],
  },
  { 
    id: nanoid(),
    name: "Jacke",
    password: "123",
    role: "USER",
    booked_workouts: [],
  },
]

let workoutArray: WorkoutInterface[] = [
  { 
    id: nanoid(),
    title: "Crossfit",
    trainer: "Gertrude Trainersson",
    time: new Date("2023-09-30T20:30").toLocaleTimeString(),
    date: new Date("2023-09-30T20:30").toDateString(),
    duration: 1
  },
  { 
    id: nanoid(),
    title: "Gym with Arnold",
    trainer: "Arnold Schwarzenegger",
    time: new Date("2023-10-30T12:30").toLocaleTimeString(),
    date: new Date("2023-10-30T12:30").toDateString(),
    duration: 2
  },
  { 
    id: nanoid(),
    title: "Yoga",
    trainer: "Yvex Flexible",
    time: new Date("2023-11-25T08:30").toLocaleTimeString(),
    date: new Date("2023-11-25T08:30").toDateString(),
    duration: 1.5
  },
]


new Server({
  routes() {
    this.namespace = "api"

    //users
    this.get("/users", () => {
      return { users: userArray }
    })

    this.post("/users", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      body.id = nanoid()
      userArray.push(body)

      return { users: body };
    })

    this.post("/users/booking", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      const workout = workoutArray.find((workout) => workout.id === body.workoutId)

      if(workout) {
        const userIndex = userArray.findIndex((user) => user.id === body.userId)
        userArray[userIndex].booked_workouts.push(workout)

        return { user: userArray[userIndex] }
      } else {
        return new Response(400)
      }
    }) 

    this.delete("/users/booking", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      const userIndex = userArray.findIndex((user) => user.id === body.userId)
      const bookedIndex = userArray[userIndex].booked_workouts.findIndex((workout) => workout.id === body.workoutId)

      userArray[userIndex].booked_workouts.splice(bookedIndex)

      return { user: userArray[userIndex] }
    })
 
    //workouts
    this.get("/workouts", schema => {
      return {
        workouts: workoutArray
      }
    })

    this.post("/workouts", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      body.id = nanoid()
      workoutArray.push(body)

      return { workout: body };
    })

    this.put("/login", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      const user = userArray.find((user) => user.name === body.username && user.password === body.password )

      if(user) {
        return { user: user}
      } else {
        return new Response(400)
      }
    })

    
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
