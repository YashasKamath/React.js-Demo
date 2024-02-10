import React, { useState } from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateFarmersDataChanged } from "../redux";
import { connect } from "react-redux";

function OrderForm(props) {
  const [error, setError] = useState("");
  const [adminOrder, setAdminOrder] = useState({
    farmerEmail: "",
    stockInKg: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setAdminOrder((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3002/farmers")
      .then((res) => res.json())
      .then((data) =>
        data.filter((farmer) => {
          return farmer["email"] === adminOrder.farmerEmail;
        })
      )
      .then((data) => {
        if (!data.length) {
          throw Error(`This farmer email doesn't exist`);
        }
        if (Number(data[0]["stockInKg"]) < Number(adminOrder.stockInKg)){ 
          throw Error("Invalid stock value");
        }
        return data
      })
      .then(data => {
        console.log(data)
        fetch(`http://localhost:3002/farmers/${data[0]["id"]}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "orders" : Number(data[0]["orders"]) + 1,
            "stockInKg" : Number(data[0]["stockInKg"]) - Number(adminOrder.stockInKg)
          }),
        });
        fetch("http://localhost:3002/adminOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminOrder),
        })
        setAdminOrder({
          farmerEmail: "",
          stockInKg: "",
        });
        setError("");
        props.updateFarmersDataChanged()
        }).catch((error) => setError(error.message));
  }

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <Form onSubmit={handleSubmit}>
            <h2>Place Order</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Farmer Email</Form.Label>
              <Form.Control
                placeholder="farmer email"
                type="text"
                id="form3Example3"
                class="form-control"
                value={adminOrder.farmerEmail}
                onChange={handleChange}
                name="farmerEmail"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock in kg</Form.Label>
              <Form.Control
                placeholder="stock in kg"
                type="number"
                id="form3Example4"
                class="form-control"
                value={adminOrder.stockInKg}
                onChange={handleChange}
                name="stockInKg"
                required
              />
            </Form.Group>
            <div class="text-center">
              <Button as="input" type="submit" value="Submit" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateFarmersDataChanged : () => dispatch(updateFarmersDataChanged())
  }
}

export default connect(null, mapDispatchToProps)(OrderForm);
