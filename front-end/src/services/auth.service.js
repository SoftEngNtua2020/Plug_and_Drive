import axios from "axios";
import authHeader from './auth-header';
import authHeader2 from './auth-header2';
// http://83.212.79.138
//const API_URL = "http://pluganddrive.ddns.net:8080/api/auth/";
const API_URL = "http://pluganddrive.ddns.net:8765/evcharge/api/"
//const BASE_URL = "http://pluganddrive.ddns.net:8080/api";
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
    return axios({method: 'post', url: API_URL + 'start_charging', data: {
      program_id: program,
      point_id: points,
      protocol: protocol,
      payment_method: payment_method,
      station_id: station
    } ,
    headers: authHeader()
    });
  }

  setStation(stationID, location, company, phone, moderator, provider, pointID) {
    var tmp1 = {
      "station": {
        "station_id": stationID,
        "location": location,
        "company_name": company,
        "phone_number": phone,
        "st_moderator_id": moderator,
        "provider_id": provider
      },
      "point": {
        "station_id": stationID
      }
    }
    return axios({method: 'post', url: API_URL + 'manageStations', data: tmp1,
      headers: authHeader()
    });
  }

  setStationProgram(programID, programName, price, bonus, stationID) {
    var tmp2 = {
      "program": {
        "program_id": programID,
        "program_name": programName,
        "kwh_price": price,
        "bonus_per_kwh": bonus,
        "station_id": stationID
      }
    }
    return axios({method: 'post', url: API_URL + 'manageChargingProgram', data: tmp2, 
      headers: authHeader()
    });
  }

  setPeriodCost(startedDate, finishedDate){
    return axios({method: 'post', url: API_URL + 'getCummulativeCostPerPeriod',  data: {
      "started_date": startedDate,
      "finished_date": finishedDate
    } ,
    headers: authHeader()
    });
  }

  getEnergyEVType(startedDate, finishedDate){
    return axios({method: 'post', url: API_URL + 'getEnergyConsumedByEVType',  data: {
      "start_date": startedDate,
      "end_date": finishedDate
    },
    headers: authHeader()
    });
  }

  getEnergyEV(startedDate, finishedDate){
    return axios({method: 'post', url: API_URL + 'getEnergyConsumedByEV',  data: {
      "start_date": startedDate,
      "end_date": finishedDate
    },
    headers: authHeader()
    });
  }
  
  getCarsCharges(start_datetime, end_datetime){
    return axios({method: 'post', url: API_URL + 'getVehiclesChargingAtTime',  data: {
      "start_datetime": start_datetime,
      "end_datetime": end_datetime
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

  getCurrentUser() {    
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
