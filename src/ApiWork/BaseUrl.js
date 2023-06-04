import axios from "axios";

const authToken = localStorage.getItem("token");
const baseURL = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://cors-anywhere.herokuapp.com/https://5f0b-188-43-14-13.eu.ngrok.io",

  timeout: 80000,
  headers: {
    "x-access-token": authToken,
    "Access-Control-Allow-Origin": "*",
  },
});
export default baseURL;
