import React, { Component } from "react";
import axios from 'axios';
import authHeader from '../services/auth-header';

import UserService from "../services/user.service";


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: {}
    };
  }

  componentDidMount() {          //pairnei mia apanthsh apo backend (thn vazei sto state.content kai thn emfanizei sto render()).
    axios.get("http://pluganddrive.ddns.net:8765/evcharge/api/getTotalBonus", { headers: authHeader() }).then(     //return axios.get(API_URL + 'getBonusPoints'); sto user.service.js
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

  /*
  <header className="jumbotron">
    <div id="show">
      <h3>{this.state.content}</h3>
    </div>
  </header>
  */

  render() {
    return (
      <div className="container">
        <div className="welcome">
          <h2> Total Bonus points you have on Plug & Drive </h2>
          <header className="jumbotron" id="databonus" >
            <h3><b>{this.state.content.bonus_points} points</b></h3>
          </header>
        </div>

      </div>
    );
  }
}
