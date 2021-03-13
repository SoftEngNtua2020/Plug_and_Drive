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
            content: "no"
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
      <div >
        <table>
          <thead id="energy-table-data">
            <td><h3><b>VehicleID</b></h3></td>
            <td><h3><b>TotalEnergyDelivered</b></h3></td>
          </thead>
          <tbody id="energy-table-data">
            {data.slice(0, data.length).map((item, index) => {
              return (
                <tr>
                  <td><h5>{item[0]}</h5></td>
                  <td><h5>{item[1]}</h5></td>
                  <td><h5>{item[2]}</h5></td>
                  <td><h5>{item[3]} joule</h5></td>
                  <td><h5>{item[4]}</h5></td>
                  <td><h5>{item[5]} points</h5></td>
                  <td><h5>{item[6]}</h5></td>
                  <td><h5>{item[7]} kWh</h5></td>
                  <td><h5>{item[8]} euros</h5></td>
                  <td><h5>{item[9]}</h5></td>
                  <td><h5>{item[10]}</h5></td>
                  <td><h5>{item[11]}</h5></td>
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
        <div className="card card-container">
          <img
            src="https://i.pinimg.com/originals/15/c0/d0/15c0d074605e69e381d24dbc20ba25b3.png"
            alt="profile-img"
            className="profile-img-card-car"
          />

          <Form
            onSubmit={this.handleEnergy}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
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
            )}

            {this.state.successful && (
              <div className="form-group">
                <div id="response"
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  <header className="energy" id="energy">
                    <h1>{this.table()}</h1>
                  </header>
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}