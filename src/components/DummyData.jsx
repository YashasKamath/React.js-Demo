import React from 'react'
import Card from 'react-bootstrap/Card';

function DummyData(props){
    const {name, price, image, type} = props
    return <Card style={{ width: '18rem', display : "flex", flexDirection: "row" }}>
                <Card.Body>
                <Card.Title>Name : {name}</Card.Title>
                <Card.Text>Price : {price}</Card.Text>
                <Card.Text>Image : {image}</Card.Text>
                <Card.Text>Type : {type}</Card.Text>
                </Card.Body>
            </Card>
}

export default DummyData