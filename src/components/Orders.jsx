import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Orders(props) {
  const [adminOrders, setAdminOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/adminOrders")
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data");
        return res.json();
      })
      .then((data) => setAdminOrders(data))
      .catch((error) => console.log(error));
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h3 style={{ "textAlign": "center" }}>Orders</h3>
      <br />
      {adminOrders.length ? (
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
      ) : (
        <h4>No records to show here...</h4>
      )}
      <div class="text-center">
        <Button as="input" type="submit" value="Go Back" onClick={goBack} />
      </div>
    </div>
  );
}

export default Orders;
