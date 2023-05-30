import axios from "axios";

const authToken = localStorage.getItem("token");
const baseURL = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "http://192.168.0.129:8090/",

  timeout: 80000,
  headers: {
    "x-access-token": authToken,
  },
});
export default baseURL;
