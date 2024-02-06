import React from 'react'
// import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

function Farmer(props){
    // const {name, email, address, rating} = props.farmer

    // return <Card style={{ width: '18rem', display : "flex", flexDirection: "row" }}>
    //             <Card.Body>
    //             <Card.Title>name : {name}</Card.Title>
    //             <Card.Text>Email : {email}</Card.Text>
    //             <Card.Text>Address : {address}</Card.Text>
    //             <Card.Text>Rating : {rating}</Card.Text>
    //             {/* <Button variant="primary">Go somewhere</Button> */}
    //             </Card.Body>
    //         </Card>

    return <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
        </tr>
        {props.farmers.map(farmer => {
            return <tr>
                <td>{farmer.name}</td>
                <td>{farmer.email}</td>
                <td>{farmer.address}</td>
                <td>{farmer.rating}</td>
            </tr>
        })}
    </table>
}

const mapStateToProps = state => {
    return {
        farmers : state.farmers.farmers
    }
}

export default connect(mapStateToProps)(Farmer)