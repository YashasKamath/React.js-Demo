import React, { useState } from "react";
import { connect } from "react-redux";
import { updateFarmers } from "../redux";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FarmerForm(props) {
  const [farmer, setFarmer] = useState({
    address: "",
    rating: "",
    pricePerKg: "",
  });

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

    if (farmer.rating > 10.0 || farmer.rating < 0.0) {
      setError("Rating is a floating value between 0 and 10 inclusive.");
      return;
    } else setError("");

    props.updateFarmers(farmer);
    setFarmer({
      pricePerKg: "",
      address: "",
      rating: "",
    });
  }

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <Form onSubmit={handleSubmit}>
            <h2>Intro Form</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <div class="text-center">
              <Button as="input" type="submit" value="Submit" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers.farmers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFarmers: (farmer) => dispatch(updateFarmers(farmer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmerForm);
