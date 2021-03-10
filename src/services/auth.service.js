import axios from "axios";
import authHeader from './auth-header';
import authHeader2 from './auth-header2';
// http://83.212.79.138
//const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "http://pluganddrive.ddns.net:8765/evcharge/api/"
//const BASE_URL = "http://localhost:8080/api";
//const API_URL = "http://83.212.79.138:8080/api/auth/";
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {   //oxi signin
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, roles) {
    return axios.
      post(API_URL + "signup", {
        username,
        email,
        password,
        roles
     });
  }

  setCharge(program, points, protocol, payment_method, station) {
    return axios.post(API_URL + "start_charging", { body: {
      program,
      points,
      protocol,
      payment_method,
      station
    } ,
    headers: {
        "content-type": "application/json" ,
        "x-access-token": JSON.parse(localStorage.getItem('user')).accessToken
    }
    });
  }
  /*setCharge(program, points, protocol, payment_method, station) {
    return axios.post(API_URL + "start_charging", JSON.stringify({header: authHeader2(), body:{
      program,
      points,
      protocol,
      payment_method,
      station}
    }));
  }*/

  getCurrentUser() {      //returns the current user
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
