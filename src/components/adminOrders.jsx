import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

function Farmer(props) {
  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/adminOrders")
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data");
        return res.json();
      })
      .then((data) => setAdminOrders(data))
      .catch((error) => console.log(error));
  }, [props.farmersDataChanged]);

  return adminOrders.length ? (
    <div>
      <h3><u>Orders:</u></h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Farmer Email</th>
            <th>Stock In Kg</th>
          </tr>
        </thead>
        <tbody>
          {adminOrders.map((adminOrder) => {
            return (
              <tr>
                <td>{adminOrder.farmerEmail}</td>
                <td>{adminOrder.stockInKg}</td>
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
