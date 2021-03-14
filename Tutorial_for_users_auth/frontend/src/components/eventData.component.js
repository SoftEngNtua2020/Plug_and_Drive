import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {          //pairnei mia apanthsh apo backend (thn vazei sto state.content kai thn emfanizei sto render()).
    UserService.getPreviousEvents().then(     //return axios.get(API_URL + 'getVehiclesData'); sto user.service.js
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
      const data = new Array(this.state.content.length)
      for (var i=0; i<this.state.content.length; i++) data[i] = new Array(11);
      for (var i=0; i<this.state.content.length; i++) {
        data[i][0] = this.state.content[i].session_id;
        data[i][1] = this.state.content[i].started_on;
        data[i][2] = this.state.content[i].finished_on;
        data[i][3] = this.state.content[i].energy_deliverd;
        data[i][4] = this.state.content[i].point_id;
        data[i][5] = this.state.content[i].protocol;
        data[i][6] = this.state.content[i].payment_method;
        data[i][7] = this.state.content[i].bonus_points_energy;
        data[i][8] = this.state.content[i].total_cost;
        data[i][9] = this.state.content[i].vehicle_id;
        data[i][10] = this.state.content[i].station_id;
      }
      return (
        <div id="table-responsive">
          <table>
            <thead id="events-table-data">
              <td><h5><b>Session ID</b></h5></td>
              <td><h5><b>Started On</b></h5></td>
              <td><h5><b>Finished On</b></h5></td>
              <td><h5><b>Energy</b></h5></td>
              <td><h5><b>Point ID</b></h5></td>
              <td><h5><b>Protocol</b></h5></td>
              <td><h5><b>Payment</b></h5></td>
              <td><h5><b>Bonus Points Energy</b></h5></td>
              <td><h5><b>Total Cost</b></h5></td>
              <td><h5><b>Vehicle ID</b></h5></td>
              <td><h5><b>Station ID</b></h5></td>
            </thead>
            <tbody id="events-table-data">
              {data.slice(0, data.length).map((item, index) => {
                return (
                  <tr>
                    <td><h8>{item[0]}</h8></td>
                    <td><h8>{item[1]}</h8></td>
                    <td><h8>{item[2]}</h8></td>
                    <td><h8>{item[3]} kWh</h8></td>
                    <td><h8>{item[4]}</h8></td>
                    <td><h8>{item[5]}</h8></td>
                    <td><h8>{item[6]}</h8></td>
                    <td><h8>{item[7]} kWh</h8></td>
                    <td><h8>{item[8]} €</h8></td>
                    <td><h8>{item[9]}</h8></td>
                    <td><h8>{item[10]}</h8></td>
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
          <h2> Past Events </h2>
        </div>
        <header className="jumbotron" id="events">
          {this.table()}
        </header>
      </div>
    );
  }
}
