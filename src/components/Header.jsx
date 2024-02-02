import React, {useState, useEffect} from 'react'
import Time from './Time'

function Header(){

    function useGreeting(time){
        const [greeting, setGreeting] = useState("")
        const hours = time.getHours()
        var result = "Good "
        if(hours > 20) result += "Night!"
        else if(hours > 16) result += "Evening!"
        else if(hours > 11) result += "Afternoon!"
        else result += "Morning!"
        
        useEffect(() => {
            function handleGreetingChange(result) {
              setGreeting(result);
            }
            return () => {handleGreetingChange(result)}
        });

        return greeting
    }

    var greeting = useGreeting(new Date())

    // function handleGreeting(time){
    //     greeting = useGreeting(time)
    // }

    return <header>
        {/* <Time greet={handleGreeting}/> */}
        <Time />
        {/* <h1>{greeting}</h1> */}
        </header>
}

export default Header