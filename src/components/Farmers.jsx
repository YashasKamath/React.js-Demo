import React from "react";
import { connect } from "react-redux";

function Farmer(props) {
  return ( props.farmers.length ? 
    <table>
      <tr>
        <th>Address</th>
        <th>Price Per Kg</th>
        <th>Rating</th> 
      </tr>
      {props.farmers.map((farmer) => {
        return (
          <tr>
            <td>{farmer.address}</td>
            <td>{farmer.pricePerKg}</td>
            <td>{farmer.rating}</td>
          </tr>
        );
      })}
    </table> :
    <table></table>
  );
}

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers.farmers,
  };
};

export default connect(mapStateToProps)(Farmer);
