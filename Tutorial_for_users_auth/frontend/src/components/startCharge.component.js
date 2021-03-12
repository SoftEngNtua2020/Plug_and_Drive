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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleCharge.bind(this);
    this.onChangeProgramID = this.onChangeProgramID.bind(this);
    this.onChangePointID = this.onChangePointID.bind(this);
    this.onChangeProtocol = this.onChangeProtocol.bind(this);
    this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
    this.onChangeStationID = this.onChangeStationID.bind(this);

    this.state = {
      program_id: 0,
      point_id: 0,
      protocol: "",
      payment_method: "",
      station_id: 0,
      message: "",
      cost: 0,
      successful: false
    };
  }

  onChangeProgramID(e) {
    this.setState({
      program_id: e.target.value
    });
  }

  onChangePointID(e) {
    this.setState({
      point_id: e.target.value
    });
  }

  onChangeProtocol(e) {
    this.setState({
      protocol: e.target.value
    });
  }

  onChangePaymentMethod(e) {
    this.setState({
      payment_method: e.target.value
    });
  }

  onChangeStationID(e) {
    this.setState({
      station_id: e.target.value
    });
  }

  handleCharge(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.setCharge(this.state.program_id, this.state.point_id, this.state.protocol, this.state.payment_method, this.state.station_id).then(
        response => {
          this.setState({
            message: response.data.message,
            cost: response.data.total_cost,
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
        <div className="card card-container">
          <img
            src="https://i.pinimg.com/originals/15/c0/d0/15c0d074605e69e381d24dbc20ba25b3.png"
            alt="profile-img"
            className="profile-img-card-car"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="program">Program</label>
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
                  <label htmlFor="point">Points</label>
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
                  <label htmlFor="protocol">Protocol</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="protocol"
                    value={this.state.protocol}
                    onChange={this.onChangeProtocol}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="payment">Payment Method</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="payment"
                    value={this.state.payment_method}
                    onChange={this.onChangePaymentMethod}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="station">Station</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="protocol"
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
                  <br />
                  <b>Total cost: </b>
                  {this.state.cost}
                  <b> euros</b>
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
