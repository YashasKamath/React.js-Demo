import React, { useState } from "react";
import { connect } from "react-redux";
import { updateFarmers } from "../redux";
import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });

function FarmerForm(props) {
  const [farmer, setFarmer] = useState({
    address: "",
    rating: "",
    pricePerKg: ""
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
    <form onSubmit={handleSubmit}>
      <h2>Intro Form</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form3Example3"
                className="form-control"
                value={farmer.address}
                onChange={handleChange}
                name="address"
                required
              />
              <label className="form-label" for="form3Example3">
                Address
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="form3Example4"
                className="form-control"
                value={farmer.pricePerKg}
                onChange={handleChange}
                name="pricePerKg"
                required
              />
              <label className="form-label" for="form3Example4">
                Price per kg
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="form3Example4"
                className="form-control"
                value={farmer.rating}
                onChange={handleChange}
                name="rating"
                required
              />
              <label className="form-label" for="form3Example4">
                Rating
              </label>
            </div>

            <button
              data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block mb-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
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
