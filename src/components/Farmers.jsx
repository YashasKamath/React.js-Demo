import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

function Farmer(props) {
  
  const [farmers, setFarmers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3002/farmers')
    .then(res => {
      if(!res.ok) throw Error('Could not fetch the data')
      return res.json()
  })
    .then(data => setFarmers(data))
    .catch(error => console.log(error))
  }, [props.farmersDataChanged])

  return farmers.length ? (
    <div>
      <h3><u>Farmers:</u></h3>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Email</th>
          <th>Address</th>
          <th>Price Per Kg</th>
          <th>Rating</th>
          <th>Stock In Kg</th>
        </tr>
      </thead>
      <tbody>
        {farmers.map((farmer) => {
          return (
            <tr>
              <td>{farmer.email}</td>
              <td>{farmer.address}</td>
              <td>{farmer.pricePerKg}</td>
              <td>{farmer.rating}</td>
              <td>{farmer.stockInKg}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    </div>
  ) : (
    <table></table>
  );
}

const mapStateToProps = (state) => {
  return {
    farmersDataChanged: state.farmers.dataChanged,
  };
};

export default connect(mapStateToProps)(Farmer);
