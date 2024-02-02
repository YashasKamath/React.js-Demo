import React, {useState} from 'react'

function Time(){

    const [time, setTime] = useState(new Date().toLocaleTimeString())

    setInterval(() => {
        setTime(new Date().toLocaleTimeString())
        // const hours = new Date().getHours()
        // if(hours === 0 || hours === 12 || hours === 16 || hours === 20)
        // props.greet(new Date())
    }, 1000)

    return <p>{time}</p>
}

export default Time