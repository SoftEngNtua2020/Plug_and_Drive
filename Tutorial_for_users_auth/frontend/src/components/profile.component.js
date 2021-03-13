import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container" id="dropdown-menu">
        <header className="jumbotron">
          <h3>
            <strong>🧑‍🦱 {currentUser.username}</strong> Profile
          </h3>
        <div >
          <p> <p></p></p>
          <p>
            <strong>🔑 Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p>
            <strong>✉️ Email:</strong>{" "}
            {currentUser.email}
          </p>
          <strong>💂 Authorities:</strong>
          <ul>
            {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
            </header>
      </div>
    );
  }
}
