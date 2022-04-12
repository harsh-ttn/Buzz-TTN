import axios from "axios";

const instance = axios.create({
   baseURL: "https://buzz-app-ttn.herokuapp.com/",
  /* baseURL: "http://localhost:8080/", */
});

export default instance;
