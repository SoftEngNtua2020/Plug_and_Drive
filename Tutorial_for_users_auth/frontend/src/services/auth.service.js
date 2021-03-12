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

  register(username, email, password) {
    return axios.
      post(API_URL + "signup", {
        username,
        email,
        password
     });
  }

  setCharge(program, points, protocol, payment_method, station) {
    return axios({method: 'post', url: API_URL + "start_charging",  data: {
      program_id: program,
      point_id: points,
      protocol: protocol,
      payment_method: payment_method,
      station_id: station
    } ,
    headers: authHeader()
    });
  }

  setStation(station, location, company, phone, moderator, provider, point) {
    return axios({method: 'post', url: API_URL + "manageStations",
      data: JSON.stringify({
        station:{
           station_id: station,
           location: location,
           company_name: company,
           phone_number: phone,
           st_moderator_id: moderator,
           provider_id: provider
        },
        point:{
           point_id: point,
           station_id: station
        }
      }),
      headers:  authHeader(),
    });
  }

  setStationProgram(programID, program, price, bonus, station) {
    return axios({method: 'post', url: API_URL + 'manageChargingProgram', data: JSON.stringify({
      program:{
        program_id: programID,
        program_name: program,
        kwh_price: price,
        bonus_per_kwh: bonus,
        station_id: station
      } }),
      headers: authHeader(),
    });
  }

  setPeriodCost(startedDate, finishedDate){
    return axios({method: 'post', url: API_URL + "getCummulativeCostPerPeriod",  data: {
      started_date: startedDate,
      finished_date: finishedDate
    } ,
    headers: authHeader()
    });
  }

  getEnergyEVType(startedDate, finishedDate){
    return axios({method: 'post', url: API_URL + 'getEnergyConsumedByEVType',  data: {
      start_date: startedDate,
      end_date: finishedDate
    },
    headers: authHeader()
    });
  }

  getEnergyEV(startedDate, finishedDate){
    return axios({method: 'post', url: API_URL + 'getEnergyConsumedByEV',  data: {
      start_date: startedDate,
      end_date: finishedDate
    },
    headers: authHeader()
    });
  }

  getEventData(startedDate, finishedDate){
    return axios({method: 'post', url: API_URL + 'getChargingEventsByDesigner',  data: {
      "start_date": startedDate,
      "end_date": finishedDate
    } ,
    headers: authHeader()
    });
  }

  getCarsCharges(datetime){
    return axios.post({method: 'post', url: API_URL + 'getVehiclesChargingAtTime',  data: {
      datetime: datetime
    },
    headers: authHeader()
    });
  }

  getCurrentUser() {      //returns the current user
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
