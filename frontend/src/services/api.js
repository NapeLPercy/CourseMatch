import axios from "axios";

//base url
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_API,

  headers: {
    "Content-Type": "application/json",
  },
});

//intercept req to add auth header
api.interceptors.request.use(
  (config) => {
    
    const rawUser = sessionStorage.getItem("docutracker_user");
    const user = rawUser ? JSON.parse(rawUser) : null;

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
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