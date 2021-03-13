import React, { Component } from "react";

import UserService from "../services/user.service";

export default class StationsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      points: [],
      programs: [],
      providers: []
    };
  }

  componentDidMount() {          //pairnei mia apanthsh apo backend (thn vazei sto state.content kai thn emfanizei sto render()).
    UserService.getStationData().then(     //return axios.get(API_URL + 'getVehiclesData'); sto user.service.js
      response => {
        this.setState({
          content: response.data.stations,
          points: response.data.points,
          programs: response.data.programs,
          providers: response.data.providers
        });
      },
      error => {
        this.setState({
          content: [],
          points: [],
          programs: [],
          providers: []
        });
      }
    );
  }

    table1() {
      const data = new Array(this.state.content.length);
      for (var j=0; j<this.state.content.length; j++) data[j] = new Array(6);
      for (var j=0; j<this.state.content.length; j++) {
        data[j][0] = this.state.content[j].station_id;
        data[j][1] = this.state.content[j].location;
        data[j][2] = this.state.content[j].company_name;
        data[j][3] = this.state.content[j].phone_number;
        data[j][4] = this.state.content[j].st_moderator_id;
        data[j][5] = this.state.content[j].provider_id;
      }
      return (
        <div>
          <table id="stations">
            <thead id="station-table-data">
              <td><h3><b>Station ID</b></h3></td>
              <td><h3><b>Location</b></h3></td>
              <td><h3><b>Company Name</b></h3></td>
              <td><h3><b>Phone Number</b></h3></td>
              <td><h3><b>Station Moderator ID</b></h3></td>
              <td><h3><b>Provider ID</b></h3></td>
            </thead>
            <tbody id="station-table-data">
              {data.slice(0, data.length).map((item, index) => {
                return (
                  <tr>
                    <td><h5>{item[0]}</h5></td>
                    <td><h5>{item[1]}</h5></td>
                    <td><h5>{item[2]}</h5></td>
                    <td><h5>{item[3]}</h5></td>
                    <td><h5>{item[4]}</h5></td>
                    <td><h5>{item[5]}</h5></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    table2() {
      const data = new Array(this.state.points.length);
      for (var j=0; j<this.state.points.length; j++) data[j] = new Array(2);
      for (var j=0; j<this.state.points.length; j++) {
        data[j][0] = this.state.points[j].point_id;
        data[j][1] = this.state.points[j].station_id;
      }
      return (
        <div>
          <table id="stations">
            <thead id="station-table-data">
              <td><h3><b>Station ID</b></h3></td>
              <td><h3><b>Point ID</b></h3></td>
            </thead>
            <tbody id="station-table-data">
              {data.slice(0, data.length).map((item, index) => {
                return (
                  <tr>
                    <td><h5>{item[1]}</h5></td>
                    <td><h5>{item[0]}</h5></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    table3() {
      const data = new Array(this.state.programs.length);
      for (var j=0; j<this.state.programs.length; j++) data[j] = new Array(5);
      for (var j=0; j<this.state.programs.length; j++) {
        data[j][0] = this.state.programs[j].program_id;
        data[j][1] = this.state.programs[j].program_name;
        data[j][2] = this.state.programs[j].kwh_price;
        data[j][3] = this.state.programs[j].bonus_per_kwh;
        data[j][4] = this.state.programs[j].station_id;
      }
      return (
        <div>
          <table id="stations">
            <thead id="station-table-data">
              <td><h3><b>Station ID</b></h3></td>
              <td><h3><b>Program ID</b></h3></td>
              <td><h3><b>Program Name</b></h3></td>
              <td><h3><b>Kwh Price</b></h3></td>
              <td><h3><b>Bonus Per Kwh</b></h3></td>
            </thead>
            <tbody id="station-table-data">
              {data.slice(0, data.length).map((item, index) => {
                return (
                  <tr>
                    <td><h5>{item[4]}</h5></td>
                    <td><h5>{item[0]}</h5></td>
                    <td><h5>{item[1]}</h5></td>
                    <td><h5>{item[2]}</h5></td>
                    <td><h5>{item[3]}</h5></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    table4() {
      const data = new Array(this.state.providers.length);
      for (var j=0; j<this.state.providers.length; j++) data[j] = new Array(3);
      for (var j=0; j<this.state.providers.length; j++) {
        data[j][0] = this.state.providers[j].provider_id;
        data[j][1] = this.state.providers[j].provider_name;
        data[j][2] = this.state.providers[j].station_id;
      }
      return (
        <div>
          <table id="stations">
            <thead id="station-table-data">
              <td><h3><b>Station ID</b></h3></td>
              <td><h3><b>Provider ID</b></h3></td>
              <td><h3><b>Provider Name</b></h3></td>
            </thead>
            <tbody id="station-table-data">
              {data.slice(0, data.length).map((item, index) => {
                return (
                  <tr>
                    <td><h5>{item[2]}</h5></td>
                    <td><h5>{item[0]}</h5></td>
                    <td><h5>{item[1]}</h5></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

  render() {
    return (
      <div className="col-md-12">
        <div className="welcome">
          <h2> Station Data </h2>
        </div>

        <header className="jumbotron" id="events">
          <div id="table-responsive">
        <header>
          <h1>{this.table1()}</h1>
        </header>
        <header>
          <h1>{this.table2()}</h1>
        </header>
        <header>
          <h1>{this.table3()}</h1>
        </header>
        <header>
          <h1>{this.table4()}</h1>
        </header>
        </div>
        </header>
      </div>
    );
  }
}