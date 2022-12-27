import Service from "./http";
import jwt_decode from "jwt-decode";

class Util {
  service = new Service();

  getTokenExpirationDate(token) {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isAdmin() {
    let token = localStorage.getItem("token");
    if (!token) return false;
    var decoded = jwt_decode(token);
    if (decoded.role === 'admin') return true;
    return false;
  }

  getRole() {
    let token = localStorage.getItem("token");
    if (!token) return "";
    var decoded = jwt_decode(token);
    return decoded?.role;
  }

  loggedIn() {
    let token = localStorage.getItem("token");
    if (!token) return false;
    const date = this.getTokenExpirationDate(token);

    if (date === undefined) return false;
    if (date.valueOf() < new Date().valueOf()) {
      console.log("session expired");
      this.logout();

    }

    if (token) return true;
    return false;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login"
  }

  getName() {
    if (this.loggedIn()) {
      var decode = jwt_decode(localStorage.getItem("token"));
      return decode.name;
    }
  }

  getMail() {
    if (this.loggedIn()) {
      var decode = jwt_decode(localStorage.getItem("token"));
      return decode.email;
    }
  }

  getId() {
    if (this.loggedIn()) {
      var decode = jwt_decode(localStorage.getItem("token"));
      var id = decode._id;
      return id;
    }
  }

}

export default Util;
