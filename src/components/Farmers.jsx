import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [price, setPrice] = useState(0.0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/farmers")
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data");
        return res.json();
      })
      .then((data) => setFarmers(data))
      .catch((error) => console.log(error));
  }, []);

  function filter(event) {
    event.preventDefault();
    fetch("http://localhost:3002/farmers")
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data");
        return res.json();
      })
      .then((data) =>
        data.filter((farmer) => {
          return Number(farmer["pricePerKg"]) <= Number(price);
        })
      )
      .then((data) => setFarmers(data))
      .catch((error) => console.log(error));
  }

  function sortByPrice() {
    console.log('sorting')
    setFarmers(prevFarmers => {
      let copyFarmers = [...prevFarmers]
      return copyFarmers.sort((firstFarmer, secondFarmer) => {
        return Number(firstFarmer["pricePerKg"]) <= Number(secondFarmer["pricePerKg"]) ? -1 : 1
      })
    })
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h3 style={{ textAlign: "center" }}>Farmers</h3>
            <Form inline onSubmit={filter}>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="number"
                    placeholder="maximum price per kg"
                    className=" mr-sm-2"
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Apply Filter</Button>
                </Col>
                <Col xs="auto">
                  <Button onClick={sortByPrice}>Sort by Price</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <br />
      {farmers.length ? (
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Email</th>
                <th>Address</th>
                <th>Price Per Kg</th>
                <th>Rating</th>
                <th>Stock In Kg</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => {
                return (
                  <tr>
                    <td>{farmer.email}</td>
                    <td>{farmer.address}</td>
                    <td>{farmer.pricePerKg}</td>
                    <td>{farmer.rating}</td>
                    <td>{farmer.stockInKg}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div class="text-center">
            <Button as="input" type="submit" value="Go Back" onClick={goBack} />
          </div>
        </div>
      ) : (
        <Table></Table>
      )}
    </div>
  );
}

export default Farmers;
