import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3006/api",
});

api.interceptors.request.use(
  (config) => {
    // List of routes that don't require auth
    const publicRoutes = ["/login", "/set-password"];

    const isPublic = publicRoutes.some((route) => config.url.includes(route));

    if (!isPublic) {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return Promise.reject(new Error("No token found"));
      }

      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
