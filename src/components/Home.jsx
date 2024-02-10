import React, {useEffect} from "react";
import FarmerForm from "./FarmerForm";
import Farmers from "./Farmers";
import { connect } from "react-redux";
import OrderForm from "./OrderForm";
import AdminOrders from "./adminOrders";
import { updateUserEmail } from "../redux";

function Home(props) {

  function isAdmin(){
    return props.email === "admin@gmail.com"
  }

  useEffect(() => {
    props.updateUserEmail(localStorage.getItem("email"))
  }, [])

  return (
    <div>
      {!isAdmin() && <FarmerForm />}
      {isAdmin() && <OrderForm />}
      <br />
      {isAdmin() && <Farmers />}
      <br />
      {isAdmin() && <AdminOrders />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers.farmers,
    email : state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserEmail : email => dispatch(updateUserEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
