import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

function Farmer(props) {
  return props.farmers.length ? (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Address</th>
          <th>Price Per Kg</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
      {props.farmers.map((farmer) => {
        return (
          <tr>
            <td>{farmer.address}</td>
            <td>{farmer.pricePerKg}</td>
            <td>{farmer.rating}</td>
          </tr>
        );
      })}
      </tbody>
    </Table>
  ) : (
    <table></table>
  );
}

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers.farmers,
  };
};

export default connect(mapStateToProps)(Farmer);
