import React, {useState} from 'react'
import { connect } from 'react-redux'
import { updateFarmers } from '../redux'

function Form(props){

    const [farmer, setFarmer] = useState({
        name : "", 
        email : "",
        address : "", 
        rating : ""
    })

    const [error, setError] = useState('')

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

        event.preventDefault()

        if(farmer.rating > 10.0 || farmer.rating < 0.0){
            setError('Rating is a floating value between 0 and 10 inclusive.')
            return;
        }
        else setError('')

        props.updateFarmers(farmer)
        setFarmer({
            name : "", 
            email : "",
            address : "", 
            rating : ""
        })
    }

    return <form onSubmit={handleSubmit} >
        {error && <p>{error}</p>}
        <input placeholder='name' name = 'name' onChange = {handleChange} value={farmer.name} required/>
        <input placeholder='email' name = 'email' onChange = {handleChange} value={farmer.email} type="email" required/>
        <input placeholder='address' name = 'address' onChange = {handleChange} value={farmer.address} required/>
        <input placeholder='rating' name = 'rating' onChange = {handleChange} value={farmer.rating} type="number" required/>
        <button type="submit">Add</button>
    </form>
}

const mapStateToProps = state => {
    return {
        farmers : state.farmers.farmers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFarmers : farmer => dispatch(updateFarmers(farmer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)