import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authHeader from '../services/auth-header';
import axios from 'axios';

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

export default class StationSessionsPoints extends Component {
  constructor(props) {
    super(props);
    this.handleSessions = this.handleSessions.bind(this);
    this.onChangePointID = this.onChangePointID.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);

    this.state = {
      point_id: 0,
      start_date: "",
      end_date: "",
      content: "",
      successful: false
    };
  }

  onChangePointID(e) {
    this.setState({
      start_date: e.target.value
    });
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

  handleSessions(e) {          //pairnei mia apanthsh apo backend (thn vazei sto state.content kai thn emfanizei sto render()).
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.form.validateAll();

    const { match: { params } } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      axios({method: 'get', url: 'http://pluganddrive.ddns.net:8765/evcharge/api/SessionsPerStation/${this.state.point_id}/${this.state.start_date}/${params.end_date}',
        headers: authHeader()
        }).then(
        response => {
          this.setState({
            content: "yes",
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

  table() {
    const data = new Array(this.state.content.ChargingSessionsList.length);
    for (var j=0; j<this.state.content.ChargingSessionsList.length; j++) data[j] = new Array(8);
    for (var j=0; j<this.state.content.ChargingSessionsList.length; j++) {
      data[j][0] = this.state.content.ChargingSessionsList[j].SessionIndex;
      data[j][1] = this.state.content.ChargingSessionsList[j].SessionID;
      data[j][2] = this.state.content.ChargingSessionsList[j].StartedOn;
      data[j][3] = this.state.content.ChargingSessionsList[j].FinishedOn;
      data[j][4] = this.state.content.ChargingSessionsList[j].Protocol;
      data[j][5] = this.state.content.ChargingSessionsList[j].EnergyDelivered;
      data[j][6] = this.state.content.ChargingSessionsList[j].Payment;
      data[j][7] = this.state.content.ChargingSessionsList[j].VehicleType;
    }
    return (
      <div>
        <table>
          <thead id="station-table-data">
            <td><h3><b>SessionIndex</b></h3></td>
            <td><h3><b>SessionID</b></h3></td>
            <td><h3><b>StartedOn</b></h3></td>
            <td><h3><b>FinishedOn</b></h3></td>
            <td><h3><b>Protocol</b></h3></td>
            <td><h3><b>EnergyDelivered</b></h3></td>
            <td><h3><b>Payment</b></h3></td>
            <td><h3><b>Vehicle Type</b></h3></td>
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
                  <td><h5>{item[6]}</h5></td>
                  <td><h5>{item[7]}</h5></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

    DatetoNumber(strDate){
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
      date =  yyyy + mm + dd;
      var temp = date.toString()
      return parseInt(temp);
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
              onSubmit={this.handleSessions}
              ref={c => {
                this.form = c;
              }}>
              <div>
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
          <header className="jumbotron" id="getChargingData">
            <h3> <b>Point</b>: {this.state.content.Point} </h3>
            <h3> <b>Point Operator</b>: {this.state.content.PointOperator} </h3>
            <h3> <b>Request Timestamp</b>: {this.state.content.RequestTimestamp} </h3>
            <h3> <b>Period From</b>: {this.state.content.PeriodFrom} </h3>
            <h3> <b>Period To</b>: {this.state.content.PeriodTo} </h3>
            <h3> <b>Number Of Charging Sessions</b>: {this.state.content.NumberOfChargingSessions} </h3>
          </header>
        )}
      </div>
    );
  }
}