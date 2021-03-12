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
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeFinishedDate = this.onChangeFinishedDate.bind(this);

    this.state = {
      started_date: "",
      finished_date: "",
      cost: 0,
      successful: false
    };
  }

  onChangeStartDate(e) {
    this.setState({
      started_date: e.target.value
    });
  }

  onChangeFinishedDate(e) {
    this.setState({
      finished_date: e.target.value
    });
  }

  handleCharge(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.setPeriodCost(this.state.started_date, this.state.finished_date).then(
        response => {
          this.setState({
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
          });
        }
      );
    }
  }

  getParsedDate(strDate){
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString();
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
                  <label htmlFor="program">Start Date</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={this.state.started_date}
                    onChange={this.onChangeStartDate}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="point">End Date</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="finishedDate"
                    value={this.state.finished_date}
                    onChange={this.onChangeFinishedDate}
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
                  <b>Total cost from: </b>
                  <br />
                  {this.getParsedDate(this.state.started_date)}
                  <b> to </b>
                  {this.getParsedDate(this.state.finished_date)}
                  <b> is:</b>
                  <br />
                  <b> {this.state.cost} </b>
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
