import React, { useState, useEffect } from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

function FarmerForm(props) {
  const [farmer, setFarmer] = useState({
    address: "",
    rating: "",
    pricePerKg: "",
    stockInKg: "",
  });

  const [farmerData, setFarmerData] = useState({});

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email")
    fetch("http://localhost:3002/farmers")
      .then((res) => res.json())
      .then((data) =>
        data.filter((eachFarmer) => {
          return eachFarmer["email"] === email;
        })
      )
      .then((data) => {
        console.log(data, 'lll')
        if (data.length) {
          setIsFormSubmitted(true);
          setFarmerData(data[0]);
        } else {
          setIsFormSubmitted(false);
        }
      })
      .catch((error) => console.log(error));
  }, [isFormSubmitted]);

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
        amount: 0,
        stocksSold: 0,
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
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
          {isFormSubmitted && (
            <Card>
              <Card.Body>
                <Card.Title>Farmer details</Card.Title>
                <Card.Text>
                  Please find below your details, and orders that you have
                  received from admin
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <td>Email</td>
                      <td>{farmerData["email"]}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{farmerData["address"]}</td>
                    </tr>
                    <tr>
                      <td>Rating</td>
                      <td>{farmerData["rating"]}</td>
                    </tr>
                    <tr>
                      <td>Price per kg</td>
                      <td>{farmerData["pricePerKg"]}</td>
                    </tr>
                    <tr>
                      <td>Stock In kg</td>
                      <td>{farmerData["stockInKg"]}</td>
                    </tr>
                    <tr>
                      <td>Orders</td>
                      <td>{farmerData["orders"]}</td>
                    </tr>
                    <tr>
                      <td>Stock sold in kg</td>
                      <td>{farmerData["stocksSold"]}</td>
                    </tr>
                    <tr>
                      <td>Amount earned</td>
                      <td>{farmerData["amount"]}</td>
                    </tr>
                  </thead>
                </Table>
              </ListGroup>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerForm;
