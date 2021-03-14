import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {}
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
      <header className="jumbotron" id="datacar" >
        <h3> <b>Moderator id</b>: {this.state.content.st_moderator_id} </h3>
        <h3> <b>First name</b>: {this.state.content.first_name} </h3>
        <h3> <b>Last name</b>: {this.state.content.last_name} </h3>
        <h3> <b>User_id</b>: {this.state.content.user_id} </h3>
      </header>
      </div>
    );
  }
}
