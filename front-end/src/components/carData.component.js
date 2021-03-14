import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {}
    };
  }

  componentDidMount() {          //pairnei mia apanthsh apo backend (thn vazei sto state.content kai thn emfanizei sto render()).
    UserService.getVehiclesData().then(     //return axios.get(API_URL + 'getVehiclesData'); sto user.service.js
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content: "WTF"
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className="welcome">
          <h2> Your Car's data </h2>
        </div>
          <header className="jumbotron" id="datacar" >
            <h3> <b>Brand</b>: {this.state.content.brand} </h3>
            <h3> <b>Type</b>: {this.state.content.type} </h3>
            <h3> <b>Model</b>: {this.state.content.model} </h3>
            <h3> <b>Release year</b>: {this.state.content.release_year} </h3>
            <h3> <b>Usable battery size</b>: {this.state.content.usable_battery_size + " kWh"} </h3>
            <h3> <b>Average consumption</b>: {this.state.content.average_consumption+ " kWh"} </h3>
            <h3> <b>Current battery charge</b>: {this.state.content.current_battery_charge+ " kWh"} </h3>
            <h3> <b>Owner id</b>: {this.state.content.owner_id} </h3>
          </header>
      </div>
    );
  }
}
