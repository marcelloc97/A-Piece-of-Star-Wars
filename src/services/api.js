import axios from "axios";

const api = axios.create({
  baseURL: "https://swapi.bry.com.br/api/",
});

export default api;
