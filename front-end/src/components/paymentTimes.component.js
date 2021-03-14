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
    UserService.getTimesPaidCard().then(     //return axios.get(API_URL + 'getTimesPaidCard'); sto user.service.js
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className="welcome">
          <h2> Previous payments on Plug & Drive </h2>
          <header className="jumbotron" id="datapayment" >
            <h3> <b>Card</b>: {this.state.content.card} </h3>
            <h3> <b>Cash</b>: {this.state.content.cash} </h3>
          </header>
        </div>
      </div>
    );
  }
}
