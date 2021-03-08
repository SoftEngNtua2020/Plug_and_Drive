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
import Charge from "./components/charge.component";
import CarData from "./components/carData.component";
import BonusPoints from "./components/bonusPoints.component";
import PaymentTimes from "./components/paymentTimes.component";
import LocalStations from "./components/localStations.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showOwnerBoard: false,
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
        showOwnerBoard: user.roles.includes("ROLE_VEHICLE_OWNER")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard , showOwnerBoard} = this.state;

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

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {showOwnerBoard ? (
            <div className="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  Select action
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                  <a class="dropdown-item" href="/charge">Charge your Car</a>
                  <a class="dropdown-item" href="/carData">View your Car's Data</a>
                  <a class="dropdown-item" href="/bonusPoints">Check your Bonus</a>
                  <a class="dropdown-item" href="/paymentTimes">See your total payments</a>
                  <a class="dropdown-item" href="/localStations">See all local stations</a>
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
          ) : (
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
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/charge" component={Charge} />
            <Route exact path="/carData" component={CarData} />
            <Route exact path="/bonusPoints" component={BonusPoints} />
            <Route exact path="/paymentTimes" component={PaymentTimes} />
            <Route exact path="/localStations" component={LocalStations} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
