import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateUserEmail } from "../redux";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FarmerForm(props) {
  const [farmer, setFarmer] = useState({
    address: "",
    rating: "",
    pricePerKg: "",
    stockInKg: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [orders, setOrders] = useState("0");
  const [amount, setAmount] = useState("0");

  useEffect(() => {
    props.updateUserEmail(localStorage.getItem("email"))
    fetch("http://localhost:3002/farmers")
      .then((res) => res.json())
      .then((data) =>
        data.filter((farmer) => {
          return farmer["email"] === props.email;
        })
      )
      .then((data) => {
        if (data.length) {
          setIsFormSubmitted(true);
          setOrders(data[0]["orders"]);
          fetch("http://localhost:3002/adminOrders")
          .then((res) => res.json())
          .then((data) =>
            data.filter(adminOrder => {
              return adminOrder["farmerEmail"] === props.email;
            })
          )
          .then(data => {
            let totalStocksBought = 0
            data.map(order => totalStocksBought += Number(order["stockInKg"]))
            return totalStocksBought
          })
          .then(totalStocksBought => {
            setAmount(totalStocksBought * Number(data[0]["pricePerKg"]));
          })
        } else setIsFormSubmitted(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFarmer((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (farmer.rating > 5.0 || farmer.rating < 0.0) {
      setError("Rating is a floating value between 0 and 5 inclusive.");
      return;
    } else setError("");

    fetch("http://localhost:3002/farmers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...farmer,
        email: props.email,
        orders: 0,
      }),
    });
    setFarmer({
      pricePerKg: "",
      address: "",
      rating: "",
      stockInKg: "",
    });
    setIsFormSubmitted(true);
  }

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          {!isFormSubmitted && (
            <Form onSubmit={handleSubmit}>
              <h2>Intro Form</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="address"
                  type="text"
                  id="form3Example3"
                  class="form-control"
                  value={farmer.address}
                  onChange={handleChange}
                  name="address"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price per kg</Form.Label>
                <Form.Control
                  placeholder="price per kg"
                  type="number"
                  id="form3Example4"
                  class="form-control"
                  value={farmer.pricePerKg}
                  onChange={handleChange}
                  name="pricePerKg"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  placeholder="rating"
                  type="number"
                  id="form3Example4"
                  class="form-control"
                  value={farmer.rating}
                  onChange={handleChange}
                  name="rating"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Stock in kg</Form.Label>
                <Form.Control
                  placeholder="stock in kg"
                  type="number"
                  id="form3Example4"
                  class="form-control"
                  value={farmer.stockInKg}
                  onChange={handleChange}
                  name="stockInKg"
                  required
                />
              </Form.Group>
              <div class="text-center">
                <Button as="input" type="submit" value="Submit" />
              </div>
            </Form>
          )}
          {isFormSubmitted && <h2>Number of orders placed : {orders}</h2>}
          {isFormSubmitted && <h2>Amount earned: {amount}</h2>}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserEmail: (email) => dispatch(updateUserEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmerForm);
