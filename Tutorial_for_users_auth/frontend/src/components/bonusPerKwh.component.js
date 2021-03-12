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

export default class StationsProgram extends Component {
  constructor(props) {
    super(props);
    this.handleStation = this.handleStation.bind(this);
    this.onChangeProgramID = this.onChangeProgramID.bind(this);
    this.onChangeProgramName = this.onChangeProgramName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeBonus = this.onChangeBonus.bind(this);
    this.onChangeStationID = this.onChangeStationID.bind(this);

    this.state = {
      program_id: 0,
      program_name: "",
      kwh_price: 0,
      bonus_per_kwr: 0,
      station_id: 0,
      message: "",
      successful: false
    };
  }

  onChangeProgramID(e) {
    this.setState({
      program_id: e.target.value
    });
  }

  onChangeProgramName(e) {
    this.setState({
      program_name: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      kwh_price: e.target.value
    });
  }

  onChangeBonus(e) {
    this.setState({
      bonus_per_kwh: e.target.value
    });
  }

  onChangeStationID(e) {
    this.setState({
      station_id: e.target.value
    });
  }

  handleStation(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.setStationProgram(this.program_id, this.program_name, this.kwh_price, this.bonus_per_kwh, this.station_id).then(
        response => {
          this.setState({
            message: response.data.message,
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
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container" id="stationCard">
          <img
            src="https://i.pinimg.com/originals/15/c0/d0/15c0d074605e69e381d24dbc20ba25b3.png"
            alt="profile-img"
            className="profile-img-card-car"
          />
          <Form
            onSubmit={this.handleStation}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="program">ProgramID</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="program"
                    value={this.state.program_id}
                    onChange={this.onChangeProgramID}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="program-name">ProgramName</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="program-name"
                    value={this.state.program_name}
                    onChange={this.onChangeProgramName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price(kWh)</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="price"
                    value={this.state.kwh_price}
                    onChange={this.onChangePrice}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bonus">Bonus(kWh)</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="bonus"
                    value={this.state.bonus_per_kwr}
                    onChange={this.onChangeBonus}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="station">StationID</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="station"
                    value={this.state.station_id}
                    onChange={this.onChangeStationID}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Submit</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
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
