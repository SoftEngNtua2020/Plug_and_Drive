import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class EnergyConsumbedByEVType extends Component {
  constructor(props) {
    super(props);
    this.handleEnergy = this.handleEnergy.bind(this);
    this.onChangeStartDatetime = this.onChangeStartDatetime.bind(this);
    this.onChangeEndDatetime = this.onChangeEndDatetime.bind(this);
    //this.onChangeDatetime = this.onChangeDatetime.bind(this);

    this.state = {
      start_datetime: "",
      end_datetime: "",
      content: [],
      message: "",
      successful: false
    };
  }

  onChangeStartDatetime(e) {
    this.setState({
      start_datetime: e.target.value
    });
  }

  onChangeEndDatetime(e) {
    this.setState({
      end_datetime: e.target.value
    });
  }


  handleEnergy(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.getCarsCharges(this.state.start_datetime, this.state.end_datetime).then(
        response => {
          this.setState({
            content: response.data,
            successful: true
          });
        },
        error => {
          var resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          if (resMessage == "Request failed with status code 402") resMessage = "There are no available sessions";
          if (resMessage == "Anauthorized") resMessage = "Please retry with a valid ID";
          this.setState({
            successful: false,
            content: [],
            message: resMessage
          });
        }
      );
    }
  }

  table() {
    const data = new Array(this.state.content.length)
    for (var i=0; i<this.state.content.length; i++) data[i] = new Array(8);
    for (var i=0; i<this.state.content.length; i++) {
      data[i][0] = this.state.content[i].VehicleID;
      data[i][1] = this.state.content[i].VehicleBrand;
      data[i][2] = this.state.content[i].VehicleType;
      data[i][3] = this.state.content[i].VehicleModel;
      data[i][4] = this.state.content[i].ReleaseYear;
      data[i][5] = this.state.content[i].UsableBatterySize;
      data[i][6] = this.state.content[i].AverageConsumption;
      data[i][7] = this.state.content[i].CurrentBatteryCharge;
    }
    return (
      <div id="table-responsive">
        <table id="CarsChargesTable">
          <thead id="carsCharges-table-data">
            <td><h3><b>Vehicle ID</b></h3></td>
            <td><h3><b>Vehicle Brand</b></h3></td>
            <td><h3><b>Vehicle Type</b></h3></td>
            <td><h3><b>Vehicle Model</b></h3></td>
            <td><h3><b>Release Year</b></h3></td>
            <td><h3><b>Usable Battery Size</b></h3></td>
            <td><h3><b>Average Consumption</b></h3></td>
            <td><h3><b>Current Battery Charge</b></h3></td>
          </thead>
          <tbody id="carsCharges-table-data">
            {data.slice(0, data.length).map((item, index) => {
              return (
                <tr>
                  <td><h5>{item[0]}</h5></td>
                  <td><h5>{item[1]}</h5></td>
                  <td><h5>{item[2]}</h5></td>
                  <td><h5>{item[3]}</h5></td>
                  <td><h5>{item[4]}</h5></td>
                  <td><h5>{item[5]} kWh</h5></td>
                  <td><h5>{item[6]}</h5></td>
                  <td><h5>{item[7]} kWh</h5></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if(!this.state.successful) {
      return (
        <div className="col-md-12">
          <div className="card card-container" id="form">
            <img
              src="https://i.pinimg.com/originals/15/c0/d0/15c0d074605e69e381d24dbc20ba25b3.png"
              alt="profile-img"
              className="profile-img-card-car"></img>
            <Form
              onSubmit={this.handleEnergy}
              ref={c => {
                this.form = c;
              }}>
              <div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date Time</label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    value={this.state.start_datetime}
                    onChange={this.onChangeStartDatetime}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date Time</label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    value={this.state.end_datetime}
                    onChange={this.onChangeEndDatetime}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Submit</button>
                </div>
              </div>
              {this.state.message}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}/>
            </Form>
          </div>
        </div>
      );
    }
    else {
      return(
        <div>
          <div>
          <div className="welcome">
          <h2> Vehicle Sessions Per Period </h2>
          </div>
            <header className="jumbotron" id="events">
              <h1>{this.table()}</h1>
            </header>
          </div>
        </div>
      )
    }
  }

}
