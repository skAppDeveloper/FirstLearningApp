import axios from "axios";
function apiHelper() {
  let axiosInstace = axios.create({ baseURL: "https://api.github.com/" });
  return axiosInstace;
}

export { apiHelper };
