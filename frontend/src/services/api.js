import axios from "axios";

//base url
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,

  headers: {
    "Content-Type": "application/json",
  },
});

//intercept req to add auth header
api.interceptors.request.use(
  (config) => {
    
    const rawToken = sessionStorage.getItem("token");
    const token = rawToken ? JSON.parse(rawToken) : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//handle api errors
function handleApiError(error, fallbackMessage) {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.message || fallbackMessage,
      status: error.response.status,
      data: null,
    };
  }

  if (error.request) {
    return {
      success: false,
      message: "No response from server. Please check your connection.",
      status: null,
      data: null,
    };
  }

  return {
    success: false,
    message: error.message || fallbackMessage,
    status: null,
    data: null,
  };
}
export {api,handleApiError};

/*
import axios from "axios";

// base url
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token
api.interceptors.request.use(
  (config) => {
    const rawToken = sessionStorage.getItem("token");
    const token = rawToken ? JSON.parse(rawToken) : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// CENTRALIZED ERROR HANDLING (THIS IS THE FIX)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = {
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
      status: error.response?.status || null,
      code: error.response?.data?.code || null,
    };

    return Promise.reject(formattedError); // IMPORTANT
  }
);

export { api };*/