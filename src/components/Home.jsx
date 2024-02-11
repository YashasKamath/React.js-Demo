import React, { useEffect, useState } from "react";
import FarmerForm from "./FarmerForm";
import OrderForm from "./OrderForm";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home() {

  const [email, setEmail] = useState('')

  useEffect(() => {
    setEmail(localStorage.getItem('email'))
  }, [])

  function isAdmin() {
    return email === "admin@gmail.com";
  }

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

export default Home;
