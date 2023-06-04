import axios from "axios";

const authToken = localStorage.getItem("token");
const baseURL = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://135.181.168.31:8080",

  timeout: 80000,
  headers: {
    "x-access-token": authToken,
  },
});
export default baseURL;
