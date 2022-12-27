import jwt_decode from "jwt-decode";

const headers = {
  "Accept": "application/json",
  "Content-type": "application/json"
}


function joinURL(baseURL, url) {
  return `${baseURL}/${url}`;
}

class Service {

  constructor() {
    this.domain = "";
  }

  request(url, method = "POST", data = null) {
    url = joinURL(this.domain, url);
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);

    var current_time = Date.now() / 1000;

    if (decoded.exp < current_time) {
      window.location.href = "/login"
    }
    headers.token = token;

    const options = {
      headers,
      method,
    }
    if (data) {
      options.body = JSON.stringify({ ...data });
    }
    return fetch(url, options);
  };

  post(url, data) {
    const method = 'POST';
    return this.request(url, method, data).then(res => {
      if (!res.ok)
        throw Error('Could Not Fetch Data from Resource')
      return res.json()
    });
  };

  get(url) {
    const method = 'GET';
    return this.request(url, method).then(res => {
      if (!res.ok)
        throw Error('Could Not Fetch Data from Resource')
      return res.json()
    });
  };

  delete(url) {
    const method = 'DELETE';
    return this.request(url, method, null).then(res => res.json());
  };

  put(url, data) {
    const method = 'PUT';
    return this.request(url, method, data).then(res => {
      if (!res.ok)
        throw Error('Could Not Fetch Data from Resource')
      return res.json()
    });
  };
}

export default Service;