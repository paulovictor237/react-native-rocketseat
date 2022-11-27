import { AppError } from "@utils/AppError";
import axios from "axios";

// ifconfig
const baseURL = "http://172.30.0.1:3333";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const getFetcher = (url = "") => {
  api.defaults.baseURL = url;
  return api;
};

const getRootApi = () => getFetcher(baseURL);

const getCompanyApi = () => getFetcher(`${baseURL}/v2/company`);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error?.response?.data?.message;
    if (message) {
      return Promise.reject(new AppError(message));
    } else {
      return Promise.reject("Erro no servidor. Tente novamente mais tarde.");
    }
  }
);

export { api, setToken, getRootApi, getCompanyApi };
