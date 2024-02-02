import React, {useState} from 'react'

function Form(props){

    const [farmer, setFarmer] = useState({
        name : "", 
        email : "",
        address : "", 
        rating : ""
    })

    function handleChange(event){
        const {name, value} = event.target
        setFarmer(prevValue => {
            return {
                ...prevValue,
                [name] : value
            }
        })
    }

    function handleSubmit(event){
        setFarmer({
            name : "", 
            email : "",
            address : "", 
            rating : ""
        })

        event.preventDefault()
    }

    return <form onSubmit={handleSubmit} >
        <input placeholder='name' name = 'name' onChange = {handleChange} value={farmer.name}/>
        <input placeholder='email' name = 'email' onChange = {handleChange} value={farmer.email}/>
        <input placeholder='address' name = 'address' onChange = {handleChange} value={farmer.address}/>
        <input placeholder='rating' name = 'rating' onChange = {handleChange} value={farmer.rating}/>
        <button onClick={() => {
            props.onSubmit(farmer)
        }}>Add</button>
    </form>
}

export default Form