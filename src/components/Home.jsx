import React, { useState, useEffect } from "react";
import Form from "./FarmerForm";
import Farmers from "./Farmers";
import ratingCalculator from "../Rating";
// import Dummy from "./Dummy";
import { connect } from "react-redux";
import { Input, Ripple, initMDB } from "mdb-ui-kit";
// import { Link, useNavigate } from "react-router-dom";

initMDB({ Input, Ripple });

function Home(props) {
  // const [dummyData, setDummyData] = useState(null);
  const [avgRating, setAvgRating] = useState(0.0);

  // useEffect(() => {
  //   Dummy().then((result) => setDummyData(result));
  // }, []);

  useEffect(() => {
    // var size = props.farmers.length
    // document.getElementById("ftitle").innerHTML = "Hello" +
    //                                                 (size === 0 ? "!" :
    //                                                 size === 1 ? " farmer!" :
    //                                                 " farmers!"
    //                                                 )
    setAvgRating(ratingCalculator(props.farmers));
  }, [props.farmers]);

  // const CLIENT_ID = "8b9e24e186ff4c73aebca098b1e96f0f";
  // const REDIRECT_URI = "http://localhost:3000";
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  // const RESPONSE_TYPE = "token";

  // const [spotifyToken, setSpotifyToken] = useState("");

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   console.log(hash);
  //   let token = window.localStorage.getItem("spotifyToken");

  //   if (!token && hash) {
  //     token = hash
  //       .substring(1)
  //       .split("&")
  //       .find((element) => element.startsWith("access_token"))
  //       .split("=")[1];
  //     window.location.hash = "";
  //     window.localStorage.setItem("spotifyToken", token);
  //   }

  //   setSpotifyToken(token);
  // }, []);

  // const navigate = useNavigate();

  // function handleSearch() {
  //   if (spotifyToken) {
  //     navigate("/songs");
  //   } else {
  //     const query = new URLSearchParams({
  //       client_id: CLIENT_ID,
  //       redirect_uri: REDIRECT_URI,
  //       response_type: RESPONSE_TYPE,
  //     }).toString();
  //     window.location.href = `${AUTH_ENDPOINT}?${query}`;
  //   }
  // }

  // function handleClick() {
  //   setSpotifyToken("");
  //   window.localStorage.removeItem("spotifyToken");
  // }

  return (
    <div>
      {/* <h1 id="ftitle"></h1> */}
      <Form />
      <h2>Avg rating is {avgRating}</h2>
      {/* <h4>Wanna search artists on Spotify?</h4>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary"
          data-mdb-ripple-init
          onClick={handleSearch}
          style={{ marginRight: "5px" }}
        >
          Search
        </button>
        {spotifyToken && (
          <button
            type="submit"
            className="btn btn-primary"
            data-mdb-ripple-init
            onClick={handleClick}
          >
            Log Out
          </button>
        )}
      </div> */}
      <br />
      {/* {
        props.farmers.length ? 
        <Farmers /> :
        dummyData && <ul>{dummyData.map(data => <li key={data.name}>{data}</li>)}</ul>
      } */}
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
