import React, { useEffect } from "react";
import FarmerForm from "./FarmerForm";
import { connect } from "react-redux";
import OrderForm from "./OrderForm";
import { updateUserEmail } from "../redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home(props) {
  function isAdmin() {
    return props.email === "admin@gmail.com";
  }

  useEffect(() => {
    props.updateUserEmail(localStorage.getItem("email"));
  }, []);

  const navigate = useNavigate();

  const goToOrders = () => {
    navigate("/orderTable");
  };

  const goToFarmers = () => {
    navigate("/farmerTable");
  };

  return (
    <div>
      {!isAdmin() && <FarmerForm />}
      {isAdmin() && <OrderForm />}
      <br />
      {isAdmin() && (
        <div class="text-center">
          <Button
            as="input"
            type="submit"
            value="View admin orders"
            onClick={goToOrders}
            style={{"marginRight" : "15px"}}
          />
          <Button
            as="input"
            type="submit"
            value="View avaibale farmers"
            onClick={goToFarmers}
          />
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
