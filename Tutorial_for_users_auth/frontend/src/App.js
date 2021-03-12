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
import StationDataView from "./components/stationDataView.component";
import StationDataChange from "./components/stationDataChange.component";
import StationProgramChange from "./components/stationPrograms.component";
import CostPerPeriod from "./components/costPerPeriod.component";
import EnergyConsumedByEVType from "./components/energyConsumedByEVType.component";
import EnergyConsumedByEV from "./components/energyConsumedByEV.component";
import EventDataByDesigner from "./components/eventDataByDesigner.component";
import SessionsPerPoint from "./components/sessionsPerPointStation.component";

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

  /*
  {currentUser && (
    <li className="nav-item">
      <Link to={"/user"} className="nav-link">
        User
      </Link>
    </li>
  )}
  */

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard , showOwnerBoard, showDesignerBoard, showStationsBoard} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Plug & Drive
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                SoftEng 2020
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard ? (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            ):(
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {showOwnerBoard && (
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Select action</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/startCharge">Start Charging!</a>
                  <a class="dropdown-item" href="/carData">View your Car's Data</a>
                  <a class="dropdown-item" href="/bonusPoints">Check your Bonus</a>
                  <a class="dropdown-item" href="/paymentTimes">View total payments</a>
                  <a class="dropdown-item" href="/costPerStation">Estimated cost per station</a>
                  <a class="dropdown-item" href="/eventData">See your previous events</a>
                  <a class="dropdown-item" href="/costPerPeriod">CHeck</a>
                  <div class="dropdown-divider"> </div>
                  <a class="dropdown-item" href="/login" onClick={this.logOut}>LogOut</a>
                </div>
              </li>
              <li className="nav-item" id="username">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
            </div>
          )}
          {showDesignerBoard && (
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Select action</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                <a class="dropdown-item" href="/getEnergyConsumedByEVType">Energy about a vehicle type</a>
                <a class="dropdown-item" href="/getEnergyConsumedByEV">Energy about a specific vehicle</a>
                <a class="dropdown-item" href="/eventDataByDesigner">View your charging events</a>
                <div class="dropdown-divider"> </div>
                  <a class="dropdown-item" href="/login" onClick={this.logOut}>LogOut</a>
                </div>
              </li>
              <li className="nav-item" id="username">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
            </div>
          )}
          {showStationsBoard && (
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Select action</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/stationDataView">View your Stations</a>
                  <a class="dropdown-item" href="/stationDataChange">Manage your Stations</a>
                  <a class="dropdown-item" href="/stationProgramChange">Manage your Programs</a>
                  <a class="dropdown-item" href="/sessionsPerPoint">See the sessions per Point</a>
                  <div class="dropdown-divider"> </div>
                  <a class="dropdown-item" href="/login" onClick={this.logOut}>LogOut</a>
                </div>
              </li>
              <li className="nav-item" id="username">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
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

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          {showAdminBoard &&(
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Select action</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/login" onClick={this.logOut}>LogOut</a>
                </div>
              </li>
            </div>
          )}
          {showModeratorBoard &&(
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <b>Select action</b>
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/login" onClick={this.logOut}>LogOut</a>
                </div>
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
            <Route exact path="/eventData" component={EventData} />
            <Route exact path="/stationDataView" component={StationDataView} />
            <Route exact path="/stationDataChange" component={StationDataChange} />
            <Route exact path="/stationProgramChange" component={StationProgramChange} />
            <Route exact path="/costPerPeriod" component={CostPerPeriod} />
            <Route exact path="/getEnergyConsumedByEVType" component={EnergyConsumedByEVType} />
            <Route exact path="/getEnergyConsumedByEV" component={EnergyConsumedByEV} />
            <Route exact path="/eventDataByDesigner" component={EventDataByDesigner} />
            <Route exact path="/sessionsPerPoint" component={SessionsPerPoint} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path = "http://pluganddrive.ddns.net:8765/evcharge/api/SessionsPerStation/:pointID/:yyyymmdd_from/:yyyymmdd_to" component = {SessionsPerPoint} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
