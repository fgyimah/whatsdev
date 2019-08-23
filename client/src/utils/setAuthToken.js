import API from "../utils/api";

const setAuthToken = token => {
  if (token) {
    //apply token to every request
    API.defaults.headers.common["Authorization"] = token;
  } else {
    //delete auth header
    delete API.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
