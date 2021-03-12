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
        data[i][3] = this.state.content[i].energy_delivered;
        data[i][4] = this.state.content[i].point_id;
        data[i][5] = this.state.content[i].protocol;
        data[i][6] = this.state.content[i].payment_method;
        data[i][7] = this.state.content[i].bonus_points_energy;
        data[i][8] = this.state.content[i].total_cost;
        data[i][9] = this.state.content[i].vehicle_id;
        data[i][10] = this.state.content[i].station_id;
      }
      return (
        <div>
          <table id="events">
            <thead id="events-table-data">
              <td><h4><b>SessionID</b></h4></td>
              <td><h4><b>StartedOn</b></h4></td>
              <td><h4><b>FinishedOn</b></h4></td>
              <td><h4><b>Energy</b></h4></td>
              <td><h4><b>PointID</b></h4></td>
              <td><h4><b>Protocol</b></h4></td>
              <td><h4><b>Payment</b></h4></td>
              <td><h4><b>BonusPointsEnergy</b></h4></td>
              <td><h4><b>TotalCost</b></h4></td>
              <td><h4><b>VehicleID</b></h4></td>
              <td><h4><b>StationID</b></h4></td>
            </thead>
            <tbody id="events-table-data">
              {data.slice(0, data.length).map((item, index) => {
                return (
                  <tr>
                    <td><h6>{item[0]}</h6></td>
                    <td><h6>{item[1]}</h6></td>
                    <td><h6>{item[2]}</h6></td>
                    <td><h6>{item[3]} kWr</h6></td>
                    <td><h6>{item[4]}</h6></td>
                    <td><h6>{item[5]}</h6></td>
                    <td><h6>{item[6]}</h6></td>
                    <td><h6>{item[7]} kWr</h6></td>
                    <td><h6>{item[8]} euros</h6></td>
                    <td><h6>{item[9]}</h6></td>
                    <td><h6>{item[10]}</h6></td>
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
      <div className="col-md-12">
        <header>
          <h1>{this.table()}</h1>
        </header>
      </div>
    )
  }
}