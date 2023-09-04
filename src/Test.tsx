import React, {useEffect} from 'react'





export default function Test() {

    useEffect(() => {
        fetch("/api/users")
            .then(res => res.json())
            .then(json => console.log(json))

        fetch("/api/workouts")
            .then(res => res.json())
            .then(json => console.log(json))


    }, [])

  return (
    <div></div>
  )
}
