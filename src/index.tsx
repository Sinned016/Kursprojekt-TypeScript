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
    time: new Date("2023-09-30T20:30").toTimeString().substring(0, 5),
    date: new Date("2023-09-30T20:30").toISOString().split("T")[0],
    duration: 60
  },
  { 
    id: nanoid(),
    title: "Gym with Arnold",
    trainer: "Arnold Schwarzenegger",
    time: new Date("2023-10-30T12:30").toTimeString().substring(0, 5),
    date: new Date("2023-10-30T12:30").toISOString().split("T")[0],
    duration: 60
  },
  { 
    id: nanoid(),
    title: "Yoga",
    trainer: "Yves Flexible",
    time: new Date("2023-11-25T08:30").toTimeString().substring(0, 5),
    date: new Date("2023-11-25T08:30").toISOString().split("T")[0],
    duration: 90
  },
  { 
    id: nanoid(),
    title: "Spinning",
    trainer: "Greta Spinnersson",
    time: new Date("2023-11-25T08:30").toTimeString().substring(0, 5),
    date: new Date("2023-11-25T08:30").toISOString().split("T")[0],
    duration: 90
  },
  { 
    id: nanoid(),
    title: "Karate",
    trainer: "Chuck Norris",
    time: new Date("2023-11-25T08:30").toTimeString().substring(0, 5),
    date: new Date("2023-11-25T08:30").toISOString().split("T")[0],
    duration: 90
  },
  { 
    id: nanoid(),
    title: "Jogging",
    trainer: "Usain Bolt",
    time: new Date("2023-11-25T08:30").toTimeString().substring(0, 5),
    date: new Date("2023-11-25T08:30").toISOString().split("T")[0],
    duration: 30
  },
  { 
    id: nanoid(),
    title: "Zumba",
    trainer: "Zoe Zumbasson",
    time: new Date("2023-11-25T08:30").toTimeString().substring(0, 5),
    date: new Date("2023-11-25T08:30").toISOString().split("T")[0],
    duration: 90
  },
  { 
    id: nanoid(),
    title: "Crossfit",
    trainer: "Gertrude Trainersson",
    time: new Date("2023-09-30T20:30").toTimeString().substring(0, 5),
    date: new Date("2023-09-30T20:30").toISOString().split("T")[0],
    duration: 60
  },
]


new Server({
  routes() {
    this.namespace = "api"

    //users
    this.get("/users", () => {
      return { users: userArray }
    })

    //Login
    this.put("/login", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      const user = userArray.find((user) => user.name === body.name && user.password === body.password )

      if(user) {
        return { user: user}
      } else {
        return new Response(400)
      }
    })

    //Register
    this.post("/register", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      const user = userArray.find((user) => body.name === user.name)

      if(user) {
        return new Response(400)
      } else {
        body.id = nanoid()
        body.role = "ADMIN"
        body.booked_workouts = []
        userArray.push(body)
        return { users: body };
      }
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

      userArray[userIndex].booked_workouts.splice(bookedIndex, 1)

      return { user: userArray[userIndex] }
    })

    this.delete("/users", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      const userIndex = userArray.findIndex((user) => user.id === body.userId)
      userArray.splice(userIndex, 1)

      return {users: userArray}
    })
 

    //workouts
    this.get("/workouts", schema => {
      return {
        workouts: workoutArray
      }
    })

    this.post("/workouts", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      if(body.id === "") {
        body.id = nanoid()
        workoutArray.push(body)
      } else {
        const workoutIndex = workoutArray.findIndex((workout) => workout.id === body.id)
        workoutArray[workoutIndex] = body;
      }

      return { workouts: workoutArray };
    })

    this.delete("/workouts", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      workoutArray = workoutArray.filter((workout) => workout.id !== body.workoutId);
      return {workouts: workoutArray};
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
