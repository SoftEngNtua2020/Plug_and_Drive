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
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);

    this.state = {
      start_date: "",
      end_date: "",
      content: "",
      successful: false
    };
  }

  onChangeStartDate(e) {
    this.setState({
      start_date: e.target.value
    });
  }

  onChangeEndDate(e) {
    this.setState({
      end_date: e.target.value
    });
  }

  handleEnergy(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.getEventData(this.state.start_date, this.state.end_date).then(
        response => {
          this.setState({
            content: response.data,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
          });
        }
      );
    }
  }

  table() {
    const data = new Array(this.state.content.length)
    for (var i=0; i<this.state.content.length; i++) data[i] = new Array(12);
    for (var i=0; i<this.state.content.length; i++) {
      data[i][0] = this.state.content[i].session_id;
      data[i][1] = this.state.content[i].started_on;
      data[i][2] = this.state.content[i].finished_on;
      data[i][3] = this.state.content[i].energy_deliverd;
      data[i][4] = this.state.content[i].protocol;
      data[i][5] = this.state.content[i].payment_method;
      data[i][6] = this.state.content[i].bonus_points_energy;
      data[i][7] = this.state.content[i].total_cost;
      data[i][8] = this.state.content[i].vehicle_id;
      data[i][9] = this.state.content[i].station_id;
      data[i][10] = this.state.content[i].point_id;
      data[i][11] = this.state.content[i].program_id;
    }
    return (
      <div id="table-responsive">
        <table id="EnergyTableDesigner">
          <thead id="energy-table-data">
            <td><h4><b>SessionID</b></h4></td>
            <td><h4><b>StartedOn</b></h4></td>
            <td><h4><b>FinishedOn</b></h4></td>
            <td><h4><b>EnergyDelivered</b></h4></td>
            <td><h4><b>Protocol</b></h4></td>
            <td><h4><b>PaymentMethod</b></h4></td>
            <td><h4><b>BonusPointsEnergy</b></h4></td>
            <td><h4><b>TotalCost</b></h4></td>
            <td><h4><b>VehicleID</b></h4></td>
            <td><h4><b>StationID</b></h4></td>
            <td><h4><b>PointID</b></h4></td>
            <td><h4><b>ProgramID</b></h4></td>
          </thead>
          <tbody id="energy-table-data">
            {data.slice(0, data.length).map((item, index) => {
              return (
                <tr>
                  <td><h6>{item[0]}</h6></td>
                  <td><h6>{item[1]}</h6></td>
                  <td><h6>{item[2]}</h6></td>
                  <td><h6>{item[3]} kWh</h6></td>
                  <td><h6>{item[4]}</h6></td>
                  <td><h6>{item[5]}</h6></td>
                  <td><h6>{item[6]} points</h6></td>
                  <td><h6>{item[7]} €</h6></td>
                  <td><h6>{item[8]}</h6></td>
                  <td><h6>{item[9]}</h6></td>
                  <td><h6>{item[10]}</h6></td>
                  <td><h6>{item[11]}</h6></td>
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
        {!this.state.successful && (
          <div className="card card-container">
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
                  <label htmlFor="startDate">Start Date</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={this.state.start_date}
                    onChange={this.onChangeStartDate}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={this.state.end_date}
                    onChange={this.onChangeEndDate}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Submit</button>
                </div>
              </div>
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}/>
            </Form>
          </div>
        )}
        {this.state.successful && (
          <header className="jumbotron">
            <h1>{this.table()}</h1>
          </header>
        )}
      </div>
    );
  }
}
