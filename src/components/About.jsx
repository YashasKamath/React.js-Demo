import React, { Component } from "react";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      intro: "",
      theme: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    fetch("http://localhost:3002/about")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          title: data["title"],
          intro: data["intro"],
          theme: data["theme"],
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6" style={{"textAlign" : "justify"}}>
            <h1 style={{ textAlign: "center" }}>{this.state.title}</h1>
            <p>{this.state.intro}</p>
            <p>{this.state.theme}</p>
          </div>
        </div>
      </div>
    );
  }
}
