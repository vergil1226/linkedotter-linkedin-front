import axios from "axios";

const authToken = localStorage.getItem("token");
const baseURL = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://36f6-188-43-14-13.eu.ngrok.io/",

  timeout: 80000,
  headers: {
    "x-access-token": authToken,
  },
});
export default baseURL;
