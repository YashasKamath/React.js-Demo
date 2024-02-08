import React, { useState, useEffect } from "react";
import Form from "./FarmerForm";
import Farmers from "./Farmers";
import ratingCalculator from "../Rating";
import { connect } from "react-redux";
import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });

function Home(props) {
  const [avgRating, setAvgRating] = useState(0.0);

  useEffect(() => {
    setAvgRating(ratingCalculator(props.farmers));
  }, [props.farmers]);

  return (
    <div>
      <Form />
      <h2>Avg rating is {avgRating}</h2>
      <br />
      <Farmers />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers.farmers,
  };
};

export default connect(mapStateToProps)(Home);
