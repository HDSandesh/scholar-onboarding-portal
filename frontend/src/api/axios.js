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
      config.headers["Content-Type"] = "application/json"
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const publicRoutes = ["/login", "/set-password"];

    // Get the URL from the original request
    const requestUrl = error?.config?.url || "";

    const isPublic = publicRoutes.some((route) => requestUrl.includes(route));

    // Redirect to login only if the route is NOT public and status is 401
    if (!isPublic && error.response?.status === 401) {
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "/login"; // Redirect to login
    }

    return Promise.reject(error);
  }
);

export default api;
