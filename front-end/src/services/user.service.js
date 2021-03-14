import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://pluganddrive.ddns.net:8080/api/test/';
const API_URL = "http://pluganddrive.ddns.net:8765/evcharge/api/"
//const API_URL = "http://83.212.79.138:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get('http://pluganddrive.ddns.net:8765/api/test/all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin/users/:username', { headers: authHeader() });
  }

  getBonusPoints() {
    return axios.get(API_URL + 'getTotalBonus', { headers: authHeader() });
  }

  getTimesPaidCard() {
    return axios.get(API_URL + 'getTimesPaidCard', { headers: authHeader() });
  }

  getVehiclesData() {
    return axios.get(API_URL + 'getvehicledata', { headers: authHeader() });
  }

  getLocalStations() {
    return axios.get(API_URL + 'getvehiclecostassump', { headers: authHeader() });
  }

  getPreviousEvents() {
    return axios.get(API_URL + 'getvehicleeventdata', { headers: authHeader() });
  }

  getStationData() {
    return axios.get(API_URL + 'getStationData', { headers: authHeader() });
  }

  getSessionsPerStation() {
    return axios.get(API_URL + 'getStationData', { headers: authHeader() });
  }
  getChargesAndPayments() {
    return axios.get(API_URL + 'getCummulativeCostPerCharge', { headers: authHeader() });
  }
}

export default new UserService();
