import React from 'react'
import Card from 'react-bootstrap/Card';

function Farmer(props){
    const {name, email, address, rating} = props.farmer

    return <Card style={{ width: '18rem', display : "flex", flexDirection: "row" }}>
                <Card.Body>
                <Card.Title>name : {name}</Card.Title>
                <Card.Text>Email : {email}</Card.Text>
                <Card.Text>Address : {address}</Card.Text>
                <Card.Text>Rating : {rating}</Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
}

export default Farmer