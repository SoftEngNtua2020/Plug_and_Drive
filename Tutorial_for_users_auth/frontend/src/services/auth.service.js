import axios from "axios";
// http://83.212.79.138
// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "http://83.212.79.138:8080/api/auth/";
class AuthService {
  login(username, password) {
    return axios
      .get(API_URL + "signin/" + username + "/" + password)
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
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();