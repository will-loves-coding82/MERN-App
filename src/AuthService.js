import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
export default class AuthService {
    // Initializing important variables
    constructor(domain) {
      this.domain = domain || 'http://localhost:4000'; //server domain
      this.fetch = this.fetch.bind(this); // React binding stuff
      this.login = this.login.bind(this);
      this.getProfile = this.getProfile.bind(this);
    }
  
    login(name, email,password) {
      console.log("fetching " + name);
      // Get a token from api server using the fetch api

      const registered = {
        userName: name,
        email: email,
        password: password
    }

      
      /*axios.post("http://localhost:4000/users/login", registered)
      .then(response => {
        this.setToken(response.token); // Setting the token in localStorage
        return Promise.resolve(response);
      });
      */
      return this.fetch(`${this.domain}/users`, {
        method: 'POST',
        body: JSON.stringify({registered
        }),
      }).then(res => {
        this.setToken(res.token); // Setting the token in localStorage
        return Promise.resolve(res);
      });
    }
  
    loggedIn() {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken(); // GEtting token from localstorage
      return !!token && !isExpired(token); // handwaiving here
    }
  
    isTokenExpired(token) {
      try {
        const decoded = decodeToken(token);
        if (decoded.exp < Date.now() / 1000) {
          // Checking if token is expired. N
          return true;
        } else return false;
      } catch (err) {
        return false;
      }
    }
  
    setToken(idToken) {
      // Saves user token to localStorage
      localStorage.setItem('id_token', idToken);
    }
  
    getToken() {
      // Retrieves the user token from localStorage
      return localStorage.getItem('id_token');
    }
  
    logout() {
      // Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
    }
  
    getProfile() {
      // Using jwt-decode npm package to decode the token
      return decodeToken(this.getToken());
    }
  
    fetch(url, options) {
      // performs api calls sending the required authentication headers
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
  
      // Setting Authorization header
      // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
      if (this.loggedIn()) {
        headers['Authorization'] = 'Bearer ' + this.getToken();
      }
  
      return fetch(url, {
        headers,
        ...options,
      })
        .then(this._checkStatus)
        .then(response => response.json());
    }
  
    _checkStatus(response) {
      // raises an error in case response status is not a success
      if (response.status >= 200 && response.status < 300) {
        // Success status lies between 200 to 300
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  }