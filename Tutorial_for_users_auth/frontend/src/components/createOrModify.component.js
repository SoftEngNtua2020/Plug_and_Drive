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

export default class StationsManage extends Component {
  constructor(props) {
    super(props);
    this.handleStation = this.handleStation.bind(this);
    this.onChangeStationID = this.onChangeStationID.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeStModeratorID = this.onChangeStModeratorID.bind(this);
    this.onChangeProviderID = this.onChangeProviderID.bind(this);
    this.onChangePointID = this.onChangePointID.bind(this);

    this.state = {
      station_id: 0,
      location: "",
      company_name: "",
      phone_number: "",
      st_moderator_id: 0,
      provider_id: 0,
      point_id: 0,
      message: "",
      successful: false
    };
  }

  onChangeStationID(e) {
    this.setState({
      station_id: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeCompany(e) {
    this.setState({
      company_name: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phone_number: e.target.value
    });
  }

  onChangeStModeratorID(e) {
    this.setState({
      st_moderator_id: e.target.value
    });
  }

  onChangeProviderID(e) {
    this.setState({
      provider_id: e.target.value
    });
  }

  onChangePointID(e) {
    this.setState({
      point_id: e.target.value
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
      AuthService.setStation(this.station_id, this.location, this.company_name, this.phone_number, this.st_moderator_id, this.provider_id, this.point_id).then(
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
                  <label htmlFor="location">Location</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChangeLocation}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="company"
                    value={this.state.company_name}
                    onChange={this.onChangeCompany}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={this.state.phone_number}
                    onChange={this.onChangePhoneNumber}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="moderator">StationModeratorID</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="moderator"
                    value={this.state.st_moderator_id}
                    onChange={this.onChangeStModeratorID}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="provider">ProviderID</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="provider"
                    value={this.state.provider_id}
                    onChange={this.onChangeProviderID}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="point">PointID</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="point"
                    value={this.state.point_id}
                    onChange={this.onChangePointID}
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
