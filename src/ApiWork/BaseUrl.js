import axios from "axios";

const authToken = localStorage.getItem("token");
const baseURL = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://linkedin-messages-be.herokuapp.com/",

  timeout: 300000,
  headers: {
    "x-access-token": authToken,
    "Access-Control-Allow-Origin": "*",
  },
});
export default baseURL;
