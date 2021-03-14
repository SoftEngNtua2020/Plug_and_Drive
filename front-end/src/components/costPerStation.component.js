import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Stations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {          //pairnei mia apanthsh apo backend (thn vazei sto state.content kai thn emfanizei sto render()).
    UserService.getLocalStations().then(     //return axios.get(API_URL + 'getVehiclesData'); sto user.service.js
      response => {
        this.setState({
          content: response.data
        });
        //show();
      },
      error => {
        this.setState({
          content: "WTF"
        });
      }
    );
  }

    table() {
      const data = new Array(this.state.content.length)    //a new array with the size (rows) of reply array of objects size
      for (var i=0; i<this.state.content.length; i++) data[i] = new Array(6);  //columns of it
      for (var i=0; i<this.state.content.length; i++) {
        data[i][0] = this.state.content[i].station_id;
        data[i][1] = this.state.content[i].program_id;
        data[i][2] = this.state.content[i].kwh_price;
        data[i][3] = this.state.content[i].bonus_per_kwh;
        data[i][4] = this.state.content[i].total_cost;
        data[i][5] = this.state.content[i].total_bonus;
      }
      return (
        <div id="table-responsive">
          <table>
            <thead id="station-table-data">
              <td><h3><b>Station</b></h3></td>
              <td><h3><b>Charging Program</b></h3></td>
              <td><h3><b>Kwh Price</b></h3></td>
              <td><h3><b>Bonus Points Per Kwh</b></h3></td>
              <td><h3><b>Total Cost</b></h3></td>
              <td><h3><b>Bonus Points</b></h3></td>
            </thead>
            <tbody id="station-table-data">
              {data.slice(0, data.length).map((item, index) => {
                return (
                  <tr>
                    <td><h5>{item[0]}</h5></td>
                    <td><h5>{item[1]}</h5></td>
                    <td><h5>{item[2]} €</h5></td>
                    <td><h5>{item[3]} points</h5></td>
                    <td><h5>{item[4]} €</h5></td>
                    <td><h5>{item[5]} points</h5></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

  render() {
    const { currentUser } = this.state.content;
    return (
      <div className="container">
        <div className="welcome">
          <h2> Local Stations </h2>
        </div>
        <header className="jumbotron" id="stations">
          {this.table()}
        </header>
      </div>
    );
  }
}
