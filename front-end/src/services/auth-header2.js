export default function authHeader2() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return {"Content-Type": "application/json" , "x-observatory-auth": user.accessToken} ;             // for Node.js Express back-end
  } else {
    return {};
  }
}
