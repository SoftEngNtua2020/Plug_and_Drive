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
      AuthService.getEnergyEV(this.state.start_date, this.state.end_date).then(
        response => {
          this.setState({
            content: response.data,
            successful: true
          });
        },
        error => {
          this.setState({
            successful: false
          });
        }
      );
    }
  }

  table() {
    const data = new Array(this.state.content.length)
    for (var i=0; i<this.state.content.length; i++) data[i] = new Array(2);
    for (var i=0; i<this.state.content.length; i++) {
      data[i][0] = this.state.content[i].VehicleID;
      data[i][1] = this.state.content[i].TotalEnergyDelivered;
    }
    return (
      <div >
        <table id="EnergyTableVID">
          <thead id="energy-table-data">
            <td><h3><b>VehicleID</b></h3></td>
            <td><h3><b>TotalEnergyDelivered</b></h3></td>
          </thead>
          <tbody id="energy-table-data">
            {data.slice(0, data.length).map((item, index) => {
              return (
                <tr>
                  <td><h5>{item[0]}</h5></td>
                  <td><h5>{item[1]} kWh</h5></td>
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
