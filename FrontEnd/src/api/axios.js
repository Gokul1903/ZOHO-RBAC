import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      const isLoginRequest = err.config.url.includes("/login");
      if (!isLoginRequest) {
        sessionStorage.removeItem("user");
        window.location.href = "/";
        alert("Session expired. Please log in again.");
      }
    }
    return Promise.reject(err);
  }
);

export default api;
