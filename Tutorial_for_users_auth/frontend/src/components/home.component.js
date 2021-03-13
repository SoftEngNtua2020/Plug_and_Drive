import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {          //pairnei mia apanthsh apo backend (thn vazei sto state.content kai thn emfanizei sto render()).
    UserService.getPublicContent().then(     //return axios.get(API_URL + 'all'); sto user.service.js
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

  /*<header className="jumbotron">
      <h3>{this.state.content}</h3>
    </header>
  */

  render() {
    return (
      <div className="container">
        <div className="welcome">
          <div id="middleDoc">
          <h2> Welcome to Plug & Drive </h2>
          <p> ~The place where charging your electrical car, becomes an easy task~ </p>
          </div>
        </div>
      </div>
    );
  }
}
