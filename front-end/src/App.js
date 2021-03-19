import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import StartCharge from "./components/startCharge.component";
import CarData from "./components/carData.component";
import BonusPoints from "./components/bonusPoints.component";
import PaymentTimes from "./components/paymentTimes.component";
import CostPerStation from "./components/costPerStation.component";
import EventData from "./components/eventData.component";
import ChargesAndPayments from "./components/chargesAndPayments.component";
import CostPerPeriod from "./components/costPerPeriod.component";
import CreateOrModify from "./components/createOrModify.component";
import BonusPerKwh from "./components/bonusPerKwh.component";
import GetStationsData from "./components/getStationsData.component";
import ChargingData from "./components/chargingData.component";
import ChargesPerPeriod from "./components/chargesPerPeriod.component";
import EnergyConsumptionType from "./components/energyConsumptionType.component";
import EnergyConsumptionId from "./components/energyConsumptionId.component";
import ChargingEvents from "./components/chargingEvents.component";
import CarsCharges from "./components/carsCharges.component";
import SessionsPerPoint from "./components/sessionsPerPoint.component";
import SessionsPerStation from "./components/sessionsPerStation.component";
import StationDataView from "./components/stationDataView.component";
import StationDataChange from "./components/stationDataChange.component";
import StationProgramChange from "./components/stationPrograms.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showOwnerBoard: false,
      showDesignerBoard: false,
      showStationsBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showOwnerBoard: user.roles.includes("ROLE_VEHICLE_OWNER"),
        showDesignerBoard: user.roles.includes("ROLE_VEHICLE_DESIGNER"),
        showStationsBoard: user.roles.includes("ROLE_STATION_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

// " USE next line for https instead of start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard , showOwnerBoard, showDesignerBoard, showStationsBoard} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Plug & Drive
          </Link>
          <div className="navbar-nav mr-auto">
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbardrop-DEVS" data-toggle="dropdown">
                  <b>Developers</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="https://github.com/AlexandrosKyriakakis"> 🤖 Alexandros Kyriakakis </a>
                  <a class="dropdown-item" href="https://github.com/galexo"> 🙉 Ian Alexopoulos </a>
                  <a class="dropdown-item" href="https://github.com/nikoskostas"> 🦊 Nikos Kostas </a>
                  <a class="dropdown-item" href="https://github.com/kkgit99"> 🦉 Konstantinos Kopsinis </a>
                  <a class="dropdown-item" href="https://github.com/elgrg"> 🦈 Giorgos Paraskevoloulos </a>
                  <a class="dropdown-item" href="https://github.com/lefteriskom"> 🦍 Lefteris Komvopoulos </a>
                </div>
              </li>
              </div>
          {showOwnerBoard && (
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Charge</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/carData">🏎️ View vehicle data </a>
                  <a class="dropdown-item" href="/costPerStation">💰 Estimate cost per station </a>
                  <a class="dropdown-item" href="/startCharge">⛽ Start charging </a>
                  <a class="dropdown-item" href="/bonusPoints">✨ Check bonus points </a>
                </div>
              </li>
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbardrop-sec" data-toggle="dropdown">
                  <b>Payments</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/paymentTimes">🧾 Total payments </a>
                  <a class="dropdown-item" href="/eventData">📋 Charging history </a>
                  <a class="dropdown-item" href="/costPerPeriod">📅 Total cost per time period </a>
                  <a class="dropdown-item" href="/chargesAndPayments">📈 Cumulative cost history </a>
                </div>
              </li>
              <li className="nav-item" id="logout">
                <a className="nav-link" href={"/login"} onClick={this.logOut}>🏴󠁡󠁺󠁢󠁥󠁹󠁿 Logout</a>
              </li>
              <li className="nav-item" id="username">
                <Link to={"/profile"} className="nav-link">
                  {"🧑‍🦱 " + currentUser.username}
                </Link>
              </li>
            </div>
          )}
          {showDesignerBoard && (
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Vehicle statistics</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/energyConsumptionType">🔋 Energy consumption per type</a>
                  <a class="dropdown-item" href="/energyConsumptionId">🛣️ Energy consumption per vehicle </a>
                  <a class="dropdown-item" href="/chargingEvents">📋 All Charging Events</a>
                </div>
              </li>
              <li className="nav-item" id="logout">
                <a className="nav-link" href={"/login"} onClick={this.logOut}>🏴󠁡󠁺󠁢󠁥󠁹󠁿 Logout</a>
              </li>
              <li className="nav-item" id="username">
                <Link to={"/profile"} className="nav-link">
                  {"🧑‍🦱 " + currentUser.username}
                </Link>
              </li>
            </div>
          )}
          {showStationsBoard && (
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Manage Station</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/stationDataView"> 🏭 View stations data</a>
                  <a class="dropdown-item" href="/stationDataChange"> 🔛 Manage stations</a>
                  <a class="dropdown-item" href="/stationProgramChange"> 💰 Manage programs</a>
                </div>
              </li>
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbardrop-sec" data-toggle="dropdown">
                  <b>Data Analysis</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/sessionsPerPoint"> 📋 Sessions per charging point</a>
                  <a class="dropdown-item" href="/sessionsPerStation"> 🚉 Sessions per station </a>
                  <a class="dropdown-item" href="/carsCharges"> 📅 Vehicle sessions per period</a>
                </div>
              </li>
              <li className="nav-item" id="logout">
                <a className="nav-link" href={"/login"} onClick={this.logOut}>🏴󠁡󠁺󠁢󠁥󠁹󠁿 Logout</a>
              </li>
              <li className="nav-item" id="username">
                <Link to={"/profile"} className="nav-link">
                  {"🧑‍🦱 " + currentUser.username}
                </Link>
              </li>
            </div>
          )}
          {!currentUser &&(
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

            </div>
          )}

        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/startCharge" component={StartCharge} />
            <Route exact path="/carData" component={CarData} />
            <Route exact path="/bonusPoints" component={BonusPoints} />
            <Route exact path="/paymentTimes" component={PaymentTimes} />
            <Route exact path="/costPerStation" component={CostPerStation} />
            <Route exact path="/chargesAndPayments" component={ChargesAndPayments} />
            <Route exact path="/costPerPeriod" component={CostPerPeriod} />
            <Route exact path="/getStationsData" component={GetStationsData} />
            <Route exact path="/eventData" component={EventData} />
            <Route exact path="/createOrModify" component={CreateOrModify} />
            <Route exact path="/bonusPerKwh" component={BonusPerKwh} />
            <Route exact path="/chargingData" component={ChargingData} />
            <Route exact path="/chargesPerPeriod" component={ChargesPerPeriod} />
            <Route exact path="/energyConsumptionType" component={EnergyConsumptionType} />
            <Route exact path="/energyConsumptionId" component={EnergyConsumptionId} />
            <Route exact path="/chargingEvents" component={ChargingEvents} />
            <Route exact path="/carsCharges" component={CarsCharges} />
            <Route exact path="/sessionsPerPoint" component={SessionsPerPoint} />
            <Route exact path="/sessionsPerStation" component={SessionsPerStation} />
            <Route exact path="/stationDataView" component={StationDataView} />
            <Route exact path="/stationDataChange" component={StationDataChange} />
            <Route exact path="/stationProgramChange" component={StationProgramChange} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
        <div id="footer">
          Copyright &copy; Plug & Drive 2021
        </div>
      </div>
    );
  }
}

export default App;
