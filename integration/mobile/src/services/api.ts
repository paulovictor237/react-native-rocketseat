import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/torageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type PromiseType = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

type RegisterInterceptTokenManagerProps = {
  signOut: () => void;
  refreshTokenUpdated: (newToken: string) => void;
};
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (
    data: RegisterInterceptTokenManagerProps
  ) => () => void;
};

type ProcessQueueParams = {
  error: Error | null;
  token: string | null;
};

// ifconfig
const baseURL = "http://172.30.0.1:3333";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}) as APIInstanceProps;

let isRefreshing = false;
let failedQueue: Array<PromiseType> = [];

const processQueue = ({ error, token = null }: ProcessQueueParams): void => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  failedQueue = [];
};

api.registerInterceptTokenManager = ({ signOut, refreshTokenUpdated }) => {
  const interceptTokenManager = api.interceptors.response.use(
    (res) => res,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        const message = requestError.response?.data.message;
        if (message === "token.expired" || message === "token.invalid") {
          const oldToken = await storageAuthTokenGet();
          if (!oldToken) {
            signOut();
            return Promise.reject(requestError);
          }
          const originalRequest = requestError.config;
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axios(originalRequest);
              })
              .catch((error) => {
                throw error;
              });
          }
          isRefreshing = true;
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                token: oldToken,
              });
              await storageAuthTokenSave(data.token);
              api.defaults.headers.common[
                "Authorization"
              ] = `bearer ${data.token}`;
              originalRequest.headers["Authorization"] = `bearer ${data.token}`;
              refreshTokenUpdated(data.token);
              processQueue({ error: null, token: data.token });
              resolve(originalRequest);
            } catch (error: any) {
              processQueue({ error, token: null });
              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
            }
          });
        }
        signOut();
      }

      const message = requestError?.response?.data?.message;
      if (message) {
        return Promise.reject(new AppError(message));
      } else {
        return Promise.reject("Erro no servidor. Tente novamente mais tarde.");
      }
    }
  );
  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const getFetcher = (url = "") => {
  api.defaults.baseURL = url;
  return api;
};

const getRootApi = () => getFetcher(baseURL);

const getCompanyApi = () => getFetcher(`${baseURL}/v2/company`);

export { api, setToken, getRootApi, getCompanyApi };
